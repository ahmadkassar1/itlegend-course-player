import { capturePath } from "./helpers/capture";
import { expect, test } from "@playwright/test";
import { prepareScreenshot } from "./helpers/capture";

test("inline media really plays and Wide/fullscreen preserve the mounted video and playback position", async ({
  page,
}) => {
  await page.goto("/courses/starting-seo");
  const video = page.locator("video");
  await page
    .getByRole("button", { name: "Play Introduction", exact: true })
    .click();
  await expect
    .poll(() => page.$eval("video", (element) => element.currentTime))
    .toBeGreaterThan(0.25);
  await expect(video).toHaveJSProperty("controls", true);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.$eval("video", (element) => {
    element.pause();
    element.currentTime = 2.5;
  });
  await expect
    .poll(() => page.$eval("video", (element) => element.currentTime))
    .toBeCloseTo(2.5, 1);
  const original = await video.elementHandle();
  await page.getByRole("button", { name: "Wide mode", exact: true }).click();
  await expect(page.locator("main")).toHaveAttribute("data-wide", "true");
  const frame = await page.locator("[data-player-frame]").boundingBox();
  const materials = await page
    .getByRole("region", { name: "Course Materials" })
    .boundingBox();
  expect(frame!.x).toBe(0);
  expect(frame!.width).toBe(1440);
  expect(materials!.y).toBeGreaterThan(frame!.y + frame!.height);
  await prepareScreenshot(page);
  await page.screenshot({
    path: capturePath("desktop-wide"),
    fullPage: true,
  });
  expect(
    await original!.evaluate(
      (element) => element === document.querySelector("video"),
    ),
  ).toBe(true);
  await expect(video).toHaveJSProperty("currentTime", 2.5);
  await page.getByRole("button", { name: "Maximize player" }).click();
  await expect
    .poll(() =>
      page.evaluate(() =>
        Boolean(document.fullscreenElement?.matches("[data-player-frame]")),
      ),
    )
    .toBe(true);
  await expect(
    page.getByRole("button", { name: "Exit fullscreen" }),
  ).toBeVisible();
  await page.screenshot({ path: capturePath("desktop-fullscreen") });
  await page.evaluate(() => document.exitFullscreen());
  await expect(
    page.getByRole("button", { name: "Maximize player" }),
  ).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("data-wide", "true");
  await expect(video).toHaveJSProperty("currentTime", 2.5);
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.locator("html")).toHaveJSProperty("scrollWidth", 1024);
  expect((await page.locator("[data-player-frame]").boundingBox())!.width).toBe(
    1024,
  );
  await page.setViewportSize({ width: 430, height: 932 });
  await expect(page.locator("main")).toHaveAttribute("data-wide", "false");
  await expect(video).toHaveJSProperty("currentTime", 2.5);
  expect(
    await original!.evaluate(
      (element) => element === document.querySelector("video"),
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page
    .getByRole("button", { name: "Exit Wide mode", exact: true })
    .click();
  await expect(page.locator("main")).toHaveAttribute("data-wide", "false");
  expect(
    await original!.evaluate(
      (element) => element === document.querySelector("video"),
    ),
  ).toBe(true);
});

test("switching lessons saves individual positions and does not carry timestamps into another lesson", async ({
  page,
}) => {
  await page.goto("/courses/starting-seo");
  await page
    .getByRole("button", { name: "Play Introduction", exact: true })
    .click();
  await expect
    .poll(() => page.$eval("video", (element) => element.readyState))
    .toBeGreaterThan(0);
  await page.$eval("video", (element) => {
    element.pause();
    element.currentTime = 3;
  });
  await expect(page.locator("video")).toHaveJSProperty("currentTime", 3);
  await page
    .locator('a[href="/courses/starting-seo?lesson=course-overview"]')
    .click();
  await page
    .getByRole("button", { name: "Play Course Overview", exact: true })
    .click();
  await expect
    .poll(() => page.$eval("video", (element) => element.currentTime))
    .toBeLessThan(1.5);
  await page.$eval("video", (element) => element.pause());
  await page
    .locator('a[href="/courses/starting-seo?lesson=introduction"]')
    .click();
  await page
    .getByRole("button", { name: "Play Introduction", exact: true })
    .click();
  await expect
    .poll(() => page.$eval("video", (element) => element.currentTime))
    .toBeGreaterThanOrEqual(3);
  await expect
    .poll(() => page.$eval("video", (element) => element.currentTime))
    .toBeLessThan(4.5);
});

test("ended media credits once, updates catalogue, preserves course isolation and returns to selected lesson", async ({
  page,
}) => {
  await page.goto("/courses/starting-seo?lesson=embedding-php");
  const bar = page.getByRole("progressbar", { name: "Course completion" });
  await expect(bar).toHaveAttribute("aria-valuenow", "63");
  await page
    .getByRole("button", { name: "Play Embedding PHP in HTML", exact: true })
    .click();
  await expect
    .poll(() =>
      page.$eval(
        "video",
        (element) => Number.isFinite(element.duration) && element.duration > 10,
      ),
    )
    .toBe(true);
  await page.$eval("video", (element) => {
    element.currentTime = element.duration - 0.25;
  });
  await expect(bar).toHaveAttribute("aria-valuenow", "75");
  await expect(
    page.getByText("6 of 8 lessons completed", { exact: false }),
  ).toBeVisible();
  await page.$eval("video", async (element) => {
    element.currentTime = element.duration - 0.25;
    await element.play();
  });
  await expect
    .poll(() => page.$eval("video", (element) => element.ended))
    .toBe(true);
  await expect(bar).toHaveAttribute("aria-valuenow", "75");
  await page.getByRole("link", { name: "Home", exact: true }).click();
  const seo = page.locator("article").filter({
    has: page.getByRole("heading", {
      name: "Starting SEO as your Home Based Business",
      exact: true,
    }),
  });
  await expect(seo.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
  const css = page.locator("article").filter({
    has: page.getByRole("heading", {
      name: "Responsive CSS: From Mobile to Desktop",
      exact: true,
    }),
  });
  await expect(css.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  await seo.getByRole("link").click();
  await expect(page).toHaveURL(/lesson=embedding-php$/);
  await expect(page.locator('[aria-current="step"]')).toContainText(
    "Embedding PHP in HTML",
  );
  await expect(bar).toHaveAttribute("aria-valuenow", "75");
});

test("mobile sticky player leaves section targets visible and fits a short landscape viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/courses/starting-seo");
  const preview = page.getByRole("region", { name: "Current lesson" });
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
  );
  await expect
    .poll(async () => (await preview.boundingBox())!.y)
    .toBeCloseTo(0, 0);
  await expect(
    page.getByRole("button", { name: "Wide mode", exact: true }),
  ).toBeHidden();
  for (const [link, heading] of [
    ["Jump to curriculum", "Topics for This Course"],
    ["Jump to comments", "Comments"],
  ]) {
    await page.getByRole("link", { name: link }).click();
    const target = page.getByRole("heading", { name: heading, exact: true });
    await expect(target).toBeInViewport();
    await expect
      .poll(async () => {
        const box = await target.boundingBox();
        const player = await preview.boundingBox();
        return box!.y >= player!.y + player!.height + 10;
      })
      .toBe(true);
  }
  await page.screenshot({ path: capturePath("mobile-sticky") });
  await page.setViewportSize({ width: 700, height: 360 });
  await page.getByRole("link", { name: "Jump to comments" }).click();
  const small = await preview.boundingBox();
  expect(small!.height).toBeLessThan(250);
  const smallFrame = await page.locator("[data-player-frame]").boundingBox();
  const smallVideo = await page.locator("video").boundingBox();
  expect(smallFrame!.width).toBeCloseTo(small!.width, 0);
  expect(smallVideo!.height).toBeLessThanOrEqual(smallFrame!.height + 1);
  await expect(
    page.getByRole("heading", { name: "Comments", exact: true }),
  ).toBeInViewport();
  await page.screenshot({ path: capturePath("short-landscape") });
});

test("progress animates on entry; reduced motion shows the final fill directly", async ({
  page,
}) => {
  await page.setViewportSize({ width: 430, height: 600 });
  await page.goto("/courses/starting-seo");
  const bar = page.getByRole("progressbar", { name: "Course completion" });
  const fill = bar.locator("span");
  await expect.poll(async () => (await fill.boundingBox())!.width).toBe(0);
  await page.getByRole("link", { name: "Jump to curriculum" }).click();
  const expectedWidth = (await bar.boundingBox())!.width * 0.63;
  await expect
    .poll(async () => (await fill.boundingBox())!.width)
    .toBeGreaterThan(0);
  expect((await fill.boundingBox())!.width).toBeLessThan(expectedWidth);
  await expect
    .poll(async () =>
      Math.abs((await fill.boundingBox())!.width - expectedWidth),
    )
    .toBeLessThan(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/courses/starting-seo");
  await expect
    .poll(async () =>
      Math.abs((await fill.boundingBox())!.width - expectedWidth),
    )
    .toBeLessThan(1);
  expect(
    await fill.evaluate(
      (element) => getComputedStyle(element).transitionDuration,
    ),
  ).toBe("0s");
});

test("unsupported fullscreen and failed media give truthful recovery without progress credit", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(document, "fullscreenEnabled", { get: () => false }),
  );
  await page.route("**/media/study-plan.webm", (route) => route.abort());
  await page.goto("/courses/starting-seo?lesson=embedding-php");
  await page.getByRole("button", { name: "Maximize player" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Fullscreen is unavailable",
  );
  await page
    .getByRole("button", { name: "Play Embedding PHP in HTML", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Retry playback" }),
  ).toBeVisible();
  await expect(
    page.getByRole("progressbar", { name: "Course completion" }),
  ).toHaveAttribute("aria-valuenow", "63");
  await page.unroute("**/media/study-plan.webm");
  await page.getByRole("button", { name: "Retry playback" }).click();
  await expect
    .poll(() => page.$eval("video", (element) => element.currentTime))
    .toBeGreaterThan(0);
});
