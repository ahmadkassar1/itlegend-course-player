import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs/promises";
import { capturePath, prepareScreenshot } from "./helpers/capture";

async function fits(page: Page) {
  const size = await page.evaluate(() => ({
    available: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(size.document).toBeLessThanOrEqual(size.available + 1);
  expect(size.body).toBeLessThanOrEqual(size.available + 1);
}

test("200% text sizing and WCAG text spacing preserve content, reflow and all modal controls", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const style = document.createElement("style");
      style.textContent = `html {font-size:200%!important} * {line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} p {margin-bottom:2em!important}`;
      document.head.append(style);
    });
  });
  for (const width of [320, 820, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.locator("article")).toHaveCount(6);
    await fits(page);
    await page.goto("/courses/starting-seo?lesson=editor-setup");
    const h1 = page.getByRole("heading", { level: 1 });
    expect(
      await h1.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    ).toBeGreaterThanOrEqual(52);
    await fits(page);
    for (const name of ["Ask a question", "Leaderboard"]) {
      await page.getByRole("button", { name, exact: true }).click();
      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();
      await fits(page);
      expect(
        await modal.evaluate((el) => el.scrollWidth - el.clientWidth),
      ).toBeLessThanOrEqual(1);
      await expect(
        modal.getByRole("button", { name: `Close ${name}` }),
      ).toBeInViewport();
      await page.keyboard.press("Escape");
    }
    for (const kind of ["exam", "PDF"]) {
      await page.goto(
        `/courses/starting-seo?lesson=${kind === "exam" ? "knowledge-check" : "reference-files"}`,
      );
      await page
        .getByRole("button", { name: `Open ${kind}`, exact: true })
        .click();
      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();
      await fits(page);
      expect(
        await modal.evaluate((el) => el.scrollWidth - el.clientWidth),
      ).toBeLessThanOrEqual(1);
      await expect(
        modal.getByRole("button", { name: /^Close / }),
      ).toBeInViewport();
      if (kind === "exam") {
        await modal.getByRole("radio").last().check();
        await expect(modal.getByRole("radio").last()).toBeChecked();
        await modal.getByRole("button", { name: "Next question" }).click();
        await expect(
          modal.getByRole("heading", { name: "Question 2 of 5" }),
        ).toBeFocused();
      }
      if (width === 320)
        await page.screenshot({
          path: capturePath(`text-200-${kind.toLowerCase()}`),
        });
      await page.keyboard.press("Escape");
    }
    if (width === 320) {
      await page.goto("/courses/starting-seo");
      await prepareScreenshot(page);
      await page.screenshot({
        path: capturePath("text-200-player"),
        fullPage: true,
      });
    }
  }
});

test("long Arabic, multiline and unbroken comments remain readable with six-to-ten-lesson curricula", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 780 });
  const message = `ملاحظاتي عن الدرس\n${"تفاصيل مفيدة للتطبيق والمراجعة. ".repeat(25)}\n${"LearningWithoutSpaces".repeat(25)}`;
  for (const slug of ["web-design-foundations", "react-components"]) {
    await page.goto(`/courses/${slug}`);
    await page
      .getByRole("textbox", { name: "Write a comment", exact: true })
      .fill(message);
    await page
      .getByRole("button", { name: "Submit Review", exact: true })
      .click();
    await expect(page.getByRole("status")).toContainText("added");
    const added = page.locator("#comments li").last().locator("p");
    await expect(added).toHaveText(message);
    expect(
      await added.evaluate((el) => el.scrollWidth - el.clientWidth),
    ).toBeLessThanOrEqual(1);
    await fits(page);
    await page
      .getByRole("button", { name: "Putting It Into Practice", exact: true })
      .click();
    await expect(page.locator('#curriculum a[href*="?lesson="]')).toHaveCount(
      slug === "react-components" ? 10 : 6,
    );
    await fits(page);
    if (slug === "react-components") {
      await added.scrollIntoViewIfNeeded();
      await page.screenshot({ path: capturePath("long-comment") });
    }
  }
});

test("keyboard navigation exposes targets below the sticky player and exam radio keys retain one choice", async ({
  page,
}) => {
  await page.setViewportSize({ width: 430, height: 780 });
  await page.goto("/courses/starting-seo");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  const curriculum = page.getByRole("link", { name: "Jump to curriculum" });
  await curriculum.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#curriculum")).toBeFocused();
  await page.keyboard.press("Tab");
  const toggle = page.getByRole("button", {
    name: "Course Introduction",
    exact: true,
  });
  await expect(toggle).toBeFocused();
  const frame = await page
    .getByRole("region", { name: "Current lesson" })
    .boundingBox();
  const target = await toggle.boundingBox();
  expect(target!.y).toBeGreaterThanOrEqual(frame!.y + frame!.height);
  await page.goto("/courses/starting-seo?lesson=knowledge-check");
  await page.getByRole("button", { name: "Open exam", exact: true }).focus();
  await page.keyboard.press("Enter");
  const radios = page.getByRole("dialog").getByRole("radio");
  await radios.first().focus();
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowDown");
  await expect(radios.nth(1)).toBeChecked();
  await expect(radios.first()).not.toBeChecked();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await expect(radios.nth(1)).toBeChecked();
});

test("intermediate layouts preserve measured reference relationships and usable controls", async ({
  page,
}) => {
  const measurements = [];
  for (const [width, height] of [
    [320, 780],
    [430, 932],
    [700, 360],
    [767, 900],
    [768, 1024],
    [820, 1180],
    [1023, 900],
    [1024, 900],
    [1199, 900],
    [1200, 900],
    [1320, 1000],
    [1440, 1000],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/courses/starting-seo");
    await fits(page);
    const video = (await page.locator("[data-player-frame]").boundingBox())!;
    const aside = (await page.locator("#curriculum").boundingBox())!;
    if (width >= 1024) {
      expect(aside.x).toBeGreaterThan(video.x + video.width + 20);
      expect(Math.abs(aside.y - video.y)).toBeLessThan(1);
    } else expect(aside.y).toBeGreaterThan(video.y + video.height);
    const expectedHeight =
      width < 768
        ? Math.min(video.width / 1.5, height * 0.5)
        : video.width / 1.5;
    expect(video.height).toBeCloseTo(expectedHeight, 0);
    for (const control of await page
      .getByRole("navigation", { name: "Course sections" })
      .locator("a, button")
      .all()) {
      const box = (await control.boundingBox())!;
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
    measurements.push({ width, height, video, curriculum: aside });
    if ([820, 1024, 1320].includes(width)) {
      await prepareScreenshot(page);
      await page.screenshot({
        path: capturePath(`player-${width}`),
        fullPage: true,
      });
    }
  }
  await fs.writeFile(
    capturePath("layout-measurements").replace(/\.png$/, ".json"),
    JSON.stringify(measurements, null, 2),
  );
});
