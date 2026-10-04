# ITLegend course player

An isolated Next.js App Router + TypeScript frontend with six anonymous course journeys, responsive player/curriculum/materials layout and URL-addressed lesson selection. M2 adds inline demo video, mobile sticky behavior, desktop Wide/fullscreen and shared course progress. M3 adds PDF/exam/question/leaderboard popups and demo comments with retained course-scoped state. The existing private learning platform is not imported or changed.

## Run locally

Use Node.js 22.13 or newer within the 22.x release line, or Node 24+. This milestone uses Node 22.14.0 and npm 10.9.2. The project requirement covers ESLint 10's engine range as well as Next.js. Exact installed dependencies are locked in `package-lock.json`.

```sh
npm ci
npm run dev
```

For production verification:

```sh
npm run lint
npm run typecheck
npm run build
npm run start -- --port 3100
```

The dev/start scripts bind to localhost. No account, API credentials or environment variables are required. `http://127.0.0.1:3100` is a local preview, not a deployment.

`npm run check` combines typecheck, lint and a guard check proving the Next/React Hooks/accessibility rules still report invalid snippets. ESLint 10 uses the official `@eslint/compat` bridge for Next preset plugins that still call removed context APIs; rules are retained. `npm run format` / `npm run format:check` provide consistent source formatting.

Tooling limitation recorded 2026-10-03: npm emits legacy peer-range warnings for Next's React/import/accessibility lint plugins; the official compatibility adapter restores their removed context APIs and the active-rule check verifies relevant guards. The complete audit reports five high-severity entries in one development-only chain (`braces` → `micromatch` → `fast-glob` → Next lint plugin/config). [The upstream advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) has no published patched version; the production-only audit reports zero advisories. No forced framework downgrade, rule disabling or vendored dependency patch was applied. Recheck this development-tool issue before final release.

## Structure and rendering

- `src/app`: server route pages, metadata, root layout and not-found handling. Dynamic route/search parameters are awaited.
- `src/data` / `src/types`: six structured course fixtures and explicit lesson/section/comment types.
- `src/lib`: shared progress/status/lesson selectors; lesson counts derive from the actual lessons.
- `src/features/catalogue`: pre-rendered client cards subscribe to their course snapshot; progress and last selected lesson stay consistent with the player after client navigation.
- `src/features/course`: server header/materials/seed comment rows passed as slots to the client layout. Layout modes, media events and curriculum presentation are separate components. Validated URLs remain the selected-lesson source, supporting direct links/back/forward.
- `src/features/learning`: provider-owned in-memory store, pure validated state transitions and narrow course subscriptions. No mutable server singleton, backend, browser/disk persistence or cross-user store. Only the affected course snapshot changes; duplicate completion cannot add credit.
- `public/images`: small original SVG illustrations with intrinsic dimensions. `next/image` handles images; SVGs are served without unnecessary raster conversion. No network-hosted fonts/media or large UI dependency is used.
- `tests/e2e`: observable catalogue, selection, responsive, keyboard and invalid-route journeys.
- `tests/unit`: invalid IDs/positions, idempotent completion, course isolation, stable server snapshots/notifications and progress arithmetic.

Styles use CSS Modules and shared color variables. Desktop puts the player on the left and curriculum on the right; widths under 1024 stack video, controls, materials, curriculum and comments. Below 768 the player stays sticky inside the full course container, with measured section-scroll offsets and a short-viewport height cap. Narrow widths collapse later groups by default; explicit toggles are retained. One course dataset is used at every width. The full course title wraps naturally and metadata is not duplicated to imitate the desktop screenshot's conflicting facts.

The sampled action teal was darkened to `#23816f` for white-text contrast (approximately 4.73:1); progress retains the sampled green. M2 restores a plain poster with centered Play instead of M1's added title/type overlay, and uses approximate reference column proportions. System font, illustrated poster and visible lesson description remain provisional deviations; exact font/photo/layout fidelity and complete accessibility/performance remain later checks. Live Figma timed out; supplied export remains the reference. See `ASSETS.md` for provenance/policy limits.

## Milestone boundary

Inline Play starts a real original silent demo clip with native playback/seeking controls, captions and transcript. No autoplay on lesson navigation; media uses preload="none". Normal/Wide/fullscreen share one mounted video. Changing lesson remounts only that lesson's player and retains its own position. Maximize requests real browser fullscreen or the supported native video fallback; unavailable/rejected requests display a message, without pretending a layout expansion is fullscreen. Physical-phone/auto-rotate-off behavior remains unverified.

Ended video completes once. Catalogue/curriculum share course state; Continue remembers the selected lesson after client navigation. Hard reload/new tab starts from fixtures. Progress animates on viewport entry; reduced motion displays final progress directly. Completion/level rules are engineering defaults, not official policies.

PDF/exam rows now select the resource and open a screen-sized closeable popup; direct resource URLs have an Open button. Ask-question and leaderboard controls open their dialogs. Comments validate blank input and append a local demo row; submitted text is rendered as text, never HTML. All video lessons currently reuse the short original study-plan demo, not actual instructor/course footage. Curriculum minute labels are sample syllabus estimates, not clip duration. Exact media/font sourcing and final fidelity remain open.

The SEO reference has five completed lessons out of eight (63% rounded). Completion/level thresholds are demo engineering defaults, not official competition rules. Other courses cover 0%, partial and complete status with varying title/lesson lengths.

## Dialogs and interaction state

A shared native dialog shell supplies modal semantics/inert background, visible close control, Escape, contained Tab/Shift+Tab, focus return and body-scroll restoration. Resource dialogs cover the viewport above the sticky player. The leaderboard follows the compact white card, tinted Arabic message and rounded row container from the annotated image. The question form shares the comments styling. Dialog modules load on demand.

A separate provider-owned interaction store keeps course drafts/comments/attempts out of the frequently rendered media/progress state. Pure validated transitions reject unknown exams/options, invalid question indices, empty/oversized messages and duplicate submissions. Minimal exam definitions seed the provider; the route supplies selected content. Structured fixtures remain separate from views. Seed comment rows are server slots; new rows and forms are client islands. No API, account, backend or additional dependency is needed.

Answers, current question and submitted result survive close/reopen and client navigation. Question drafts and demo comments stay in their course. Hard reload/new tab resets fixtures, deliberately matching M2's in-memory lifetime; cross-reload persistence remains optional. A fully answered submitted quiz completes once regardless of score; PDF completion requires Mark read, not opening. These are demo defaults, not organizer scoring rules.

The quiz preserves the illustrated blue surface, numbered question navigation, white rounded card and selected-answer state. Its original five questions have stable option IDs and derived scores. It is labelled untimed: the small reference timer does not specify a countdown/failure policy, so no countdown was fabricated. The initial SEO 63% now represents five completed video lessons, leaving the PDF and exam unfinished for a fresh demo attempt.

The sample PDF is original, generated from worksheet.json using authoring-only ReportLab/Poppler tools. The popup displays the actual rendered page with fit/150%/200% zoom, an equivalent accessible text view and the original PDF link. This is the one supplied demo document, not an arbitrary-upload PDF viewer. Its page preview avoids native mobile PDF-plugin reliance and a heavy client renderer; image failure expands the readable text automatically. PDF/media/raster Git attributes prevent text line-ending conversion.

The leaderboard uses explicit fictional learners and current course completion; ties share a rank. Arabic motivational messages have lang=ar/RTL and ordinary emoji, change at the documented course-level thresholds and use original encouraging/firmer copy. They are not authentic Ali Shahin quotes or endorsements.

The requirements explain that a screenshot-only Figma file is intentional. The exported image is the design reference, not a reason to wait for editable components or redesign it. Exact font/photo/spacing, the untimed label, populated sample rows and added functional close controls remain declared fidelity decisions/gaps for M4.

## Browser verification

```sh
npm run test:unit
npm run test:e2e
```

Build first. The suite uses an isolated installed Google Chrome browser and starts/reuses the production localhost server on port 3100. To use a Playwright-installed Chromium instead, install its browser (`npx playwright install chromium`) and set `PLAYWRIGHT_CHANNEL=chromium`; use `PLAYWRIGHT_CHANNEL=msedge` where only Edge is available. In PowerShell, set a channel with `$env:PLAYWRIGHT_CHANNEL = "msedge"` before running the suite. Browser/device versions and actual results are recorded in the project vault's Verification-Log, not assumed from a running server.

The suite checks all six cards, matching progress/counts, two lesson selections, accordion state, browser back, invalid/foreign lesson IDs, missing course 404, image loading, console/runtime errors, eight viewport widths, keyboard navigation and section links. It captures desktop/mobile screenshots under `verification/`. Default reruns use ignored local-current filenames so dated evidence is preserved. To save a milestone, set VERIFICATION_MILESTONE=m3 before running; in PowerShell use $env:VERIFICATION_MILESTONE = "m3". Emulated viewport checks do not establish actual phone fullscreen/orientation/PDF behavior. No official judging score is claimed.

M1 verification on 2026-10-03 passed a clean lockfile install, typecheck/lint/rule guards, formatting, production build and all five Chrome browser tests. Results and reviewed screenshots are in [verification/README.md](verification/README.md).

M2 evidence is recorded separately in the verification directory and parent vault. Viewport emulation cannot establish physical-phone fullscreen/orientation/codec/touch support. Unit tests use Node 22 experimental type stripping; warnings are confined to that runner. No new dependency was installed for M2.

The M2 full suite passed all 11 production browser tests and five unit checks on 2026-10-04. [Results, design gaps and screenshots](verification/M2.md) distinguish verified behavior from provisional assets and physical-device limitations.

M3 on 2026-10-04 passes all 19 production browser tests (82.5 seconds), 11 combined unit checks, type/lint/active-rule guards, format and build. [Requirement mapping, screenshots and limits](verification/M3.md) retain the complete checklist boundary. No dependency or browser was installed for M3.

## Submission status

Local development only. No remote repository, publication, deployment or submission has been created. The competition requires a public GitHub repository and anonymous live demo later. Displayed deadline is 31 October 2026 at 9:59 p.m., timezone unresolved; AI/reuse/external-assets/extras policies remain unanswered in the official sources read. This implementation is not asserted competition-cleared.

Official technical references checked 2026-10-03: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [dynamic routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes). Requirements, source evidence and handoff remain in the parent Obsidian vault; they are not copied into app history.
