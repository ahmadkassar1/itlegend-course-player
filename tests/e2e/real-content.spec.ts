import { expect, test } from "@playwright/test";
import path from "node:path";
import fs from "node:fs/promises";
import type axe from "axe-core";
import { courses } from "../../src/data/courses";
import { videoReferences } from "../../src/data/video-references";
import { controlYouTube } from "./helpers/youtube";
import { capturePath, prepareScreenshot } from "./helpers/capture";

test.beforeEach(async ({ page }) => {
  await controlYouTube(page);
});

test("published titles, thumbnails and zero history replace every fictional catalogue card", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("article")).toHaveCount(4);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Learn with Ali Shahin.",
  );
  await expect(page.getByLabel("Your learning summary")).toContainText(
    "0 learning steps completed",
  );
  for (const video of videoReferences) {
    const card = page.locator("article").filter({
      has: page.getByRole("heading", { name: video.videoTitle, exact: true }),
    });
    await expect(card.getByRole("img")).toHaveAttribute("src", video.thumbnail);
    await expect(card.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
    await expect(card).toContainText("Ali Shahin");
    await card.getByRole("img").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        card
          .getByRole("img")
          .evaluate((img) => (img as HTMLImageElement).naturalWidth),
      )
      .toBe(480);
  }
  await expect(page.locator("body")).not.toContainText(
    /Edward Norton|Ana Patel|fictional learners|21 lessons|65 students/,
  );
  await prepareScreenshot(page);
  await page.screenshot({
    path: capturePath("real-catalogue-desktop"),
    fullPage: true,
  });
});

test("Arabic and topic search combine with status filters and empty recovery", async ({
  page,
}) => {
  await page.goto("/");
  const search = page.getByLabel("Search videos", { exact: true });
  await search.fill("  dns ");
  await expect(page.locator("article")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Web foundations", exact: true })
    .click();
  await page
    .getByLabel("Learning status", { exact: true })
    .selectOption("Completed");
  await expect(
    page.getByRole("heading", { name: "No videos match yet" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show all videos" }).click();
  await expect(search).toBeFocused();
  await expect(page.locator("article")).toHaveCount(4);
  await search.fill("مكونات");
  await expect(page.locator("article")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Sort by", { exact: true }).selectOption("title");
  expect(await page.locator("article h3").allTextContents()).toEqual(
    courses.map((c) => c.title).sort((a, b) => a.localeCompare(b)),
  );
});

test("every real entry opens its own native player and truthful facts without fabricated social data", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const course of courses) {
    await page.goto(`/courses/${course.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      course.title,
    );
    const frame = page.locator("[data-player-frame] iframe");
    await expect(frame).toHaveAttribute("title", course.title);
    await expect(frame).toHaveAttribute(
      "src",
      new RegExp(`youtube-nocookie.com/embed/${course.initialLessonId}\\?`),
    );
    await expect(frame).toHaveAttribute(
      "referrerpolicy",
      "strict-origin-when-cross-origin",
    );
    expect(
      new URL((await frame.getAttribute("src"))!).searchParams.get("origin"),
    ).toBe("http://127.0.0.1:3100");
    await expect(page.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
    await expect(page.locator("dl")).not.toContainText(
      /weeks|students|undefined/,
    );
    await expect(
      page
        .getByRole("region", { name: "Course comments list" })
        .getByRole("listitem"),
    ).toHaveCount(0);
    await page
      .getByRole("button", { name: "Leaderboard", exact: true })
      .click();
    await expect(page.getByRole("dialog").getByRole("listitem")).toHaveCount(1);
    await expect(page.getByRole("dialog")).toContainText(
      "Your saved activity only",
    );
    await page.keyboard.press("Escape");
  }
  await page.goto("/courses/not-a-course");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "not found",
  );
  await page.goto("/courses/starting-seo");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "not found",
  );
  expect(errors).toEqual([]);
});

test("legacy fake history is not imported; explicit watched credit persists and stays isolated", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "course-library:learner:v1",
      JSON.stringify({
        learning: { webology: { completedLessonIds: ["1fSAAzrxK6E"] } },
      }),
    ),
  );
  await page.goto("/courses/webology");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  await page
    .getByRole("button", { name: "I watched this video", exact: true })
    .click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "33",
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Watched ✓", exact: true }),
  ).toBeDisabled();
  await page.goto("/");
  await expect(page.getByLabel("Your learning summary")).toContainText(
    "1 learning steps completed",
  );
  await page
    .getByLabel("Learning status", { exact: true })
    .selectOption("In progress");
  await expect(page.locator("article")).toHaveCount(1);
  await page.goto("/courses/computer-science");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  expect(
    await page.evaluate(() =>
      localStorage.getItem("course-library:learner:v1"),
    ),
  ).not.toBeNull();
});

test("official SDK pause and end boundaries save real positions once without remounting for Wide", async ({
  page,
}) => {
  await page.goto("/courses/webology");
  await page.waitForFunction("Boolean(window.__ytTest?.['1fSAAzrxK6E'])");
  await page.evaluate("window.__ytTest['1fSAAzrxK6E'](2, 123.5)");
  await page.getByRole("button", { name: "Wide mode", exact: true }).click();
  await expect(page.locator("main")).toHaveAttribute("data-wide", "true");
  await expect(page.locator("[data-player-frame] iframe")).toHaveCount(1);
  await page.reload();
  await expect(page.locator("[data-player-frame] iframe")).toHaveAttribute(
    "src",
    /start=123/,
  );
  await page.waitForFunction("Boolean(window.__ytTest?.['1fSAAzrxK6E'])");
  await page.evaluate("window.__ytTest['1fSAAzrxK6E'](0, 1558)");
  await page.evaluate("window.__ytTest['1fSAAzrxK6E'](0, 1558)");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "33",
  );
  await page.reload();
  await expect(page.locator("[data-player-frame] iframe")).toHaveAttribute(
    "src",
    /start=0/,
  );
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "33",
  );
});

test("site-authored PDF and five-question exercise complete the study plan and survive review", async ({
  page,
  request,
}) => {
  const pdf = await request.get("/resources/learning-plan.pdf");
  expect(pdf.ok()).toBe(true);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.goto("/courses/webology?lesson=study-worksheet");
  await page.getByRole("button", { name: "Open PDF", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("img")).toBeVisible();
  await dialog.getByLabel("PDF page size").selectOption("200");
  await dialog.getByRole("button", { name: "Mark read", exact: true }).click();
  await expect(
    dialog.getByRole("button", { name: "Read ✓", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("Escape");
  await page.goto("/courses/webology?lesson=study-check");
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  for (let index = 0; index < 5; index++) {
    await dialog
      .getByRole("button", { name: `Question ${index + 1}`, exact: true })
      .click();
    await dialog.getByRole("radio").nth([0, 1, 2, 3, 0][index]).check();
  }
  await dialog
    .getByRole("button", { name: "Submit answers", exact: true })
    .click();
  await expect(dialog).toContainText("5 / 5");
  await page.reload();
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await expect(dialog).toContainText("5 / 5");
  await page.keyboard.press("Escape");
  await page.goto("/courses/webology");
  await page
    .getByRole("button", { name: "I watched this video", exact: true })
    .click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "100",
  );
  await page.goto("/");
  await page
    .getByLabel("Learning status", { exact: true })
    .selectOption("Completed");
  await expect(page.locator("article")).toHaveCount(1);
});

for (const failure of ["blocked", "quota", "corrupt"]) {
  test(`${failure} storage keeps real-content interactions usable and truthfully reported`, async ({
    page,
  }) => {
    await page.addInitScript((mode) => {
      if (mode === "blocked")
        Object.defineProperty(window, "localStorage", {
          get() {
            throw new Error("blocked");
          },
        });
      if (mode === "quota")
        Storage.prototype.setItem = function () {
          throw new DOMException("quota", "QuotaExceededError");
        };
      if (mode === "corrupt")
        localStorage.setItem("course-library:youtube-learner:v1", "{invalid");
    }, failure);
    await page.goto("/courses/webology");
    await page
      .getByRole("button", { name: "I watched this video", exact: true })
      .click();
    await expect(page.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "33",
    );
    await page.goto("/");
    await expect(
      page.getByRole("status", { name: "Learning storage status" }),
    ).toContainText(
      failure === "corrupt" ? "saved on this device" : "unavailable",
    );
  });
}

test("unavailable SDK retains native playback, source fallback and explicit completion", async ({
  page,
}) => {
  await page.route("https://www.youtube.com/iframe_api", (route) =>
    route.abort(),
  );
  await page.goto("/courses/webology");
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "Automatic progress is unavailable" }),
  ).toBeVisible();
  await expect(page.locator("[data-player-frame] iframe")).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "Watch on YouTube ↗", exact: true }).first(),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=1fSAAzrxK6E");
  await page
    .getByRole("button", { name: "I watched this video", exact: true })
    .click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "33",
  );
});

test("clearing learning data requires confirmation and restores an empty real-content baseline", async ({
  page,
}) => {
  await page.goto("/courses/webology");
  await page
    .getByRole("button", { name: "I watched this video", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Write a comment" })
    .fill("My saved note");
  await page.goto("/");
  page.once("dialog", (dialog) => dialog.dismiss());
  await page.getByRole("button", { name: "Clear my learning data" }).click();
  await expect(page.getByLabel("Your learning summary")).toContainText(
    "1 learning steps completed",
  );
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Clear my learning data" }).click();
  await page.reload();
  await expect(page.getByLabel("Your learning summary")).toContainText(
    "0 learning steps completed",
  );
  await page.goto("/courses/webology");
  await expect(
    page.getByRole("textbox", { name: "Write a comment" }),
  ).toHaveValue("");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
});

test("related videos use original titles, intent-loaded native player and modal focus return", async ({
  page,
}) => {
  await page.goto("/courses/webology");
  await page
    .getByText("Related videos from Ali Shahin", { exact: true })
    .click();
  const preview = page.getByRole("button", {
    name: "Preview مقدمة في علوم الحاسب",
    exact: true,
  });
  await preview.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { level: 3 })).toHaveText(
    videoReferences[1].videoTitle,
  );
  await expect(dialog.locator("iframe")).toHaveCount(0);
  await dialog.getByRole("button", { name: "Load YouTube player" }).click();
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "src",
    /embed\/2mySUIR9k20/,
  );
  await expect(
    dialog.getByRole("link", { name: "Watch on YouTube ↗", exact: true }),
  ).toHaveAttribute("href", courses[1].sourceURL!);
  await page.keyboard.press("Escape");
  await expect(preview).toBeFocused();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
});

test("real Arabic content and local surfaces retain accessibility and 200% text reflow", async ({
  page,
}) => {
  const results: unknown[] = [];
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const state of ["catalogue", "player", "pdf", "exam", "empty"]) {
      if (state === "catalogue" || state === "empty") await page.goto("/");
      else
        await page.goto(
          `/courses/webology${state === "pdf" ? "?lesson=study-worksheet" : state === "exam" ? "?lesson=study-check" : ""}`,
        );
      if (state === "empty")
        await page
          .getByLabel("Search videos", { exact: true })
          .fill("no matching video");
      if (state === "pdf" || state === "exam")
        await page
          .getByRole("button", {
            name: state === "pdf" ? "Open PDF" : "Open exam",
            exact: true,
          })
          .click();
      await page.addScriptTag({
        path: path.join(process.cwd(), "node_modules/axe-core/axe.min.js"),
      });
      const scan = await page.evaluate(async () => {
        const engine = (window as unknown as { axe: typeof axe }).axe;
        return engine.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
          },
        });
      });
      results.push({
        width,
        state,
        violations: scan.violations,
        incomplete: scan.incomplete,
      });
      expect(scan.violations, `${state} ${width}`).toEqual([]);
    }
    await page.goto("/");
    await page.addStyleTag({ content: "html{font-size:200%}" });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth + 1,
      ),
    ).toBe(true);
    await page.goto("/courses/webology");
    await page.addStyleTag({ content: "html{font-size:200%}" });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth + 1,
      ),
    ).toBe(true);
  }
  await fs.writeFile(
    capturePath("real-content-axe").replace(/\.png$/, ".json"),
    JSON.stringify(results, null, 2),
  );
});
