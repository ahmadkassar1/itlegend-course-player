import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import crypto from "node:crypto";

const content = JSON.parse(
  await fs.readFile("src/data/course-content.json", "utf8"),
);
const outlines = Object.entries(content).flatMap(([slug, course]) =>
  Object.entries(course.lessons)
    .filter(([, lesson]) => lesson.points.length === 4)
    .map(([id, lesson]) => ({ slug, id, ...lesson })),
);
await fs.mkdir("public/media", { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  args: [
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows",
  ],
});
const manifest = [];
try {
  // Four isolated pages record at once; no network, external footage or app runtime work.
  for (let start = 0; start < outlines.length; start += 4) {
    await Promise.all(
      outlines.slice(start, start + 4).map(async (outline) => {
        const page = await browser.newPage();
        try {
          await page.setContent('<canvas width="900" height="600"></canvas>');
          const result = await page.evaluate(async (lesson) => {
            const canvas = document.querySelector("canvas");
            const context = canvas.getContext("2d");
            function wrap(text, x, y, maxWidth, lineHeight) {
              let line = "";
              for (const word of text.split(" ")) {
                const next = line ? `${line} ${word}` : word;
                if (context.measureText(next).width > maxWidth && line) {
                  context.fillText(line, x, y);
                  y += lineHeight;
                  line = word;
                } else line = next;
              }
              context.fillText(line, x, y);
            }
            function draw(index, elapsed = 0) {
              context.fillStyle = "#edf5f2";
              context.fillRect(0, 0, 900, 600);
              context.fillStyle = "#153d34";
              context.fillRect(0, 0, 900, 72);
              context.fillStyle = "#fff";
              context.font = "600 19px Segoe UI, sans-serif";
              context.fillText(
                lesson.slug.replaceAll("-", " ").toUpperCase(),
                40,
                44,
              );
              context.fillStyle = "#20382f";
              context.font = "600 27px Segoe UI, sans-serif";
              wrap(lesson.summary, 40, 120, 820, 38);
              context.fillStyle = "#fff";
              context.fillRect(40, 207, 820, 253);
              context.fillStyle = "#267b66";
              context.font = "600 19px Segoe UI, sans-serif";
              context.fillText(`STEP ${index + 1} OF 4`, 66, 248);
              context.fillStyle = "#20382f";
              context.font = "30px Segoe UI, sans-serif";
              wrap(lesson.points[index], 66, 302, 764, 46);
              for (let i = 0; i < 4; i++) {
                context.fillStyle = i <= index ? "#267b66" : "#cbddd5";
                context.fillRect(40 + i * 213, 497, 181, 6);
              }
              context.fillStyle = "#50665d";
              context.font = "17px Segoe UI, sans-serif";
              context.fillText(
                "Original demo lesson • silent, with captions",
                40,
                553,
              );
              // A changing frame keeps the canvas stream clock advancing between slides.
              context.fillStyle = "#267b66";
              context.fillRect(0, 594, 900 * Math.min(1, elapsed / 16000), 6);
            }
            draw(0);
            const poster = canvas.toDataURL("image/png").split(",")[1];
            const recorder = new MediaRecorder(canvas.captureStream(10), {
              mimeType: "video/webm;codecs=vp8",
              videoBitsPerSecond: 180000,
            });
            const chunks = [];
            const finished = new Promise((resolve, reject) => {
              recorder.ondataavailable = (event) => {
                if (event.data.size) chunks.push(event.data);
              };
              recorder.onerror = reject;
              recorder.onstop = async () => {
                const blob = new Blob(chunks, { type: recorder.mimeType });
                const data = new Uint8Array(await blob.arrayBuffer());
                let binary = "";
                for (const byte of data) binary += String.fromCharCode(byte);
                resolve(btoa(binary));
              };
            });
            recorder.start();
            draw(0, 1);
            const began = performance.now();
            await new Promise((resolve) => {
              const timer = setInterval(() => {
                const elapsed = performance.now() - began;
                draw(Math.min(3, Math.floor(elapsed / 4000)), elapsed);
                if (elapsed >= 16000) {
                  clearInterval(timer);
                  resolve();
                }
              }, 100);
            });
            recorder.stop();
            return { poster, video: await finished };
          }, outline);
          const video = Buffer.from(result.video, "base64");
          const poster = Buffer.from(result.poster, "base64");
          const vtt =
            "WEBVTT\n\n" +
            outline.points
              .map((point, index) => {
                const seconds = (number) =>
                  `00:00:${String(number).padStart(2, "0")}.000`;
                return `${index + 1}\n${seconds(index * 4)} --> ${seconds((index + 1) * 4)}\n${point}\n`;
              })
              .join("\n");
          await Promise.all([
            fs.writeFile(`public/media/${outline.id}.webm`, video),
            fs.writeFile(`public/media/${outline.id}.png`, poster),
            fs.writeFile(`public/media/${outline.id}.vtt`, vtt),
          ]);
          manifest.push({
            id: outline.id,
            bytes: video.length,
            sha256: crypto.createHash("sha256").update(video).digest("hex"),
            frames: 4,
            captionSeconds: 16,
          });
          console.log(`Recorded ${outline.id}: ${video.length} bytes`);
        } finally {
          await page.close();
        }
      }),
    );
  }
} finally {
  await browser.close();
}
await fs.writeFile(
  "verification/course-media-manifest.json",
  JSON.stringify(
    manifest.sort((a, b) => a.id.localeCompare(b.id)),
    null,
    2,
  ) + "\n",
);
