import { expect, test } from "@playwright/test";
import type axe from "axe-core";
import path from "node:path";
import { controlYouTube } from "./helpers/youtube";
import { chooseOption } from "./helpers/select";
import { capturePath } from "./helpers/capture";

for (const viewport of [
  { width: 320, height: 568 },
  { width: 844, height: 390 },
  { width: 820, height: 1180 },
  { width: 1440, height: 1000 },
]) {
  test(`shared menus support keyboard, zoom, nested Escape and bounded layout at ${viewport.width}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await controlYouTube(page);
    await page.goto("/");
    const status = page.getByRole("combobox", {
      name: "Learning status",
      exact: true,
    });
    await status.focus();
    await status.press("ArrowDown");
    await status.press("End");
    await status.press("Enter");
    await expect(page.locator("article")).toHaveCount(0);
    await expect(status).toBeFocused();
    await status.press("a");
    await expect(page.locator("article")).toHaveCount(4);
    await status.click();
    await status.press("ArrowDown");
    await status.press("Escape");
    await expect(status).toHaveText(/All statuses/);
    await status.click();
    await page.getByRole("heading", { name: "Explore the videos" }).click();
    await expect(status).toHaveAttribute("aria-expanded", "false");

    await page.goto("/courses/webology?lesson=study-worksheet");
    const open = page.getByRole("button", { name: "Open PDF", exact: true });
    await open.evaluate((element) =>
      element.scrollIntoView({ block: "end", behavior: "instant" }),
    );
    await open.click();
    const dialog = page.getByRole("dialog");
    const size = dialog.getByRole("combobox", { name: "PDF page size" });
    await size.click();
    const menu = dialog.getByRole("listbox");
    await expect(menu).toBeVisible();
    const bounds = (await menu.boundingBox())!;
    expect(bounds.y).toBeGreaterThanOrEqual(0);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(viewport.height);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(viewport.width);
    await page.addScriptTag({
      path: path.resolve("node_modules/axe-core/axe.min.js"),
    });
    const violations = await page.evaluate(
      async () =>
        (
          await (window as unknown as { axe: typeof axe }).axe.run(
            document.querySelector("dialog")!,
          )
        ).violations,
    );
    expect(violations).toEqual([]);
    await page.screenshot({ path: capturePath(`pdf-menu-${viewport.width}`) });
    await size.press("Escape");
    await expect(dialog).toBeVisible();
    await expect(size).toBeFocused();
    await chooseOption(size, "200%");
    await expect(dialog.locator('[class*="pdfPage"]')).toHaveAttribute(
      "style",
      "width: 200%;",
    );
    await expect(
      dialog.getByRole("region", { name: "PDF document page" }),
    ).toBeVisible();
    await size.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(open).toBeFocused();
  });
}

test("thumbnail failure remains honest and reduced motion disables decorative animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("https://i.ytimg.com/**", (route) => route.abort());
  await page.goto("/");
  await expect(
    page.getByRole("img", { name: /^Thumbnail unavailable:/ }).first(),
  ).toBeVisible();
  const status = page.getByRole("combobox", { name: "Learning status" });
  await status.click();
  const animation = await page
    .getByRole("listbox")
    .evaluate((element) => getComputedStyle(element).animationName);
  expect(animation).toBe("none");
});
