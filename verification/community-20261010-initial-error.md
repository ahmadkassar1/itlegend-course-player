# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demo-community.spec.ts >> reduced motion shows complete, static encouragement and actual completion selects its level
- Location: tests\e2e\demo-community.spec.ts:161:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Mark watched', exact: true })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
      - generic [ref=e21]:
        - button "Wide mode" [ref=e22] [cursor=pointer]
        - button "Maximize player" [ref=e26] [cursor=pointer]
      - iframe [ref=e31]:
        - generic [ref=f1e1]:
          - button "Play video" [ref=f1e2]
          - paragraph [ref=f1e3]: Controlled iframe response for integration checks.
      - generic [ref=e32]:
        - link "Watch on YouTube ↗" [ref=e33] [cursor=pointer]:
          - /url: https://www.youtube.com/watch?v=1fSAAzrxK6E
        - button "I watched this video" [ref=e34] [cursor=pointer]
      - paragraph [ref=e35]: Completion is saved on this device when the video ends, or when you mark it watched.
    - navigation "Course sections" [ref=e36]:
      - link "Jump to curriculum" [ref=e37] [cursor=pointer]:
        - /url: "#curriculum"
      - link "Jump to comments" [ref=e41] [cursor=pointer]:
        - /url: "#comments"
      - button "Ask a question" [ref=e44] [cursor=pointer]
      - button "Leaderboard" [ref=e48] [cursor=pointer]
    - region [ref=e51]:
      - heading "Course Materials" [level=2] [ref=e52]
      - generic [ref=e53]:
        - generic [ref=e54]:
          - term [ref=e55]: "Instructor:"
          - definition [ref=e59]: Ali Shahin
        - generic [ref=e60]:
          - term [ref=e61]: "Videos:"
          - definition [ref=e65]: "1"
        - generic [ref=e66]:
          - term [ref=e67]: "Source:"
          - definition [ref=e71]: YouTube
        - generic [ref=e72]:
          - term [ref=e73]: "Exercises:"
          - definition [ref=e76]: 2 site exercises
        - generic [ref=e77]:
          - term [ref=e78]: "Language:"
          - definition [ref=e82]: Arabic
      - paragraph [ref=e83]:
        - link "Original video ↗" [ref=e84] [cursor=pointer]:
          - /url: https://www.youtube.com/watch?v=1fSAAzrxK6E
        - text: ·
        - link "Creator’s full collection ↗" [ref=e85] [cursor=pointer]:
          - /url: https://www.youtube.com/playlist?list=PLv3VqjyehAoQfMw4RrfoP0fy8BBB--ABv
    - complementary [ref=e86]:
      - heading "Topics for This Course" [level=2] [ref=e87]
      - generic [ref=e88]:
        - generic [aria-hidden] [ref=e89]:
          - generic [ref=e90]: You
          - generic [ref=e91]: 0%
        - progressbar "Course completion" [ref=e92]
        - paragraph [ref=e93]: Getting started · 0 of 3 lessons completed
      - generic [ref=e94]:
        - generic [ref=e95]:
          - heading [level=3] [ref=e96]:
            - button "Ali Shahin · YouTube" [expanded] [ref=e97] [cursor=pointer]
          - generic [ref=e99]:
            - paragraph [ref=e100]: Published video with its original title and native player.
            - list [ref=e101]:
              - listitem [ref=e102]:
                - link "كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك Current lesson Not completed" [ref=e103] [cursor=pointer]:
                  - /url: /courses/webology?lesson=1fSAAzrxK6E
                  - generic [ref=e106]:
                    - text: كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك
                    - generic [ref=e107]: Current lesson
                  - generic "Not completed — available to study" [ref=e108]
                  - generic [ref=e112]: Not completed
        - generic [ref=e113]:
          - heading [level=3] [ref=e114]:
            - button "Your study practice" [expanded] [ref=e115] [cursor=pointer]
          - generic [ref=e117]:
            - paragraph [ref=e118]: Exercises created for this site, separate from the creator’s published material.
            - list [ref=e119]:
              - listitem [ref=e120]:
                - link "Study worksheet · Site exercise Not completed" [ref=e121] [cursor=pointer]:
                  - /url: /courses/webology?lesson=study-worksheet
                  - generic [ref=e124]: Study worksheet · Site exercise
                  - generic "Not completed — available to study" [ref=e125]
                  - generic [ref=e129]: Not completed
              - listitem [ref=e130]:
                - link "Study skills check · Site exercise 5 QUESTIONS 10 MINUTES Not completed" [ref=e131] [cursor=pointer]:
                  - /url: /courses/webology?lesson=study-check
                  - generic [ref=e134]: Study skills check · Site exercise
                  - generic [ref=e135]:
                    - generic [ref=e136]: 5 QUESTIONS
                    - generic [ref=e137]: 10 MINUTES
                  - generic [ref=e138]: Not completed
    - region [ref=e139]:
      - heading "Comments" [level=2] [ref=e140]
      - paragraph [ref=e141]: Sample discussion for this video. Names and comments are fictional; your own posts stay on this device and are not posted to YouTube.
      - region "Course comments list" [ref=e142]:
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]:
              - heading "Mariam Hassan Sample" [level=3] [ref=e146]:
                - text: Mariam Hassan
                - generic [ref=e147]: Sample
              - time [ref=e148]: Oct 10, 2026
              - paragraph [ref=e149]: شرح الـ DNS خلّاني أفهم أخيراً إزاي اسم الموقع بيوصلنا للسيرفر. رسم الخطوات في ورقة ساعدني أرتّب الفكرة.
          - listitem [ref=e150]:
            - generic [ref=e151]:
              - heading "Omar Nabil Sample" [level=3] [ref=e152]:
                - text: Omar Nabil
                - generic [ref=e153]: Sample
              - time [ref=e154]: Oct 9, 2026
              - paragraph [ref=e155]: جزء الـ cache مهم جداً. هجرّب أغيّر DNS على جهاز تجريبي وأقارن نتيجة البحث قبل وبعد.
          - listitem [ref=e156]:
            - generic [ref=e157]:
              - heading "Nour Adel Sample" [level=3] [ref=e158]:
                - text: Nour Adel
                - generic [ref=e159]: Sample
              - time [ref=e160]: Oct 8, 2026
              - paragraph [ref=e161]: كنت بخلط بين الدومين والاستضافة. دلوقتي عندي صورة أوضح، ولسه محتاجة أراجع خطوات حل اسم الدومين مرة كمان.
      - generic [ref=e162]:
        - generic [ref=e163]: Write a comment
        - textbox "Write a comment" [ref=e164]
        - paragraph [ref=e165]: Maximum 2,000 characters.
        - button "Submit Review" [ref=e166] [cursor=pointer]
      - group [ref=e169]:
        - generic "Related videos from Ali Shahin" [ref=e170] [cursor=pointer]
  - alert [ref=e171]
```

# Test source

```ts
  66  |     );
  67  |     await page.clock.runFor(100);
  68  |     await expect(
  69  |       dialog.getByRole("region", { name: "Study encouragement" }),
  70  |     ).toContainText(motivationalMessages["Getting started"][1]);
  71  |     await dialog.getByRole("button", { name: "Pause encouragement" }).click();
  72  |     await expect(visibleText).toHaveText(
  73  |       motivationalMessages["Getting started"][1],
  74  |     );
  75  |     const pause = dialog.getByRole("button", { name: "Resume encouragement" });
  76  |     await expect(pause).toHaveAttribute("aria-pressed", "true");
  77  |     await page.clock.runFor(9000);
  78  |     await expect(visibleText).toHaveText(
  79  |       motivationalMessages["Getting started"][1],
  80  |     );
  81  |     await expect(dialog.locator("[aria-current=true]")).toContainText("0%");
  82  |     await page.screenshot({ path: capturePath(`leaderboard-${width}`) });
  83  |     await pause.click();
  84  |     await page.clock.runFor(4500);
  85  |     await expect(
  86  |       dialog.getByRole("region", { name: "Study encouragement" }),
  87  |     ).toContainText(motivationalMessages["Getting started"][2]);
  88  |     await page.keyboard.press("Escape");
  89  |     await expect(trigger).toBeFocused();
  90  |     await page.clock.runFor(9000);
  91  |     await trigger.click();
  92  |     await page.clock.runFor(2500);
  93  |     await expect(visibleText).toHaveText(
  94  |       motivationalMessages["Getting started"][0],
  95  |     );
  96  |     await dialog.getByRole("button", { name: "Pause encouragement" }).click();
  97  |     // Axe uses timers internally; let the clock run while the message remains paused.
  98  |     await page.clock.resume();
  99  |     await scan(page, `leaderboard-${width}`);
  100 |     await page.keyboard.press("Escape");
  101 |     expect(errors).toEqual([]);
  102 |   });
  103 | 
  104 |   test(`question confirmation offers working follow-up and discovery actions at ${width}px`, async ({
  105 |     page,
  106 |   }) => {
  107 |     await page.setViewportSize({ width, height: width === 320 ? 568 : 1000 });
  108 |     await page.goto("/courses/webology");
  109 |     await page
  110 |       .getByRole("button", { name: "Ask a question", exact: true })
  111 |       .click();
  112 |     const dialog = page.getByRole("dialog");
  113 |     const input = dialog.getByRole("textbox", { name: "Write your question" });
  114 |     await dialog
  115 |       .getByRole("button", { name: "Submit Question", exact: true })
  116 |       .click();
  117 |     await expect(dialog.getByRole("alert")).toBeVisible();
  118 |     await expect(
  119 |       dialog.getByRole("region", { name: "Question next steps" }),
  120 |     ).toHaveCount(0);
  121 |     await input.fill("How can I inspect the DNS cache on my own computer?");
  122 |     await dialog
  123 |       .getByRole("button", { name: "Submit Question", exact: true })
  124 |       .click();
  125 |     await expect(dialog.getByRole("status")).toHaveText(
  126 |       "Thank you for submitting your question! It will be reviewed soon.",
  127 |     );
  128 |     const next = dialog.getByRole("region", { name: "Question next steps" });
  129 |     await expect(next).toContainText("Review is simulated in this demo");
  130 |     await expect(next).toContainText("saved on this device");
  131 |     await expect(input).toHaveValue("");
  132 |     await next.scrollIntoViewIfNeeded();
  133 |     await page.screenshot({ path: capturePath(`question-success-${width}`) });
  134 |     await scan(page, `question-success-${width}`);
  135 |     await next.getByRole("button", { name: "Ask another question" }).click();
  136 |     await expect(input).toBeFocused();
  137 |     await expect(next).toHaveCount(0);
  138 |     await input.fill("Does changing a DNS resolver affect cached records?");
  139 |     await dialog
  140 |       .getByRole("button", { name: "Submit Question", exact: true })
  141 |       .click();
  142 |     const history = dialog.getByRole("region", { name: "Saved question list" });
  143 |     await expect(history.getByRole("listitem")).toHaveCount(2);
  144 |     await expect(history.getByRole("listitem").first()).toContainText(
  145 |       "changing a DNS resolver",
  146 |     );
  147 |     await next.getByRole("link", { name: "Explore more videos" }).click();
  148 |     await expect(page).toHaveURL(/\/#courses$/);
  149 |     await expect(page.getByRole("dialog")).toHaveCount(0);
  150 |     await expect(page.locator("#courses")).toBeInViewport();
  151 |     expect(await page.evaluate(() => document.body.style.position)).toBe("");
  152 |     await page.goto("/courses/webology");
  153 |     await page
  154 |       .getByRole("button", { name: "Ask a question", exact: true })
  155 |       .click();
  156 |     await expect(history.getByRole("listitem")).toHaveCount(2);
  157 |     await expect(dialog.getByRole("status")).toHaveCount(0);
  158 |   });
  159 | }
  160 | 
  161 | test("reduced motion shows complete, static encouragement and actual completion selects its level", async ({
  162 |   page,
  163 | }) => {
  164 |   await page.emulateMedia({ reducedMotion: "reduce" });
  165 |   await page.goto("/courses/webology");
> 166 |   await page.getByRole("button", { name: "Mark watched", exact: true }).click();
      |                                                                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  167 |   await page.getByRole("button", { name: "Leaderboard", exact: true }).click();
  168 |   const dialog = page.getByRole("dialog");
  169 |   const text = dialog.locator("[data-motivation-text]");
  170 |   await expect(text).toHaveText(motivationalMessages["Building momentum"][0]);
  171 |   await expect(dialog.locator("[aria-current=true]")).toContainText("33%");
  172 |   await expect(
  173 |     dialog.getByRole("button", { name: /encouragement/ }),
  174 |   ).toHaveCount(0);
  175 |   await expect(dialog).toContainText("Animation off");
  176 |   await page.clock.install();
  177 |   await page.clock.runFor(10_000);
  178 |   await expect(text).toHaveText(motivationalMessages["Building momentum"][0]);
  179 | });
  180 | 
  181 | test("video-specific samples remain separate from persisted posts and completion", async ({
  182 |   page,
  183 | }) => {
  184 |   for (const course of courses) {
  185 |     await page.goto(`/courses/${course.slug}`);
  186 |     const history = page.getByRole("region", { name: "Course comments list" });
  187 |     await expect(history.getByRole("listitem")).toHaveCount(3);
  188 |     await expect(history).toContainText(course.comments[0].body);
  189 |     await expect(history.getByText("Sample", { exact: true })).toHaveCount(3);
  190 |     await expect(page.getByRole("progressbar")).toHaveAttribute(
  191 |       "aria-valuenow",
  192 |       "0",
  193 |     );
  194 |   }
  195 |   await page.goto("/courses/webology");
  196 |   await page
  197 |     .getByRole("textbox", { name: "Write a comment" })
  198 |     .fill("My own DNS notes");
  199 |   await page.getByRole("button", { name: "Submit Review" }).click();
  200 |   await page.reload();
  201 |   const history = page.getByRole("region", { name: "Course comments list" });
  202 |   await expect(history.getByRole("listitem")).toHaveCount(4);
  203 |   await expect(history.getByRole("listitem").first()).toContainText(
  204 |     "My own DNS notes",
  205 |   );
  206 |   const saved = await page.evaluate(() =>
  207 |     localStorage.getItem("course-library:youtube-learner:v1"),
  208 |   );
  209 |   expect(saved).toContain("My own DNS notes");
  210 |   expect(saved).not.toMatch(/sample-|Mariam Hassan|Nour Adel/);
  211 |   await page.getByRole("button", { name: "Leaderboard", exact: true }).click();
  212 |   await expect(page.getByRole("dialog").getByRole("listitem")).toHaveCount(5);
  213 |   await expect(
  214 |     page.getByRole("dialog").locator("[aria-current=true]"),
  215 |   ).toContainText("0%");
  216 | });
  217 | 
  218 | test("question confirmation reports unavailable storage without claiming an actual instructor request", async ({
  219 |   page,
  220 | }) => {
  221 |   await page.addInitScript(() => {
  222 |     Storage.prototype.setItem = () => {
  223 |       throw new DOMException("Blocked", "SecurityError");
  224 |     };
  225 |   });
  226 |   await page.goto("/courses/webology");
  227 |   await page
  228 |     .getByRole("button", { name: "Ask a question", exact: true })
  229 |     .click();
  230 |   const dialog = page.getByRole("dialog");
  231 |   await dialog
  232 |     .getByRole("textbox", { name: "Write your question" })
  233 |     .fill("How do resolvers work?");
  234 |   await dialog
  235 |     .getByRole("button", { name: "Submit Question", exact: true })
  236 |     .click();
  237 |   await expect(
  238 |     dialog.getByRole("region", { name: "Question next steps" }),
  239 |   ).toContainText("Saving is unavailable");
  240 |   await expect(
  241 |     dialog.getByRole("region", { name: "Question next steps" }),
  242 |   ).toContainText("nothing is sent to an instructor");
  243 |   await expect(
  244 |     dialog
  245 |       .getByRole("region", { name: "Saved question list" })
  246 |       .getByRole("listitem"),
  247 |   ).toHaveCount(1);
  248 | });
  249 | 
```