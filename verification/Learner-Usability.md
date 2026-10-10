# Learner feedback and usability

Reviewed 10 October 2026, Asia/Beirut. Starting checkout: `3a8b5a0`. Verified source: `e06f890ca0202c0b0b1fcfab08db22e3aafcd4d3`; fresh production build: `2Ixz2_4_cfdvhk01D1bdH`. Local verification is complete; physical-device and submission acceptance remain open.

## Changes

The learner journey remains catalogue → course/lesson → resource or form → validated browser-local state → updated UI. There is no backend or instructor delivery to imply. Existing stores, saved schema, media, dependencies and fixture data are unchanged.

- Incomplete exam submission identifies the number of unanswered questions, focuses visible feedback and provides “Go to first unanswered question.” Keyboard users can Tab from that feedback to the recovery button. Exam navigation focuses and scrolls the current question into view, including after navigation from the bottom of a short screen. Answers, timer and completion rules are unchanged.
- Shared comment/question forms describe their existing 2,000-character limit. The description is visually hidden for normal drafts; at 200 characters remaining it becomes visible. At the limit it explains how to continue editing. Guidance uses the same limit as browser input and store validation; it does not announce every keystroke through a live region. Existing newest-first histories, max-height scrolling and draft persistence remain intact.
- Eight regression cases exercise both behaviors at 320×568, 844×390, 820×1180 and 1440×900. They verify keyboard recovery, prompt visibility, partial-answer retention/reload/completion, maximum-length input, editing, both draft lifetimes, successful posting and horizontal containment.
- The contrast check now finds the actual opaque ancestor behind exam feedback rather than assuming its immediate parent supplies the background.

Source screenshots S7 and S10 were reread. The normal comments layout and blue exam presentation are retained. New guidance appears in exceptional or long-input states. These are user-directed usability improvements, not newly discovered competition rules. Original photos/portraits, font identity, presentation conflicts and physical-device acceptance remain open in the [design report](Screenshot-Implementation.md).

## Verification

TypeScript, full lint/active-rule guards, 17 existing units and formatting passed. Final affected-component lint and a fresh production build passed after error-summary focus was added. **All 76 production Chromium checks passed**, including the previous 68 and eight new regressions, in 359.212224 seconds from `2026-10-10T06:24:10.595Z`, one worker and no retries/skips/unexpected/flaky results. [Raw results](usability-20261010-browser-results.json) identify every test and timing. The [26 viewport measurements](usability-20261010-device-measurements.json) and [121 local resource URLs](usability-20261010-resource-links.json) were extracted from that final run. This includes all six course journeys, playback, PDF/exam completion, saved state, storage failure, histories, keyboard, enlarged/long text and responsive controls.

The fresh 22-state Axe scans report zero violations and three incomplete contrast rule instances: [430px](usability-20261010-axe-430.json), [1440px](usability-20261010-axe-1440.json). Focused error scrolling leaves some gradient navigation/practice-note targets offscreen; the raw incompletes are retained. [Computed contrast pairs](usability-20261010-contrast.json) pass. A supplemental review inspected error, practice-note and both limit hints at 430/1440, scrolled each into view and checked text-line midpoint visibility. Eight measurements pass: exam feedback 7.678:1; practice/limit guidance 4.952:1. Six supplemental rendered-state scans report zero violations with incomplete checks retained in [the raw review](usability-20261010-feedback-contrast.json). Existing unchanged gradient/subtitle evidence remains scoped in [Submission-Readiness.md](Submission-Readiness.md). No formal WCAG certification is implied.

The first supplemental observer matched both the exam alert and the framework route announcer. It stopped before collecting measurements; the corrected observer scopes to the dialog. [Diagnostic](usability-20261010-feedback-review-diagnostic.json) retained. No browser-suite failure or runtime repair resulted.

Eight current captures were inspected: tablet player; narrow and short-landscape errors; narrow question limit; desktop comment limit; visible phone error and phone question limit; visible desktop comment limit. Short screens scroll to reach later controls; Close remains in the header. Normal draft guidance remains visually hidden, long guidance wraps and existing history caps remain. Source assets/font metadata are still unconfirmed.

Local preview restored at `http://127.0.0.1:3100`, ready in 602 ms; course HEAD returns 200. This establishes local access only. The feature commit uses the configured ahmad kassar author/committer; no runtime changes followed verification.

React review: small existing components, derived counts, separate provider-owned stores, cleaned-up effects, native controls and literal escaped messages remain. No extra listener, timer, runtime library, request, copied store or unrelated feature was introduced.

## Remaining release work

Local progress does not make the project submission-ready. Public repository and anonymous demo URLs are missing. Physical-phone/Safari/fullscreen with rotation disabled, native zoom, screen-reader and virtual-keyboard checks remain unverified. Original design assets and unanswered official policies/timezone remain open; no blocked source was retried. No install, private import, push, deployment or submission occurred. The unchanged dependency graph retains the 10 October audit findings: zero production advisories and five high development lint-chain entries.

Next: resolve the existing design/device acceptance gaps, then prepare authorized public links. GPT-6.1-sol/high remains appropriate for reference interpretation and device debugging; settings unchanged. See [the submission audit](Final-Readiness-Audit.md) for the last verified form requirements and source-access limits.
