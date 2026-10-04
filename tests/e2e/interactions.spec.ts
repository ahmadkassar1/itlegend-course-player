import { capturePath } from "./helpers/capture";
import { expect, test, type Page } from "@playwright/test";
import { courses } from "../../src/data/courses";
import { motivationalMessages } from "../../src/data/motivation";

const seo = "/courses/starting-seo";
const resourceLink = (page: Page, id: string) =>
  page.locator(`a[href="${seo}?lesson=${id}"]`);

async function closeDialog(page: Page) {
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /^Close / })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
}

async function openCourseFromCatalogue(page: Page, title: string) {
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await page
    .locator("article")
    .filter({ has: page.getByRole("heading", { name: title, exact: true }) })
    .getByRole("link")
    .click();
  await expect(
    page.getByRole("heading", { level: 1, name: title, exact: true }),
  ).toBeVisible();
}

test("question draft survives Escape, reopening and client navigation, with isolated courses and local submission", async ({
  page,
}) => {
  await page.goto(seo);
  const trigger = page.getByRole("button", {
    name: "Ask a question",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", {
    name: "Ask a question",
    exact: true,
  });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Submit Question" }).click();
  await expect(dialog.getByRole("alert")).toContainText(
    "Please write a message",
  );
  const draft = "كيف أطبّق الدرس؟\nI tried a small example & need help.";
  await dialog
    .getByRole("textbox", { name: "Write your question" })
    .fill(draft);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(dialog.getByRole("textbox")).toHaveValue(draft);
  await closeDialog(page);
  await openCourseFromCatalogue(page, "JavaScript Essentials");
  await page
    .getByRole("button", { name: "Ask a question", exact: true })
    .click();
  await expect(page.getByRole("dialog").getByRole("textbox")).toHaveValue("");
  await page
    .getByRole("dialog")
    .getByRole("textbox")
    .fill("JavaScript-only draft");
  await closeDialog(page);
  await openCourseFromCatalogue(
    page,
    "Starting SEO as your Home Based Business",
  );
  await trigger.click();
  await expect(dialog.getByRole("textbox")).toHaveValue(draft);
  await dialog.getByRole("button", { name: "Submit Question" }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "saved in this demo session",
  );
  await expect(dialog.getByRole("textbox")).toHaveValue("");
  await expect(
    dialog.getByRole("region", { name: "Your saved questions" }),
  ).toContainText(draft);
  await closeDialog(page);
  await trigger.click();
  await expect(
    dialog.getByRole("region", { name: "Your saved questions" }),
  ).toContainText(draft);
  await closeDialog(page);
  await page.reload();
  await trigger.click();
  await expect(
    dialog.getByRole("region", { name: "Your saved questions" }),
  ).toHaveCount(0);
  await expect(dialog.getByRole("textbox")).toHaveValue("");
});

test("comments validate blank input, render literal text once and retain only in their course session", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(seo);
  const comments = page.getByRole("region", { name: "Comments", exact: true });
  await comments
    .getByRole("textbox", { name: "Write a comment" })
    .fill("  \n  ");
  await comments.getByRole("button", { name: "Submit Review" }).click();
  await expect(comments.getByRole("alert")).toBeVisible();
  await expect(comments.getByRole("listitem")).toHaveCount(3);
  const body = "<script>window.unexpected = true</script>\nشكراً على الشرح!";
  await comments.getByRole("textbox").fill(body);
  await comments.getByRole("button", { name: "Submit Review" }).click();
  await expect(comments.getByRole("listitem")).toHaveCount(4);
  await expect(comments.getByRole("listitem").last()).toContainText(body);
  await expect(comments.getByRole("status")).toContainText(
    "added to this demo session",
  );
  await expect(comments.getByRole("textbox")).toHaveValue("");
  await comments.getByRole("button", { name: "Submit Review" }).click();
  await expect(comments.getByRole("listitem")).toHaveCount(4);
  expect(await page.evaluate(() => "unexpected" in window)).toBe(false);
  await openCourseFromCatalogue(page, "JavaScript Essentials");
  await expect(comments.getByRole("listitem")).toHaveCount(3);
  await expect(comments).not.toContainText("شكراً على الشرح");
  await openCourseFromCatalogue(
    page,
    "Starting SEO as your Home Based Business",
  );
  await expect(comments.getByRole("listitem")).toHaveCount(4);
  await page.reload();
  await expect(comments.getByRole("listitem")).toHaveCount(3);
  expect(errors).toEqual([]);
});

test("exam retains answer and current question after closing/navigation, validates submission and keeps the derived result", async ({
  page,
}) => {
  await page.goto(seo);
  await resourceLink(page, "knowledge-check").click();
  const dialog = page.getByRole("dialog", {
    name: "Course Overview — Knowledge Check",
    exact: true,
  });
  await expect(dialog).toBeVisible();
  await expect(page).toHaveURL(/lesson=knowledge-check$/);
  const box = (await dialog.boundingBox())!;
  expect(box.width).toBe(1440);
  expect(box.height).toBe(1000);
  await dialog.getByRole("button", { name: "Submit answers" }).click();
  await expect(dialog.getByRole("alert")).toContainText("Answer all 5");
  await dialog.getByRole("button", { name: "Question 2", exact: true }).click();
  await dialog
    .getByRole("radio", { name: "Try a simple example yourself" })
    .check();
  await dialog.getByRole("button", { name: "Next question" }).click();
  await page.keyboard.press("Escape");
  await expect(resourceLink(page, "knowledge-check")).toBeFocused();
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await expect(
    dialog.getByRole("heading", { name: "Question 3 of 5" }),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: "Question 2, answered", exact: true })
    .click();
  await expect(
    dialog.getByRole("radio", { name: "Try a simple example yourself" }),
  ).toBeChecked();
  await closeDialog(page);
  await openCourseFromCatalogue(page, "JavaScript Essentials");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "38",
  );
  await openCourseFromCatalogue(
    page,
    "Starting SEO as your Home Based Business",
  );
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await expect(
    dialog.getByRole("radio", { name: "Try a simple example yourself" }),
  ).toBeChecked();
  for (const [index, label] of [
    [1, "Learning everything at once"], // One deliberately incorrect answer verifies scoring.
    [3, "Key ideas, observations and questions"],
    [4, "Describe what you tried and what happened"],
    [5, "Explain and apply the idea in your own words"],
  ] as const) {
    await dialog
      .getByRole("button", { name: `Question ${index}`, exact: true })
      .click();
    await dialog.getByRole("radio", { name: label }).check();
  }
  await dialog.getByRole("button", { name: "Submit answers" }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "4 of 5 correct (80%)",
  );
  await expect(dialog.getByRole("radio").first()).toBeDisabled();
  await expect(
    dialog.getByRole("button", { name: "Submit answers" }),
  ).toHaveCount(0);
  await closeDialog(page);
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "4 of 5 correct (80%)",
  );
  await dialog
    .getByRole("button", { name: "Question 2, answered", exact: true })
    .click();
  await expect(
    dialog.getByRole("radio", { name: "Try a simple example yourself" }),
  ).toBeChecked();
  await page.screenshot({ path: capturePath("desktop-exam-result") });
  await closeDialog(page);
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await expect(
    page
      .locator("article")
      .filter({
        has: page.getByRole("heading", {
          name: "Starting SEO as your Home Based Business",
          exact: true,
        }),
      })
      .getByRole("progressbar"),
  ).toHaveAttribute("aria-valuenow", "75");
});

test("PDF displays its actual rendered page and accessible text, zooms inside the popup and credits explicit read once", async ({
  page,
  request,
}) => {
  await page.goto(seo);
  await resourceLink(page, "reference-files").click();
  const dialog = page.getByRole("dialog", {
    name: "Course Exercise / Reference Files",
    exact: true,
  });
  await expect(dialog).toBeVisible();
  const image = dialog.getByRole("img", {
    name: /Page 1 of Your learning plan/,
  });
  await expect(image).toBeVisible();
  await expect
    .poll(() =>
      image.evaluate(
        (element: HTMLImageElement) =>
          element instanceof HTMLImageElement &&
          element.complete &&
          element.naturalWidth > 0,
      ),
    )
    .toBe(true);
  const pdf = await request.get("/resources/learning-plan.pdf");
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await dialog.getByLabel("PDF page size").selectOption("200");
  const region = dialog.getByRole("region", { name: "PDF document page" });
  expect(
    await region.evaluate(
      (element) => element.scrollWidth > element.clientWidth,
    ),
  ).toBe(true);
  expect(
    await dialog.evaluate(
      (element) => element.scrollWidth <= element.clientWidth + 1,
    ),
  ).toBe(true);
  await dialog.getByLabel("PDF page size").selectOption("100");
  await dialog.getByText("Read worksheet as text", { exact: true }).click();
  await expect(
    dialog.getByRole("heading", { name: "1. Choose one goal" }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Mark read", exact: true }).click();
  await expect(
    dialog.getByRole("button", { name: "Read ✓", exact: true }),
  ).toBeDisabled();
  await page.screenshot({ path: capturePath("desktop-pdf") });
  await closeDialog(page);
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
  await page.getByRole("button", { name: "Open PDF", exact: true }).click();
  await expect(
    dialog.getByRole("button", { name: "Read ✓", exact: true }),
  ).toBeDisabled();
  await closeDialog(page);
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
});

test("native modal contains keyboard focus, blocks background scroll and restores trigger/scroll under the sticky player", async ({
  page,
}) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto(seo);
  const trigger = page.getByRole("button", {
    name: "Ask a question",
    exact: true,
  });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  const before = await page.evaluate(() => window.scrollY);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Ask a question", exact: true }),
  ).toBeFocused();
  for (const key of [
    "Tab",
    "Tab",
    "Tab",
    "Tab",
    "Shift+Tab",
    "Shift+Tab",
    "Shift+Tab",
    "Shift+Tab",
  ]) {
    await page.keyboard.press(key);
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  const frozen = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 700);
  expect(await page.evaluate(() => window.scrollY)).toBe(frozen);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeCloseTo(before, 0);
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
  await trigger.click();
  await page.screenshot({ path: capturePath("mobile-question") });
});

test("leaderboard derives current progress and level-specific original Arabic encouragement for all level buckets", async ({
  page,
}) => {
  const cases = [
    ["web-design-foundations", "Getting started", "0"],
    ["javascript-essentials", "Building momentum", "38"],
    ["starting-seo", "Progressing", "63"],
    ["accessible-interfaces", "Completed", "100"],
  ] as const;
  for (const [slug, level, progress] of cases) {
    await page.goto(`/courses/${slug}`);
    await page
      .getByRole("button", { name: "Leaderboard", exact: true })
      .click();
    const dialog = page.getByRole("dialog", {
      name: "Leaderboard",
      exact: true,
    });
    await expect(dialog.locator('[lang="ar"][dir="rtl"]')).toHaveText(
      motivationalMessages[level],
    );
    await expect(dialog.getByRole("listitem")).toHaveCount(6);
    await expect(dialog.locator('li[aria-current="true"]')).toContainText(
      `${progress}%`,
    );
    await expect(
      dialog.getByText(courses.find((course) => course.slug === slug)!.title, {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Leaderboard", exact: true }),
    ).toHaveCount(1);
    if (slug === "starting-seo")
      await page.screenshot({
        path: capturePath("desktop-leaderboard"),
      });
    await closeDialog(page);
  }
});

test("all required popups fit narrow, tablet, desktop and short landscape viewports with reachable close controls", async ({
  page,
}) => {
  for (const [width, height] of [
    [320, 640],
    [430, 932],
    [820, 1180],
    [1440, 1000],
    [700, 360],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(seo);
    for (const kind of ["question", "leaderboard", "pdf", "exam"]) {
      if (kind === "question" || kind === "leaderboard")
        await page
          .getByRole("button", {
            name: kind === "question" ? "Ask a question" : "Leaderboard",
            exact: true,
          })
          .click();
      else
        await resourceLink(
          page,
          kind === "pdf" ? "reference-files" : "knowledge-check",
        ).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      const box = (await dialog.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
      expect(box.y + box.height).toBeLessThanOrEqual(height + 1);
      expect(
        await dialog.evaluate(
          (element) => element.scrollWidth <= element.clientWidth + 1,
        ),
      ).toBe(true);
      await expect(
        dialog.getByRole("button", { name: /^Close / }),
      ).toBeInViewport();
      if (width === 430 && kind !== "question")
        await page.screenshot({ path: capturePath(`mobile-${kind}`) });
      if (width === 320 && kind === "exam")
        await page.screenshot({ path: capturePath("narrow-exam") });
      if (width === 700 && kind === "exam")
        await page.screenshot({ path: capturePath("landscape-exam") });
      await closeDialog(page);
    }
  }
});

test("PDF preview failure keeps readable document text and the original-file alternative inside the popup", async ({
  page,
}) => {
  await page.route(
    (url) =>
      url.pathname === "/_next/image" &&
      url.searchParams.get("url") === "/resources/learning-plan.png",
    (route) => route.abort(),
  );
  await page.goto(`${seo}?lesson=reference-files`);
  await page.getByRole("button", { name: "Open PDF", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("alert")).toContainText(
    "preview could not load",
  );
  await expect(
    dialog.getByRole("heading", { name: "1. Choose one goal" }),
  ).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: /Open original PDF/ }),
  ).toHaveAttribute("href", "/resources/learning-plan.pdf");
});
