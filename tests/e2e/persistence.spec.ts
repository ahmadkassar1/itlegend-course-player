import { test, expect } from "@playwright/test";
import { courses } from "../../src/data/courses";
import { capturePath } from "./helpers/capture";

test("restoration reconciles a valid submitted exam with missing lesson credit and ignores a forged score", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "course-library:learner:v1",
      JSON.stringify({
        version: 1,
        contentVersion: "2026-10-course-content-1",
        learning: {
          "starting-seo": {
            completedLessonIds: [
              "introduction",
              "course-overview",
              "editor-setup",
              "javascript-basics",
              "components-databinding",
            ],
          },
        },
        interactions: {
          "starting-seo": {
            attempts: {
              "course-overview-check": {
                index: 0,
                submitted: true,
                correct: 777,
                answers: {
                  goal: "specific",
                  practice: "try",
                  notes: "insights",
                  question: "context",
                  review: "explain",
                },
              },
            },
          },
        },
      }),
    );
  });
  await page.goto("/courses/starting-seo?lesson=knowledge-check");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText(
    "5 of 5 correct (100%)",
  );
});

test("video position and genuine completion survive hard reload without duplicate credit", async ({
  page,
}) => {
  await page.goto("/courses/web-design-foundations");
  await page.getByRole("button", { name: /^Play / }).click();
  const video = page.locator("video");
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.1);
  await video.evaluate((element: HTMLVideoElement) => {
    element.pause();
    element.currentTime = 3;
  });
  await expect(video).toHaveJSProperty("currentTime", 3);
  await page.reload();
  await page.getByRole("button", { name: /^Play / }).click();
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThanOrEqual(3);
  await video.evaluate((element: HTMLVideoElement) => {
    element.currentTime = 15.5;
  });
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "17",
  );
  await page.reload();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "17",
  );
  await page.getByRole("button", { name: "Leaderboard", exact: true }).click();
  await expect(
    page.getByRole("dialog").locator('[aria-current="true"]'),
  ).toContainText("1/6 lessons");
});

test("partial exam, submitted score, PDF read, drafts and reset survive reload and reconcile with catalogue", async ({
  page,
}) => {
  await page.goto("/courses/starting-seo?lesson=knowledge-check");
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Question 2", exact: true }).click();
  await dialog
    .getByRole("radio", {
      name: "On the server before HTML reaches the browser",
      exact: true,
    })
    .check();
  await dialog.getByRole("button", { name: "Next question" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await expect(
    dialog.getByRole("heading", { name: "Question 3 of 5" }),
  ).toBeVisible();
  const labels = [
    "Bicycle repairs in Beirut",
    "On the server before HTML reaches the browser",
    "textContent",
    "A stable identifier from the service data",
    "Read the page on mobile and test its links and keyboard controls",
  ];
  for (const [index, label] of labels.entries()) {
    await dialog
      .getByRole("button", {
        name: new RegExp(`^Question ${index + 1}(, answered)?$`),
      })
      .click();
    await dialog.getByRole("radio", { name: label, exact: true }).check();
  }
  await dialog.getByRole("button", { name: "Submit answers" }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "5 of 5 correct (100%)",
  );
  await page.reload();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "75",
  );
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "5 of 5 correct (100%)",
  );
  await page.keyboard.press("Escape");
  await page.goto("/courses/starting-seo?lesson=reference-files");
  await page.getByRole("button", { name: "Open PDF", exact: true }).click();
  await dialog.getByRole("button", { name: "Mark read", exact: true }).click();
  await page.reload();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "88",
  );
  await page.getByRole("button", { name: "Open PDF", exact: true }).click();
  await expect(
    dialog.getByRole("button", { name: "Read ✓", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Ask a question", exact: true })
    .click();
  await dialog
    .getByRole("textbox")
    .fill("كيف أربط الكروت بالبيانات؟\nKeep this draft.");
  await page.reload();
  await page
    .getByRole("button", { name: "Ask a question", exact: true })
    .click();
  await expect(dialog.getByRole("textbox")).toHaveValue(
    "كيف أربط الكروت بالبيانات؟\nKeep this draft.",
  );
  await page.goto("/");
  const seoCard = page.locator("article").filter({
    has: page.getByRole("heading", {
      name: "Starting SEO as your Home Based Business",
      exact: true,
    }),
  });
  await expect(seoCard.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "88",
  );
  page.once("dialog", (confirmation) => confirmation.dismiss());
  await page.getByRole("button", { name: "Reset demo learning data" }).click();
  await expect(seoCard.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "88",
  );
  page.once("dialog", (confirmation) => confirmation.accept());
  await page.getByRole("button", { name: "Reset demo learning data" }).click();
  await page.reload();
  await expect(seoCard.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "63",
  );
  await page.goto("/courses/starting-seo?lesson=knowledge-check");
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  await expect(
    dialog.getByRole("heading", { name: "Question 1 of 5" }),
  ).toBeVisible();
  await expect(dialog.getByRole("radio").first()).toBeEnabled();
  await expect(dialog.getByRole("radio").first()).not.toBeChecked();
});

for (const failure of ["blocked", "quota", "corrupt"]) {
  test(`${failure} browser storage keeps anonymous flows working with truthful feedback`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript((mode) => {
      if (mode === "blocked")
        Object.defineProperty(window, "localStorage", {
          get: () => {
            throw new DOMException("Blocked", "SecurityError");
          },
        });
      else if (mode === "quota")
        Storage.prototype.setItem = () => {
          throw new DOMException("Full", "QuotaExceededError");
        };
      else if (!sessionStorage.getItem("corruption-tested")) {
        localStorage.setItem("course-library:learner:v1", "{broken-json");
        sessionStorage.setItem("corruption-tested", "yes");
      }
    }, failure);
    await page.goto("/");
    await expect(
      page.getByRole("status", { name: "Learning storage status" }),
    ).toContainText(
      failure === "corrupt" ? "saved on this device" : "Saving is unavailable",
    );
    await page.goto("/courses/starting-seo");
    await page
      .getByRole("button", { name: "Ask a question", exact: true })
      .click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("textbox").fill("Will my draft survive?");
    await dialog.getByRole("button", { name: "Submit Question" }).click();
    await expect(dialog.getByRole("status")).toContainText(
      failure === "corrupt" ? "saved on this device" : "kept for this visit",
    );
    await expect(
      dialog.getByRole("region", { name: "Your saved questions" }),
    ).toContainText("Will my draft survive?");
    expect(errors).toEqual([]);
  });
}

test("every course has its own readable PDF, playable captioned video and scored assessment", async ({
  page,
  request,
}) => {
  for (const course of courses) {
    const lessons = course.sections.flatMap((section) => section.lessons);
    const clip = lessons.find((lesson) => lesson.kind === "video")!;
    if (clip.kind !== "video") throw new Error("Expected video");
    await page.goto(`/courses/${course.slug}?lesson=${clip.id}`);
    await page.getByRole("button", { name: /^Play / }).click();
    await expect
      .poll(() =>
        page
          .locator("video")
          .evaluate((video: HTMLVideoElement) => video.currentTime),
      )
      .toBeGreaterThan(0.1);
    const captions = await request.get(clip.media.captions);
    expect(captions.ok()).toBe(true);
    expect(await captions.text()).toContain("WEBVTT");
    const pdf = lessons.find((lesson) => lesson.kind === "pdf")!;
    if (pdf.kind !== "pdf") throw new Error("Expected PDF");
    await page.goto(`/courses/${course.slug}?lesson=${pdf.id}`);
    await page.getByRole("button", { name: "Open PDF", exact: true }).click();
    let dialog = page.getByRole("dialog");
    await expect
      .poll(() =>
        dialog
          .getByRole("img")
          .evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
      )
      .toBe(true);
    await expect(
      dialog.getByRole("link", { name: /Open original PDF/ }),
    ).toHaveAttribute("href", pdf.resource.src);
    const response = await request.get(pdf.resource.src);
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
    await dialog.getByText("Read worksheet as text", { exact: true }).click();
    await expect(
      dialog.getByRole("heading", {
        name: pdf.resource.sections[0].title,
        exact: true,
      }),
    ).toBeVisible();
    if (course.slug === "javascript-essentials")
      await page.screenshot({ path: capturePath("realistic-javascript-pdf") });
    const exam = lessons.find((lesson) => lesson.kind === "exam")!;
    if (exam.kind !== "exam") throw new Error("Expected exam");
    await page.goto(`/courses/${course.slug}?lesson=${exam.id}`);
    await page.getByRole("button", { name: "Open exam", exact: true }).click();
    dialog = page.getByRole("dialog");
    for (const [index, question] of exam.exam.questions.entries()) {
      await dialog
        .getByRole("button", { name: `Question ${index + 1}`, exact: true })
        .click();
      const correct = question.options.find(
        (option) => option.id === question.correctOptionId,
      )!;
      await dialog
        .getByRole("radio", { name: correct.label, exact: true })
        .check();
    }
    await dialog.getByRole("button", { name: "Submit answers" }).click();
    await expect(dialog.getByRole("status")).toContainText(
      "5 of 5 correct (100%)",
    );
  }
});
