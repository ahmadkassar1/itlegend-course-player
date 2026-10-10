import { controlYouTube } from "./helpers/youtube";
import { expect, test } from "@playwright/test";
import { MAX_MESSAGE_LENGTH } from "../../src/features/learning/interaction-store";
import { capturePath } from "./helpers/capture";

test.beforeEach(async ({ page }) => {
  await controlYouTube(page);
});

const profiles = [
  { width: 320, height: 568 },
  { width: 844, height: 390 },
  { width: 820, height: 1180 },
  { width: 1440, height: 900 },
];

for (const viewport of profiles) {
  const name = `${viewport.width}×${viewport.height}`;

  test(`incomplete exam guides keyboard learners to a visible unanswered question at ${name}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/courses/webology?lesson=study-check");
    await page.getByRole("button", { name: "Open exam", exact: true }).click();
    const dialog = page.getByRole("dialog");
    const question = (index: number) =>
      dialog.getByRole("heading", { name: `Question ${index} of 5` });

    await dialog.getByRole("radio").first().check();
    await dialog
      .getByRole("button", { name: "Question 5", exact: true })
      .click();
    await dialog.getByRole("radio").first().check();
    await dialog.getByRole("button", { name: "Submit answers" }).click();
    await expect(dialog.getByRole("alert")).toContainText("3 questions left");
    await expect(dialog.getByRole("alert")).toBeFocused();
    await expect(dialog.getByRole("alert")).toBeInViewport();
    await page.screenshot({ path: capturePath(`feedback-${name}-exam-error`) });

    const recovery = dialog.getByRole("button", {
      name: "Go to first unanswered question",
    });
    await page.keyboard.press("Tab");
    await expect(recovery).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(question(2)).toBeFocused();
    await expect(question(2)).toBeInViewport();
    await expect(dialog.getByRole("group").locator("legend")).toBeInViewport();
    await expect(dialog.getByRole("alert")).toHaveCount(0);

    await dialog.getByRole("radio").first().check();
    await dialog.getByRole("button", { name: "Submit answers" }).click();
    await expect(dialog.getByRole("alert")).toContainText("2 questions left");
    await recovery.click();
    await expect(question(3)).toBeFocused();
    await expect(question(3)).toBeInViewport();
    await dialog.getByRole("radio").first().check();
    await dialog.getByRole("button", { name: "Next question" }).click();
    await expect(question(4)).toBeFocused();
    await expect(question(4)).toBeInViewport();

    await page.keyboard.press("Escape");
    await page.reload();
    await page.getByRole("button", { name: "Open exam", exact: true }).click();
    await expect(question(4)).toBeVisible();
    await dialog.getByRole("button", { name: "Submit answers" }).click();
    await expect(dialog.getByRole("alert")).toContainText("1 question left");
    await recovery.click();
    await dialog.getByRole("radio").first().check();
    await dialog.getByRole("button", { name: "Submit answers" }).click();
    await expect(dialog.getByRole("status")).toContainText("correct");
    await expect(recovery).toHaveCount(0);
    expect(
      await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    ).toBe(true);
  });

  test(`comment and question forms explain their limit and preserve drafts at ${name}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/courses/webology");
    for (const kind of ["comment", "question"] as const) {
      if (kind === "question")
        await page
          .getByRole("button", { name: "Ask a question", exact: true })
          .click();
      const container =
        kind === "question"
          ? page.getByRole("dialog")
          : page.getByRole("region", { name: "Comments", exact: true });
      const input = container.getByRole("textbox", {
        name: kind === "question" ? "Write your question" : "Write a comment",
      });
      await expect(input).toHaveAccessibleDescription(
        "Maximum 2,000 characters.",
      );
      await input.fill("A short message.");
      // Normal draft guidance remains available to assistive technology without changing the reference layout.
      expect(
        await input.evaluate((el) => {
          const hint = document.getElementById(
            el.getAttribute("aria-describedby")!,
          );
          return hint?.getBoundingClientRect().width;
        }),
      ).toBe(1);
      await input.fill("س".repeat(MAX_MESSAGE_LENGTH - 10));
      await expect(input).toHaveAccessibleDescription(
        "10 characters left (2,000 maximum).",
      );
      await expect(
        container.getByText("10 characters left (2,000 maximum).", {
          exact: true,
        }),
      ).toBeVisible();
      await input.fill("س".repeat(MAX_MESSAGE_LENGTH));
      await expect(input).toHaveAccessibleDescription(
        "Character limit reached. Edit your message to keep writing.",
      );
      await input.press("End");
      await input.pressSequentially("X");
      await expect(input).toHaveValue("س".repeat(MAX_MESSAGE_LENGTH));
      await page.screenshot({
        path: capturePath(`feedback-${name}-${kind}-limit`),
      });

      if (kind === "question") {
        await page.keyboard.press("Escape");
        await page
          .getByRole("button", { name: "Ask a question", exact: true })
          .click();
      } else {
        await page.reload();
      }
      await expect(input).toHaveValue("س".repeat(MAX_MESSAGE_LENGTH));
      await input.press("Control+End");
      await input.press("Backspace");
      await expect(input).toHaveAccessibleDescription(
        "1 character left (2,000 maximum).",
      );
      await container
        .getByRole("button", {
          name: kind === "question" ? "Submit Question" : "Submit Review",
        })
        .click();
      await expect(input).toHaveValue("");
      await expect(input).toHaveAccessibleDescription(
        "Maximum 2,000 characters.",
      );
      await expect(container.getByRole("status")).toContainText(
        kind === "question"
          ? "Thank you for submitting your question!"
          : "saved on this device",
      );
      if (kind === "question") {
        await expect(
          container.getByRole("region", { name: "Question next steps" }),
        ).toContainText("saved on this device");
      }
      await expect(container.getByRole("listitem").first()).toContainText(
        "س".repeat(MAX_MESSAGE_LENGTH - 1),
      );
      expect(
        await container.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
      ).toBe(true);
      if (kind === "question") await page.keyboard.press("Escape");
    }
  });
}
