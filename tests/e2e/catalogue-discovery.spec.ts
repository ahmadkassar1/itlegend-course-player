import { expect, test, type Page } from "@playwright/test";
import path from "node:path";
import fs from "node:fs/promises";
import type axe from "axe-core";
import { capturePath, prepareScreenshot } from "./helpers/capture";

const cards = (page: Page) => page.locator("article");

test("catalogue search, combined filters, sorting and empty recovery use real course state", async ({
  page,
}) => {
  await page.goto("/");
  await expect(cards(page)).toHaveCount(6);
  await expect(page.getByLabel("Your practice learning summary")).toContainText(
    "21 lessons completed",
  );
  await page
    .getByLabel("Search courses", { exact: true })
    .fill("  JAVASCRIPT  ");
  await expect(cards(page)).toHaveCount(1);
  await expect(cards(page)).toContainText("JavaScript Essentials");
  await page.getByRole("button", { name: "Development", exact: true }).click();
  await page
    .getByLabel("Learning status", { exact: true })
    .selectOption("Completed");
  await expect(cards(page)).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "No courses match yet" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show all courses" }).click();
  await expect(cards(page)).toHaveCount(6);
  await expect(
    page.getByLabel("Search courses", { exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Development", exact: true }).click();
  await expect(cards(page)).toHaveCount(3);
  await page
    .getByLabel("Learning status", { exact: true })
    .selectOption("Not started");
  await expect(cards(page)).toHaveCount(1);
  await expect(cards(page)).toContainText("Responsive CSS");
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.getByLabel("Sort by", { exact: true }).selectOption("progress");
  await expect(cards(page).first()).toContainText("Accessible Interfaces");
  await page.getByLabel("Sort by", { exact: true }).selectOption("title");
  await expect(cards(page).first()).toContainText("Accessible Interfaces");
  await expect(cards(page).nth(1)).toContainText("Building with React");
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await expect(cards(page).first()).toContainText("Starting SEO");
});

test("resume and status filters reflect a completed worksheet after reload", async ({
  page,
}) => {
  await page.goto("/courses/starting-seo?lesson=reference-files");
  await page.getByRole("button", { name: "Open PDF", exact: true }).click();
  await page.getByRole("button", { name: "Mark read", exact: true }).click();
  await page.keyboard.press("Escape");
  await page.goto("/");
  const resume = page.getByRole("link", {
    name: "Continue learning",
    exact: true,
  });
  await expect(resume).toHaveAttribute(
    "href",
    "/courses/starting-seo?lesson=reference-files",
  );
  await expect(page.getByLabel("Your practice learning summary")).toContainText(
    "22 lessons completed",
  );
  await page
    .getByLabel("Learning status", { exact: true })
    .selectOption("In progress");
  await expect(cards(page)).toHaveCount(3);
  const seo = cards(page).filter({ hasText: "Starting SEO" });
  await expect(seo.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
  await page.reload();
  await expect(resume).toHaveAttribute(
    "href",
    "/courses/starting-seo?lesson=reference-files",
  );
  await expect(cards(page).first().getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
});

test("YouTube references require intent, retain source fallback and never credit practice progress", async ({
  page,
}) => {
  const requests: { url: string; referer?: string }[] = [];
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (/youtube|ytimg|googlevideo/.test(request.url()))
      requests.push({ url: request.url(), referer: request.headers().referer });
  });
  // Deterministic integration checks do not depend on third-party availability.
  await page.route("https://www.youtube-nocookie.com/embed/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: '<!doctype html><html lang="en"><title>Reference player test</title><body><p>External player unavailable for this test.</p></body></html>',
    }),
  );
  await page.goto("/");
  const progress = await cards(page)
    .getByRole("progressbar")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("aria-valuenow")),
    );
  const trigger = page.getByRole("button", {
    name: "Preview Webology علم الويب",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Watch a reference" });
  await expect(dialog).toBeVisible();
  expect(requests).toEqual([]);
  await expect(dialog.locator("iframe")).toHaveCount(0);
  await expect(
    dialog.getByRole("link", { name: "Watch on YouTube" }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=1fSAAzrxK6E");
  await dialog
    .getByRole("button", { name: "Load YouTube player", exact: true })
    .click();
  const embed = dialog.locator("iframe");
  await expect(embed).toHaveAttribute(
    "src",
    /^https:\/\/www\.youtube-nocookie\.com\/embed\/1fSAAzrxK6E\?playsinline=1&rel=0&cc_load_policy=1$/,
  );
  await expect(embed).toHaveAttribute(
    "referrerpolicy",
    "strict-origin-when-cross-origin",
  );
  await expect(embed).toHaveAttribute("allowfullscreen", "");
  await expect.poll(() => requests.length).toBe(1);
  expect(requests[0].referer).toBe("http://127.0.0.1:3100/");
  await expect(
    dialog.getByText("If the player is blocked or unavailable", {
      exact: false,
    }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(
    await cards(page)
      .getByRole("progressbar")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("aria-valuenow")),
      ),
  ).toEqual(progress);
  await trigger.click();
  await expect(dialog.locator("iframe")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await page.goto("/courses/starting-seo");
  await page
    .getByText("Related videos from Ali Shahin", { exact: true })
    .click();
  await page
    .getByRole("button", { name: "Preview Learning skills", exact: true })
    .click();
  await expect(
    dialog.getByRole("link", { name: "Watch on YouTube" }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=q5rXYEuFzEQ");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("progressbar", { name: "Course completion" }),
  ).toHaveAttribute("aria-valuenow", "63");
  expect(errors).toEqual([]);
});

for (const [width, height] of [
  [320, 568],
  [844, 390],
  [820, 1180],
  [1440, 900],
] as const) {
  test(`catalogue discovery and reference dialog fit ${width}x${height}`, async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      )
      .toBe(true);
    await expect(
      page.getByLabel("Search courses", { exact: true }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: "Preview مقدمة في علوم الحاسب",
        exact: true,
      })
      .click();
    const dialog = page.getByRole("dialog");
    const box = await dialog.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    await dialog
      .getByRole("link", { name: "Full collection" })
      .scrollIntoViewIfNeeded();
    await expect(
      dialog.getByRole("link", { name: "Full collection" }),
    ).toBeInViewport();
    await dialog
      .getByRole("button", { name: "Close Watch a reference" })
      .click();
    await prepareScreenshot(page);
    await page.screenshot({
      path: capturePath(`catalogue-discovery-${width}`),
      fullPage: true,
    });
  });
}

test("new catalogue, empty results and reference consent pass rendered accessibility checks", async ({
  page,
}) => {
  test.setTimeout(90_000);
  const results = [];
  const contrast = [];
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.addScriptTag({
      path: path.resolve("node_modules/axe-core/axe.min.js"),
    });
    for (const state of ["catalogue", "empty", "reference"]) {
      if (state === "empty")
        await page
          .getByLabel("Search courses", { exact: true })
          .fill("No matching subject");
      if (state === "reference") {
        await page.getByRole("button", { name: "Show all courses" }).click();
        await page
          .getByRole("button", {
            name: "Preview Webology علم الويب",
            exact: true,
          })
          .click();
      }
      const result = await page.evaluate(async () => {
        const engine = (window as typeof window & { axe: typeof axe }).axe;
        return engine.run(document, {
          runOnly: {
            type: "tag",
            values: [
              "wcag2a",
              "wcag2aa",
              "wcag21aa",
              "wcag22aa",
              "best-practice",
            ],
          },
        });
      });
      results.push({
        width,
        state,
        violations: result.violations,
        incomplete: result.incomplete,
      });
      if (state === "reference") {
        for (const target of [
          page.locator("dialog h3"),
          page.locator('dialog [class*="consent"] > p'),
        ]) {
          await target.scrollIntoViewIfNeeded();
          const sample = await target.evaluate((element) => {
            const rgb = (value: string) => value.match(/[\d.]+/g)!.map(Number);
            const luminance = (color: number[]) =>
              color
                .slice(0, 3)
                .map((value) => {
                  const channel = value / 255;
                  return channel <= 0.04045
                    ? channel / 12.92
                    : ((channel + 0.055) / 1.055) ** 2.4;
                })
                .reduce(
                  (sum, value, index) =>
                    sum + value * [0.2126, 0.7152, 0.0722][index],
                  0,
                );
            let ancestor: Element | null = element;
            let background = "";
            while (ancestor) {
              background = getComputedStyle(ancestor).backgroundColor;
              const color = rgb(background);
              if (color.length === 3 || color[3] === 1) break;
              ancestor = ancestor.parentElement;
            }
            const foreground = getComputedStyle(element).color;
            const [low, high] = [
              luminance(rgb(foreground)),
              luminance(rgb(background)),
            ].sort((a, b) => a - b);
            const box = element.getBoundingClientRect();
            const hit = document.elementFromPoint(
              box.x + box.width / 2,
              box.y + box.height / 2,
            );
            return {
              text: element.textContent,
              foreground,
              background,
              ratio: (high + 0.05) / (low + 0.05),
              visible: hit === element || element.contains(hit),
            };
          });
          contrast.push({ width, ...sample });
          expect(sample.visible).toBe(true);
          expect(sample.ratio).toBeGreaterThanOrEqual(4.5);
        }
      }
      expect(result.violations, `${width} ${state}`).toEqual([]);
    }
    await page.keyboard.press("Escape");
    await page.evaluate(
      () => (document.documentElement.style.fontSize = "200%"),
    );
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      )
      .toBe(true);
  }
  await fs.writeFile(
    capturePath("catalogue-discovery-axe").replace(/\.png$/, ".json"),
    JSON.stringify(results, null, 2),
  );
  await fs.writeFile(
    capturePath("catalogue-reference-contrast").replace(/\.png$/, ".json"),
    JSON.stringify(contrast, null, 2),
  );
});
