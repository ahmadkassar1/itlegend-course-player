import { controlYouTube } from "./helpers/youtube";
import { expect, test } from "@playwright/test";
import path from "node:path";
import type axe from "axe-core";
import { capturePath } from "./helpers/capture";

test.beforeEach(async ({ page }) => {
  await controlYouTube(page);
});

for (const width of [320, 1440]) {
  test(`newest-first comments and questions retain bounded keyboard-scrollable histories at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/courses/webology");
    const comments = page.getByRole("region", {
      name: "Course comments list",
      exact: true,
    });
    const commentInput = page.getByRole("textbox", {
      name: "Write a comment",
      exact: true,
    });
    const submitComment = page.getByRole("button", {
      name: "Submit Review",
      exact: true,
    });
    for (let index = 1; index <= 8; index++) {
      await commentInput.fill(
        `Review ${index}\n${"تفاصيل تطبيق الدرس. ".repeat(24)}${"UnbrokenContent".repeat(18)}`,
      );
      await submitComment.click();
    }
    await expect(comments.getByRole("listitem").first()).toContainText(
      "Review 8",
    );
    await expect(comments.getByRole("listitem").nth(1)).toContainText(
      "Review 7",
    );
    await expect(comments.getByRole("listitem")).toHaveCount(8);
    const checkBounds = async (
      region: typeof comments,
      rem: number,
      viewportFraction: number,
    ) => {
      const metrics = await region.evaluate((element) => ({
        height: element.clientHeight,
        content: element.scrollHeight,
        width: element.clientWidth,
        contentWidth: element.scrollWidth,
        cap: parseFloat(getComputedStyle(element).maxHeight),
        rootSize: parseFloat(
          getComputedStyle(document.documentElement).fontSize,
        ),
        viewport: window.innerHeight,
        overflow: getComputedStyle(element).overflowY,
      }));
      expect(metrics.overflow).toBe("auto");
      expect(metrics.content).toBeGreaterThan(metrics.height);
      expect(metrics.height).toBeLessThanOrEqual(
        Math.min(rem * metrics.rootSize, metrics.viewport * viewportFraction) +
          1,
      );
      expect(metrics.contentWidth).toBeLessThanOrEqual(metrics.width + 1);
    };
    await checkBounds(comments, 36, 0.65);
    await comments.evaluate((element) =>
      element.scrollIntoView({ block: "start", behavior: "instant" }),
    );
    await comments.focus();
    const pagePosition = await page.evaluate(() => window.scrollY);
    await page.keyboard.press("PageDown");
    await expect
      .poll(() => comments.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0);
    expect(await page.evaluate(() => window.scrollY)).toBe(pagePosition);
    await comments.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await commentInput.fill("Newest review — visible at the top");
    await submitComment.scrollIntoViewIfNeeded();
    const beforeSubmit = await page.evaluate(() => window.scrollY);
    await submitComment.click();
    await expect(comments.getByRole("listitem").first()).toContainText(
      "Newest review — visible at the top",
    );
    await expect
      .poll(() => comments.evaluate((element) => element.scrollTop))
      .toBe(0);
    await expect(submitComment).toBeFocused();
    expect(await page.evaluate(() => window.scrollY)).toBe(beforeSubmit);
    await comments.evaluate((element) =>
      element.scrollIntoView({ block: "start", behavior: "instant" }),
    );
    if (width === 320) {
      const firstRow = (await comments
        .getByRole("listitem")
        .first()
        .boundingBox())!;
      const player = (await page
        .getByRole("region", { name: "Current lesson", exact: true })
        .boundingBox())!;
      expect(firstRow.y).toBeGreaterThanOrEqual(player.y + player.height);
    }
    await comments.screenshot({ path: capturePath(`comments-${width}`) });
    await page.reload();
    await expect(comments.getByRole("listitem").first()).toContainText(
      "Newest review — visible at the top",
    );
    await page
      .getByRole("button", { name: "Ask a question", exact: true })
      .click();
    const dialog = page.getByRole("dialog");
    const questionInput = dialog.getByRole("textbox", {
      name: "Write your question",
      exact: true,
    });
    for (let index = 1; index <= 8; index++) {
      await questionInput.fill(
        `Question ${index}\n${"How do I apply this idea? ".repeat(32)}${"سؤالبدونمسافات".repeat(16)}`,
      );
      await dialog
        .getByRole("button", { name: "Submit Question", exact: true })
        .click();
    }
    const questions = dialog.getByRole("region", {
      name: "Saved question list",
      exact: true,
    });
    await expect(questions.getByRole("listitem").first()).toContainText(
      "Question 8",
    );
    await expect(questions.getByRole("listitem").nth(1)).toContainText(
      "Question 7",
    );
    await checkBounds(questions, 22, 0.4);
    await questions.focus();
    await page.keyboard.press("PageDown");
    await expect
      .poll(() => questions.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0);
    await questionInput.fill("Newest question — retained after reopening");
    const submitQuestion = dialog.getByRole("button", {
      name: "Submit Question",
      exact: true,
    });
    await submitQuestion.click();
    await expect
      .poll(() => questions.evaluate((element) => element.scrollTop))
      .toBe(0);
    await expect(questions.getByRole("listitem").first()).toContainText(
      "Newest question",
    );
    await expect(submitQuestion).toBeFocused();
    await questions.scrollIntoViewIfNeeded();
    await page.screenshot({ path: capturePath(`questions-${width}`) });
    await page.addScriptTag({
      path: path.resolve("node_modules/axe-core/axe.min.js"),
    });
    const violations = await page.evaluate(
      async () =>
        (
          await (window as typeof window & { axe: typeof axe }).axe.run(
            document,
            {
              runOnly: {
                type: "tag",
                values: [
                  "wcag2a",
                  "wcag2aa",
                  "wcag21a",
                  "wcag21aa",
                  "wcag22aa",
                  "best-practice",
                ],
              },
            },
          )
        ).violations,
    );
    expect(
      violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
    await page.keyboard.press("Escape");
    await page.reload();
    await page
      .getByRole("button", { name: "Ask a question", exact: true })
      .click();
    await expect(
      page
        .getByRole("region", { name: "Saved question list", exact: true })
        .getByRole("listitem")
        .first(),
    ).toContainText("Newest question");
    await page.keyboard.press("Escape");
    await page.goto("/courses/computer-science");
    await expect(
      page
        .getByRole("region", { name: "Course comments list", exact: true })
        .getByRole("listitem"),
    ).toHaveCount(0);
  });
}
