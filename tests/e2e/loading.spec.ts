import { expect, test } from "@playwright/test";

for (const width of [430, 1440]) {
  test(`media and document payloads wait for intent at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width === 430 ? 932 : 1000 });
    const requests: string[] = [];
    const errors: string[] = [];
    page.on("request", (request) => requests.push(request.url()));
    page.on("pageerror", (error) => errors.push(error.message));
    const mediaRequests = () =>
      requests.filter((url) => url.includes("introduction.webm"));
    const documentRequests = () =>
      requests.filter(
        (url) =>
          url.includes("resources%2Fstarting-seo") ||
          url.includes("/resources/starting-seo"),
      );

    await page.goto("/courses/starting-seo");
    await page
      .getByRole("button", { name: "Ask a question", exact: true })
      .click();
    await expect(page.getByRole("dialog").getByRole("textbox")).toBeVisible();
    expect(mediaRequests()).toEqual([]);
    expect(documentRequests()).toEqual([]);
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: /^Play / }).click();
    await expect.poll(() => mediaRequests().length).toBeGreaterThan(0);
    await expect
      .poll(() =>
        page
          .locator("video")
          .evaluate((video: HTMLVideoElement) => video.currentTime),
      )
      .toBeGreaterThan(0);
    expect(documentRequests()).toEqual([]);

    await page.goto("/courses/starting-seo?lesson=reference-files");
    await expect(
      page.getByRole("button", { name: "Open PDF", exact: true }),
    ).toBeVisible();
    expect(documentRequests()).toEqual([]);
    await page.getByRole("button", { name: "Open PDF", exact: true }).click();
    const image = page.getByRole("dialog").getByRole("img");
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    expect(
      documentRequests().some((url) => url.includes("/_next/image?")),
    ).toBe(true);
    // Original PDF bytes are fetched only through its explicit link, never as a hidden preload.
    expect(documentRequests().some((url) => url.endsWith(".pdf"))).toBe(false);
    expect(errors).toEqual([]);
  });
}
