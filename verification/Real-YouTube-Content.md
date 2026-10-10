# Published YouTube content — 10 October 2026

The main catalogue and detail media now use four actual Ali Shahin videos, original Arabic titles and original remote YouTube thumbnails. They replace the six fictional practice courses in response to the user's correction. Progress starts at zero; comments, questions, completion and scores reflect the current browser's actions. No classmates, enrollment counts, reviews or creator durations are invented.

## Revision and scope

- Feature source: `d0aceba`; full browser-test revision `77c8263302a1213fe113d3381179f2be88383de4`, build `d3Qy9Xf1PGxnLjqUQwcx2`.
- Final application revision: `311e857b53192be008a86dbb6771175e467cb0c6`, build `TN_kcJcwyMYH4vA3QNdNY`. It changes only the materials value from “2 · Created for this site” to “2 site exercises”, keeping the label readable at 320px.
- Subsequent measurement-only revisions culminate in `4aa31cebed00778d5a91e1639345e76aee6e1fd5`; they adapt resource navigation and add a scoped interaction mode. Runtime and browser-test sources remain unchanged.
- Independent local Git, configured ahmad kassar author and committer, no remote. No dependency installation, private import, push, deployment or submission.

## Published sources

Four official YouTube oEmbed responses identify **Ali Shahin** and `https://www.youtube.com/@AliShahin` as author/channel. Original title/thumbnail records and access method are in [metadata](youtube-20261010-metadata.json). Access date: **10 October 2026**. The oEmbed endpoint is `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json`.

| Entry            | Published Arabic title                          | Video                                                                 |
| ---------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| Web foundations  | كل اللي لازم تعرفه عن الـ DNS قبل ما تعمل موقعك | [DNS](https://www.youtube.com/watch?v=1fSAAzrxK6E)                    |
| Computer science | مكونات الكمبيوتر &#124; مقدمة في علوم الحاسب    | [Computer components](https://www.youtube.com/watch?v=2mySUIR9k20)    |
| Programming      | لغة c++ من مخترعها ؟ و كيف تطورت ؟              | [C++ history](https://www.youtube.com/watch?v=Gd6RBwunPL4)            |
| Learning habits  | الحل النهائي للنجاة في عصر ال AI                | [Learning in the AI era](https://www.youtube.com/watch?v=q5rXYEuFzEQ) |

Thumbnails use the published `i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg` URLs directly. Original 480×360 images retain their native 4:3 aspect ratio, including their original letterboxing. No creator media is downloaded or rehosted. Descriptions/categories are editorial summaries. Each entry contains **one published video**, with source links to the applicable full collection; no complete playlist import or invented syllabus is claimed. YouTube may translate its own native player title independently of the recorded original title.

Browser access succeeded after one unavailable web-reader attempt and one shell TLS failure per ID. Failed transports were not repeatedly retried or bypassed. Official technical references: [iframe API](https://developers.google.com/youtube/iframe_api_reference), [player parameters](https://developers.google.com/youtube/player_parameters), accessed 10 October 2026. Organizer asset/AI/reuse/extra policies remain unanswered.

## Behavior and architecture

The shared native YouTube component handles inline playback, captions when supplied by YouTube, origin/referrer permissions, position events and end events. A typed, deduplicated official SDK loader handles success/failure without another dependency. The iframe remains usable if SDK connection fails, with an external watch link and explicit watched action. Provider-scoped validated stores own progress; components do not write storage directly. A restored offset is captured once when the player mounts, so position updates and Wide mode do not recreate it.

The new namespace `course-library:youtube-learner:v1`, content version `2026-10-youtube-content-1`, prevents old simulated completion/reviews being imported. Watching a video earns one learning step on native end or explicit **I watched this video**. Partial viewing stores position but earns no completion. Related previews do not award credit. Comments/questions start empty, save locally and remain newest-first with bounded keyboard-scrollable histories. The leaderboard shows only the user's own saved activity and level-dependent site encouragement.

Required PDF/exam interactions remain under **Your study practice**, clearly separate from the creator's material. The original site worksheet and five-question study-skills exercise are neither creator downloads nor creator certification. Each entry has three learning steps: its video, worksheet and exercise. Course lock icons denote unfinished steps; no unconfirmed access/prerequisite rule is introduced. Earlier authored media/source JSON are preserved as historical sources, outside active route data; the unused TypeScript adapter and obsolete fictional-course tests were removed.

## Automated verification

**49 production Chrome cases pass** at `77c8263`, starting `2026-10-10T08:51:25.649Z`, duration **227.902475s**, one worker, no retries/skips/unexpected/flaky results. [Raw report](youtube-20261010-browser-results.json), [26 viewport measurements](youtube-20261010-layout-measurements.json).

The suite covers exact published card titles and original loaded thumbnail URLs, search/filter/sort/empty recovery, all four real routes, unknown/retired route recovery, zero history, SDK pause/end/resume/Wide boundaries, explicit completion, legacy history isolation, PDF byte signature/read/zoom, five-question scored review/reload, 100% study-plan completion, blocked/quota/corrupt storage, confirmed reset, SDK failure/source fallback, related-preview focus/intent, newest-first bounded message histories, form limits, exam recovery, 200% text reflow and representative mobile/tablet/desktop layouts.

After the single materials-copy correction, **28 affected production cases pass** on final build `TN_kcJcwyMYH4vA3QNdNY`, starting `2026-10-10T08:56:28.593Z`, duration **138.579495s**, no retries/skips/unexpected/flaky results. They repeat all 26 viewport profiles, all real entry facts/routes and the accessibility/reflow journey. [Final raw report](youtube-final-20261010-browser-results.json), [final viewport measurements](youtube-final-20261010-layout-measurements.json). This bounded rerun is scoped to the changed copy; the full 49-case result retains its preceding revision.

**17 units** pass; typecheck, lint, active Next/React/accessibility-rule guards, formatting and production build pass. Unit fixtures test store invariants independently of displayed video data. No store logic changed after the unit run. Chrome is the installed `154.0.8037.98` channel. Viewports span 320–2560 CSS pixels, with 17 touch contexts, portrait/landscape phones/tablets, breakpoint edges and large desktops. These are emulated profiles, not physical-device certification.

Ten current Axe states at 320/1440 (catalogue, native-player integration, PDF, exam, empty search) report **zero violations**, with **three retained color-contrast incomplete rule instances**. [Final scans](youtube-final-20261010-real-content-axe.json). Two populated question-history scans in the full suite also report zero violations; their incomplete results were not separately exported. The native iframe/SDK response is controlled for deterministic automation; external YouTube internals are not accessibility-certified by these scans.

[Nine supplemental checks](youtube-final-20261010-supplemental-contrast.json) target the exact PDF heading and numbered exam buttons from the incomplete records. They verify centre hit visibility, no overlap with Close, computed foreground/background contrast and conservative gradient color at the button bottom. Minimum observed ratio **6.22148:1**, above 4.5:1. The original incomplete findings remain preserved; these scoped checks are not a whole-page accessibility certificate.

The [initial 42/49 diagnostic](youtube-20261010-initial-browser-results.json) remains preserved: five screenshot checks incorrectly expected lazy images in closed details to load, one touch check centred its target under the sticky native player, and one exam assertion expected different result wording. The helper now checks visible images, touch checks bring ordinary targets into the exposed lower area before tapping, and result assertions use the actual score text. No forced clicks, retries or weaker completion semantics were introduced. The prior 84-case fictional-course/reference suite remains historical and does not certify this replacement.

## Actual third-party observation and captures

[Uncontrolled IAB playback](youtube-20261010-live-playback.json) on the first production build verifies the actual DNS video, native controls and creator identity. Observed playback was **7.954306 /1558.421s**, paused **15.230312s**, and reloading the iframe resumed with **start=15**. Completion stayed **zero** after partial viewing. Player/data/state code is unchanged in the final copy-only build. This is one actual play/pause/resume check; native full-video completion and playback of every video were not observed. SDK completion/failure boundaries are tested separately with a controlled response.

[Fresh final-build renders](youtube-final-20261010-live-render.json) use actual CDN images and uncontrolled YouTube iframes in desktop1440×1000 and touch390×844 contexts. All four original thumbnails load at480px natural width, zero history and no horizontal overflow. The actual native Play video control appears in both iframe documents. Player screenshots capture early initialization and can show a black frame before the provider thumbnail arrives; they are not footage/playback proof.

Representative captures inspected:

- [Real catalogue desktop](youtube-final-20261010-live-catalogue-1440.png), [real catalogue mobile](youtube-final-20261010-live-catalogue-390.png).
- [Native player desktop initialization](youtube-final-20261010-live-player-1440.png), [native mobile initialization](youtube-final-20261010-live-player-390.png).
- [Final320px layout](youtube-final-20261010-device-320x568-player.png), [tablet820px layout](youtube-final-20261010-device-820x1180-player.png), using the labelled controlled iframe.
- [320px PDF](youtube-final-20261010-pdf-320.png), [320px exam](youtube-final-20261010-exam-320.png), [desktop exam](youtube-final-20261010-exam-1440.png).
- [320px populated comments](youtube-20261010-comments-320.png), [320px question history](youtube-20261010-questions-320.png), [short-landscape exam feedback](youtube-20261010-feedback-844×390-exam-error.png).

## Performance and remaining acceptance

The [completed navigation observations](youtube-final-20261010-initial-performance.json), starting09:00:25.499Z, retain12 samples on application311e857/buildTN_kcJcwyMYH4vA3QNdNY. Desktop1440×1000/DPR1/local CPU/network and mobile430×932/DPR2/touch/4× CPU slowdown/150ms latency/1.6Mbps down/0.75Mbps up each use three fresh cache-disabled contexts per route, observed through load plus four seconds without input on a warm local server. No competing browser suite ran during measurement.

| Profile       | Catalogue median LCP | Player median LCP | Maximum observed CLS, catalogue/player |
| ------------- | -------------------- | ----------------- | -------------------------------------- |
| Desktop local | 376ms                | 512ms             | 0.000209 /0.052574                     |
| Mobile lab    | 1,168ms              | 1,124ms           | 0 /0.014832                            |

Mobile observed long-task excess ranges613–850ms for the catalogue and496–692ms for the player. These are top-document lab observations, not field CWV/INP or cross-origin player paint/stream timings. They are not a controlled before/after comparison. Native YouTube and actual thumbnail CDN requests are now expected on the corresponding pages; earlier no-YouTube-request claims are historical. Below-fold/closed-details thumbnails can remain unloaded until needed.

All12 samples record no HTTP response>=400. Eleven aborted local Fetch requests are explicitly marked as Next prefetches in the raw report; one mobile-player sample records the provider's “compute-pressure is not allowed” permissions-policy console message. No extra pressure-sensor permission was granted. These observations remain disclosed rather than being described as zero errors. Desktop/player hydration can shift the layout, reflected in the recorded CLS.

The original measurement's mobile PDF interaction failed because its section was closed. The [second diagnostic](youtube-final-20261010-second-performance-diagnostic.json) retains six desktop samples: an unconditional toggle then closed the already-open desktop section. The script now expands **only when aria-expanded is false** and brings the ordinary PDF trigger into view. Both raw attempts are retained.

[Completed interaction snapshots](youtube-final-20261010-interactions.json) run in the corrected `--interactions-only` mode at4aa31ce, starting09:07:31.368Z, on the unchanged final application build. Desktop/mobile initial→question→PDF snapshots complete with zero captured errors; request counts26→27→31 and23→24→31 respectively. They are fresh unthrottled interaction contexts, separate from navigation samples. The final mode avoids repeating already-completed timing samples; no synthetic playback is asserted. Full-video playback remains the separate actual IAB observation.

Original Figma photos/fonts/presentation reconciliation, physical phone/Safari/fullscreen with rotation disabled, browser-native zoom, screen-reader and virtual-keyboard checks remain open. Real content intentionally replaces placeholder identity/media while core layout relationships and required interactions remain. No full exact-Figma, every-device, hosted-performance, public-link or submission acceptance is claimed.

No remote/public demo exists. Official pages were last read successfully4 October2026; the10 October recheck failed once plus browser fallback. Displayed31 October2026 9:59p.m. timezone and AI/reuse/assets/extras/eligibility nuance remain unresolved. Dated production0/development5high lint-chain advisories remain disclosed. Next: user review of the original content and targeted hands-on device/design acceptance, using already pending inputs. GPT-6.1-sol/high is appropriate for that interpretation; settings were not changed.
