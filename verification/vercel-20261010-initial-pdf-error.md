# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: real-content.spec.ts >> real Arabic content and local surfaces retain accessibility and 200% text reflow
- Location: tests\e2e\real-content.spec.ts:394:5

# Error details

```
Error: pdf 320

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 60

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=axeAPI",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f5f9fa",
+               "colorParse": undefined,
+               "contrastRatio": 3.8,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#6f837a",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+               "shadowColor": undefined,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.8 (foreground color: #6f837a, background color: #f5f9fa, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"dialogs-module__qksrwq__pdf\">",
+                 "target": Array [
+                   ".dialogs-module__qksrwq__pdf",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.8 (foreground color: #6f837a, background color: #f5f9fa, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<label for=\"_r_1_\">Page size</label>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"_r_1_\"]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
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
      - paragraph [ref=f3e131]: Sample discussion for this video. Names and comments are fictional; your own posts stay on this device and are not posted to YouTube.
      - region "Course comments list" [ref=f3e132]:
        - list [ref=f3e133]:
          - listitem [ref=f3e134]:
            - generic [ref=f3e135]:
              - heading "Mariam Hassan Sample" [level=3] [ref=f3e136]:
                - text: Mariam Hassan
                - generic [ref=f3e137]: Sample
              - time [ref=f3e138]: Oct 10, 2026
              - paragraph [ref=f3e139]: شرح الـ DNS خلّاني أفهم أخيراً إزاي اسم الموقع بيوصلنا للسيرفر. رسم الخطوات في ورقة ساعدني أرتّب الفكرة.
          - listitem [ref=f3e140]:
            - generic [ref=f3e141]:
              - heading "Omar Nabil Sample" [level=3] [ref=f3e142]:
                - text: Omar Nabil
                - generic [ref=f3e143]: Sample
              - time [ref=f3e144]: Oct 9, 2026
              - paragraph [ref=f3e145]: جزء الـ cache مهم جداً. هجرّب أغيّر DNS على جهاز تجريبي وأقارن نتيجة البحث قبل وبعد.
          - listitem [ref=f3e146]:
            - generic [ref=f3e147]:
              - heading "Nour Adel Sample" [level=3] [ref=f3e148]:
                - text: Nour Adel
                - generic [ref=f3e149]: Sample
              - time [ref=f3e150]: Oct 8, 2026
              - paragraph [ref=f3e151]: كنت بخلط بين الدومين والاستضافة. دلوقتي عندي صورة أوضح، ولسه محتاجة أراجع خطوات حل اسم الدومين مرة كمان.
      - generic [ref=f3e152]:
        - generic [ref=f3e153]: Write a comment
        - textbox "Write a comment" [ref=f3e154]
        - paragraph [ref=f3e155]: Maximum 2,000 characters.
        - button "Submit Review" [ref=f3e156] [cursor=pointer]
      - group [ref=f3e159]:
        - generic "Related videos from Ali Shahin" [ref=f3e160] [cursor=pointer]
    - dialog [ref=f3e161]:
      - generic [ref=f3e162]:
        - heading "Study worksheet · Site exercise" [active] [level=2] [ref=f3e164]
        - button "Close Study worksheet · Site exercise" [ref=f3e165] [cursor=pointer]:
          - generic [aria-hidden] [ref=f3e166]: ×
      - generic [ref=f3e168]:
        - generic [ref=f3e169]:
          - generic [ref=f3e170]:
            - generic [ref=f3e171]: Page size
            - combobox "PDF page size" [ref=f3e173] [cursor=pointer]:
              - generic [ref=f3e174]: Fit width
          - link "Open original PDF (new tab)" [ref=f3e178] [cursor=pointer]:
            - /url: /resources/learning-plan.pdf
            - text: Open original PDF
            - generic [ref=f3e179]: (new tab)
          - button "Mark read" [ref=f3e180] [cursor=pointer]
        - region "PDF document page" [ref=f3e181]:
          - img "Page 1 of Your learning plan. Full text is available below." [ref=f3e183]
        - group [ref=f3e184]:
          - generic "Read worksheet as text" [ref=f3e185] [cursor=pointer]
  - alert [ref=f3e186]
```

# Test source

```ts
  335 |     .click();
  336 |   await page
  337 |     .getByRole("textbox", { name: "Write a comment" })
  338 |     .fill("My saved note");
  339 |   await page.goto("/");
  340 |   page.once("dialog", (dialog) => dialog.dismiss());
  341 |   await page.getByRole("button", { name: "Clear my learning data" }).click();
  342 |   await expect(page.getByLabel("Your learning summary")).toContainText(
  343 |     "1 learning steps completed",
  344 |   );
  345 |   page.once("dialog", (dialog) => dialog.accept());
  346 |   await page.getByRole("button", { name: "Clear my learning data" }).click();
  347 |   await page.reload();
  348 |   await expect(page.getByLabel("Your learning summary")).toContainText(
  349 |     "0 learning steps completed",
  350 |   );
  351 |   await page.goto("/courses/webology");
  352 |   await expect(
  353 |     page.getByRole("textbox", { name: "Write a comment" }),
  354 |   ).toHaveValue("");
  355 |   await expect(page.getByRole("progressbar")).toHaveAttribute(
  356 |     "aria-valuenow",
  357 |     "0",
  358 |   );
  359 | });
  360 |
  361 | test("related videos use original titles, intent-loaded native player and modal focus return", async ({
  362 |   page,
  363 | }) => {
  364 |   await page.goto("/courses/webology");
  365 |   await page
  366 |     .getByText("Related videos from Ali Shahin", { exact: true })
  367 |     .click();
  368 |   const preview = page.getByRole("button", {
  369 |     name: "Preview مقدمة في علوم الحاسب",
  370 |     exact: true,
  371 |   });
  372 |   await preview.click();
  373 |   const dialog = page.getByRole("dialog");
  374 |   await expect(dialog.getByRole("heading", { level: 3 })).toHaveText(
  375 |     videoReferences[1].videoTitle,
  376 |   );
  377 |   await expect(dialog.locator("iframe")).toHaveCount(0);
  378 |   await dialog.getByRole("button", { name: "Load YouTube player" }).click();
  379 |   await expect(dialog.locator("iframe")).toHaveAttribute(
  380 |     "src",
  381 |     /embed\/2mySUIR9k20/,
  382 |   );
  383 |   await expect(
  384 |     dialog.getByRole("link", { name: "Watch on YouTube ↗", exact: true }),
  385 |   ).toHaveAttribute("href", courses[1].sourceURL!);
  386 |   await page.keyboard.press("Escape");
  387 |   await expect(preview).toBeFocused();
  388 |   await expect(page.getByRole("progressbar")).toHaveAttribute(
  389 |     "aria-valuenow",
  390 |     "0",
  391 |   );
  392 | });
  393 |
  394 | test("real Arabic content and local surfaces retain accessibility and 200% text reflow", async ({
  395 |   page,
  396 | }) => {
  397 |   const results: unknown[] = [];
  398 |   for (const width of [320, 1440]) {
  399 |     await page.setViewportSize({ width, height: 900 });
  400 |     for (const state of ["catalogue", "player", "pdf", "exam", "empty"]) {
  401 |       if (state === "catalogue" || state === "empty") await page.goto("/");
  402 |       else
  403 |         await page.goto(
  404 |           `/courses/webology${state === "pdf" ? "?lesson=study-worksheet" : state === "exam" ? "?lesson=study-check" : ""}`,
  405 |         );
  406 |       if (state === "empty")
  407 |         await page
  408 |           .getByLabel("Search videos", { exact: true })
  409 |           .fill("no matching video");
  410 |       if (state === "pdf" || state === "exam")
  411 |         await page
  412 |           .getByRole("button", {
  413 |             name: state === "pdf" ? "Open PDF" : "Open exam",
  414 |             exact: true,
  415 |           })
  416 |           .click();
  417 |       await page.addScriptTag({
  418 |         path: path.join(process.cwd(), "node_modules/axe-core/axe.min.js"),
  419 |       });
  420 |       const scan = await page.evaluate(async () => {
  421 |         const engine = (window as unknown as { axe: typeof axe }).axe;
  422 |         return engine.run(document, {
  423 |           runOnly: {
  424 |             type: "tag",
  425 |             values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
  426 |           },
  427 |         });
  428 |       });
  429 |       results.push({
  430 |         width,
  431 |         state,
  432 |         violations: scan.violations,
  433 |         incomplete: scan.incomplete,
  434 |       });
> 435 |       expect(scan.violations, `${state} ${width}`).toEqual([]);
      |                                                    ^ Error: pdf 320
  436 |     }
  437 |     await page.goto("/");
  438 |     await page.addStyleTag({ content: "html{font-size:200%}" });
  439 |     expect(
  440 |       await page.evaluate(
  441 |         () =>
  442 |           document.documentElement.scrollWidth <=
  443 |           document.documentElement.clientWidth + 1,
  444 |       ),
  445 |     ).toBe(true);
  446 |     await page.goto("/courses/webology");
  447 |     await page.addStyleTag({ content: "html{font-size:200%}" });
  448 |     expect(
  449 |       await page.evaluate(
  450 |         () =>
  451 |           document.documentElement.scrollWidth <=
  452 |           document.documentElement.clientWidth + 1,
  453 |       ),
  454 |     ).toBe(true);
  455 |   }
  456 |   await fs.writeFile(
  457 |     capturePath("real-content-axe").replace(/\.png$/, ".json"),
  458 |     JSON.stringify(results, null, 2),
  459 |   );
  460 | });
  461 |
```
