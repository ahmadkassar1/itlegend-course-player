import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

// Original, silent instructional clip; no third-party footage or reference crop.
const poster = await fs.readFile("public/images/lesson-poster.svg", "base64");
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage();
  await page.setContent('<canvas width="900" height="600"></canvas>');
  const encoded = await page.evaluate(async (source) => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = `data:image/svg+xml;base64,${source}`;
    await image.decode();
    const recorder = new MediaRecorder(canvas.captureStream(12), {
      mimeType: "video/webm;codecs=vp8",
      videoBitsPerSecond: 400000,
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
        let text = "";
        for (const byte of data) text += String.fromCharCode(byte);
        resolve(btoa(text));
      };
    });
    const steps = [
      "Choose one topic to learn",
      "Set a small, clear goal",
      "Practice with a simple example",
      "Review what you have learned",
    ];
    let frame = 0;
    function draw() {
      context.drawImage(image, 0, 0, 900, 600);
      context.fillStyle = "rgba(8,25,18,.76)";
      context.fillRect(0, 430, 900, 170);
      context.fillStyle = "#fff";
      context.font = "600 32px Segoe UI, sans-serif";
      context.fillText(steps[Math.min(3, Math.floor(frame / 36))], 36, 496);
      context.font = "20px Segoe UI, sans-serif";
      context.fillText("A little progress, every day", 36, 537);
      context.fillStyle = "#6abd8a";
      context.fillRect(36, 563, 828 * Math.min(1, frame / 144), 5);
    }
    draw();
    recorder.start();
    await new Promise((resolve) => {
      const timer = setInterval(() => {
        frame += 1;
        draw();
        if (frame >= 144) {
          clearInterval(timer);
          resolve();
        }
      }, 1000 / 12);
    });
    recorder.stop();
    return finished;
  }, poster);
  await fs.mkdir("public/media", { recursive: true });
  const bytes = Buffer.from(encoded, "base64");
  await fs.writeFile("public/media/study-plan.webm", bytes);
  console.log(`Original study-plan.webm saved: ${bytes.length} bytes.`);
} finally {
  await browser.close();
}
