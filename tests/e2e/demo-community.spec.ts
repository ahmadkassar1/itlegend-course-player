import path from "node:path";
import fs from "node:fs/promises";
import type axe from "axe-core";
import { expect, test, type Page } from "@playwright/test";
import { courses } from "../../src/data/courses";
import { motivationalMessages } from "../../src/data/motivation";
import { controlYouTube } from "./helpers/youtube";
import { capturePath } from "./helpers/capture";

test.beforeEach(async ({ page }) => {
  await controlYouTube(page);
});

async function scan(page: Page, name: string) {
  await page.addScriptTag({
    path: path.resolve("node_modules/axe-core/axe.min.js"),
  });
  const result = await page.evaluate(async () =>
    (window as typeof window & { axe: typeof axe }).axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"],
      },
    }),
  );
  await fs.writeFile(
    capturePath(`${name}-axe`).replace(/\.png$/, ".json"),
    JSON.stringify(result, null, 2),
  );
  expect(
    result.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target),
    })),
  ).toEqual([]);
}

for (const width of [320, 1440]) {
  test(`encouragement types, rotates at 4.5 seconds, pauses and cleans up at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width === 320 ? 568 : 1000 });
    await page.goto("/courses/webology");
    await expect(page.locator("[data-player-frame] iframe")).toBeVisible();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const start = new Date("2026-10-10T12:00:00Z");
    await page.clock.install({ time: start });
    await page.clock.pauseAt(new Date(start.getTime() + 1000));
    const trigger = page.getByRole("button", {
      name: "Leaderboard",
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    const visibleText = dialog.locator("[data-motivation-text]");
    await page.clock.runFor(600);
    const partial = await visibleText.textContent();
    expect(partial!.length).toBeGreaterThan(0);
    expect(partial!.length).toBeLessThan(
      motivationalMessages["Getting started"][0].length,
    );
    await page.clock.runFor(3850);
    await expect(visibleText).toHaveText(
      motivationalMessages["Getting started"][0],
    );
    await page.clock.runFor(100);
    await expect(
      dialog.getByRole("region", { name: "Study encouragement" }),
    ).toContainText(motivationalMessages["Getting started"][1]);
    await dialog.getByRole("button", { name: "Pause encouragement" }).click();
    await expect(visibleText).toHaveText(
      motivationalMessages["Getting started"][1],
    );
    const pause = dialog.getByRole("button", { name: "Resume encouragement" });
    await expect(pause).toHaveAttribute("aria-pressed", "true");
    await page.clock.runFor(9000);
    await expect(visibleText).toHaveText(
      motivationalMessages["Getting started"][1],
    );
    await expect(dialog.locator("[aria-current=true]")).toContainText("0%");
    await page.screenshot({ path: capturePath(`leaderboard-${width}`) });
    await pause.click();
    await page.clock.runFor(4500);
    await expect(
      dialog.getByRole("region", { name: "Study encouragement" }),
    ).toContainText(motivationalMessages["Getting started"][2]);
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await page.clock.runFor(9000);
    await trigger.click();
    await page.clock.runFor(2500);
    await expect(visibleText).toHaveText(
      motivationalMessages["Getting started"][0],
    );
    await dialog.getByRole("button", { name: "Pause encouragement" }).click();
    // Axe uses timers internally; let the clock run while the message remains paused.
    await page.clock.resume();
    await scan(page, `leaderboard-${width}`);
    await page.keyboard.press("Escape");
    expect(errors).toEqual([]);
  });

  test(`question confirmation offers working follow-up and discovery actions at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width === 320 ? 568 : 1000 });
    await page.goto("/courses/webology");
    await page
      .getByRole("button", { name: "Ask a question", exact: true })
      .click();
    const dialog = page.getByRole("dialog");
    const input = dialog.getByRole("textbox", { name: "Write your question" });
    await dialog
      .getByRole("button", { name: "Submit Question", exact: true })
      .click();
    await expect(dialog.getByRole("alert")).toBeVisible();
    await expect(
      dialog.getByRole("region", { name: "Question next steps" }),
    ).toHaveCount(0);
    await input.fill("How can I inspect the DNS cache on my own computer?");
    await dialog
      .getByRole("button", { name: "Submit Question", exact: true })
      .click();
    await expect(dialog.getByRole("status")).toHaveText(
      "Thank you for submitting your question! It will be reviewed soon.",
    );
    const next = dialog.getByRole("region", { name: "Question next steps" });
    await expect(next).toContainText("Review is simulated in this demo");
    await expect(next).toContainText("saved on this device");
    await expect(input).toHaveValue("");
    await next.scrollIntoViewIfNeeded();
    await page.screenshot({ path: capturePath(`question-success-${width}`) });
    await scan(page, `question-success-${width}`);
    await next.getByRole("button", { name: "Ask another question" }).click();
    await expect(input).toBeFocused();
    await expect(next).toHaveCount(0);
    await input.fill("Does changing a DNS resolver affect cached records?");
    await dialog
      .getByRole("button", { name: "Submit Question", exact: true })
      .click();
    const history = dialog.getByRole("region", { name: "Saved question list" });
    await expect(history.getByRole("listitem")).toHaveCount(2);
    await expect(history.getByRole("listitem").first()).toContainText(
      "changing a DNS resolver",
    );
    await next.getByRole("link", { name: "Explore more videos" }).click();
    await expect(page).toHaveURL(/\/#courses$/);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("#courses")).toBeInViewport();
    expect(await page.evaluate(() => document.body.style.position)).toBe("");
    await page.goto("/courses/webology");
    await page
      .getByRole("button", { name: "Ask a question", exact: true })
      .click();
    await expect(history.getByRole("listitem")).toHaveCount(2);
    await expect(dialog.getByRole("status")).toHaveCount(0);
  });
}

test("reduced motion shows complete, static encouragement and actual completion selects its level", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/courses/webology");
  await page
    .getByRole("button", { name: "I watched this video", exact: true })
    .click();
  await page.getByRole("button", { name: "Leaderboard", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const text = dialog.locator("[data-motivation-text]");
  await expect(text).toHaveText(motivationalMessages["Building momentum"][0]);
  await expect(dialog.locator("[aria-current=true]")).toContainText("33%");
  await expect(
    dialog.getByRole("button", { name: /encouragement/ }),
  ).toHaveCount(0);
  await expect(dialog).toContainText("Animation off");
  await page.clock.install();
  await page.clock.runFor(10_000);
  await expect(text).toHaveText(motivationalMessages["Building momentum"][0]);
});

test("video-specific samples remain separate from persisted posts and completion", async ({
  page,
}) => {
  for (const course of courses) {
    await page.goto(`/courses/${course.slug}`);
    const history = page.getByRole("region", { name: "Course comments list" });
    await expect(history.getByRole("listitem")).toHaveCount(3);
    await expect(history).toContainText(course.comments[0].body);
    await expect(history.getByText("Sample", { exact: true })).toHaveCount(3);
    await expect(page.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  }
  await page.goto("/courses/webology");
  await page
    .getByRole("textbox", { name: "Write a comment" })
    .fill("My own DNS notes");
  await page.getByRole("button", { name: "Submit Review" }).click();
  await page.reload();
  const history = page.getByRole("region", { name: "Course comments list" });
  await expect(history.getByRole("listitem")).toHaveCount(4);
  await expect(history.getByRole("listitem").first()).toContainText(
    "My own DNS notes",
  );
  const saved = await page.evaluate(() =>
    localStorage.getItem("course-library:youtube-learner:v1"),
  );
  expect(saved).toContain("My own DNS notes");
  expect(saved).not.toMatch(/sample-|Mariam Hassan|Nour Adel/);
  await page.getByRole("button", { name: "Leaderboard", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("listitem")).toHaveCount(5);
  await expect(
    page.getByRole("dialog").locator("[aria-current=true]"),
  ).toContainText("0%");
});

test("question confirmation reports unavailable storage without claiming an actual instructor request", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
  });
  await page.goto("/courses/webology");
  await page
    .getByRole("button", { name: "Ask a question", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("textbox", { name: "Write your question" })
    .fill("How do resolvers work?");
  await dialog
    .getByRole("button", { name: "Submit Question", exact: true })
    .click();
  await expect(
    dialog.getByRole("region", { name: "Question next steps" }),
  ).toContainText("Saving is unavailable");
  await expect(
    dialog.getByRole("region", { name: "Question next steps" }),
  ).toContainText("nothing is sent to an instructor");
  await expect(
    dialog
      .getByRole("region", { name: "Saved question list" })
      .getByRole("listitem"),
  ).toHaveCount(1);
});
