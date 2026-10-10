# Copy cleanup and submission readiness

Verified 10 October 2026, DEC-027 / TASK-023. Source and tests: `a4d26f0132686025dc9343280f652ed810f3cddd`. Production build: `4VO7Kr1kvzGtGqb6WdXBr`. Later documentation/evidence commits do not change that runtime.

## Changes

The screenshot's visible “Pause encouragement” wording is replaced by a shared pause/play icon in a 44px button with an accessible action name. The requested Arabic typing messages and 4.5-second rotation remain; reduced motion shows static text without an extra animation-status label. Duplicate leaderboard disclosure and question encouragement filler are removed. Sample-learner labels, actual personal activity, the required thank-you sentence, simulated-review/local-saving disclosure and both question actions remain.

README clarifies fixture versus published-content provenance and the precise viewport boundaries. The [technical report](../docs/TECHNICAL_REPORT.md) describes component responsibilities, state, media, accessibility, limitations and release steps. No dependency, storage schema, media asset or deployment configuration changed.

## Verification

- TypeScript, ESLint/active-rule checks, formatting and the production build pass. The technical report also passes a separate formatting check.
- All **17 state tests** pass. All **65 production Chrome tests** pass from `2026-10-10T13:23:32.244Z` in **291.700727 seconds**, with one worker, no retries, skips, flaky or unexpected results. [Full results](copy-20261010-full-results.json).
- Browser checks cover **30 viewport profiles / 19 touch profiles**, including 320px phones, tablets, portrait/landscape and desktop up to 2560px. Added exact 480/481, 1025 and 1281px profiles complement existing 767/768, 1024 and 1280px checks. These are emulated contexts, not physical-device acceptance.
- The community cases check icon-only pause/play, rotation, reopening, static reduced motion, level selection, sample exclusion from personal storage, and question confirmation/focus/discovery actions. Existing progress, drafts, newest-first bounded histories, storage failures, PDF/exam, custom menus and media-boundary journeys pass.
- Four current leaderboard/question-success Axe scans report zero violations. A 320px subtitle contrast incomplete is supplemented by visible geometry and computed contrast **9.54838:1** at 320/1440px. All four retain cross-origin `frame-tested` incompletes. The [ten-state regression scans](copy-20261010-real-content-axe.json) report zero violations and retain three PDF/exam contrast incomplete instances, nine nodes. Two history and four menu scans assert zero violations without exporting full incomplete results. This does not certify third-party accessibility or screen-reader use.
- The [supplemental probe](copy-20261010-probe.mjs) and [results](copy-20261010-supplement.json) verify keyboard PageDown reaches the personal row at 320px with the close button visible. Eight retained captures were inspected; 29 redundant, untracked screenshots from this run were removed inside the verified evidence directory. Historical evidence and user screenshots were preserved.
- Active TypeScript/TSX inspection finds no console logging, debugger statements, TODO or FIXME markers. All declared packages resolve under `npm ls --depth=0`. It flags local `@img/sharp-wasm32` and `@emnapi/runtime` as extraneous; both have optional entries in the lockfile. No direct dependency was added, and no prune/reinstall or fresh hosted install was performed. Node's experimental type-stripping/module warnings and browser-runner color warnings remain; the entire tooling environment is not claimed warning-free.

Representative captures: [leaderboard](copy-20261010-leaderboard-preview.png), [mobile confirmation](copy-20261010-question-success-320.png), [desktop confirmation](copy-20261010-question-success-1440.png), [tablet layout](copy-20261010-device-820x1180-player.png), [landscape PDF menu](copy-20261010-pdf-menu-844.png), [catalogue](copy-20261010-real-catalogue-desktop.png). Automated SDK/iframe responses are controlled integration boundaries; captured placeholder footage is not a product asset or evidence of actual external playback. Earlier native playback evidence remains separately scoped.

## Submission status

Read-only release checks on 10 October find no Git remote and no `.vercel/project.json`. The official connected-team project search for `itlegend` returns no matches in `team_RLIeoyLb9yDmJN4e3ugjT8Ys`; it does not prove no deployment exists under an unknown name elsewhere. No actual public URL or hosted revision is identified. The pasted “deployed successfully” and “100% ready” claims are therefore unverified.

The production preview is restored at `http://127.0.0.1:3100/`; the course route returns HTTP 200. This is a local link. No upload, remote, push, deployment, competition submission, private import, installation or cost occurred in this milestone. Configured Git author/committer remain the user's existing identity; this does not imply human-only authorship.

Next resolve the existing GitHub destination/visibility and Vercel target replies, finish the authorized release, then check anonymous public links and hosted interactions on the new storage origin. Regenerate the historical release manifest for the selected revision. Exact Figma fonts/assets and physical phone/Safari/rotation-off/fullscreen/native zoom/screen-reader/virtual-keyboard acceptance remain open, as do organizer AI/reuse/assets/extras/eligibility nuance and deadline timezone. No repeated blocked-source research was attempted. Stable acceptance counts remain 44 criteria / 33 checked; local passing checks are not final submission acceptance.
