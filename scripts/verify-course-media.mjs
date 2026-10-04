import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import crypto from "node:crypto";

const manifest = JSON.parse(
  await fs.readFile("verification/course-media-manifest.json", "utf8"),
);
const browser = await chromium.launch({ channel: "chrome" });
const results = [];
try {
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:3100/");
  for (const item of manifest) {
    const bytes = await fs.readFile(`public/media/${item.id}.webm`);
    if (crypto.createHash("sha256").update(bytes).digest("hex") !== item.sha256)
      throw new Error(`Changed media: ${item.id}`);
    const result = await page.evaluate(async ({ id }) => {
      const video = document.createElement("video");
      video.muted = true;
      const loaded = new Promise((resolve, reject) => {
        video.onloadeddata = resolve;
        video.onerror = () => reject(new Error(`Cannot decode ${id}`));
      });
      video.src = `/media/${id}.webm`;
      document.body.replaceChildren(video);
      await loaded;
      const seek = (seconds) =>
        new Promise((resolve) => {
          video.onseeked = resolve;
          video.currentTime = seconds;
        });
      if (!Number.isFinite(video.duration)) await seek(100000);
      const canvas = document.createElement("canvas");
      canvas.width = 900;
      canvas.height = 2400;
      const context = canvas.getContext("2d");
      const hashes = [];
      for (const [index, seconds] of [0.5, 4.5, 8.5, 12.5].entries()) {
        await seek(seconds);
        context.drawImage(video, 0, index * 600, 900, 600);
        const pixels = context.getImageData(0, index * 600, 900, 600).data;
        const hash = await crypto.subtle.digest("SHA-256", pixels);
        hashes.push(
          Array.from(new Uint8Array(hash))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""),
        );
      }
      return {
        duration: video.duration,
        hashes,
        filmstrip: canvas.toDataURL("image/png").split(",")[1],
      };
    }, item);
    if (
      !Number.isFinite(result.duration) ||
      result.duration < 15 ||
      result.duration > 18 ||
      new Set(result.hashes).size !== 4
    )
      throw new Error(
        `Incomplete lesson frames: ${item.id}: ${JSON.stringify({ duration: result.duration, hashes: result.hashes })}`,
      );
    if (
      [
        "introduction",
        "web-design-foundations-3",
        "web-design-foundations-4",
        "javascript-essentials-1",
        "javascript-essentials-2",
        "responsive-css-1",
        "react-components-1",
        "accessible-interfaces-1",
      ].includes(item.id)
    )
      await fs.writeFile(
        `verification/realism-media-${item.id}.png`,
        Buffer.from(result.filmstrip, "base64"),
      );
    results.push({
      id: item.id,
      bytes: item.bytes,
      durationSeconds: result.duration,
      distinctFrames: new Set(result.hashes).size,
    });
    console.log(
      `Decoded ${item.id}: ${result.duration.toFixed(3)}s, four distinct frames`,
    );
  }
} finally {
  await browser.close();
}
await fs.writeFile(
  "verification/realism-media-results.json",
  JSON.stringify(results, null, 2) + "\n",
);
