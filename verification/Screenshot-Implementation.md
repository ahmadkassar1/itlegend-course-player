# Screenshot implementation and verification

## Latest narrow-screen correction — DEC-015

Verified2026-10-04 at code **3800720b25075837e4785cb4c6969010a1fe1efb**, production build **d-4IyKPY-mflOlfSZHsGr**. At320px the former40px materials inset squeezed “Instructor” into a mid-word break. Heading/facts padding is now24px at360px and below;430px retains40px. This is an intermediate-width adaptation, not a newly recovered Figma dimension. No fixture, font, media, dependency, component/state architecture or desktop rule changed.

**8/8 affected production browser checks pass in77.237271s**, starting2026-10-04T10:08:38.129Z, one worker/no retries/skips/unexpected/flaky outcomes. TypeScript, lint/active-rule guards, formatting and fresh production build pass. [Browser results](narrow-browser-results.json) cover200% root text/spacing, long Arabic/unbroken comments,6–10-lesson curricula, keyboard/sticky/radio navigation, intermediate widths, mobile marker endpoints and22 rendered Axe states. Fresh Axe reports [430](narrow-axe-430.json)/[1440](narrow-axe-1440.json) showzero violations and the same three incomplete contrast nodes; previous supplementary checks below remain bounded evidence for these unchanged430/1440 styles. [Fresh contrast pairs](narrow-contrast.json) pass. The earlier29-flow run/11 units and font-inclusive performance measurements below describe376c74d; they were not rerun or relabelled as new results for this CSS-only correction.

[Actual label measurements](narrow-materials-measurements.json) include all nonempty Instructor text nodes: one rendered line at320/360/430, document width equals viewport width, all five facts preserved. Final [320](narrow-materials-320.png), [360](narrow-materials-360.png), [430](narrow-materials-430.png) materials captures visually inspected. [Narrow full page](narrow-course-320.png) and [fresh intermediate measurements](narrow-layout-measurements.json) preserve additional evidence. One-off inspection helpers removed.

The exact-fidelity blockers remain specific:

| Missing input                        | Existing application location                                     | Required clarification                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Original instructor photo/video      | `public/images/lesson-poster.svg`, `public/media/study-plan.webm` | Source-resolution files/authorized use; current original demo illustration/media are substitutes                               |
| Three reference comment portraits    | `public/images/avatar-1.svg` through `avatar-3.svg`               | Matching original portraits and rights; arbitrary replacement faces would not prove fidelity                                   |
| Confirmed body/heading font identity | `src/app/fonts.ts`                                                | Exact family/weights if available; licensed Poppins/Spartan candidates remain visually inferred                                |
| Desktop/mobile data presentation     | `src/data/courses.ts`                                             | Duplicated desktop facts/week groups versus mobile5 facts/8 lessons; the previously asked optional question remains unanswered |

No source retry, asset import, installation, remote, push, deployment or submission. Source screenshots/documents/media/static settings remain preserved. Next independent action is **M6 current-rule/rubric/submission-readiness audit**, retaining these asset/presentation and actual-phone gaps; recommend GPT-6.1-sol/high, settings unchanged. Missing inputs were already requested; do not repeat setup or the same requests.

## Previous screenshot implementation — DEC-014

Recorded 2026-10-04. Tested application code: **376c74da59a7ec6f4933d6eb42a3e91afb164bab**, production build **hEzvFqKQmpwhBwwi2JMt0**. This continues the existing six-course implementation; it does not establish complete pixel fidelity, actual-phone behavior or competition clearance.

## Reference authority

The user supplied eight screenshots as the definitive UI/functionality guide. Byte-identical copies, access date and SHA256 values are preserved outside app Git in the parent vault's `01_Requirements/Design-References/manifest.json`. The earlier higher-resolution `ITLegend Course Player Page Test.png` and Arabic `buiseness-requirements.docx` remain unchanged. All 41 nested DOCX paragraphs were reread in the immediately preceding [design review](Design-Review.md); all eight new screenshots were visually inspected in this turn.

| Source             | Coverage                                                                              |
| ------------------ | ------------------------------------------------------------------------------------- |
| S1 / screenshot-01 | Progress, full-screen PDF/exam, retained exam progress, comments and comment entry    |
| S2 / screenshot-02 | Inline/sticky/fullscreen/Wide player behavior and course materials                    |
| S3 / screenshot-03 | Popup leaderboard and level-dependent Arabic encouragement with ordinary emoji        |
| S4 / screenshot-04 | Desktop player/materials/comments beside week-based curriculum                        |
| S5 / screenshot-05 | Four replacement section controls, scrolling, retained question draft and leaderboard |
| S6 / screenshot-06 | Overall mobile layout and materials/curriculum/comment hierarchy                      |
| S7 / screenshot-07 | Mobile lesson rows, accordion groups, comments and type/detail                        |
| S8 / screenshot-08 | Mobile player/progress/resource/exam/comment annotations                              |

Arabic design notes are product specifications. Collaborator initials, cursors, arrows, browser chrome and the Figma frame label are contextual overlays, not application components. The explicit annotation replacing social controls takes precedence over social icons still visible in the reference frames. Screenshot pixels are observations, not recovered CSS dimensions or Figma tokens.

## Implemented refinement

- Added self-hosted Poppins body and Spartan heading font candidates through `next/font/local`, retained OFL notices and original file hashes. These families were selected by visual comparison; the screenshot does not prove exact font-family metadata. No Google Fonts request occurs at application runtime or build time.
- Split curriculum coordination, accordion sections and individual lesson rows into `Curriculum`, `CurriculumSection` and `CurriculumLesson`. Existing provider-owned course state, server slots and deferred dialog boundaries remain intact. No backend, new dependency or duplicate state store was introduced.
- Reused `ProgressMarker` for desktop and mobile. On mobile it sits inside the first group, as in the reference. A reserved lane and bounded position prevent overlap at 0%, 63% and 100%; the lane is hidden on desktop. Its additional safe space is a declared pixel-layout difference from the reference's overlay position.
- Refined neutral text colors, comment body/input typography and removed video/PDF badges absent from the reference rows. Exam badges retain the actual five-question fixture count rather than presenting the screenshot's zero-question placeholder as functional data.
- Expanded [README](../README.md) with setup, architecture diagram, component boundaries, usage, fixture extension, state lifetime, asset handling, verification and release limitations. [ASSETS](../ASSETS.md) documents font origins and remaining media substitutions.

The previously implemented Arabic behaviors remain verified: inline video; sticky mobile player; desktop Wide/content below; desktop browser fullscreen; progress/level and viewport animation; curriculum/comments scroll controls; full-screen PDF/exam; retained exam answers/index/results and question drafts; local comment submission; popup leaderboard and original level-dependent Arabic copy. Phone fullscreen with auto-rotate disabled remains unverified.

## Browser and code evidence

TypeScript, ESLint with active-rule guards, formatting and production build pass. Eleven unit tests pass; the provider/state transitions were not changed. **29/29 production Chrome tests pass in 204.022433s**, starting 2026-10-04T09:18:22.718Z, one worker, no retries/skips/unexpected/flaky outcomes. [Full browser results](screenshots-browser-results.json) identify test cases and timings.

Existing coverage includes six catalogue journeys, URL/history/404 behavior, playback/resume/ended/Wide/fullscreen, all dialogs, retained drafts/results/comments, keyboard containment/focus, reduced motion, loading intent, long Arabic/unbroken text, varied lesson counts, intermediate widths and 200% root text sizing with increased spacing. The new integration check covers mobile marker endpoints at 320/430 and the absence of third-party runtime font requests. Captures wait for `document.fonts.ready`.

Twenty-two rendered Axe states (11 each at 430/1440) report **zero violations**, with **three incomplete contrast nodes**: mobile and desktop exam errors and desktop leaderboard subtitle. These were additionally scrolled into view and inspected: actual error colors are 7.6779:1 and subtitle colors 9.5484:1; text-line midpoint hit checks show no obstruction. [Supplementary rendered checks](screenshots-contrast-review.json) and visible dialog captures preserve that evidence. This supplements the incomplete results; it does not remove or relabel them in the [430](screenshots-axe-430.json) /[1440](screenshots-axe-1440.json) raw reports. [Eight other computed contrast pairs](screenshots-contrast.json) pass their text/control/focus thresholds.

Fresh normal desktop/mobile, 820/tablet, 320/narrow, leaderboard, exam error and enlarged exam captures were visually inspected. Selected previews: [desktop](screenshots-desktop-player.png), [mobile](screenshots-mobile-player.png), [tablet](screenshots-player-820.png), [narrow](screenshots-narrow-player.png), [visible leaderboard](screenshots-1440-leaderboard-subtitle-visible.png), [visible exam error](screenshots-430-exam-error-visible.png). [Layout measurements](screenshots-layout-measurements.json) retain tested bounds. No overlap/overflow equivalence is inferred for every possible device or input.

## Fresh production measurements

[Raw performance evidence](screenshots-performance.json) was captured at 2026-10-04T09:24:57.823Z against the identified code/build with Node22.14.0, Chrome154.0.8037.97, Windows10/i5-6300U/four logical CPUs/8.44GB RAM. Three fresh cache-disabled contexts per route/profile, warm localhost production server, sequential runs, load plus four seconds without input. Desktop1440x1000/DPR1 has no artificial throttle; mobile430x932/touch/DPR2 uses 4x CPU slowdown,150ms latency,1.6Mbps download/0.75Mbps upload.

| Profile       | Route     | Median LCP | LCP range   | Maximum observed CLS |
| ------------- | --------- | ---------- | ----------- | -------------------- |
| desktop-local | Catalogue | 420ms      | 372–740ms   | 0.000001612          |
| desktop-local | Player    | 380ms      | 344–720ms   | 0.001808023          |
| mobile-lab    | Catalogue | 1324ms     | 1296–1520ms | 0                    |
| mobile-lab    | Player    | 1416ms     | 1412–1556ms | 0                    |

Completed Script response bytes are149,282 catalogue /165,349 player on both profiles. Three actually requested local font responses total49,790 bytes including overhead; all four stored font files total56,640 source bytes. Poppins500 is available but not needed by the initial rendered pages. Initial/question loads request no lesson video or worksheet payload; PDF opening requests its WebP preview, Play requests WebM. Cancelled/unfinished requests are preserved in raw evidence; completed-response totals do not imply every initiated request finished. No captured navigation errors.

These are descriptive local lab results, not Lighthouse scores, field Core Web Vitals/INP, phone/hosting/CDN performance or an official judging score. Added fonts alter loading; this is not a controlled speed comparison with historical M5. No speculative performance refactor was justified.

## Exact fidelity and policy limits

1. Original photographic poster/portraits/video and their rights remain missing; original SVG illustrations and demo media are explicit substitutes. Font metadata remains unconfirmed even though typography is closer.
2. Desktop repeats four facts in two columns and week groups; mobile has five distinct facts and an eight-lesson syllabus. One optional presentation-choice question was asked once, with no answer received. Until resolved, one consistent course dataset remains in use. No duplicate eighteen-lesson state or false locked/zero-question rows were created.
3. Mobile shows two comments while desktop shows three; all three canonical comments remain visible. Safe marker spacing, explicit student level/current/completed state, populated fictional leaderboard, accessible Close controls, untimed fixture exam and darker contrast-safe colors are declared differences.
4. Exact source icon paths, timer/scoring/completion/ranking policies and tablet specification are not recoverable from these screenshots. Engineering defaults are documented, not organizer-approved rules. Session state survives close/reopen/client navigation; hard reload resets fixtures.
5. Actual phone/fullscreen with auto-rotate disabled, Safari/touch/virtual keyboard, native browser zoom, screen-reader review and hosted performance remain open. Automated Axe/emulation is not certification.
6. Official deadline timezone and AI/reuse/assets/extras/eligibility nuance remain unanswered; silence is not permission. Five development-only advisory entries were last checked in M5, production audit zero then; no dependency change or new audit is claimed here.

No new repository remote, private history/code import, push, deployment or submission occurred. Code commit uses the configured user identity and a meaningful conventional subject; AI involvement is not disguised as human authorship. Original sources, media and static Obsidian settings were not modified.

Next useful action: reconcile the remaining screenshot presentation conflicts and original visual assets before calling fidelity complete, then finish the physical-device/readiness gaps. Recommended available setting: **GPT-6.1-sol/high**, for careful reference reconciliation; recommendation only, settings unchanged.

## Sources accessed 2026-10-04

[Next Font documentation](https://nextjs.org/docs/app/api-reference/components/font) supports local hosting/loading. [Poppins OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/OFL.txt) and [Spartan upstream OFL](https://raw.githubusercontent.com/MattBaileyDesign/Spartan-MB/master/OFL.txt) accompany files. Official Google Fonts CSS/asset URLs and SHA256 values are in [font provenance](screenshots-font-provenance.json); they do not prove the design's font identity or competition permission. The [template author's listing](https://themeforest.net/item/edublink-online-learning-react-education-template/42210462) does not grant permission to import its demo imagery. Linked `https://docs.devsblink.com/edublink-react/` returned502 once; not retried. Previously inaccessible live Figma/template pages were not repeatedly retried. Accessible local design inspection and implementation were completed independently.
