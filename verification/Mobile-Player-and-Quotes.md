# Mobile player and leaderboard correction

Verified and published 11 October 2026 (Asia/Beirut). This follow-up fixes the reported mobile overlap and removes the leaderboard pause/resume action, with slower quote changes.

## What changed

- Only the video stays pinned on mobile. Its source link, completion button and explanation scroll normally. Desktop and Wide mode have a separate grid area for these controls.
- A CSS height fallback protects direct section links before the player is measured. Short screens (at most 500px tall) and wider mobile screens (width/height at least 3:4) use normal page scrolling.
- Completion keeps the button width stable. Immediate native scrolling makes focus and section navigation predictable; dialog, card and typing animations remain.
- The pause/resume button and unused styles are removed. Quotes change every nine seconds. Reduced-motion preferences show static text, and timers are cleaned up on close.
- Shared dialog content is a named, keyboard-focusable scroll region with a visible inset focus outline. Tests cover Tab, PageDown and focus return.

## Evidence behind the fixes

On the original public page at 320×680, the sticky region was 423.39px tall. The Comments heading occupied y=365.55–398.05, completely behind it. The correction pins a 200px video at that width, leaving the heading exposed. The document did not overflow horizontally.

A hosted check also caught missed curriculum navigation on a short screen. Completing a video shrank its button from 192.28px to 120.17px and moved navigation upward by 56px. Stable width fixes that shift. A later landscape failure showed that width alone did not resolve activation: global smooth scrolling could still race automatic control scrolling. Immediate scrolling resolved the remaining failures. An independent browser check at 360×500 confirmed the correct curriculum hash, heading at y=24.23 and a 200px completion button.

## Verification

Final runtime/source: `7cd0bddac63d80c2d4b642e024b101da64fdab12`.
Local production build: `6rp4caO2jRjGPg3QzU79D`.

| Scope | Result | Evidence |
| --- | --- | --- |
| Final targeted local journeys | 10 passed in 35.52s | `mobile-quotes-final-20261011-targeted-results.json` |
| Final viewport/dialog regression | 30 passed in 154.95s; 19 touch configurations, 320–2560px widths | `mobile-quotes-final-20261011-device-results.json` |
| Final public production journeys | 19 passed in 80.84s | `mobile-quotes-hosted-final-20261011-results.json` |
| Code quality | TypeScript, affected ESLint, formatting and production build pass; full lint/rule guards passed for the initial change | Terminal results recorded in the project verification log |
| State invariants | All 17 existing tests pass; state modules and dependencies unchanged | Initial correction validation |

The passing browser runs have no retries, skips, flaky results or unexpected failures. The hosted scope includes nine layouts with ordinary unforced interactions, stable completion controls, direct links, 500/501px boundaries, quote timing, reduced motion, keyboard scrolling, question CTAs, storage failures, Wide playback state, PDF/exam completion and 200% text reflow. These are separate runs with identified scopes, not one combined suite.

Four final hosted community scans and ten core states report zero Axe violations, with seven incomplete rule instances: four `frame-tested` and three `color-contrast`. Quote-panel scans use reduced-motion static text; normal typing and rotation have separate clock-controlled assertions. Earlier four menu scans also reported zero violations, without a full incomplete export. This is not formal WCAG or assistive-technology certification.

Diagnostics remain available: initial scroll-region accessibility failure; first hosted run with 11 passes, one failure and seven not run; stable-width-only local run with two passes, one failure and seven not run. Initial source `abf0810` had passing local runs of 16, 50 and two checks before the hosted navigation issue was discovered. Files beginning `mobile-quotes-20261011` and `mobile-quotes-hosted-20261011` belong to that earlier scope. The final capture set retains 12 selected images; 37 redundant current-run untracked captures were removed within the verified evidence directory. Original design and historical artifacts remain untouched.

## Publication

[Public demo](https://itlegend-course-player-taupe.vercel.app/) · [Repository](https://github.com/ahmadkassar1/itlegend-course-player)

Final production deployment `dpl_2KdKD2RUYduwheUMV9yY4iRRFj6i` is READY, using 89 filtered source files (599,213 bytes). Only two blobs changed from the first correction. The public alias is assigned to this release. Provider records capture 100 build events, cache reuse and a 16-second build; engine/peer warnings are retained. The first correction deployment is recorded separately. This is a source-upload release; Git auto-deployment was not added.

Both fix commits were pushed with the configured user author and committer. No dependency, storage schema, authentication/protection, private project, paid resource, terms acceptance or competition submission changed.

YouTube boundaries are controlled in automated tests. Separate browser checks loaded the original native player/thumbnail but did not observe complete external playback. Exact original assets, physical-device acceptance and organizer-policy questions remain open; this report does not certify competition acceptance.
