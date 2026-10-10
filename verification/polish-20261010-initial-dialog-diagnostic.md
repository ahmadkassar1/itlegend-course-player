# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: device-layout.spec.ts >> 320x568 touch layout >> catalogue, learner lists and all four dialogs remain usable
- Location: tests\e2e\device-layout.spec.ts:68:9

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 569
Received:    569.3742065429688
```

# Page snapshot

```yaml
- generic [ref=f3e1]:
  - link "Skip to content" [ref=f3e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=f3e3]:
    - generic [ref=f3e4]:
      - navigation "Breadcrumb" [ref=f3e5]:
        - list [ref=f3e6]:
          - listitem [ref=f3e7]:
            - link "Home" [ref=f3e8] [cursor=pointer]:
              - /url: /
          - listitem [ref=f3e9]:
            - link "Courses" [ref=f3e12] [cursor=pointer]:
              - /url: /
          - listitem [ref=f3e13]:
            - generic [ref=f3e16]: Course Details
      - heading "كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك" [level=1] [ref=f3e17]
  - main [ref=f3e18]:
    - region "Current lesson" [ref=f3e19]:
      - heading "Study worksheet · Site exercise" [level=2] [ref=f3e20]
      - generic [ref=f3e21]:
        - img "YouTube thumbnail for the selected video" [ref=f3e22]
        - button "Open PDF" [ref=f3e23] [cursor=pointer]
      - paragraph [ref=f3e26]: An original note-taking worksheet created for this site, not a creator download.
    - navigation "Course sections" [ref=f3e27]:
      - link "Jump to curriculum" [ref=f3e28] [cursor=pointer]:
        - /url: "#curriculum"
      - link "Jump to comments" [ref=f3e32] [cursor=pointer]:
        - /url: "#comments"
      - button "Ask a question" [ref=f3e35] [cursor=pointer]
      - button "Leaderboard" [ref=f3e39] [cursor=pointer]
    - region [ref=f3e42]:
      - heading "Course Materials" [level=2] [ref=f3e43]
      - generic [ref=f3e44]:
        - generic [ref=f3e45]:
          - term [ref=f3e46]: "Instructor:"
          - definition [ref=f3e50]: Ali Shahin
        - generic [ref=f3e51]:
          - term [ref=f3e52]: "Videos:"
          - definition [ref=f3e56]: "1"
        - generic [ref=f3e57]:
          - term [ref=f3e58]: "Source:"
          - definition [ref=f3e62]: YouTube
        - generic [ref=f3e63]:
          - term [ref=f3e64]: "Exercises:"
          - definition [ref=f3e67]: 2 site exercises
        - generic [ref=f3e68]:
          - term [ref=f3e69]: "Language:"
          - definition [ref=f3e73]: Arabic
      - paragraph [ref=f3e74]:
        - link "Original video ↗" [ref=f3e75] [cursor=pointer]:
          - /url: https://www.youtube.com/watch?v=1fSAAzrxK6E
        - text: ·
        - link "Creator’s full collection ↗" [ref=f3e76] [cursor=pointer]:
          - /url: https://www.youtube.com/playlist?list=PLv3VqjyehAoQfMw4RrfoP0fy8BBB--ABv
    - complementary [ref=f3e77]:
      - heading "Topics for This Course" [level=2] [ref=f3e78]
      - generic [ref=f3e79]:
        - progressbar "Course completion" [ref=f3e80]
        - paragraph [ref=f3e81]: Getting started · 0 of 3 lessons completed
      - generic [ref=f3e82]:
        - generic [ref=f3e83]:
          - heading [level=3] [ref=f3e84]:
            - button "Ali Shahin · YouTube" [expanded] [ref=f3e85] [cursor=pointer]
          - generic [ref=f3e87]:
            - generic [aria-hidden] [ref=f3e89]:
              - generic [ref=f3e90]: You
              - generic [ref=f3e91]: 0%
            - list [ref=f3e92]:
              - listitem [ref=f3e93]:
                - link "كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك Not completed" [ref=f3e94] [cursor=pointer]:
                  - /url: /courses/webology?lesson=1fSAAzrxK6E
                  - generic [ref=f3e97]: كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك
                  - generic "Not completed — available to study" [ref=f3e98]
                  - generic [ref=f3e102]: Not completed
        - generic [ref=f3e103]:
          - heading [level=3] [ref=f3e104]:
            - button "Your study practice" [expanded] [ref=f3e105] [cursor=pointer]
          - list [ref=f3e108]:
            - listitem [ref=f3e109]:
              - link "Study worksheet · Site exercise Current lesson Not completed" [ref=f3e110] [cursor=pointer]:
                - /url: /courses/webology?lesson=study-worksheet
                - generic [ref=f3e113]:
                  - text: Study worksheet · Site exercise
                  - generic [ref=f3e114]: Current lesson
                - generic "Not completed — available to study" [ref=f3e115]
                - generic [ref=f3e119]: Not completed
            - listitem [ref=f3e120]:
              - link "Study skills check · Site exercise 5 QUESTIONS 10 MINUTES Not completed" [ref=f3e121] [cursor=pointer]:
                - /url: /courses/webology?lesson=study-check
                - generic [ref=f3e124]: Study skills check · Site exercise
                - generic [ref=f3e125]:
                  - generic [ref=f3e126]: 5 QUESTIONS
                  - generic [ref=f3e127]: 10 MINUTES
                - generic [ref=f3e128]: Not completed
    - region [ref=f3e129]:
      - heading "Comments" [level=2] [ref=f3e130]
      - paragraph [ref=f3e131]: No comments yet. Your comments are saved locally and are not posted to YouTube.
      - region "Course comments list":
        - list
      - generic [ref=f3e132]:
        - generic [ref=f3e133]: Write a comment
        - textbox "Write a comment" [ref=f3e134]
        - paragraph [ref=f3e135]: Maximum 2,000 characters.
        - button "Submit Review" [ref=f3e136] [cursor=pointer]
      - group [ref=f3e139]:
        - generic "Related videos from Ali Shahin" [ref=f3e140] [cursor=pointer]
    - dialog [ref=f3e141]:
      - generic [ref=f3e142]:
        - heading "Study worksheet · Site exercise" [active] [level=2] [ref=f3e144]
        - button "Close Study worksheet · Site exercise" [ref=f3e145] [cursor=pointer]:
          - generic [aria-hidden] [ref=f3e146]: ×
      - generic [ref=f3e148]:
        - generic [ref=f3e149]:
          - generic [ref=f3e150]:
            - generic [ref=f3e151]: Page size
            - combobox "PDF page size" [ref=f3e153] [cursor=pointer]:
              - generic [ref=f3e154]: Fit width
              - generic [aria-hidden] [ref=f3e155]: ⌄
          - link "Open original PDF (new tab)" [ref=f3e156] [cursor=pointer]:
            - /url: /resources/learning-plan.pdf
            - text: Open original PDF
            - generic [ref=f3e157]: (new tab)
          - button "Mark read" [ref=f3e158] [cursor=pointer]
        - region "PDF document page" [ref=f3e159]:
          - img "Page 1 of Your learning plan. Full text is available below." [ref=f3e161]
        - group [ref=f3e162]:
          - generic "Read worksheet as text" [ref=f3e163] [cursor=pointer]
  - alert [ref=f3e164]
```

# Test source

```ts
  35  |   [2560, 1440, false, 1],
  36  | ] as const;
  37  | 
  38  | const illustrated = new Set([
  39  |   "320x568",
  40  |   "390x844",
  41  |   "820x1180",
  42  |   "1366x1024",
  43  |   "1305x1000",
  44  | ]);
  45  | 
  46  | async function fitsViewport(page: Page, container?: Locator) {
  47  |   const dimensions = await page.evaluate(() => ({
  48  |     available: document.documentElement.clientWidth,
  49  |     document: document.documentElement.scrollWidth,
  50  |     body: document.body.scrollWidth,
  51  |   }));
  52  |   expect(dimensions.document).toBeLessThanOrEqual(dimensions.available + 1);
  53  |   expect(dimensions.body).toBeLessThanOrEqual(dimensions.available + 1);
  54  |   if (container) {
  55  |     expect(
  56  |       await container.evaluate(
  57  |         (element) => element.scrollWidth - element.clientWidth,
  58  |       ),
  59  |     ).toBeLessThanOrEqual(1);
  60  |   }
  61  | }
  62  | 
  63  | for (const [width, height, hasTouch, deviceScaleFactor] of viewports) {
  64  |   const size = `${width}x${height}`;
  65  |   test.describe(`${size} ${hasTouch ? "touch" : "mouse"} layout`, () => {
  66  |     test.use({ viewport: { width, height }, hasTouch, deviceScaleFactor });
  67  | 
  68  |     test("catalogue, learner lists and all four dialogs remain usable", async ({
  69  |       page,
  70  |     }, testInfo) => {
  71  |       test.setTimeout(60_000);
  72  |       const errors: string[] = [];
  73  |       page.on("pageerror", (error) => errors.push(error.message));
  74  |       page.on("console", (message) => {
  75  |         if (message.type() === "error") errors.push(message.text());
  76  |       });
  77  |       const activate = async (control: Locator) => {
  78  |         if (hasTouch) {
  79  |           // Centre-scrolling can place a tap beneath the sticky native player
  80  |           // on a short screen. Bring the control into the exposed lower area.
  81  |           await control.evaluate((element) =>
  82  |             element.scrollIntoView({ block: "end", behavior: "instant" }),
  83  |           );
  84  |           await control.tap();
  85  |         } else await control.click();
  86  |       };
  87  |       await page.goto("/");
  88  |       await expect(page.locator("article")).toHaveCount(4);
  89  |       await fitsViewport(page);
  90  |       await page.goto("/courses/webology");
  91  |       await expect(page.locator("[data-player-frame] iframe")).toBeVisible();
  92  |       await expect(page.getByRole("progressbar")).toHaveAttribute(
  93  |         "aria-valuenow",
  94  |         "0",
  95  |       );
  96  |       await fitsViewport(page);
  97  |       const player = (await page
  98  |         .getByRole("region", { name: "Current lesson", exact: true })
  99  |         .boundingBox())!;
  100 |       expect(player.x).toBeGreaterThanOrEqual(0);
  101 |       expect(player.x + player.width).toBeLessThanOrEqual(width + 1);
  102 |       const comments = page.getByRole("region", {
  103 |         name: "Course comments list",
  104 |         exact: true,
  105 |       });
  106 |       await expect(comments.getByRole("listitem")).toHaveCount(0);
  107 |       await fitsViewport(page, comments);
  108 |       if (illustrated.has(size)) {
  109 |         await prepareScreenshot(page);
  110 |         await page.screenshot({
  111 |           path: capturePath(`device-${size}-player`),
  112 |           fullPage: true,
  113 |         });
  114 |       }
  115 | 
  116 |       const dialogMeasurements = [];
  117 |       for (const name of ["Ask a question", "Leaderboard", "PDF", "exam"]) {
  118 |         if (name === "PDF" || name === "exam") {
  119 |           await page.goto(
  120 |             `/courses/webology?lesson=${name === "PDF" ? "study-worksheet" : "study-check"}`,
  121 |           );
  122 |           await activate(
  123 |             page.getByRole("button", { name: `Open ${name}`, exact: true }),
  124 |           );
  125 |         } else {
  126 |           await activate(page.getByRole("button", { name, exact: true }));
  127 |         }
  128 |         const dialog = page.getByRole("dialog");
  129 |         await expect(dialog).toBeVisible();
  130 |         await fitsViewport(page, dialog);
  131 |         const box = (await dialog.boundingBox())!;
  132 |         expect(box.x).toBeGreaterThanOrEqual(0);
  133 |         expect(box.y).toBeGreaterThanOrEqual(0);
  134 |         expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
> 135 |         expect(box.y + box.height).toBeLessThanOrEqual(height + 1);
      |                                    ^ Error: expect(received).toBeLessThanOrEqual(expected)
  136 |         const close = dialog.getByRole("button", { name: /^Close / });
  137 |         await expect(close).toBeInViewport();
  138 |         if (name === "Leaderboard") {
  139 |           const ranking = dialog.getByRole("list", {
  140 |             name: "Course leaderboard",
  141 |           });
  142 |           await expect(ranking.getByRole("listitem")).toHaveCount(1);
  143 |           await expect(ranking.locator('[aria-current="true"]')).toContainText(
  144 |             "0%",
  145 |           );
  146 |           await fitsViewport(page, ranking);
  147 |           if (illustrated.has(size))
  148 |             await page.screenshot({
  149 |               path: capturePath(`device-${size}-leaderboard`),
  150 |             });
  151 |         } else if (name === "Ask a question") {
  152 |           await dialog
  153 |             .getByRole("textbox", { name: "Write your question" })
  154 |             .fill(
  155 |               "How can I check the title and links on my service page? كيف أراجع الصفحة؟",
  156 |             );
  157 |           await activate(
  158 |             dialog.getByRole("button", {
  159 |               name: "Submit Question",
  160 |               exact: true,
  161 |             }),
  162 |           );
  163 |           await expect(
  164 |             dialog
  165 |               .getByRole("region", { name: "Saved question list" })
  166 |               .getByRole("listitem")
  167 |               .first(),
  168 |           ).toContainText("How can I check");
  169 |           await fitsViewport(page, dialog);
  170 |           await expect(close).toBeInViewport();
  171 |         }
  172 |         dialogMeasurements.push({ name, box });
  173 |         await activate(close);
  174 |         await expect(page.getByRole("dialog")).toHaveCount(0);
  175 |       }
  176 |       expect(errors).toEqual([]);
  177 |       await testInfo.attach("viewport measurements", {
  178 |         body: JSON.stringify(
  179 |           {
  180 |             width,
  181 |             height,
  182 |             hasTouch,
  183 |             deviceScaleFactor,
  184 |             player,
  185 |             dialogs: dialogMeasurements,
  186 |           },
  187 |           null,
  188 |           2,
  189 |         ),
  190 |         contentType: "application/json",
  191 |       });
  192 |     });
  193 |   });
  194 | }
  195 | 
```