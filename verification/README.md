# Verification evidence index

Current release: [GitHub and acceptance review](GitHub-and-Acceptance.md). Deployment evidence: [Shared controls and release](Shared-Controls-and-Release.md). Published media: [Real YouTube content](Real-YouTube-Content.md). Each report identifies its revision, verified scope and limits.

The dated reports below preserve earlier implementation evidence. Their fictional-course datasets, screenshots, local paths and source-document references describe those historical revisions and may not exist in the current public runtime. The original supplied design documents and the private Obsidian vault are intentionally outside this repository.

Historical source/layout reviews: [Figma-Inventory.md](Figma-Inventory.md), [Screenshot-Implementation.md](Screenshot-Implementation.md), [Design-Review.md](Design-Review.md). Previous milestone evidence: [M2.md](M2.md), [M3.md](M3.md), [M4.md](M4.md), [M5.md](M5.md). Captures and raw reports are retained for provenance; they are not all captures of the latest code.

The following M1 report is historical. Its absent media/PDF/dialogs and system-font descriptions were superseded by later milestones.

## M1 baseline verification

Verified 2026-10-03 on Windows, Node 22.14.0, npm 10.9.2, Next 16.3.8, React 19.3.0, TypeScript 5.9.3, ESLint 10.12.0 and Playwright 1.63.0. Browser: installed Google Chrome 154.0.8037.97, headless, isolated browser context. Production server: `http://127.0.0.1:3100`.

`npm ci`, `npm run check`, `npm run format:check` and `npm run build` passed. Build produced the catalogue and not-found static pages, with course pages rendered on demand. The final `npm run test:e2e` run passed five tests in 28.1 seconds:

- All six course cards open anonymously, with expected titles, loaded images and matching catalogue/player percentages and lesson counts. No console error or uncaught page exception occurred in this journey.
- URL selection, visible/current lesson, mobile accordion toggling, browser back/forward and invalid/foreign lesson fallback remain coherent; PDF selection shows its explicitly unavailable resource preview.
- Catalogue and three course pages fit widths 320, 360, 390, 430, 768, 820, 1024 and 1440 without horizontal overflow. Wide layouts preserve player-left/curriculum-right; narrow layouts preserve preview/materials/curriculum/comments order.
- Keyboard skip/course/section links and missing-course 404/return-to-catalogue work.
- The longest seeded selected lesson title at 320px stays below the preview control without obstructing it.

Screenshots were inspected against the local reference export's layout relationships. Capture scrolls through images before returning to the top, ensuring lazy-loaded avatars are visible. This is human visual review, not an automated pixel-diff score:

- [Desktop catalogue, 1440px](m1-desktop-catalogue.png)
- [Mobile catalogue, 430px](m1-mobile-catalogue.png)
- [Desktop player, 1440px](m1-desktop-player.png)
- [Mobile player, 430px](m1-mobile-player.png)
- [Narrow player with long selected title, 320px](m1-narrow-player.png)

Original illustration/system font, canonical syllabus/metadata and added lesson caption are recorded deviations. No actual video/PDF/exam/dialog/comment-submission behavior, full accessibility audit, performance score, real-phone fullscreen/orientation behavior or final fidelity is established by these checks. Browser viewport emulation is not a physical mobile-device test.

The production-only dependency audit reports zero advisories. The full audit reports five high entries belonging to one unpatched development lint-tool chain; compatibility peer warnings also remain. See the main README for the upstream advisory and compatibility guard details. They are follow-up tooling issues, not assertions that the full dependency tree is advisory-free.

The parent vault retains detailed source dates, preservation checks, policy uncertainties and restart instructions. Only this new application and its evidence belong to this independent local Git repository; there is no remote, deployment or submission.

Current content/state milestone: [Content-and-Persistence.md](Content-and-Persistence.md), with course-media manifest, actual PDF/caption/hash checks, browser storage recovery/reset flows and fresh production evidence. Prior reports retain their historical runtime and asset scope.
