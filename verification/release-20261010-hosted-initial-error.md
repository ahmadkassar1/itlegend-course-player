# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: real-content.spec.ts >> real Arabic content and local surfaces retain accessibility and 200% text reflow
- Location: tests\e2e\real-content.spec.ts:394:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://itlegend-course-player-taupe.vercel.app/", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=f14e1]:
  - link "Skip to content" [ref=f14e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=f14e3]:
    - banner [ref=f14e4]:
      - link "Video Library" [ref=f14e5] [cursor=pointer]:
        - /url: /
      - navigation "Library sections" [ref=f14e9]:
        - link "Explore videos" [ref=f14e10] [cursor=pointer]:
          - /url: "#courses"
        - link "Ali Shahin on YouTube ↗" [ref=f14e11] [cursor=pointer]:
          - /url: https://www.youtube.com/@AliShahin
    - main [ref=f14e12]:
      - region [ref=f14e13]:
        - generic [ref=f14e14]:
          - paragraph [ref=f14e15]: Published videos. Your own progress.
          - heading "Learn with Ali Shahin." [level=1] [ref=f14e16]
          - paragraph [ref=f14e17]: Watch the original videos, keep useful notes, and put one idea into practice.
          - link "Find your next course" [ref=f14e18] [cursor=pointer]:
            - /url: "#courses"
          - paragraph [ref=f14e21]: 6 published videos · Original YouTube titles & thumbnails
        - generic [ref=f14e22]:
          - paragraph [ref=f14e23]: A good place to begin
          - heading "كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك" [level=2] [ref=f14e28]
          - paragraph [ref=f14e29]: 0 of 3 learning steps completed
          - link "Start learning" [ref=f14e31] [cursor=pointer]:
            - /url: /courses/webology?lesson=study-check
      - region "Your learning summary" [ref=f14e34]:
        - generic [ref=f14e35]:
          - strong [ref=f14e36]: "0"
          - text: in progress
        - generic [ref=f14e37]:
          - strong [ref=f14e38]: "0"
          - text: study plans completed
        - generic [ref=f14e39]:
          - strong [ref=f14e40]: "0"
          - text: learning steps completed
        - paragraph [ref=f14e41]: Progress saved on this device when available
      - region [ref=f14e42]:
        - generic [ref=f14e43]:
          - generic [ref=f14e44]:
            - paragraph [ref=f14e45]: Learn by doing
            - heading "Explore the videos" [level=2] [ref=f14e46]
          - generic [ref=f14e47]: 6 published videos
        - generic [ref=f14e48]:
          - generic [ref=f14e49]:
            - generic [ref=f14e50]: Search videos
            - searchbox "Search videos" [ref=f14e51]
          - generic [ref=f14e53]:
            - generic [ref=f14e54]: Learning status
            - combobox "Learning status" [ref=f14e56] [cursor=pointer]:
              - generic [ref=f14e57]: All statuses
          - generic [ref=f14e62]:
            - generic [ref=f14e63]: Sort by
            - combobox "Sort by" [ref=f14e65] [cursor=pointer]:
              - generic [ref=f14e66]: Featured order
        - group "Filter by topic" [ref=f14e70]:
          - button "All topics" [pressed] [ref=f14e72] [cursor=pointer]
          - button "Web foundations" [ref=f14e73] [cursor=pointer]
          - button "Computer science" [ref=f14e74] [cursor=pointer]
          - button "Programming" [ref=f14e75] [cursor=pointer]
          - button "Learning habits" [ref=f14e76] [cursor=pointer]
        - status "Video results" [ref=f14e78]: 6 videos to explore
        - generic [ref=f14e79]:
          - article [ref=f14e80]:
            - 'img "YouTube thumbnail: كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك" [ref=f14e82]'
            - generic [ref=f14e83]:
              - generic [ref=f14e84]: Web foundations
              - paragraph [ref=f14e85]:
                - text: Ali Shahin
                - generic [aria-hidden] [ref=f14e86]: ·
                - text: 1 video · 2 site exercises
              - heading "كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك" [level=3] [ref=f14e87]
              - paragraph [ref=f14e88]: Understand DNS, networks and what happens when a browser opens a website.
              - generic [ref=f14e89]:
                - generic [ref=f14e90]: Not started
                - generic [ref=f14e91]: 0%
              - paragraph [ref=f14e92]: 0 of 3 learning steps completed
              - progressbar "كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك progress" [ref=f14e93]
              - link "Start كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك" [ref=f14e94] [cursor=pointer]:
                - /url: /courses/webology?lesson=study-check
                - text: Watch & learn
          - article [ref=f14e97]:
            - 'img "YouTube thumbnail: مكونات الكمبيوتر | مقدمة في علوم الحاسب" [ref=f14e99]'
            - generic [ref=f14e100]:
              - generic [ref=f14e101]: Computer science
              - paragraph [ref=f14e102]:
                - text: Ali Shahin
                - generic [aria-hidden] [ref=f14e103]: ·
                - text: 1 video · 2 site exercises
              - heading "مكونات الكمبيوتر | مقدمة في علوم الحاسب" [level=3] [ref=f14e104]
              - paragraph [ref=f14e105]: Explore how computers work before moving into programming and problem solving.
              - generic [ref=f14e106]:
                - generic [ref=f14e107]: Not started
                - generic [ref=f14e108]: 0%
              - paragraph [ref=f14e109]: 0 of 3 learning steps completed
              - progressbar "مكونات الكمبيوتر | مقدمة في علوم الحاسب progress" [ref=f14e110]
              - link "Start مكونات الكمبيوتر | مقدمة في علوم الحاسب" [ref=f14e111] [cursor=pointer]:
                - /url: /courses/computer-science
                - text: Watch & learn
          - article [ref=f14e114]:
            - 'img "YouTube thumbnail: لغة c++ من مخترعها ؟ و كيف تطورت ؟" [ref=f14e116]'
            - generic [ref=f14e117]:
              - generic [ref=f14e118]: Programming
              - paragraph [ref=f14e119]:
                - text: Ali Shahin
                - generic [aria-hidden] [ref=f14e120]: ·
                - text: 1 video · 2 site exercises
              - heading "لغة c++ من مخترعها ؟ و كيف تطورت ؟" [level=3] [ref=f14e121]
              - paragraph [ref=f14e122]: Build programming foundations through Ali Shahin’s Arabic C++ course.
              - generic [ref=f14e123]:
                - generic [ref=f14e124]: Not started
                - generic [ref=f14e125]: 0%
              - paragraph [ref=f14e126]: 0 of 3 learning steps completed
              - progressbar "لغة c++ من مخترعها ؟ و كيف تطورت ؟ progress" [ref=f14e127]
              - link "Start لغة c++ من مخترعها ؟ و كيف تطورت ؟" [ref=f14e128] [cursor=pointer]:
                - /url: /courses/cpp-foundations
                - text: Watch & learn
          - article [ref=f14e131]:
            - 'img "YouTube thumbnail: الحل النهائي للنجاة في عصر ال AI" [ref=f14e133]'
            - generic [ref=f14e134]:
              - generic [ref=f14e135]: Learning habits
              - paragraph [ref=f14e136]:
                - text: Ali Shahin
                - generic [aria-hidden] [ref=f14e137]: ·
                - text: 1 video · 2 site exercises
              - heading "الحل النهائي للنجاة في عصر ال AI" [level=3] [ref=f14e138]
              - paragraph [ref=f14e139]: Ali Shahin’s published discussion of learning in the age of AI.
              - generic [ref=f14e140]:
                - generic [ref=f14e141]: Not started
                - generic [ref=f14e142]: 0%
              - paragraph [ref=f14e143]: 0 of 3 learning steps completed
              - progressbar "الحل النهائي للنجاة في عصر ال AI progress" [ref=f14e144]
              - link "Start الحل النهائي للنجاة في عصر ال AI" [ref=f14e145] [cursor=pointer]:
                - /url: /courses/learning-skills
                - text: Watch & learn
          - article [ref=f14e148]:
            - 'img "YouTube thumbnail: علوم الحاسب و مجالاتها" [ref=f14e150]'
            - generic [ref=f14e151]:
              - generic [ref=f14e152]: Computer science
              - paragraph [ref=f14e153]:
                - text: Ali Shahin
                - generic [aria-hidden] [ref=f14e154]: ·
                - text: 1 video · 2 site exercises
              - heading "علوم الحاسب و مجالاتها" [level=3] [ref=f14e155]
              - paragraph [ref=f14e156]: Explore the fields of computer science and how they connect to programming.
              - generic [ref=f14e157]:
                - generic [ref=f14e158]: Not started
                - generic [ref=f14e159]: 0%
              - paragraph [ref=f14e160]: 0 of 3 learning steps completed
              - progressbar "علوم الحاسب و مجالاتها progress" [ref=f14e161]
              - link "Start علوم الحاسب و مجالاتها" [ref=f14e162] [cursor=pointer]:
                - /url: /courses/computer-science-fields
                - text: Watch & learn
          - article [ref=f14e165]:
            - 'img "YouTube thumbnail: مقدمة عن البرمجة" [ref=f14e167]'
            - generic [ref=f14e168]:
              - generic [ref=f14e169]: Programming
              - paragraph [ref=f14e170]:
                - text: Ali Shahin
                - generic [aria-hidden] [ref=f14e171]: ·
                - text: 1 video · 2 site exercises
              - heading "مقدمة عن البرمجة" [level=3] [ref=f14e172]
              - paragraph [ref=f14e173]: Start with the idea of programming before choosing a language or writing code.
              - generic [ref=f14e174]:
                - generic [ref=f14e175]: Not started
                - generic [ref=f14e176]: 0%
              - paragraph [ref=f14e177]: 0 of 3 learning steps completed
              - progressbar "مقدمة عن البرمجة progress" [ref=f14e178]
              - link "Start مقدمة عن البرمجة" [ref=f14e179] [cursor=pointer]:
                - /url: /courses/programming-introduction
                - text: Watch & learn
    - contentinfo [ref=f14e182]:
      - generic [ref=f14e183]:
        - paragraph [ref=f14e184]: Videos by Ali Shahin. Your notes and exercise results stay on this device.
        - status "Learning storage status" [ref=f14e185]: Progress and drafts are saved on this device.
        - button "Clear my learning data" [ref=f14e186] [cursor=pointer]
  - alert [ref=f14e187]
```

# Test source

```ts
  301 |   });
  302 | }
  303 |
  304 | test("unavailable SDK retains native playback, source fallback and explicit completion", async ({
  305 |   page,
  306 | }) => {
  307 |   await page.route("https://www.youtube.com/iframe_api", (route) =>
  308 |     route.abort(),
  309 |   );
  310 |   await page.goto("/courses/webology");
  311 |   await expect(
  312 |     page
  313 |       .getByRole("status")
  314 |       .filter({ hasText: "Automatic progress is unavailable" }),
  315 |   ).toBeVisible();
  316 |   await expect(page.locator("[data-player-frame] iframe")).toHaveCount(1);
  317 |   await expect(
  318 |     page.getByRole("link", { name: "Watch on YouTube ↗", exact: true }).first(),
  319 |   ).toHaveAttribute("href", "https://www.youtube.com/watch?v=1fSAAzrxK6E");
  320 |   await page
  321 |     .getByRole("button", { name: "I watched this video", exact: true })
  322 |     .click();
  323 |   await expect(page.getByRole("progressbar")).toHaveAttribute(
  324 |     "aria-valuenow",
  325 |     "33",
  326 |   );
  327 | });
  328 |
  329 | test("clearing learning data requires confirmation and restores an empty real-content baseline", async ({
  330 |   page,
  331 | }) => {
  332 |   await page.goto("/courses/webology");
  333 |   await page
  334 |     .getByRole("button", { name: "I watched this video", exact: true })
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
> 401 |       if (state === "catalogue" || state === "empty") await page.goto("/");
      |                                                                  ^ Error: page.goto: Test timeout of 30000ms exceeded.
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
  417 |       if (state === "pdf" || state === "exam")
  418 |         await expect(page.getByRole("dialog")).toHaveCSS("opacity", "1");
  419 |       await page.addScriptTag({
  420 |         path: path.join(process.cwd(), "node_modules/axe-core/axe.min.js"),
  421 |       });
  422 |       const scan = await page.evaluate(async () => {
  423 |         const engine = (window as unknown as { axe: typeof axe }).axe;
  424 |         return engine.run(document, {
  425 |           runOnly: {
  426 |             type: "tag",
  427 |             values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
  428 |           },
  429 |         });
  430 |       });
  431 |       results.push({
  432 |         width,
  433 |         state,
  434 |         violations: scan.violations,
  435 |         incomplete: scan.incomplete,
  436 |       });
  437 |       expect(scan.violations, `${state} ${width}`).toEqual([]);
  438 |     }
  439 |     await page.goto("/");
  440 |     await page.addStyleTag({ content: "html{font-size:200%}" });
  441 |     expect(
  442 |       await page.evaluate(
  443 |         () =>
  444 |           document.documentElement.scrollWidth <=
  445 |           document.documentElement.clientWidth + 1,
  446 |       ),
  447 |     ).toBe(true);
  448 |     await page.goto("/courses/webology");
  449 |     await page.addStyleTag({ content: "html{font-size:200%}" });
  450 |     expect(
  451 |       await page.evaluate(
  452 |         () =>
  453 |           document.documentElement.scrollWidth <=
  454 |           document.documentElement.clientWidth + 1,
  455 |       ),
  456 |     ).toBe(true);
  457 |   }
  458 |   await fs.writeFile(
  459 |     capturePath("real-content-axe").replace(/\.png$/, ".json"),
  460 |     JSON.stringify(results, null, 2),
  461 |   );
  462 | });
  463 |
```