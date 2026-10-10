# Submission and device audit

Subsequent learner-feedback changes and the fresh 76-check run at `e06f890` are recorded in [Learner-Usability.md](Learner-Usability.md). This report retains the source/build conditions of the preceding 68-check audit; its public-link and submission blockers remain open.

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
