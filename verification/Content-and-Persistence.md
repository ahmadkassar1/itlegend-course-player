# Course content and durable learner state

2026-10-04, DEC-017 / TASK-018 / user REQ-035. Feature revision `00a1d80` (full SHA recorded in performance evidence), production build `KUgOQbIy5XKd-rlwBYZs2`. Documentation/evidence are committed separately.

## Change and scope

The user's next-step request authorizes replacing generic fixtures and refresh-reset behavior. Reference geometry, SEO curriculum labels, six routes, stable lesson IDs, initial lesson counts and completion history remain. The supplied SEO title/development syllabus conflict remains explicit. This is original fictional frontend demo content, not real students, instructor endorsements, commercial lectures or a backend.

| Course                 | Lessons | Videos | Worksheet | Assessment | Initial history |
| ---------------------- | ------: | -----: | --------: | ---------: | --------------: |
| Starting SEO           |       8 |      6 |         1 |          1 |       5/8 (63%) |
| Web Design Foundations |       6 |      4 |         1 |          1 |        0/6 (0%) |
| JavaScript Essentials  |       8 |      6 |         1 |          1 |       3/8 (38%) |
| Responsive CSS         |       7 |      5 |         1 |          1 |        0/7 (0%) |
| React Components       |      10 |      8 |         1 |          1 |      7/10 (70%) |
| Accessible Interfaces  |       6 |      4 |         1 |          1 |      6/6 (100%) |

`course-content.json` is the checked-in source of truth: 45 topic outlines, 18 course-specific fictional reviews, six four-exercise worksheets, six five-question/four-option assessments with explanations and six fictional peer groups with distinct counts. No active Student Name Goes Here/lorem ipsum fixture or generic shared learning quiz remains. Five supplemental courses' last two video slots become worksheet/assessment lessons without changing their IDs or counts. Mock completion history can include a previously completed assessment without a stored attempt; new attempts are recorded separately.

Each of 33 videos has its own four-step Canvas recording, first-frame poster, WebVTT captions and transcript. They are short silent demonstration summaries. Video rows use rounded one-minute allowances; worksheet/exam time is suggested practice time and week counts are fictional pacing, not recorded video runtime. The original source photo/avatars remain unavailable; illustrative catalogue assets and demo posters do not establish exact photographic fidelity.

Six new one-page PDFs are generated from the same JSON as accessible dialog text and rendered to PNG with Poppler. All pages visually reviewed; a faint page number was corrected and all final renders checked. Existing study-plan/learning-plan and design sources are preserved as historical assets; no reference screenshot crop or private code is imported. Generation uses already installed/bundled authoring tools, with no dependency installation or runtime Python/Poppler requirement.

## State architecture and tradeoffs

Provider-owned immutable learning/interaction stores retain cached server snapshots. The coordinator restores after mount through `useSyncExternalStore`, saves one versioned envelope, and keeps typing outside progress/media subscriptions. Explicit lesson URLs take precedence after restoration. IDs, options, indices, finite positions, bounded drafts/messages and parseable dates are validated; unknown data is discarded. Scores are derived from valid answers rather than trusting saved numbers. Valid submitted exams reconcile missing completion after interrupted writes.

Completion is action-derived and idempotent: ended video, explicit Mark read, or fully answered submitted exam. Catalogue/player/current level/leaderboard use the same counts. Drafts, latest 50 questions/reviews per course, exam index/answers/result, current lesson and playback position on pause/seek/hide survive same-origin reloads. A confirmed catalogue reset replaces all history with the mock baseline; cancelling preserves it. Storage errors preserve memory-only functionality with truthful confirmations.

Browser history is unauthenticated, device/origin-specific, user-editable and not a secure grade record. No live tab synchronization: last whole-envelope write wins. Schema/content-version changes return to the demo baseline. Cleared/private/blocked/quota storage can prevent retention. Posts remain local and are not sent to an instructor. Cross-reload persistence is an authorized realism improvement, not an explicit Figma requirement.

## Verification

Initial 35-flow run: 31 passed, four stale assertions failed (old description, shared-clip URL, expected reload-reset index, old post confirmation). Those assertions were updated without weakening recovery/focus/content checks. The next 35-flow production run passed; raw reports are retained separately. A subsequent recovery safeguard adds one browser and one unit check; final results follow below.

Final code checks: production build, typecheck, ESLint/active-rule guard and formatting pass; 16/16 unit checks pass. Full production Chrome run: 36/36 in 201.275663s from 2026-10-04T11:22:06.590Z, one worker/no retries/skips/unexpected/flaky. `realism-browser-results.json` records the complete UI/state run. Axe scanned 22 rendered states with zero reported violations and two desktop contrast incompletes (leaderboard subtitle/exam error background inference); these are not certification.

The subsequent binary decoder found shortened early recordings despite functional playback passing. The recorder was corrected to disable background throttling and emit continuously changing frames. All 33 final clips now decode, have four distinct frames and run 15.900358–15.920016 seconds. Combined video payload 4,417,226 source bytes, loaded only by individual lesson intent; 16-second VTT cue bounds include the final frame rounding. Eight filmstrips visually reviewed, including the initially suspect recordings; no clipped text observed. `course-media-manifest.json` and `realism-media-results.json` identify the final files. The initial manifest is retained to explain the correction.

After regeneration, all 15 affected production playback/loading/persistence/resource flows pass in a separate final-media run. This is additional affected-flow verification, not a claim that the complete 36-flow run used the later video bytes. The application bundle/build stayed unchanged. `realism-media-final-browser-results.json` and `realism-media-final-*` captures preserve that run. One automatic approval-review timeout was retried once successfully; no action remained blocked.

Actual PDF text checks confirm six single-page PDFs contain the expected headings and sections; 33 captions match their unique outlines. Final renders, desktop/mobile catalogue/player/exam/PDF captures and media filmstrips were inspected. Original DOCX/PNG/study-plan video/learning-plan PDF/render hashes match five prior recorded values in `realism-content-assets.json`. No package-lock/dependency/source-reference or .obsidian settings change was made.

Fresh production performance/payload observations follow in the final measurement section. No exact fidelity, physical-device behavior, WCAG certification, field performance, official judging score or submission clearance is claimed.

## Sources and remaining work

Sources read 2026-10-04: project AGENTS/Current-State/Latest-Handoff, original DOCX/image and nine preserved reference screenshots via prior full inventory; source inventory remains [Figma-Inventory.md](Figma-Inventory.md). Arabic popup/progress behavior and catalogue requirements remain unchanged. Technical sources checked 2026-10-04: [React cached external-store and server snapshots](https://react.dev/reference/react/useSyncExternalStore), [MDN localStorage persistence and access errors](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). React/Next skill review retained server fixtures, deferred dialogs, focused hooks, native controls and minimal validation seeds.

Exact portraits/photo/font metadata, conflicting reference desktop/mobile facts/syllabus/comments, illustrated timer currently untimed, lock/unlock policies, physical phone/Safari/auto-rotate-off/touch/keyboard/native zoom/screen reader and hosted performance remain open. Official timezone/AI/reuse/assets/extras/eligibility nuance and GitHub destination remain unanswered; silence is not permission. No remote, push, deployment, submission or private history/code import. Next M6 current official rules/rubric/readiness audit after bounded content verification; settings recommendation GPT-6.1-sol/high, unchanged.

## Final production measurement

Twelve fresh cache-disabled navigations at feature revision `00a1d80e9dee6664202dd7af695fa3d42665e899` / build `KUgOQbIy5XKd-rlwBYZs2`, three per route/profile. Desktop1440×1000/DPR1/local network; mobile430×932/DPR2/touch,4× CPU,150ms latency,1.6Mbps down/0.75Mbps up. Warm localhost server, four-second post-load observation, no user input. This is a bounded lab, not Lighthouse, field CWV/INP or hosted performance.

| Profile       | Route                   | Median observed LCP | Maximum observed CLS |
| ------------- | ----------------------- | ------------------: | -------------------: |
| desktop-local | `/`                     |              516 ms |           0.00000161 |
| desktop-local | `/courses/starting-seo` |              352 ms |           0.00120284 |
| mobile-lab    | `/`                     |             1540 ms |           0.00000000 |
| mobile-lab    | `/courses/starting-seo` |             1540 ms |           0.00000000 |

No observed page/console errors in the twelve runs. Video/PDF payloads absent before intent; PDF preview fetched after Open, individual video after Play. Course-content review/worksheet/quiz phrases absent from emitted client JavaScript; display data is serialized by server routes, not imported as a client fixture module. Full requests/timing/raw shifts/chunk/asset inventory: `realism-performance.json`. Small desktop shifts were observed rather than rounded to zero. Measurements do not establish behavior on a physical phone or under an authenticated backend workload.

Axe's two raw contrast incompletes were supplemented by rendered style/visibility/Close-overlap checks: leaderboard subtitle9.5484:1, exam error7.6779:1, both visible and not overlapping Close. Both desktop states captured and visually inspected; this supplements the scan and does not replace manual assistive-technology review. Evidence: `realism-incomplete-contrast.json`.
