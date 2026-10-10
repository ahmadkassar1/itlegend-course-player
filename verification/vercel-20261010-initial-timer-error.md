# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demo-community.spec.ts >> encouragement types, rotates at 4.5 seconds, pauses and cleans up at 320px
- Location: tests\e2e\demo-community.spec.ts:39:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - navigation "Breadcrumb" [ref=e5]:
        - list [ref=e6]:
          - listitem [ref=e7]:
            - link "Home" [ref=e8] [cursor=pointer]:
              - /url: /
          - listitem [ref=e9]:
            - link "Courses" [ref=e12] [cursor=pointer]:
              - /url: /
          - listitem [ref=e13]:
            - generic [ref=e16]: Course Details
      - heading "كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك" [level=1] [ref=e17]
  - main [ref=e18]:
    - region "Current lesson" [ref=e19]:
      - heading "كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك" [level=2] [ref=e20]
      - iframe [ref=e23]:
        - generic [ref=f1e1]:
          - button "Play video" [ref=f1e2]
          - paragraph [ref=f1e3]: Controlled iframe response for integration checks.
      - generic [ref=e24]:
        - link "Watch on YouTube ↗" [ref=e25] [cursor=pointer]:
          - /url: https://www.youtube.com/watch?v=1fSAAzrxK6E
        - button "I watched this video" [ref=e26] [cursor=pointer]
      - paragraph [ref=e27]: Completion is saved on this device when the video ends, or when you mark it watched.
    - navigation "Course sections" [ref=e28]:
      - link "Jump to curriculum" [ref=e29] [cursor=pointer]:
        - /url: "#curriculum"
      - link "Jump to comments" [ref=e33] [cursor=pointer]:
        - /url: "#comments"
      - button "Ask a question" [ref=e36] [cursor=pointer]
      - button "Leaderboard" [ref=e40] [cursor=pointer]
    - region [ref=e43]:
      - heading "Course Materials" [level=2] [ref=e44]
      - generic [ref=e45]:
        - generic [ref=e46]:
          - term [ref=e47]: "Instructor:"
          - definition [ref=e51]: Ali Shahin
        - generic [ref=e52]:
          - term [ref=e53]: "Videos:"
          - definition [ref=e57]: "1"
        - generic [ref=e58]:
          - term [ref=e59]: "Source:"
          - definition [ref=e63]: YouTube
        - generic [ref=e64]:
          - term [ref=e65]: "Exercises:"
          - definition [ref=e68]: 2 site exercises
        - generic [ref=e69]:
          - term [ref=e70]: "Language:"
          - definition [ref=e74]: Arabic
      - paragraph [ref=e75]:
        - link "Original video ↗" [ref=e76] [cursor=pointer]:
          - /url: https://www.youtube.com/watch?v=1fSAAzrxK6E
        - text: ·
        - link "Creator’s full collection ↗" [ref=e77] [cursor=pointer]:
          - /url: https://www.youtube.com/playlist?list=PLv3VqjyehAoQfMw4RrfoP0fy8BBB--ABv
    - complementary [ref=e78]:
      - heading "Topics for This Course" [level=2] [ref=e79]
      - generic [ref=e80]:
        - progressbar "Course completion" [ref=e81]
        - paragraph [ref=e82]: Getting started · 0 of 3 lessons completed
      - generic [ref=e83]:
        - generic [ref=e84]:
          - heading [level=3] [ref=e85]:
            - button "Ali Shahin · YouTube" [expanded] [ref=e86] [cursor=pointer]
          - generic [ref=e88]:
            - generic [aria-hidden] [ref=e90]:
              - generic [ref=e91]: You
              - generic [ref=e92]: 0%
            - list [ref=e93]:
              - listitem [ref=e94]:
                - link "كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك Current lesson Not completed" [ref=e95] [cursor=pointer]:
                  - /url: /courses/webology?lesson=1fSAAzrxK6E
                  - generic [ref=e98]:
                    - text: كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك
                    - generic [ref=e99]: Current lesson
                  - generic "Not completed — available to study" [ref=e100]
                  - generic [ref=e104]: Not completed
        - heading [level=3] [ref=e106]:
          - button "Your study practice" [ref=e107] [cursor=pointer]
    - region [ref=e110]:
      - heading "Comments" [level=2] [ref=e111]
      - paragraph [ref=e112]: Sample discussion for this video. Names and comments are fictional; your own posts stay on this device and are not posted to YouTube.
      - region "Course comments list" [ref=e113]:
        - list [ref=e114]:
          - listitem [ref=e115]:
            - generic [ref=e116]:
              - heading "Mariam Hassan Sample" [level=3] [ref=e117]:
                - text: Mariam Hassan
                - generic [ref=e118]: Sample
              - time [ref=e119]: Oct 10, 2026
              - paragraph [ref=e120]: شرح الـ DNS خلّاني أفهم أخيراً إزاي اسم الموقع بيوصلنا للسيرفر. رسم الخطوات في ورقة ساعدني أرتّب الفكرة.
          - listitem [ref=e121]:
            - generic [ref=e122]:
              - heading "Omar Nabil Sample" [level=3] [ref=e123]:
                - text: Omar Nabil
                - generic [ref=e124]: Sample
              - time [ref=e125]: Oct 9, 2026
              - paragraph [ref=e126]: جزء الـ cache مهم جداً. هجرّب أغيّر DNS على جهاز تجريبي وأقارن نتيجة البحث قبل وبعد.
          - listitem [ref=e127]:
            - generic [ref=e128]:
              - heading "Nour Adel Sample" [level=3] [ref=e129]:
                - text: Nour Adel
                - generic [ref=e130]: Sample
              - time [ref=e131]: Oct 8, 2026
              - paragraph [ref=e132]: كنت بخلط بين الدومين والاستضافة. دلوقتي عندي صورة أوضح، ولسه محتاجة أراجع خطوات حل اسم الدومين مرة كمان.
      - generic [ref=e133]:
        - generic [ref=e134]: Write a comment
        - textbox "Write a comment" [ref=e135]
        - paragraph [ref=e136]: Maximum 2,000 characters.
        - button "Submit Review" [ref=e137] [cursor=pointer]
      - group [ref=e140]:
        - generic "Related videos from Ali Shahin" [ref=e141] [cursor=pointer]
    - dialog [ref=e142]:
      - generic [ref=e143]:
        - generic [ref=e144]:
          - paragraph [ref=e145]: كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك
          - heading "Leaderboard" [active] [level=2] [ref=e146]
        - button "Close Leaderboard" [ref=e147] [cursor=pointer]:
          - generic [aria-hidden] [ref=e148]: ×
      - generic [ref=e150]:
        - region "Study encouragement" [ref=e151]:
          - paragraph [ref=e152]:
            - generic [ref=e153]: ابدأ بأول درس يا صديقي، وكل خطوة صغيرة بتفرق. يلا نبدأ 💪
          - button "Pause messages" [ref=e156] [cursor=pointer]
        - paragraph [ref=e159]: Sample leaderboard
        - list "Course leaderboard" [ref=e160]:
          - listitem [ref=e161]:
            - generic [ref=e162]:
              - generic [ref=e163]: Rank
              - text: "1"
            - generic [ref=e164]:
              - text: Mariam Hassan
              - generic [ref=e165]: Sample learner
            - generic [ref=e166]:
              - text: 100%
              - generic [ref=e167]: 3/3 lessons
          - listitem [ref=e168]:
            - generic [ref=e169]:
              - generic [ref=e170]: Rank
              - text: "2"
            - generic [ref=e171]:
              - text: Nour Adel
              - generic [ref=e172]: Sample learner
            - generic [ref=e173]:
              - text: 67%
              - generic [ref=e174]: 2/3 lessons
          - listitem [ref=e175]:
            - generic [ref=e176]:
              - generic [ref=e177]: Rank
              - text: "2"
            - generic [ref=e178]:
              - text: Omar Nabil
              - generic [ref=e179]: Sample learner
            - generic [ref=e180]:
              - text: 67%
              - generic [ref=e181]: 2/3 lessons
          - listitem [ref=e182]:
            - generic [ref=e183]:
              - generic [ref=e184]: Rank
              - text: "4"
            - generic [ref=e185]:
              - text: Youssef Sami
              - generic [ref=e186]: Sample learner
            - generic [ref=e187]:
              - text: 33%
              - generic [ref=e188]: 1/3 lessons
          - listitem [ref=e189]:
            - generic [ref=e190]:
              - generic [ref=e191]: Rank
              - text: "5"
            - generic [ref=e192]:
              - text: You
              - generic [ref=e193]: Your activity
            - generic [ref=e194]:
              - text: 0%
              - generic [ref=e195]: 0/3 lessons
  - alert [ref=e196]
```

# Test source

```ts
  1   | import path from "node:path";
  2   | import fs from "node:fs/promises";
  3   | import type axe from "axe-core";
  4   | import { expect, test, type Page } from "@playwright/test";
  5   | import { courses } from "../../src/data/courses";
  6   | import { motivationalMessages } from "../../src/data/motivation";
  7   | import { controlYouTube } from "./helpers/youtube";
  8   | import { capturePath } from "./helpers/capture";
  9   |
  10  | test.beforeEach(async ({ page }) => {
  11  |   await controlYouTube(page);
  12  | });
  13  |
  14  | async function scan(page: Page, name: string) {
  15  |   await page.addScriptTag({
  16  |     path: path.resolve("node_modules/axe-core/axe.min.js"),
  17  |   });
  18  |   const result = await page.evaluate(async () =>
  19  |     (window as typeof window & { axe: typeof axe }).axe.run(document, {
  20  |       runOnly: {
  21  |         type: "tag",
  22  |         values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"],
  23  |       },
  24  |     }),
  25  |   );
  26  |   await fs.writeFile(
  27  |     capturePath(`${name}-axe`).replace(/\.png$/, ".json"),
  28  |     JSON.stringify(result, null, 2),
  29  |   );
  30  |   expect(
  31  |     result.violations.map(({ id, nodes }) => ({
  32  |       id,
  33  |       targets: nodes.map((node) => node.target),
  34  |     })),
  35  |   ).toEqual([]);
  36  | }
  37  |
  38  | for (const width of [320, 1440]) {
  39  |   test(`encouragement types, rotates at 4.5 seconds, pauses and cleans up at ${width}px`, async ({
  40  |     page,
  41  |   }) => {
  42  |     await page.setViewportSize({ width, height: width === 320 ? 568 : 1000 });
  43  |     await page.goto("/courses/webology");
  44  |     await expect(page.locator("[data-player-frame] iframe")).toBeVisible();
  45  |     const errors: string[] = [];
  46  |     page.on("pageerror", (error) => errors.push(error.message));
  47  |     const start = new Date("2026-10-10T12:00:00Z");
  48  |     await page.clock.install({ time: start });
  49  |     await page.clock.pauseAt(new Date(start.getTime() + 1000));
  50  |     const trigger = page.getByRole("button", {
  51  |       name: "Leaderboard",
  52  |       exact: true,
  53  |     });
  54  |     await trigger.click();
  55  |     const dialog = page.getByRole("dialog");
  56  |     const visibleText = dialog.locator("[data-motivation-text]");
  57  |     await page.clock.runFor(600);
  58  |     const partial = await visibleText.textContent();
> 59  |     expect(partial!.length).toBeGreaterThan(0);
      |                             ^ Error: expect(received).toBeGreaterThan(expected)
  60  |     expect(partial!.length).toBeLessThan(
  61  |       motivationalMessages["Getting started"][0].length,
  62  |     );
  63  |     await page.clock.runFor(3850);
  64  |     await expect(visibleText).toHaveText(
  65  |       motivationalMessages["Getting started"][0],
  66  |     );
  67  |     await page.clock.runFor(100);
  68  |     await expect(
  69  |       dialog.getByRole("region", { name: "Study encouragement" }),
  70  |     ).toContainText(motivationalMessages["Getting started"][1]);
  71  |     const pauseButton = dialog.getByRole("button", { name: "Pause messages" });
  72  |     await expect(pauseButton).toHaveText("");
  73  |     await pauseButton.click();
  74  |     await expect(visibleText).toHaveText(
  75  |       motivationalMessages["Getting started"][1],
  76  |     );
  77  |     const pause = dialog.getByRole("button", { name: "Play messages" });
  78  |     await expect(pause).toHaveAccessibleName("Play messages");
  79  |     await page.clock.runFor(9000);
  80  |     await expect(visibleText).toHaveText(
  81  |       motivationalMessages["Getting started"][1],
  82  |     );
  83  |     await expect(dialog.locator("[aria-current=true]")).toContainText("0%");
  84  |     await page.screenshot({ path: capturePath(`leaderboard-${width}`) });
  85  |     await pause.click();
  86  |     await page.clock.runFor(4500);
  87  |     await expect(
  88  |       dialog.getByRole("region", { name: "Study encouragement" }),
  89  |     ).toContainText(motivationalMessages["Getting started"][2]);
  90  |     await page.keyboard.press("Escape");
  91  |     await expect(trigger).toBeFocused();
  92  |     await page.clock.runFor(9000);
  93  |     await trigger.click();
  94  |     await page.clock.runFor(2500);
  95  |     await expect(visibleText).toHaveText(
  96  |       motivationalMessages["Getting started"][0],
  97  |     );
  98  |     await dialog.getByRole("button", { name: "Pause messages" }).click();
  99  |     // Axe uses timers internally; let the clock run while the message remains paused.
  100 |     await page.clock.resume();
  101 |     await scan(page, `leaderboard-${width}`);
  102 |     await page.keyboard.press("Escape");
  103 |     expect(errors).toEqual([]);
  104 |   });
  105 |
  106 |   test(`question confirmation offers working follow-up and discovery actions at ${width}px`, async ({
  107 |     page,
  108 |   }) => {
  109 |     await page.setViewportSize({ width, height: width === 320 ? 568 : 1000 });
  110 |     await page.goto("/courses/webology");
  111 |     await page
  112 |       .getByRole("button", { name: "Ask a question", exact: true })
  113 |       .click();
  114 |     const dialog = page.getByRole("dialog");
  115 |     const input = dialog.getByRole("textbox", { name: "Write your question" });
  116 |     await dialog
  117 |       .getByRole("button", { name: "Submit Question", exact: true })
  118 |       .click();
  119 |     await expect(dialog.getByRole("alert")).toBeVisible();
  120 |     await expect(
  121 |       dialog.getByRole("region", { name: "Question next steps" }),
  122 |     ).toHaveCount(0);
  123 |     await input.fill("How can I inspect the DNS cache on my own computer?");
  124 |     await dialog
  125 |       .getByRole("button", { name: "Submit Question", exact: true })
  126 |       .click();
  127 |     await expect(dialog.getByRole("status")).toHaveText(
  128 |       "Thank you for submitting your question! It will be reviewed soon.",
  129 |     );
  130 |     const next = dialog.getByRole("region", { name: "Question next steps" });
  131 |     await expect(next).toContainText("Review is simulated in this demo");
  132 |     await expect(next).toContainText("saved on this device");
  133 |     await expect(input).toHaveValue("");
  134 |     await next.scrollIntoViewIfNeeded();
  135 |     await page.screenshot({ path: capturePath(`question-success-${width}`) });
  136 |     await scan(page, `question-success-${width}`);
  137 |     await next.getByRole("button", { name: "Ask another question" }).click();
  138 |     await expect(input).toBeFocused();
  139 |     await expect(next).toHaveCount(0);
  140 |     await input.fill("Does changing a DNS resolver affect cached records?");
  141 |     await dialog
  142 |       .getByRole("button", { name: "Submit Question", exact: true })
  143 |       .click();
  144 |     const history = dialog.getByRole("region", { name: "Saved question list" });
  145 |     await expect(history.getByRole("listitem")).toHaveCount(2);
  146 |     await expect(history.getByRole("listitem").first()).toContainText(
  147 |       "changing a DNS resolver",
  148 |     );
  149 |     await next.getByRole("link", { name: "Explore more videos" }).click();
  150 |     await expect(page).toHaveURL(/\/#courses$/);
  151 |     await expect(page.getByRole("dialog")).toHaveCount(0);
  152 |     await expect(page.locator("#courses")).toBeInViewport();
  153 |     expect(await page.evaluate(() => document.body.style.position)).toBe("");
  154 |     await page.goto("/courses/webology");
  155 |     await page
  156 |       .getByRole("button", { name: "Ask a question", exact: true })
  157 |       .click();
  158 |     await expect(history.getByRole("listitem")).toHaveCount(2);
  159 |     await expect(dialog.getByRole("status")).toHaveCount(0);
```
