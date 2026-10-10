import type { Page } from "@playwright/test";

// Deterministic SDK boundary tests; actual third-party playback is verified separately.
export async function controlYouTube(page: Page) {
  await page.route("https://www.youtube.com/iframe_api", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `
      window.__ytTest = {};
      window.YT = { Player: class {
        constructor(frame, { events }) {
          this.frame = frame; this.time = 0; this.state = -1;
          const id = new URL(frame.src).pathname.split('/').pop();
          window.__ytTest[id] = (state, seconds = 0) => {
            this.state = state; this.time = seconds;
            events.onStateChange({ target: this, data: state });
          };
          queueMicrotask(() => events.onReady({target:this}));
        }
        getCurrentTime() { return this.time; }
        getPlayerState() { return this.state; }
        getIframe() { return this.frame; }
        destroy() { this.frame.remove(); }
      }};
      window.onYouTubeIframeAPIReady?.();
    `,
    }),
  );
  await page.route("https://www.youtube-nocookie.com/embed/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="en"><title>Controlled YouTube boundary</title><body><button>Play video</button><p>Controlled iframe response for integration checks.</p></body></html>',
    }),
  );
}
