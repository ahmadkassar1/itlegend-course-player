import { expect, test } from "@playwright/test";

test("mobile course markers preserve their value and do not cover section titles or lessons", async ({
  page,
}) => {
  const externalFontRequests: string[] = [];
  page.on("request", (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url()))
      externalFontRequests.push(request.url());
  });
  for (const width of [320, 430]) {
    await page.setViewportSize({ width, height: 932 });
    for (const [slug, value] of [
      ["web-design-foundations", 0],
      ["starting-seo", 63],
      ["accessible-interfaces", 100],
    ] as const) {
      await page.goto(`/courses/${slug}`);
      await page.evaluate(() => document.fonts.ready);
      const bar = page.getByRole("progressbar", { name: "Course completion" });
      await expect(bar).toHaveAttribute("aria-valuenow", String(value));
      const section = page.locator("#curriculum section").first();
      const marker = section.locator("[data-section-progress]");
      await expect(marker).toBeVisible();
      await expect(marker).toHaveText(`You${value}%`);
      const bounds = await section.boundingBox();
      const bubble = await marker.locator("span").boundingBox();
      const percentage = await marker.locator("small").boundingBox();
      const title = await section.getByRole("heading").boundingBox();
      const firstLesson = await section.locator("li").first().boundingBox();
      expect(bubble!.y).toBeGreaterThanOrEqual(title!.y + title!.height);
      expect(percentage!.y + percentage!.height).toBeLessThanOrEqual(
        firstLesson!.y,
      );
      for (const box of [bubble!, percentage!]) {
        expect(box.x).toBeGreaterThanOrEqual(bounds!.x);
        expect(box.x + box.width).toBeLessThanOrEqual(
          bounds!.x + bounds!.width,
        );
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/courses/starting-seo");
  await expect(page.locator("[data-section-progress]")).toBeHidden();
  expect(externalFontRequests).toEqual([]);
});
