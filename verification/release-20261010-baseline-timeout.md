# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: baseline.spec.ts >> responsive baseline preserves order and avoids horizontal overflow
- Location: tests\e2e\baseline.spec.ts:135:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.scrollIntoViewIfNeeded: Test timeout of 30000ms exceeded.
Call log:
  - attempting scroll into view action
    - waiting for element to be stable

```

# Page snapshot

```yaml
- generic [active] [ref=f32e1]:
  - link "Skip to content" [ref=f32e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=f32e3]:
    - banner [ref=f32e4]:
      - link "Course Library" [ref=f32e5] [cursor=pointer]:
        - /url: /
      - generic [ref=f32e9]: Learn at your own pace
    - main [ref=f32e10]:
      - region [ref=f32e11]:
        - paragraph [ref=f32e12]: A little progress, every day
        - heading "Your next lesson starts here." [level=1] [ref=f32e13]
        - paragraph [ref=f32e14]: Explore a new subject or pick up where you left off. A clear path, practical lessons, and room to grow.
      - region [ref=f32e15]:
        - generic [ref=f32e16]:
          - heading "Explore your courses" [level=2] [ref=f32e17]
          - generic [ref=f32e18]: 6 courses
        - generic [ref=f32e19]:
          - article [ref=f32e20]:
            - generic [ref=f32e21]:
              - img "Illustration for Starting SEO as your Home Based Business" [ref=f32e22]
              - generic [ref=f32e23]: Business
            - generic [ref=f32e24]:
              - paragraph [ref=f32e25]:
                - text: Edward Norton
                - generic [aria-hidden] [ref=f32e26]: ·
                - text: 8 lessons
              - heading "Starting SEO as your Home Based Business" [level=2] [ref=f32e27]
              - paragraph [ref=f32e28]: Take the first steps toward your home-based business with a clear, guided learning path.
              - generic [ref=f32e29]:
                - generic [ref=f32e30]: In progress
                - generic [ref=f32e31]: 63%
              - progressbar "Starting SEO as your Home Based Business progress" [ref=f32e32]
              - link "Continue Starting SEO as your Home Based Business" [ref=f32e34] [cursor=pointer]:
                - /url: /courses/starting-seo
                - text: Continue Course
          - article [ref=f32e37]:
            - generic [ref=f32e38]:
              - img "Illustration for Web Design Foundations" [ref=f32e39]
              - generic [ref=f32e40]: Design
            - generic [ref=f32e41]:
              - paragraph [ref=f32e42]:
                - text: Ana Patel
                - generic [aria-hidden] [ref=f32e43]: ·
                - text: 6 lessons
              - heading "Web Design Foundations" [level=2] [ref=f32e44]
              - paragraph [ref=f32e45]: Shape thoughtful layouts with typography, color and a clear visual hierarchy.
              - generic [ref=f32e46]:
                - generic [ref=f32e47]: Not started
                - generic [ref=f32e48]: 0%
              - progressbar "Web Design Foundations progress" [ref=f32e49]
              - link "Start Web Design Foundations" [ref=f32e50] [cursor=pointer]:
                - /url: /courses/web-design-foundations
                - text: Start Course
          - article [ref=f32e53]:
            - generic [ref=f32e54]:
              - img "Illustration for JavaScript Essentials" [ref=f32e55]
              - generic [ref=f32e56]: Development
            - generic [ref=f32e57]:
              - paragraph [ref=f32e58]:
                - text: Marcus Chen
                - generic [aria-hidden] [ref=f32e59]: ·
                - text: 8 lessons
              - heading "JavaScript Essentials" [level=2] [ref=f32e60]
              - paragraph [ref=f32e61]: Build confidence with the language behind interactive websites.
              - generic [ref=f32e62]:
                - generic [ref=f32e63]: In progress
                - generic [ref=f32e64]: 38%
              - progressbar "JavaScript Essentials progress" [ref=f32e65]
              - link "Continue JavaScript Essentials" [ref=f32e67] [cursor=pointer]:
                - /url: /courses/javascript-essentials
                - text: Continue Course
          - article [ref=f32e70]:
            - generic [ref=f32e71]:
              - 'img "Illustration for Responsive CSS: From Mobile to Desktop" [ref=f32e72]'
              - generic [ref=f32e73]: Development
            - generic [ref=f32e74]:
              - paragraph [ref=f32e75]:
                - text: Sofia Reyes
                - generic [aria-hidden] [ref=f32e76]: ·
                - text: 7 lessons
              - 'heading "Responsive CSS: From Mobile to Desktop" [level=2] [ref=f32e77]'
              - paragraph [ref=f32e78]: Create flexible interfaces that feel comfortable on every screen.
              - generic [ref=f32e79]:
                - generic [ref=f32e80]: Not started
                - generic [ref=f32e81]: 0%
              - 'progressbar "Responsive CSS: From Mobile to Desktop progress" [ref=f32e82]'
              - 'link "Start Responsive CSS: From Mobile to Desktop" [ref=f32e83] [cursor=pointer]':
                - /url: /courses/responsive-css
                - text: Start Course
          - article [ref=f32e86]:
            - generic [ref=f32e87]:
              - img "Illustration for Building with React Components" [ref=f32e88]
              - generic [ref=f32e89]: Development
            - generic [ref=f32e90]:
              - paragraph [ref=f32e91]:
                - text: Daniel Kim
                - generic [aria-hidden] [ref=f32e92]: ·
                - text: 10 lessons
              - heading "Building with React Components" [level=2] [ref=f32e93]
              - paragraph [ref=f32e94]: Connect reusable components, thoughtful state and real user interactions.
              - generic [ref=f32e95]:
                - generic [ref=f32e96]: In progress
                - generic [ref=f32e97]: 70%
              - progressbar "Building with React Components progress" [ref=f32e98]
              - link "Continue Building with React Components" [ref=f32e100] [cursor=pointer]:
                - /url: /courses/react-components
                - text: Continue Course
          - article [ref=f32e103]:
            - generic [ref=f32e104]:
              - img "Illustration for Accessible Interfaces" [ref=f32e105]
              - generic [ref=f32e106]: Accessibility
            - generic [ref=f32e107]:
              - paragraph [ref=f32e108]:
                - text: Maya Johnson
                - generic [aria-hidden] [ref=f32e109]: ·
                - text: 6 lessons
              - heading "Accessible Interfaces" [level=2] [ref=f32e110]
              - paragraph [ref=f32e111]: Make your work easier to use with semantics, keyboard support and readable content.
              - generic [ref=f32e112]:
                - generic [ref=f32e113]: Completed
                - generic [ref=f32e114]: 100%
              - progressbar "Accessible Interfaces progress" [ref=f32e115]
              - link "Continue Accessible Interfaces" [ref=f32e117] [cursor=pointer]:
                - /url: /courses/accessible-interfaces
                - text: Continue Course
    - contentinfo [ref=f32e120]:
      - generic [ref=f32e121]:
        - paragraph [ref=f32e122]: Demo courses with fictional learners and original practice resources.
        - status [ref=f32e123]: Progress and drafts are saved on this device.
        - button "Reset demo learning data" [ref=f32e124] [cursor=pointer]
  - alert [ref=f32e125]
```

# Test source

```ts
  1  | import { expect, type Page } from "@playwright/test";
  2  |
  3  | export function capturePath(name: string) {
  4  |   // Default reruns keep dated milestone captures untouched.
  5  |   return `verification/${process.env.VERIFICATION_MILESTONE ?? "local-current"}-${name}.png`;
  6  | }
  7  |
  8  | export async function prepareScreenshot(page: Page) {
  9  |   await page.evaluate(() => document.fonts.ready);
  10 |   for (const bar of await page.getByRole("progressbar").all()) {
> 11 |     await bar.scrollIntoViewIfNeeded();
     |               ^ Error: locator.scrollIntoViewIfNeeded: Test timeout of 30000ms exceeded.
  12 |     await expect
  13 |       .poll(() =>
  14 |         bar.evaluate((element) => {
  15 |           const fill = element.firstElementChild!;
  16 |           const target = Number(element.getAttribute("aria-valuenow")) / 100;
  17 |           return (
  18 |             Math.abs(
  19 |               fill.getBoundingClientRect().width -
  20 |                 element.getBoundingClientRect().width * target,
  21 |             ) < 1
  22 |           );
  23 |         }),
  24 |       )
  25 |       .toBe(true);
  26 |   }
  27 |   // Full-page capture alone does not load images below the browser viewport.
  28 |   for (const image of await page.locator("img").all()) {
  29 |     await image.scrollIntoViewIfNeeded();
  30 |   }
  31 |   await expect
  32 |     .poll(() =>
  33 |       page
  34 |         .locator("img")
  35 |         .evaluateAll((images) =>
  36 |           images.every(
  37 |             (image) =>
  38 |               (image as HTMLImageElement).complete &&
  39 |               (image as HTMLImageElement).naturalWidth > 0,
  40 |           ),
  41 |         ),
  42 |     )
  43 |     .toBe(true);
  44 |   await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  45 | }
  46 |
```