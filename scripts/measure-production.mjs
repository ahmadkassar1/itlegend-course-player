import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cpus, platform, release, totalmem } from "node:os";
import { brotliCompressSync, gzipSync } from "node:zlib";

// A bounded lab measurement, not Lighthouse, field CWV, or a timing assertion.
const baseURL = process.env.PERF_BASE_URL || "http://127.0.0.1:3100";
const output = process.argv[2] || "verification/local-performance.json";
const measureNavigation = !process.argv.includes("--interactions-only");
const profiles = [
  {
    name: "desktop-local",
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    cpuRate: 1,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
  },
  {
    name: "mobile-lab",
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    cpuRate: 4,
    latency: 150,
    downloadThroughput: 200_000,
    uploadThroughput: 93_750,
  },
];

async function inventory(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await inventory(path)));
    else {
      const bytes = await readFile(path);
      files.push({
        path: path.replaceAll("\\", "/"),
        raw: bytes.length,
        gzip: gzipSync(bytes).length,
        brotli: brotliCompressSync(bytes).length,
      });
    }
  }
  return files;
}

async function createPage(browser, profile, throttle = true) {
  const context = await browser.newContext({
    viewport: profile.viewport,
    deviceScaleFactor: profile.deviceScaleFactor,
    isMobile: profile.isMobile,
    hasTouch: profile.hasTouch,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.clearBrowserCache");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  if (throttle) {
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: profile.cpuRate });
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: profile.latency,
      downloadThroughput: profile.downloadThroughput,
      uploadThroughput: profile.uploadThroughput,
    });
  }
  const requests = new Map();
  cdp.on("Network.requestWillBeSent", (event) => {
    requests.set(event.requestId, {
      url: event.request.url,
      type: event.type,
      prefetch: Boolean(
        event.request.headers["Next-Router-Prefetch"] ||
        event.request.headers["next-router-prefetch"] ||
        event.request.headers.Purpose === "prefetch",
      ),
    });
  });
  cdp.on("Network.responseReceived", (event) => {
    Object.assign(requests.get(event.requestId) || {}, {
      status: event.response.status,
      mimeType: event.response.mimeType,
      contentEncoding: event.response.headers["Content-Encoding"] || null,
    });
  });
  cdp.on("Network.loadingFinished", (event) => {
    Object.assign(requests.get(event.requestId) || {}, {
      networkBytes: event.encodedDataLength,
      finished: true,
    });
  });
  cdp.on("Network.dataReceived", (event) => {
    const request = requests.get(event.requestId);
    if (request)
      request.receivedBodyBytes =
        (request.receivedBodyBytes || 0) + event.encodedDataLength;
  });
  cdp.on("Network.loadingFailed", (event) => {
    Object.assign(requests.get(event.requestId) || {}, {
      failed: event.errorText,
    });
  });
  await page.addInitScript(() => {
    window.__lab = { lcp: [], shifts: [], tasks: [] };
    for (const [type, key] of [
      ["largest-contentful-paint", "lcp"],
      ["layout-shift", "shifts"],
      ["longtask", "tasks"],
    ]) {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__lab[key].push({
            ...entry.toJSON(),
            tag: entry.element?.tagName,
            text: entry.element?.textContent?.slice(0, 100),
            hadRecentInput: entry.hadRecentInput,
          });
        }
      }).observe({ type, buffered: true });
    }
  });
  return { context, page, requests, errors };
}

async function snapshot(page, requests, errors) {
  const metrics = await page.evaluate(() => {
    const { lcp, shifts, tasks } = window.__lab;
    let maximumWindow = 0;
    let currentWindow = 0;
    let first = 0;
    let previous = 0;
    for (const shift of shifts.filter((entry) => !entry.hadRecentInput)) {
      if (
        currentWindow > 0 &&
        shift.startTime - previous < 1000 &&
        shift.startTime - first < 5000
      )
        currentWindow += shift.value;
      else {
        first = shift.startTime;
        currentWindow = shift.value;
      }
      previous = shift.startTime;
      maximumWindow = Math.max(maximumWindow, currentWindow);
    }
    return {
      navigation: performance.getEntriesByType("navigation")[0]?.toJSON(),
      paints: performance
        .getEntriesByType("paint")
        .map((entry) => entry.toJSON()),
      lcp: lcp.at(-1) || null,
      cls: maximumWindow,
      layoutShifts: shifts,
      longTasks: tasks,
      // Observed excess over 50ms across this window; not Lighthouse TBT.
      longTaskExcessMs: tasks.reduce(
        (sum, entry) => sum + Math.max(0, entry.duration - 50),
        0,
      ),
      resources: performance
        .getEntriesByType("resource")
        .map((entry) => entry.toJSON()),
      images: [...document.images].map((image) => ({
        src: image.currentSrc,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        renderedWidth: image.getBoundingClientRect().width,
        renderedHeight: image.getBoundingClientRect().height,
        complete: image.complete,
      })),
    };
  });
  return { ...metrics, requests: [...requests.values()], errors: [...errors] };
}

const browser = await chromium.launch({ channel: "chrome" });
const report = {
  capturedAt: new Date().toISOString(),
  revision: execFileSync(
    "git",
    [
      "-c",
      `safe.directory=${process.cwd().replaceAll("\\", "/")}`,
      "rev-parse",
      "HEAD",
    ],
    { encoding: "utf8" },
  ).trim(),
  buildId: (await readFile(".next/BUILD_ID", "utf8")).trim(),
  browser: browser.version(),
  node: process.version,
  machine: {
    platform: platform(),
    release: release(),
    cpu: cpus()[0]?.model,
    logicalCPUs: cpus().length,
    totalMemoryBytes: totalmem(),
  },
  baseURL,
  conditions: {
    profiles,
    repetitions: measureNavigation ? 3 : 0,
    observation:
      "load event plus four seconds without input; fresh context and disabled browser cache per sample; warm localhost production server; sequential",
    networkBytes:
      "CDP loadingFinished encodedDataLength includes response overhead; unfinished/cancelled requests are listed separately with available receivedBodyBytes; inventory gzip/Brotli are estimates, not transferred bytes",
    interaction:
      "fresh context, same viewports/DPR, no CPU/network throttling; cumulative initial/question/PDF request snapshots; external playback is verified separately; independent from navigation metrics",
  },
  chunks: await inventory(".next/static/chunks"),
  assets: await inventory("public"),
  navigation: [],
  interactions: [],
};
try {
  for (const profile of profiles) {
    for (const route of ["/", "/courses/webology"]) {
      for (let run = 1; measureNavigation && run <= 3; run++) {
        const { context, page, requests, errors } = await createPage(
          browser,
          profile,
        );
        await page.goto(`${baseURL}${route}`, { waitUntil: "load" });
        await page.waitForTimeout(4000);
        report.navigation.push({
          profile: profile.name,
          route,
          run,
          ...(await snapshot(page, requests, errors)),
        });
        await context.close();
        console.log(`${profile.name} ${route} ${run}/3 measured`);
      }
    }
    const { context, page, requests, errors } = await createPage(
      browser,
      profile,
      false,
    );
    await page.goto(`${baseURL}/courses/webology`);
    await page.waitForTimeout(1000);
    const initial = await snapshot(page, requests, errors);
    await page
      .getByRole("button", { name: "Ask a question", exact: true })
      .click();
    await page.getByRole("dialog").waitFor();
    await page.waitForTimeout(500);
    const question = await snapshot(page, requests, errors);
    await page.keyboard.press("Escape");
    const practice = page.getByRole("button", {
      name: "Your study practice",
      exact: true,
    });
    if ((await practice.getAttribute("aria-expanded")) === "false")
      await practice.click();
    await page
      .locator('a[href="/courses/webology?lesson=study-worksheet"]')
      .evaluate((element) =>
        element.scrollIntoView({ block: "end", behavior: "instant" }),
      );
    await page
      .locator('a[href="/courses/webology?lesson=study-worksheet"]')
      .click();
    await page.getByRole("dialog").waitFor();
    const image = page.getByRole("dialog").getByRole("img");
    await image.waitFor();
    await image.evaluate((element) => element.decode());
    const pdf = await snapshot(page, requests, errors);
    await page.keyboard.press("Escape");
    report.interactions.push({
      profile: profile.name,
      initial,
      question,
      pdf,
    });
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
}
