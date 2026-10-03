# ITLegend course player

An isolated Next.js App Router + TypeScript frontend. M1 provides six course cards, anonymous course routes, a responsive player preview, course facts, curriculum accordions and URL-addressed lesson selection. The existing private learning platform is not imported or changed.

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
- `src/features/catalogue`: server-rendered cards with images, status, progress and Start/Continue links.
- `src/features/course`: server-rendered course layout/header/materials/comments/preview. Only the client curriculum owns accordion state, receiving its needed data subset; selected lesson content comes from validated URL parameters, supporting direct links/back/forward.
- `public/images`: small original SVG illustrations with intrinsic dimensions. `next/image` handles images; SVGs are served without unnecessary raster conversion. No network-hosted fonts/media or large UI dependency is used.
- `tests/e2e`: observable catalogue, selection, responsive, keyboard and invalid-route journeys.

Styles use CSS Modules and shared color variables. Desktop puts the player on the left and curriculum on the right; widths under 1024 stack video, controls, materials, curriculum and comments. Narrow widths collapse later groups by default; explicit toggles are retained. One course dataset is used at every width. The full course title wraps naturally and metadata is not duplicated to imitate the desktop screenshot's conflicting facts.

The sampled action teal was darkened to `#23816f` for white-text contrast (approximately 4.73:1); progress retains the sampled green. The system font, original illustrated poster and lesson-caption/description are provisional deviations; pixel fidelity and complete accessibility/performance remain later verification work. See `ASSETS.md` for provenance and outstanding asset policy.

## Milestone boundary

M1 is a working navigation/layout baseline. Video playback, sticky player, Wide/fullscreen, progress updates/animation/session store, PDF/exam dialogs, question drafts, comment submission and leaderboard remain pending. Playback/resource/question/leaderboard/comment submission controls are explicitly disabled rather than claiming working behavior. Seeded progress is internally consistent but not yet mutable. PDF/exam rows currently select a resource preview.

The SEO reference has five completed lessons out of eight (63% rounded). Completion/level thresholds are demo engineering defaults, not official competition rules. Other courses cover 0%, partial and complete status with varying title/lesson lengths.

## Browser verification

```sh
npm run test:e2e
```

Build first. The suite uses an isolated installed Google Chrome browser and starts/reuses the production localhost server on port 3100. To use a Playwright-installed Chromium instead, install its browser (`npx playwright install chromium`) and set `PLAYWRIGHT_CHANNEL=chromium`; use `PLAYWRIGHT_CHANNEL=msedge` where only Edge is available. In PowerShell, set a channel with `$env:PLAYWRIGHT_CHANNEL = "msedge"` before running the suite. Browser/device versions and actual results are recorded in the project vault's Verification-Log, not assumed from a running server.

The suite checks all six cards, matching progress/counts, two lesson selections, accordion state, browser back, invalid/foreign lesson IDs, missing course 404, image loading, console/runtime errors, eight viewport widths, keyboard navigation and section links. It captures desktop/mobile screenshots under `verification/`. Emulated viewport checks do not establish actual phone fullscreen/orientation/PDF behavior. No official judging score is claimed.

M1 verification on 2026-10-03 passed a clean lockfile install, typecheck/lint/rule guards, formatting, production build and all five Chrome browser tests. Results and reviewed screenshots are in [verification/README.md](verification/README.md).

## Submission status

Local development only. No remote repository, publication, deployment or submission has been created. The competition requires a public GitHub repository and anonymous live demo later. Displayed deadline is 31 October 2026 at 9:59 p.m., timezone unresolved; AI/reuse/external-assets/extras policies remain unanswered in the official sources read. This implementation is not asserted competition-cleared.

Official technical references checked 2026-10-03: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [dynamic routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes). Requirements, source evidence and handoff remain in the parent Obsidian vault; they are not copied into app history.
