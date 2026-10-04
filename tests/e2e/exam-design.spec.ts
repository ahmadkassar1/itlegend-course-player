import { expect, test } from "@playwright/test";
import { capturePath, prepareScreenshot } from "./helpers/capture";

test("submitted practice freezes its nonzero clock across review and reload", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-10-04T13:00:00Z") });
  await page.clock.pauseAt(new Date("2026-10-04T13:01:00Z"));
  await page.goto("/courses/starting-seo?lesson=knowledge-check");
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await page.getByRole("button", { name: "Question 2", exact: true }).click();
  await page.getByRole("radio").nth(1).check();
  await page.clock.fastForward(28000);
  await expect(page.getByRole("timer")).toHaveText("09:32");
  await page.screenshot({ path: capturePath("timer-desktop-reference") });
  for (let index = 1; index <= 5; index++) {
    await page
      .getByRole("button", {
        name: new RegExp(`^Question ${index}(, answered)?$`),
      })
      .click();
    await page.getByRole("radio").first().check();
  }
  await page
    .getByRole("button", { name: "Submit answers", exact: true })
    .click();
  await page.clock.fastForward(60000);
  await expect(page.getByRole("timer")).toHaveText("09:32");
  await page.reload();
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await expect(page.getByRole("timer")).toHaveText("09:32");
});

test("curriculum lock symbols reflect real completion after reading and reload; exam keeps its two badges", async ({
  page,
}) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/courses/starting-seo");
  const row = (id: string) =>
    page.locator(`#curriculum a[href$="lesson=${id}"]`);
  await expect(
    row("introduction").locator('[data-completed="true"]'),
  ).toBeVisible();
  await expect(
    row("reference-files").locator('[data-completed="false"]'),
  ).toBeVisible();
  await expect(row("knowledge-check")).toContainText("5 QUESTIONS");
  await expect(row("knowledge-check")).toContainText("10 MINUTES");
  await expect(row("knowledge-check").locator("[data-completed]")).toHaveCount(
    0,
  );
  await prepareScreenshot(page);
  await page
    .locator("#curriculum")
    .screenshot({ path: capturePath("curriculum-before") });
  await row("reference-files").click();
  await page.getByRole("button", { name: "Mark read", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(
    row("reference-files").locator('[data-completed="true"]'),
  ).toBeVisible();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
  await page.reload();
  await expect(
    row("reference-files").locator('[data-completed="true"]'),
  ).toBeVisible();
  await prepareScreenshot(page);
  await page
    .locator("#curriculum")
    .screenshot({ path: capturePath("curriculum-after") });
});

test("practice timer advances by wall time across close and reload, never discards answers at zero, and freezes at submission", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-10-04T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-10-04T12:01:00Z"));
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/courses/starting-seo?lesson=knowledge-check");
  const open = () =>
    page.getByRole("button", { name: "Open exam", exact: true }).click();
  await open();
  const timer = page.getByRole("timer", { name: "Practice time remaining" });
  await expect(timer).toHaveText("10:00");
  await page.getByRole("button", { name: "Question 2", exact: true }).click();
  await page.getByRole("radio").nth(1).check();
  await page.clock.fastForward(28000);
  await expect(timer).toHaveText("09:32");
  await page.screenshot({ path: capturePath("timer-mobile-reference") });
  await page.keyboard.press("Escape");
  await page.clock.fastForward(32000);
  await open();
  await expect(timer).toHaveText("09:00");
  await expect(page.getByRole("radio").nth(1)).toBeChecked();
  await page.reload();
  await open();
  await expect(timer).toHaveText("09:00");
  await page.clock.fastForward(600000);
  await expect(timer).toHaveText("00:00");
  for (let index = 1; index <= 5; index++) {
    await page
      .getByRole("button", {
        name: new RegExp(`^Question ${index}(, answered)?$`),
      })
      .click();
    await page.getByRole("radio").first().check();
  }
  await page
    .getByRole("button", { name: "Submit answers", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("correct");
  await page.clock.fastForward(60000);
  await expect(timer).toHaveText("00:00");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
});
