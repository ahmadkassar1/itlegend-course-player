# Submission and device audit

The current published-video catalogue/player replacement is recorded in [Real-YouTube-Content.md](Real-YouTube-Content.md): four verified Ali Shahin entries, original titles/thumbnails, zero fabricated learner history, native playback/pause/resume observation,49 full browser checks plus28 affected checks after a narrow-screen copy correction. Application revision311e857/buildTN_kcJcwyMYH4vA3QNdNY. Earlier84-case [Catalogue-Discovery.md](Catalogue-Discovery.md), learner-feedback and installed-Edge/performance sections retain their historical revisions. Public links, physical devices, exact Figma assets and submission-policy acceptance remain open.

## Installed-browser and current-build follow-up — 10 October 2026

DEC-022 starts from documentation revision `41fd9a2c1afd3108642dd498b21c15d41c9517e8`, runtime `e06f890ca0202c0b0b1fcfab08db22e3aafcd4d3`, production build `2Ixz2_4_cfdvhk01D1bdH`. No application, test, media or dependency source changed. The existing localhost preview on port 3100 was reused. Prior 76 Chrome checks, 17 units and code/build checks remain evidence for this runtime; they were not unnecessarily repeated.

**All 50 selected production Edge checks passed**, from `2026-10-10T06:59:17.666Z` in 248.71485 seconds, one worker, no retries/skips/unexpected/flaky results. The command used `PLAYWRIGHT_CHANNEL=msedge`, `VERIFICATION_MILESTONE=edge-20261010` and `test --grep-invert '(touch|mouse) layout'`. This excludes the 26 standalone viewport-profile cases already covered by Chrome; it retains responsive baselines, tablet/intermediate widths, keyboard/text enlargement, all course journeys, media/dialogs, local-state recovery, bounded histories and all eight learner-feedback cases. The actual Edge launch reports version `154.0.4258.53` and an `Edg/154.0.0.0` user agent. Edge uses Chromium; this is not independent Safari coverage.

- [Raw Edge test report](edge-20261010-browser-results.json), [browser identity](edge-20261010-browser-identity.json), [layout measurements](edge-20261010-layout-measurements.json).
- [121 local resource URLs](edge-20261010-resource-links.json) pass response/MIME/signature checks. These are not public submission URLs.
- [430px Axe results](edge-20261010-axe-430.json) and [1440px results](edge-20261010-axe-1440.json): 22 states, zero reported violations, three incomplete contrast rule instances retained. [Computed contrast](edge-20261010-contrast.json) passes its nine sampled checks; the separately retained learner-feedback visibility checks resolve their specific targets. This is bounded accessibility evidence, not certification.

Six Edge captures inspected: [desktop](edge-20261010-desktop-player.png), [mobile](edge-20261010-mobile-player.png), [tablet 820px](edge-20261010-player-820.png), [320px exam](edge-20261010-narrow-exam.png), [844×390 exam feedback](edge-20261010-feedback-844×390-exam-error.png) and [320×568 question at its limit](edge-20261010-feedback-320×568-question-limit.png). Layouts remain contained; native vertical scrolling retains the exam/form controls on short displays. A capture of a scrolled dialog can omit content outside its current scroll position. Source photos/avatars and exact font metadata remain unresolved, so these captures do not establish exact Figma fidelity. Only these representative new PNGs are retained; preceding milestone captures are preserved.

After Edge completed, `node scripts/measure-production.mjs verification/final-20261010-performance.json` measured 12 sequential fresh loads in installed Chrome `154.0.8037.98`. [Raw performance data](final-20261010-performance.json) records revision/build, machine, requests, paint/layout/long-task observations and chunk/asset inventories. Desktop is 1440×1000/DPR1 with local CPU/network. Mobile is 430×932/DPR2/touch, 4× CPU slowdown, 150ms latency, 1.6Mbps down/0.75Mbps up. Each route/profile has three cache-disabled fresh contexts, observed through load plus four seconds without input on a warm localhost server. No competing browser suite ran during measurement.

| Profile       | Route      | LCP median (range), ms | Maximum observed CLS | Long-task excess range, ms |
| ------------- | ---------- | ---------------------- | -------------------- | -------------------------- |
| Desktop local | Catalogue  | 404 (304–564)          | 0.0000016113         | 25–40                      |
| Desktop local | SEO player | 352 (340–452)          | 0.001202844          | 35–191                     |
| Mobile lab    | Catalogue  | 1,336 (1,212–1,400)    | 0                    | 241–252                    |
| Mobile lab    | SEO player | 1,392 (1,392–1,416)    | 0                    | 826–1,025                  |

All samples report no captured browser errors or HTTP statuses ≥400. Completed initial Script responses total 150,969 bytes for the catalogue and 167,651 for the player in each sample, including response overhead; compression inventory estimates are not transferred bytes. No video or original PDF request occurs during initial navigation. Two additional unthrottled interaction snapshots confirm a new dialog script after opening a question and a media request after Play; the worksheet uses its optimized page preview, with the original PDF available through its link. Navigation medians are not interaction timings. Long-task excess sums task duration above 50ms during the observation window: player mobile samples still record 826–1,025ms. No field INP, Lighthouse score, hosted-network or actual-device performance is established. These conditions do not support a controlled comparison with prior builds. Preserve the long-task finding for the real-device check; no new optimization or feature is justified solely by these aggregate samples.

Native UI verification could not select Edge: the computer-use browser inventory exposes only the in-app browser and MCP Apps. Consequently native browser zoom remains untested; CSS text enlargement is not its substitute. One new physical-device availability question was sent, with no reply received as of this checkpoint. No device availability, phone access or LAN preview was assumed. No install, remote configuration, private import, push, deployment or submission occurred.

Next acceptance action is a hands-on pass on available physical devices: confirm inline playback, fullscreen with auto-rotate disabled, portrait/landscape return, touch controls, dialog Close/focus, PDF zoom, exam recovery, virtual-keyboard visibility and saved-state reload. Check native browser zoom and a screen reader separately. Record actual browser/OS/device and results; fix observed defects. The current loopback preview is not directly accessible from another device. Public destination/demo preparation and submission remain dependent on the existing policy/design/destination inputs below. Additional feature count has no verified judging benefit. GPT-6.1-sol/high remains appropriate for interpreting device/design defects; no setting was changed.

## Preceding readiness audit

Reviewed 10 October 2026, Asia/Beirut. Starting checkout: `cbdd20afd23bf65154f6570fb8979fd4eabedcf2`; runtime source unchanged from the previous message-history implementation. This review verifies local evidence and identifies publication blockers. It is not a submission, a judging score or a claim of universal device compatibility.

Verification commit: `70d16f20c702d301563910cb486d93add7a61e2a` (`test: verify device layouts and resource links`), using the existing configured ahmad kassar author/committer. Runtime source remains `27b29ceaa3d6cb29669f5e8a90c778fdea14a8c6`; no application, media or dependency changes were needed. The verified local production preview was restored on port 3100, ready in 7.7 s. This does not establish public availability.

## Required links

| Link                                   | Current status                      | Evidence                                                                                                                                                                  |
| -------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public GitHub repository               | Missing from this checkout          | No Git remote. Connected account is `ahmadkassar1`; a focused ITLegend repository search returned no match. This does not exclude a differently named repository.         |
| Anonymous live demo                    | Not configured or supplied          | The localhost production preview is a testing URL, not a public submission URL. No deployment occurred.                                                                   |
| Official challenge and submission form | Current access unavailable          | Web reader could not open the challenge or terms; one in-app browser fallback timed out. No repeated retries. Last successful official-page inspection remains 4 October. |
| Optional CV/post links                 | Optional; not prepared or submitted | Last verified form and journey mark these optional. No external post, upload or message occurred.                                                                         |

The last verified official form at [the frontend challenge](https://challenges.itlegend.net/frontend-hiring#submit) requires name, email, WhatsApp number, a public repository URL, an anonymous demo URL and technologies used, with terms consent. Read the current [terms](https://challenges.itlegend.net/terms) before submitting. The displayed 31 October 2026, 9:59 p.m. deadline still lacks a confirmed timezone. AI assistance, reuse, assets, extras and eligibility nuance remain unanswered; silence is not permission. Historical capacity figures are not a current reservation.

## Source and code review

The Arabic DOCX responsiveness requirements explicitly name desktop, tablet and mobile; forbid horizontal scrolling, overlap and broken layouts; require varied text/lesson counts and usable mobile controls (paragraphs 25–29). Paragraphs 30–41 require small reusable components, clear names/folders, separated data, no harmful fixed dimensions, a clear README/meaningful commits, production testing, efficient assets/loading, semantic HTML/alt text/contrast, and Next.js App Router with TypeScript.

The original DOCX and Figma image hashes still match the preserved sources. All 11 screenshot hashes match their existing manifest. Desktop/mobile references were reread. Existing font/photo/portrait substitutions and conflicting desktop/mobile presentation remain explicit fidelity gaps; do not mark REQ-005 accepted from passing layout checks.

Applied the React best-practices and verification skills. The learner story is catalogue → selected course/lesson → resources or learner forms → validated browser-local state → updated UI/catalogue. There is no backend API, authentication service or credential setup to invent or verify. Server routes validate slugs and lesson parameters and resolve independent inputs together; server-rendered facts/sample reviews stay slots. Provider-owned learning/interaction stores keep drafts separate from media/progress updates. Shared dialog/form/history/curriculum components handle native semantics and cleanup; dialogs/media/resources load on intent. Text renders literally and bounded saved data is validated. The audit found no justification for a broad refactor or new dependency.

Source searches found no TODO/FIXME/HACK, `as any`, `@ts-ignore`, disabled lint rules or unsafe HTML insertion. Tracked environment/key/build/dependency/test-output paths were absent. README and asset-note local links resolve. These are scoped checks, not security certification or proof that every historical secret has been cleared.

The ranking UI is a semantic ordered list, rather than an unrequested table redesign. “Table view” was interpreted as tablet layout; learner-list readability is also included.

## Device coverage

The expanded suite uses 26 CSS viewports, including 17 touch contexts with DPR 2 or 3 and nine mouse contexts with DPR 1. It covers portrait/landscape phones and tablets, breakpoint boundaries and desktop/large desktop layouts:

| Group                     | Viewports                                                              |
| ------------------------- | ---------------------------------------------------------------------- |
| Phone portrait            | 320×568, 360×800, 375×667, 390×844, 412×915, 430×932                   |
| Phone landscape           | 568×320, 667×375, 844×390, 932×430                                     |
| Tablet portrait/landscape | 768×1024, 800×1280, 820×1180, 1024×1366, 1024×768, 1180×820, 1366×1024 |
| Breakpoint edges          | 767×900, 768×900, 1023×900, 1024×900                                   |
| Desktop                   | 1280×720, 1305×1000, 1440×900, 1920×1080, 2560×1440                    |

Each new case checks six catalogue cards, seeded progress, player/comments bounds, all four popup bounds and horizontal containment, visible/reachable Close controls, literal question submission, leaderboard rows/current learner and console errors. Touch contexts activate controls through taps. Existing tests retain text enlargement/spacing, long Arabic/unbroken histories, varied lesson counts, keyboard/focus, playback/fullscreen, progress, persistence/failure/reset, captions, PDF/exam behavior and loading-intent checks. A separate check requests every course page and referenced local image/video/caption/PDF, verifying status, MIME type and media/file signatures.

These are Chromium viewport/touch checks, not physical iPhone/iPad/Android/Safari results. Real-phone fullscreen with auto-rotate off, Safari, native browser zoom, screen-reader interaction and actual touch/virtual-keyboard behavior remain unverified. No WebKit/Firefox browser was downloaded. Finite viewport coverage cannot certify every device.

## Verification results

Type/lint/active-rule/format checks, 17 unit tests and a fresh production build pass. New-test ESLint and formatting checks also pass. Build ID: `noDeVYLoYWQJMiYKw7lbus`. Compilation took 73 s and TypeScript 30.5 s on this machine; these are build timings, not user-page performance.

**All 68 production Chrome checks passed**, in 574.811049 seconds from `2026-10-10T05:27:50.176Z`, with one worker, no retries, skips, unexpected results or flaky passes. This includes the original 41 checks, all 26 new viewport cases and the local-resource audit. Raw report: `release-20261010-browser-results.json`; geometry: `release-20261010-device-measurements.json`.

All six course pages and **121 unique asset URLs** resolve: 33 WebM lessons, 33 WebVTT captions, six PDFs, 39 PNGs and ten SVGs. Status/MIME type/nonempty responses and PDF/WebM/WebVTT signatures were checked. Raw URLs/statuses/byte counts: `release-20261010-resource-links.json`. These are local production URLs; they do not establish future hosted-link availability.

The 22 rendered Axe states had zero reported violations, with three incomplete color-contrast rule instances. Targets are the same short gradient question numbers, exam error and long leaderboard subtitle previously checked supplementally in [Submission-Readiness.md](Submission-Readiness.md); runtime styling and assets are unchanged. The new populated-history dialog scans also report zero violations. Incompletes and actual-device review limits remain visible; no formal WCAG certification is claimed. Fresh raw scans: `release-20261010-axe-430.json`, `release-20261010-axe-1440.json`; computed contrast: `release-20261010-contrast.json`.

Fresh phone/tablet/desktop captures were inspected: 390×844, 820×1180, 1366×1024 and 1305×1000 player layouts; 320×568 and 820×1180 leaderboards; 430px exam. Text wraps, ranking rows remain contained, popup Close stays reachable and short displays retain native vertical scrolling. Bounded histories can clip later rows until scrolled, as requested. Photos/font metadata and conflicting source content remain fidelity gaps. No new hosted performance measurement or field score is claimed.

The first run was stopped after the responsive-baseline test exhausted its total 30-second budget during capture preparation, following 32 route/width visits. All reached geometry assertions passed; the failure was in `prepareScreenshot` waiting for a stable element at the end of the test budget. Its timeout is now 90 seconds, matching other long multiviewport checks; geometry assertions and normal action/expectation limits were retained. The interrupted run reported 13 passed tests and this one failure before stopping, including six new phone-portrait touch cases. It did not complete all 68. Retained diagnostic: `release-20261010-baseline-timeout.md`. The corrected check passed in 40.4 s in the final full run. No runtime repair was indicated or applied.

Fresh 10 October npm audit: zero production advisories; five high development-only entries in the same braces → micromatch → fast-glob → Next lint plugin/config chain. The suggested `eslint-config-next` 14.2.35 major downgrade is not a compatible fix for this Next 16 project. No forced downgrade, rule disabling or dependency installation. Raw: `release-20261010-audit.json`, `release-20261010-production-audit.json`.

## Submission verdict and first action

**Not ready to submit.** Public repository/demo links, exact-design acceptance, physical-device checks and official policy/timezone answers remain open. Do not add unrelated features to claim an advantage: the last verified rubric scores fidelity, responsiveness, code quality, interactions and performance/accessibility, with no feature-count criterion.

The next action is targeted design and physical-device acceptance using the existing gap list. Publication then needs the previously requested public GitHub destination for the isolated `challenge-app` and a verified anonymous production demo. No guessed destination, push, deployment or submission occurred in this audit. Once the blockers are resolved and the current form is accessible, the first submission action is to open the frontend challenge’s **submission form**, enter the required participant/link fields, review the current terms and submit only with authorization. Retain the resulting confirmation/tracking details.

Recommended model/effort for the remaining design/device work: GPT-6.1-sol/high; settings unchanged.
