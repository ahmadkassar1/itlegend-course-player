import { expect, test, type Page } from "@playwright/test";
import type axe from "axe-core";
import fs from "node:fs/promises";
import path from "node:path";
import { capturePath, prepareScreenshot } from "./helpers/capture";

async function scan(page: Page, state: string) {
  await page.addScriptTag({
    path: path.resolve("node_modules/axe-core/axe.min.js"),
  });
  const result = await page.evaluate(async () => {
    const engine = (window as typeof window & { axe: typeof axe }).axe;
    return engine.run(document, {
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
    });
  });
  return {
    state,
    version: result.testEngine.version,
    violations: result.violations,
    incomplete: result.incomplete,
    passes: result.passes.map(({ id }) => id),
  };
}

for (const width of [430, 1440]) {
  test(`rendered accessibility scan at ${width}px includes catalogue, every course and all modal states`, async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 1000 });
    const results: Awaited<ReturnType<typeof scan>>[] = [];
    await page.goto("/");
    results.push(await scan(page, "catalogue"));
    for (const slug of [
      "starting-seo",
      "web-design-foundations",
      "javascript-essentials",
      "responsive-css",
      "react-components",
      "accessible-interfaces",
    ]) {
      await page.goto(`/courses/${slug}`);
      await prepareScreenshot(page);
      results.push(await scan(page, slug));
    }
    await page.goto("/courses/starting-seo");
    for (const name of ["Ask a question", "Leaderboard"]) {
      await page.getByRole("button", { name, exact: true }).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      results.push(await scan(page, name));
      await page.keyboard.press("Escape");
    }
    for (const id of ["reference-files", "knowledge-check"]) {
      await page.goto(`/courses/starting-seo?lesson=${id}`);
      await page
        .getByRole("button", {
          name: id === "reference-files" ? "Open PDF" : "Open exam",
          exact: true,
        })
        .click();
      await expect(page.getByRole("dialog")).toBeVisible();
      if (id === "reference-files") {
        await expect(page.getByRole("dialog").locator("img")).toBeVisible();
        await page.getByText("Read worksheet as text", { exact: true }).click();
      } else {
        await page.getByRole("radio").first().check();
        await page
          .getByRole("button", { name: "Submit answers", exact: true })
          .click();
      }
      results.push(await scan(page, id));
      await page.keyboard.press("Escape");
    }
    await fs.mkdir("verification", { recursive: true });
    await fs.writeFile(
      capturePath(`axe-${width}`).replace(/\.png$/, ".json"),
      JSON.stringify(results, null, 2),
    );
    expect(
      results.flatMap(({ state, violations }) =>
        violations.map(({ id, nodes }) => ({
          state,
          id,
          nodes: nodes.map(({ target, failureSummary }) => ({
            target,
            failureSummary,
          })),
        })),
      ),
    ).toEqual([]);
  });
}

test("computed progress, input, selected text and focus colors meet their contrast thresholds", async ({
  page,
}) => {
  await page.goto("/courses/starting-seo");
  await page.getByRole("textbox", { name: "Write a comment" }).focus();
  const colors = await page.evaluate(() => {
    const style = (selector: string) =>
      getComputedStyle(document.querySelector(selector)!);
    const textarea = style("textarea");
    const selected = style('[aria-current="step"]');
    const current = style('[aria-current="step"] span span');
    const submit = style('button[type="submit"]');
    const track = style('[aria-label="Course completion"]');
    const fill = style('[aria-label="Course completion"] > span');
    return [
      {
        name: "Submit text",
        fg: submit.color,
        bg: submit.backgroundColor,
        minimum: 4.5,
      },
      {
        name: "Current lesson",
        fg: current.color,
        bg: selected.backgroundColor,
        minimum: 4.5,
      },
      {
        name: "Progress fill",
        fg: fill.backgroundColor,
        bg: track.backgroundColor,
        minimum: 3,
      },
      {
        name: "Textarea boundary",
        fg: textarea.borderTopColor,
        bg: textarea.backgroundColor,
        minimum: 3,
      },
      {
        name: "Textarea focus",
        fg: textarea.outlineColor,
        bg: getComputedStyle(document.body).backgroundColor,
        minimum: 3,
      },
    ];
  });
  await page.getByRole("button", { name: "Leaderboard", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  colors.push(
    await page
      .locator('dialog li[aria-current="true"] small')
      .evaluate((el) => ({
        name: "Leaderboard small text",
        fg: getComputedStyle(el).color,
        bg: getComputedStyle(el.closest("li")!).backgroundColor,
        minimum: 4.5,
      })),
  );
  await page.keyboard.press("Escape");
  await page.goto("/courses/starting-seo?lesson=knowledge-check");
  await page.getByRole("button", { name: "Open exam", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("button", { name: "Submit answers", exact: true })
    .click();
  colors.push(
    await dialog.getByRole("alert").evaluate((el) => ({
      name: "Exam error text",
      fg: getComputedStyle(el).color,
      bg: getComputedStyle(el.parentElement!).backgroundColor,
      minimum: 4.5,
    })),
  );
  const question = dialog.getByRole("button", {
    name: "Question 2",
    exact: true,
  });
  await question.focus();
  colors.push(
    await question.evaluate((el) => ({
      name: "Quiz question focus",
      fg: getComputedStyle(el).outlineColor,
      bg: getComputedStyle(el.closest("header")!.parentElement!.parentElement!)
        .backgroundColor,
      minimum: 3,
    })),
  );
  const pairs = await page.evaluate((colors) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    function luminance(color: string) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const data = ctx.getImageData(0, 0, 1, 1).data;
      const [r, g, b] = Array.from(data)
        .slice(0, 3)
        .map((c) => {
          const v = c / 255;
          return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        });
      return r * 0.2126 + g * 0.7152 + b * 0.0722;
    }
    return colors.map((pair) => {
      const values = [luminance(pair.fg), luminance(pair.bg)].sort(
        (a, b) => b - a,
      );
      return { ...pair, ratio: (values[0] + 0.05) / (values[1] + 0.05) };
    });
  }, colors);
  for (const pair of pairs)
    expect(pair.ratio, pair.name).toBeGreaterThanOrEqual(pair.minimum);
  await fs.writeFile(
    capturePath("contrast").replace(/\.png$/, ".json"),
    JSON.stringify(pairs, null, 2),
  );
});
