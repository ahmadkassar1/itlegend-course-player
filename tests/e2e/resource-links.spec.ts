import { expect, test } from "@playwright/test";
import { courses } from "../../src/data/courses";

test("every course page and local media, caption, image and worksheet link resolves", async ({
  request,
}, testInfo) => {
  test.setTimeout(90_000);
  const links = new Map<string, string>();
  for (const course of courses) {
    const response = await request.get(`/courses/${course.slug}`);
    expect(response.ok(), course.slug).toBe(true);
    expect(await response.text()).toContain(course.title);
    for (const image of [
      course.thumbnail,
      course.poster,
      ...course.comments.map((comment) => comment.avatar),
    ])
      links.set(image, "image/");
    for (const lesson of course.sections.flatMap(
      (section) => section.lessons,
    )) {
      if (lesson.kind === "video") {
        links.set(lesson.media.src, "video/webm");
        links.set(lesson.media.captions, "text/vtt");
        if (lesson.media.poster) links.set(lesson.media.poster, "image/");
      } else if (lesson.kind === "pdf") {
        links.set(lesson.resource.src, "application/pdf");
        links.set(lesson.resource.preview, "image/");
      }
    }
  }
  const results = [];
  for (const [url, contentType] of links) {
    const response = await request.get(url);
    expect(response.ok(), url).toBe(true);
    expect(response.headers()["content-type"], url).toContain(contentType);
    const body = await response.body();
    expect(body.length, url).toBeGreaterThan(0);
    if (contentType === "application/pdf")
      expect(body.subarray(0, 5).toString(), url).toBe("%PDF-");
    if (contentType === "text/vtt")
      expect(body.toString(), url).toMatch(/^WEBVTT/);
    if (contentType === "video/webm")
      expect(body.subarray(0, 4).toString("hex"), url).toBe("1a45dfa3");
    results.push({
      url,
      status: response.status(),
      contentType: response.headers()["content-type"],
      bytes: body.length,
    });
  }
  await testInfo.attach("verified resource links", {
    body: JSON.stringify(results, null, 2),
    contentType: "application/json",
  });
});
