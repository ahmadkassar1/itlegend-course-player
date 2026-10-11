import { expect, test } from "@playwright/test";
import { controlYouTube } from "./helpers/youtube";
import { capturePath } from "./helpers/capture";

for (const [width, height] of [
  [320, 568],
  [390, 844],
  [568, 320],
  [667, 375],
  [360, 500],
  [360, 501],
  [767, 900],
  [768, 900],
  [1440, 900],
]) {
  test.describe(`player and comments at ${width}×${height}`, () => {
    test.use({ viewport: { width, height }, hasTouch: width < 768 });

    test("deep links, completion and comment controls remain unobstructed", async ({
      page,
    }, testInfo) => {
      await controlYouTube(page);
      await page.goto("/courses/webology#comments");
      const player = page.getByRole("region", {
        name: "Current lesson",
        exact: true,
      });
      const heading = page.getByRole("heading", {
        name: "Comments",
        exact: true,
      });
      await expect(page.locator("[data-player-frame] iframe")).toBeVisible();
      await expect(heading).toBeInViewport();
      const sticky = width < 768 && height > 500 && width / height < 3 / 4;
      if (sticky) {
        await expect
          .poll(async () => {
            const frame = (await player.boundingBox())!;
            const title = (await heading.boundingBox())!;
            return title.y >= frame.y + frame.height;
          })
          .toBe(true);
        expect((await player.boundingBox())!.y).toBe(0);
      } else {
        await expect(player).toHaveCSS("position", "static");
      }

      // Exercise normal browser scrolling and hit testing, without forced clicks
      // or manually positioning controls below a sticky overlay.
      const comment = page.getByRole("textbox", { name: "Write a comment" });
      await comment.fill("The mobile player leaves room to read and reply.");
      await page.getByRole("button", { name: "Submit Review" }).click();
      await expect(
        page
          .getByRole("region", { name: "Course comments list" })
          .getByRole("listitem")
          .first(),
      ).toContainText("leaves room to read");
      await page
        .getByRole("button", { name: "I watched this video", exact: true })
        .click();
      await expect(page.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        "33",
      );
      await page.getByRole("link", { name: "Jump to curriculum" }).click();
      const curriculum = page.getByRole("heading", {
        name: "Topics for This Course",
      });
      await expect(curriculum).toBeInViewport();
      if (sticky) {
        const frame = (await player.boundingBox())!;
        expect((await curriculum.boundingBox())!.y).toBeGreaterThanOrEqual(
          frame.y + frame.height,
        );
        await expect(
          page.getByRole("link", { name: "Watch on YouTube ↗", exact: true }),
        ).not.toBeInViewport();
      }
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true);
      await testInfo.attach("layout", {
        body: JSON.stringify({
          width,
          height,
          sticky,
          player: await player.boundingBox(),
          heading: await curriculum.boundingBox(),
        }),
        contentType: "application/json",
      });
      if (width === 320 || (width === 568 && height === 320)) {
        await page.getByRole("link", { name: "Jump to comments" }).click();
        await expect(heading).toBeInViewport();
        await expect
          .poll(() =>
            page
              .locator("#comments")
              .evaluate((element) =>
                Math.abs(
                  element.getBoundingClientRect().top -
                    parseFloat(getComputedStyle(element).scrollMarginTop),
                ),
              ),
          )
          .toBeLessThan(2);
        await page.screenshot({
          path: capturePath(`mobile-comments-${width}`),
        });
      }
    });
  });
}
