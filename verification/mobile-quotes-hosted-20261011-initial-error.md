# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-player.spec.ts >> player and comments at 360×500 >> deep links, completion and comment controls remain unobstructed
- Location: tests\e2e\mobile-player.spec.ts:19:9

# Error details

```
Error: expect(locator).toBeInViewport() failed

Locator:  getByRole('heading', { name: 'Topics for This Course' })
Expected: in viewport
Received: viewport ratio 0
Timeout:  5000ms

Call log:
  - Expect "toBeInViewport" getByRole('heading', { name: 'Topics for This Course' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Topics for This Course' })
    14 × locator resolved to <h2 id="curriculum-heading">Topics for This Course</h2>
       - unexpected value "viewport ratio 0"

```

```yaml
- heading "Topics for This Course" [level=2]
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { controlYouTube } from "./helpers/youtube";
  3   | import { capturePath } from "./helpers/capture";
  4   | 
  5   | for (const [width, height] of [
  6   |   [320, 568],
  7   |   [390, 844],
  8   |   [568, 320],
  9   |   [667, 375],
  10  |   [360, 500],
  11  |   [360, 501],
  12  |   [767, 900],
  13  |   [768, 900],
  14  |   [1440, 900],
  15  | ]) {
  16  |   test.describe(`player and comments at ${width}×${height}`, () => {
  17  |     test.use({ viewport: { width, height }, hasTouch: width < 768 });
  18  | 
  19  |     test("deep links, completion and comment controls remain unobstructed", async ({
  20  |       page,
  21  |     }, testInfo) => {
  22  |       await controlYouTube(page);
  23  |       await page.goto("/courses/webology#comments");
  24  |       const player = page.getByRole("region", {
  25  |         name: "Current lesson",
  26  |         exact: true,
  27  |       });
  28  |       const heading = page.getByRole("heading", {
  29  |         name: "Comments",
  30  |         exact: true,
  31  |       });
  32  |       await expect(page.locator("[data-player-frame] iframe")).toBeVisible();
  33  |       await expect(heading).toBeInViewport();
  34  |       const sticky = width < 768 && height > 500 && width / height < 3 / 4;
  35  |       if (sticky) {
  36  |         await expect
  37  |           .poll(async () => {
  38  |             const frame = (await player.boundingBox())!;
  39  |             const title = (await heading.boundingBox())!;
  40  |             return title.y >= frame.y + frame.height;
  41  |           })
  42  |           .toBe(true);
  43  |         expect((await player.boundingBox())!.y).toBe(0);
  44  |       } else {
  45  |         await expect(player).toHaveCSS("position", "static");
  46  |       }
  47  | 
  48  |       // Exercise normal browser scrolling and hit testing, without forced clicks
  49  |       // or manually positioning controls below a sticky overlay.
  50  |       const comment = page.getByRole("textbox", { name: "Write a comment" });
  51  |       await comment.fill("The mobile player leaves room to read and reply.");
  52  |       await page.getByRole("button", { name: "Submit Review" }).click();
  53  |       await expect(
  54  |         page
  55  |           .getByRole("region", { name: "Course comments list" })
  56  |           .getByRole("listitem")
  57  |           .first(),
  58  |       ).toContainText("leaves room to read");
  59  |       await page
  60  |         .getByRole("button", { name: "I watched this video", exact: true })
  61  |         .click();
  62  |       await expect(page.getByRole("progressbar")).toHaveAttribute(
  63  |         "aria-valuenow",
  64  |         "33",
  65  |       );
  66  |       await page.getByRole("link", { name: "Jump to curriculum" }).click();
  67  |       const curriculum = page.getByRole("heading", {
  68  |         name: "Topics for This Course",
  69  |       });
> 70  |       await expect(curriculum).toBeInViewport();
      |                                ^ Error: expect(locator).toBeInViewport() failed
  71  |       if (sticky) {
  72  |         const frame = (await player.boundingBox())!;
  73  |         expect((await curriculum.boundingBox())!.y).toBeGreaterThanOrEqual(
  74  |           frame.y + frame.height,
  75  |         );
  76  |         await expect(
  77  |           page.getByRole("link", { name: "Watch on YouTube ↗", exact: true }),
  78  |         ).not.toBeInViewport();
  79  |       }
  80  |       expect(
  81  |         await page.evaluate(
  82  |           () =>
  83  |             document.documentElement.scrollWidth <=
  84  |             document.documentElement.clientWidth,
  85  |         ),
  86  |       ).toBe(true);
  87  |       await testInfo.attach("layout", {
  88  |         body: JSON.stringify({
  89  |           width,
  90  |           height,
  91  |           sticky,
  92  |           player: await player.boundingBox(),
  93  |           heading: await curriculum.boundingBox(),
  94  |         }),
  95  |         contentType: "application/json",
  96  |       });
  97  |       if (width === 320 || (width === 568 && height === 320)) {
  98  |         await page.getByRole("link", { name: "Jump to comments" }).click();
  99  |         await expect(heading).toBeInViewport();
  100 |         await expect
  101 |           .poll(() =>
  102 |             page
  103 |               .locator("#comments")
  104 |               .evaluate((element) =>
  105 |                 Math.abs(
  106 |                   element.getBoundingClientRect().top -
  107 |                     parseFloat(getComputedStyle(element).scrollMarginTop),
  108 |                 ),
  109 |               ),
  110 |           )
  111 |           .toBeLessThan(2);
  112 |         await page.screenshot({
  113 |           path: capturePath(`mobile-comments-${width}`),
  114 |         });
  115 |       }
  116 |     });
  117 |   });
  118 | }
  119 | 
```