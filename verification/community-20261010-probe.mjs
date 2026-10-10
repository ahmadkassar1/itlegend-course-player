import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
import { controlYouTube } from "../tests/e2e/helpers/youtube.ts";

const browser = await chromium.launch({ channel: "chrome" });
const evidence = [];
try {
  for (const width of [320, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: width === 320 ? 568 : 1000 },
    });
    await controlYouTube(page);
    await page.goto("http://127.0.0.1:3100/courses/webology");
    if (width === 1440) {
      await page.evaluate(() => document.fonts.ready);
      await page
        .getByRole("region", { name: "Course comments list" })
        .screenshot({
          path: "verification/community-20261010-sample-comments-1440.png",
        });
    }
    await page
      .getByRole("button", { name: "Leaderboard", exact: true })
      .click();
    const dialog = page.getByRole("dialog");
    const pause = dialog.getByRole("button", { name: "Pause encouragement" });
    await pause.click();
    await page.evaluate(() => document.fonts.ready);
    const title = await dialog.locator("header p").evaluate((element) => {
      const style = getComputedStyle(element);
      const foreground = style.color
        .match(/[\d.]+/g)
        .slice(0, 3)
        .map(Number);
      let parent = element;
      let background;
      while (parent) {
        const values = getComputedStyle(parent)
          .backgroundColor.match(/[\d.]+/g)
          .map(Number);
        if (values.length === 3 || values[3] === 1) {
          background = values.slice(0, 3);
          break;
        }
        parent = parent.parentElement;
      }
      const luminance = (color) =>
        color
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
      const light = [luminance(foreground), luminance(background)].sort(
        (a, b) => b - a,
      );
      const rect = element.getBoundingClientRect();
      return {
        foreground,
        background,
        contrast: (light[0] + 0.05) / (light[1] + 0.05),
        fontSize: style.fontSize,
        visible:
          rect.top >= 0 &&
          rect.bottom <= innerHeight &&
          rect.left >= 0 &&
          rect.right <= innerWidth,
      };
    });
    expect(title.visible).toBe(true);
    expect(title.contrast).toBeGreaterThanOrEqual(4.5);
    if (width === 320) {
      await dialog
        .getByRole("button", { name: "Resume encouragement" })
        .focus();
      await page.keyboard.press("PageDown");
      await page.keyboard.press("PageDown");
      await expect(dialog.locator('[aria-current="true"]')).toBeInViewport();
      await expect(
        dialog.getByRole("button", { name: "Close Leaderboard" }),
      ).toBeInViewport();
    } else {
      await dialog.screenshot({
        path: "verification/community-20261010-leaderboard-preview.png",
      });
    }
    evidence.push({
      width,
      title,
      ownRowVisible: await dialog
        .locator('[aria-current="true"]')
        .evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.bottom <= innerHeight;
        }),
    });
    expect(evidence.at(-1).ownRowVisible).toBe(true);
    await page.close();
  }
  await fs.writeFile(
    "verification/community-20261010-supplement.json",
    JSON.stringify(
      {
        revision: "0a70ee015e72e4ad0811275873824acf534fdbee",
        build: "L6_UVBkhRCCF2R1ZEMLam",
        checkedAt: new Date().toISOString(),
        scope:
          "Production Chrome; controlled SDK/iframe; DOM contrast and keyboard scroll, not physical or screen-reader acceptance.",
        evidence,
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify(evidence));
} finally {
  await browser.close();
}
