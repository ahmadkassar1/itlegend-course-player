import { controlYouTube } from "./helpers/youtube";
import { expect, test, type Locator, type Page } from "@playwright/test";
import { capturePath, prepareScreenshot } from "./helpers/capture";

test.beforeEach(async ({ page }) => {
  await controlYouTube(page);
});

const viewports = [
  [320, 568, true, 2],
  [360, 800, true, 2],
  [375, 667, true, 2],
  [390, 844, true, 3],
  [412, 915, true, 2],
  [430, 932, true, 3],
  [568, 320, true, 2],
  [667, 375, true, 2],
  [844, 390, true, 3],
  [932, 430, true, 3],
  [768, 1024, true, 2],
  [800, 1280, true, 2],
  [820, 1180, true, 2],
  [1024, 1366, true, 2],
  [1024, 768, true, 2],
  [1180, 820, true, 2],
  [1366, 1024, true, 2],
  [767, 900, false, 1],
  [768, 900, false, 1],
  [1023, 900, false, 1],
  [1024, 900, false, 1],
  [1280, 720, false, 1],
  [1305, 1000, false, 1],
  [1440, 900, false, 1],
  [1920, 1080, false, 1],
  [2560, 1440, false, 1],
] as const;

const illustrated = new Set([
  "320x568",
  "390x844",
  "820x1180",
  "1366x1024",
  "1305x1000",
]);

async function fitsViewport(page: Page, container?: Locator) {
  const dimensions = await page.evaluate(() => ({
    available: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.available + 1);
  expect(dimensions.body).toBeLessThanOrEqual(dimensions.available + 1);
  if (container) {
    expect(
      await container.evaluate(
        (element) => element.scrollWidth - element.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
  }
}

for (const [width, height, hasTouch, deviceScaleFactor] of viewports) {
  const size = `${width}x${height}`;
  test.describe(`${size} ${hasTouch ? "touch" : "mouse"} layout`, () => {
    test.use({ viewport: { width, height }, hasTouch, deviceScaleFactor });

    test("catalogue, learner lists and all four dialogs remain usable", async ({
      page,
    }, testInfo) => {
      test.setTimeout(60_000);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      const activate = (control: Locator) =>
        hasTouch ? control.tap() : control.click();
      await page.goto("/");
      await expect(page.locator("article")).toHaveCount(4);
      await fitsViewport(page);
      await page.goto("/courses/webology");
      await expect(page.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        "0",
      );
      await fitsViewport(page);
      const player = (await page
        .getByRole("region", { name: "Current lesson", exact: true })
        .boundingBox())!;
      expect(player.x).toBeGreaterThanOrEqual(0);
      expect(player.x + player.width).toBeLessThanOrEqual(width + 1);
      const comments = page.getByRole("region", {
        name: "Course comments list",
        exact: true,
      });
      await expect(comments.getByRole("listitem")).toHaveCount(0);
      await fitsViewport(page, comments);
      if (illustrated.has(size)) {
        await prepareScreenshot(page);
        await page.screenshot({
          path: capturePath(`device-${size}-player`),
          fullPage: true,
        });
      }

      const dialogMeasurements = [];
      for (const name of ["Ask a question", "Leaderboard", "PDF", "exam"]) {
        if (name === "PDF" || name === "exam") {
          await page.goto(
            `/courses/webology?lesson=${name === "PDF" ? "study-worksheet" : "study-check"}`,
          );
          await activate(
            page.getByRole("button", { name: `Open ${name}`, exact: true }),
          );
        } else {
          await activate(page.getByRole("button", { name, exact: true }));
        }
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        await fitsViewport(page, dialog);
        const box = (await dialog.boundingBox())!;
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.y).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
        expect(box.y + box.height).toBeLessThanOrEqual(height + 1);
        const close = dialog.getByRole("button", { name: /^Close / });
        await expect(close).toBeInViewport();
        if (name === "Leaderboard") {
          const ranking = dialog.getByRole("list", {
            name: "Course leaderboard",
          });
          await expect(ranking.getByRole("listitem")).toHaveCount(1);
          await expect(ranking.locator('[aria-current="true"]')).toContainText(
            "0%",
          );
          await fitsViewport(page, ranking);
          if (illustrated.has(size))
            await page.screenshot({
              path: capturePath(`device-${size}-leaderboard`),
            });
        } else if (name === "Ask a question") {
          await dialog
            .getByRole("textbox", { name: "Write your question" })
            .fill(
              "How can I check the title and links on my service page? كيف أراجع الصفحة؟",
            );
          await activate(
            dialog.getByRole("button", {
              name: "Submit Question",
              exact: true,
            }),
          );
          await expect(
            dialog
              .getByRole("region", { name: "Saved question list" })
              .getByRole("listitem")
              .first(),
          ).toContainText("How can I check");
          await fitsViewport(page, dialog);
          await expect(close).toBeInViewport();
        }
        dialogMeasurements.push({ name, box });
        await activate(close);
        await expect(page.getByRole("dialog")).toHaveCount(0);
      }
      expect(errors).toEqual([]);
      await testInfo.attach("viewport measurements", {
        body: JSON.stringify(
          {
            width,
            height,
            hasTouch,
            deviceScaleFactor,
            player,
            dialogs: dialogMeasurements,
          },
          null,
          2,
        ),
        contentType: "application/json",
      });
    });
  });
}
