import { expect, test } from "@playwright/test";
import fs from "node:fs/promises";
import { prepareScreenshot, capturePath } from "./helpers/capture";
import { courses } from "../../src/data/courses";

const expectedCourses: Record<string, { lessons: number; progress: number }> = {
  "starting-seo": { lessons: 8, progress: 63 },
  "web-design-foundations": { lessons: 6, progress: 0 },
  "javascript-essentials": { lessons: 8, progress: 38 },
  "responsive-css": { lessons: 7, progress: 0 },
  "react-components": { lessons: 10, progress: 70 },
  "accessible-interfaces": { lessons: 6, progress: 100 },
};

test("all six course cards open anonymous players with matching progress and lesson counts", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.locator("article")).toHaveCount(6);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Your next lesson starts here.",
  );
  for (const course of courses) {
    await page.goto("/");
    const card = page.locator("article").filter({
      has: page.getByRole("heading", { name: course.title, exact: true }),
    });
    const { progress, lessons } = expectedCourses[course.slug];
    await expect(card.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      String(progress),
    );
    await card.getByRole("link").click();
    await expect(page).toHaveURL(new RegExp(`/courses/${course.slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      course.title,
    );
    await expect(
      page.getByRole("progressbar", { name: "Course completion" }),
    ).toHaveAttribute("aria-valuenow", String(progress));
    const expectedLesson = course.sections
      .flatMap((section) => section.lessons)
      .find((lesson) => lesson.id === course.initialLessonId)!;
    await expect(
      page.getByRole("region", { name: "Current lesson" }).getByRole("heading"),
    ).toHaveText(expectedLesson.title);
    await expect(page.locator("#materials-heading")).toHaveText(
      "Course Materials",
    );
    await expect(
      page
        .locator("dl > div")
        .filter({ has: page.getByText("Lessons:", { exact: true }) })
        .locator("dd"),
    ).toHaveText(String(lessons));
    await expect(page.getByRole("link", { name: /log ?in/i })).toHaveCount(0);
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                (image as HTMLImageElement).complete &&
                (image as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
  }
  expect(errors).toEqual([]);
});

test("lesson navigation updates content and current state; back and invalid deep links stay coherent", async ({
  page,
}) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/courses/starting-seo");
  await page
    .locator('a[href="/courses/starting-seo?lesson=course-overview"]')
    .click();
  await expect(
    page.getByRole("region", { name: "Current lesson" }).getByRole("heading"),
  ).toHaveText("Course Overview");
  await expect(page.locator('[aria-current="step"]')).toHaveAttribute(
    "href",
    "/courses/starting-seo?lesson=course-overview",
  );
  await expect(
    page.getByText(
      "Explore the course roadmap and prepare a learning plan that fits your schedule.",
    ),
  ).toBeAttached();
  const toggle = page.getByRole("button", {
    name: "Components & Databinding",
    exact: true,
  });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page
    .locator('a[href="/courses/starting-seo?lesson=components-databinding"]')
    .click();
  await expect(
    page.getByRole("region", { name: "Current lesson" }).getByRole("heading"),
  ).toHaveText("Components & Databinding");
  await page.goBack();
  await expect(
    page.getByRole("region", { name: "Current lesson" }).getByRole("heading"),
  ).toHaveText("Course Overview");
  await page.goForward();
  await expect(
    page.getByRole("region", { name: "Current lesson" }).getByRole("heading"),
  ).toHaveText("Components & Databinding");
  for (const id of ["does-not-exist", "javascript-essentials-1"]) {
    await page.goto(`/courses/starting-seo?lesson=${id}`);
    await expect(
      page.getByRole("region", { name: "Current lesson" }).getByRole("heading"),
    ).toHaveText("Introduction");
  }
  await page.goto("/courses/starting-seo?lesson=reference-files");
  await expect(
    page.getByRole("region", { name: "Current lesson" }).getByRole("heading"),
  ).toHaveText("Course Exercise / Reference Files");
  await expect(
    page.getByRole("button", { name: "Open PDF", exact: true }),
  ).toBeEnabled();
});

test("responsive baseline preserves order and avoids horizontal overflow", async ({
  page,
}) => {
  await fs.mkdir("verification", { recursive: true });
  for (const width of [320, 360, 390, 430, 768, 820, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const url of [
      "/",
      "/courses/starting-seo",
      "/courses/responsive-css",
      "/courses/react-components",
    ]) {
      await page.goto(url);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth + 1,
          ),
        )
        .toBe(true);
      if (url === "/courses/starting-seo") {
        const preview = await page
          .getByRole("region", { name: "Current lesson" })
          .boundingBox();
        const curriculum = await page.locator("#curriculum").boundingBox();
        const materials = await page
          .getByRole("region", { name: "Course Materials" })
          .boundingBox();
        const comments = await page.locator("#comments").boundingBox();
        expect(preview && curriculum && materials && comments).toBeTruthy();
        if (width >= 1024) {
          expect(preview!.x + preview!.width).toBeLessThan(curriculum!.x);
          expect(preview!.width).toBeGreaterThan(curriculum!.width);
        } else {
          expect(preview!.y).toBeLessThan(materials!.y);
          expect(materials!.y).toBeLessThan(curriculum!.y);
          expect(curriculum!.y).toBeLessThan(comments!.y);
        }
      }
    }
  }
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 430, 932],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await prepareScreenshot(page);
    await page.screenshot({
      path: capturePath(`${name}-catalogue`),
      fullPage: true,
    });
    await page.goto("/courses/starting-seo");
    await prepareScreenshot(page);
    await page.screenshot({
      path: capturePath(`${name}-player`),
      fullPage: true,
    });
  }
});

test("keyboard navigation, section targets, and not-found behavior work", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  const firstCourse = page.locator("article").first().getByRole("link");
  await firstCourse.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/courses\/starting-seo$/);
  await page.getByRole("link", { name: "Jump to curriculum" }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#curriculum$/);
  await expect(
    page.getByRole("heading", { name: "Topics for This Course", exact: true }),
  ).toBeInViewport();
  const commentsLink = page.getByRole("link", { name: "Jump to comments" });
  await commentsLink.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#comments$/);
  await expect(
    page.getByRole("heading", { name: "Comments", exact: true }),
  ).toBeInViewport();
  const response = await page.goto("/courses/no-such-course");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Course not found" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Return to Course Library" }).click();
  await expect(page.locator("article")).toHaveCount(6);
});

test("long selected lesson titles stay readable without blocking mobile video controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/courses/starting-seo?lesson=editor-setup");
  const title = "Code Editor Installation (Optional if you have one)";
  const selected = page.locator('[aria-current="step"]');
  await expect(selected).toContainText(title);
  await expect(selected).toContainText("Current lesson");
  const preview = page.getByRole("region", { name: "Current lesson" });
  await expect(
    preview.getByRole("button", { name: "Play " + title }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveJSProperty("scrollWidth", 320);
  await prepareScreenshot(page);
  await page.screenshot({
    path: capturePath("narrow-player"),
    fullPage: true,
  });
});
