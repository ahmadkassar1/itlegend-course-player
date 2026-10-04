import { expect, type Page } from "@playwright/test";

export function capturePath(name: string) {
  // Default reruns keep dated milestone captures untouched.
  return `verification/${process.env.VERIFICATION_MILESTONE ?? "local-current"}-${name}.png`;
}

export async function prepareScreenshot(page: Page) {
  for (const bar of await page.getByRole("progressbar").all()) {
    await bar.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        bar.evaluate((element) => {
          const fill = element.firstElementChild!;
          const target = Number(element.getAttribute("aria-valuenow")) / 100;
          return (
            Math.abs(
              fill.getBoundingClientRect().width -
                element.getBoundingClientRect().width * target,
            ) < 1
          );
        }),
      )
      .toBe(true);
  }
  // Full-page capture alone does not load images below the browser viewport.
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
  }
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
}
