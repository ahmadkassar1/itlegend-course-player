# Technical report

## Scope

A responsive video library and course player built for the ITLegend frontend challenge. The course-detail layout follows the supplied desktop/mobile screenshot and Arabic interaction annotations. Six published Ali Shahin videos supply their verified original titles, thumbnails and native YouTube players. Site-authored practice and fictional discussion/ranking examples are labeled separately from the creator’s material and the learner’s actual activity.

Exact source-font/photo fidelity, physical-device acceptance and final organizer-policy questions remain separate from local implementation verification. This report does not claim an official score or submission acceptance.

## Stack and architecture

Next.js App Router handles routes and server-rendered page content. React and TypeScript provide typed components and interaction boundaries; CSS Modules keep styles beside their owners. No additional UI, animation or state-management dependency is needed.

| Location                 | Responsibility                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `src/app`                | Catalogue/course routes, shared layout, fonts and provider composition                  |
| `src/components`         | Accessible dialogs, custom select, icons, thumbnails, native player and typing messages |
| `src/features/catalogue` | Search, topic/status filters, sorting and learner summary                               |
| `src/features/course`    | Player modes, curriculum, PDF/exam, discussions, questions and leaderboard              |
| `src/features/learning`  | Provider-scoped stores, pure state transitions and validated browser persistence        |
| `src/data`               | Published metadata, original practice content and distinct fictional community fixtures |
| `src/lib`                | Course calculations, typed media integration and media-query subscription               |
| `tests` / `verification` | State invariants, production-browser journeys and dated evidence                        |

Static page content and sample comment slots are rendered on the server. Interactive forms, player controls and learning state are client components. Stores belong to their providers, with stable server snapshots; mutable learner state is not shared between server requests. Presentation components use typed props rather than reaching into unrelated feature state.

## State and completion

One versioned localStorage envelope contains per-course completion, selected lesson, playback position, drafts, posted text and exam attempts. Restoration validates course/lesson/question/option IDs, bounded text and timestamps, deduplicates records and recomputes scores. Invalid or incompatible records recover to the empty personal baseline. Storage failure retains actions for the visit and exposes an honest saving status.

SDK video-end events and the explicit watched action grant one completion step, idempotently. Partial playback saves position without granting completion. Marking the original site worksheet read and submitting a valid five-question practice attempt grant the other two steps. Related previews grant no credit. Sample comments/peers never enter learner storage or alter personal progress.

Data is local to the browser and origin, user-editable and last-write-wins across tabs. There is no authentication, shared backend, instructor delivery or cloud sync. Question-review feedback is explicitly simulated. Moving to a hosted origin starts a separate local history.

## Interface and accessibility

The detail page retains the reference layout: inline player, materials, progress/curriculum, comments and closable question/leaderboard/resource dialogs. On mobile, only the video stays sticky; completion controls and explanatory text scroll normally. Screens 500px tall or less, or with a width-to-height ratio of at least 3:4, use normal page scrolling so the player cannot cover the remaining content. Wide/fullscreen controls, PDF zoom and retained exam answers remain functional.

The shared select supports keyboard navigation, typeahead, dismissal and bounded menus. Dialogs contain focus, restore the trigger and release the body scroll lock on close. Comment/question histories have maximum heights, vertical scrolling, newest-first posts and literal-text rendering. Touch targets, long Arabic text, empty/error states and text reflow are included in browser checks.

Motivational messages follow the learner’s completion level and rotate every nine seconds without a pause/resume action. Reduced motion makes them static. Timers are cleaned up, and assistive technology receives complete text rather than per-character live announcements. Decorative menu/dialog/card motion also respects reduced motion.

## Media and performance

Original thumbnails use their published CDN URLs and dimensions, with a reusable failure state. No creator footage or image is downloaded/rehosted. The main native player uses the official privacy-enhanced iframe and SDK; related players load on explicit intent. Loading surfaces reserve player geometry. PDF content is opened on demand, and historical unused media remains outside active route data.

Provider-owned updates, server-rendered static content and small shared controls avoid a separate state or animation framework. Production performance measurements and their lab conditions are documented in the dated verification reports; they are not field INP or an official judging score. YouTube controls captions, ads, network/region restrictions and stream availability.

## Validation and release

README documents setup, supported Node versions, dependency installation, run/build/check commands, architecture and release configuration. Package and lockfile determine dependencies; no application secrets or API keys are needed for the current frontend. `.vercelignore` excludes environment files, local evidence and historical unused sources from source-upload releases while preserving active assets.

Run `npm run check`, `npm run test:unit`, `npm run format:check`, `npm run build` and `npm run test:e2e`. The production suite uses installed Chrome with one worker and no retries. It covers 30 viewport profiles, core interactions, restored state, validation, media boundaries and accessibility. Automated SDK/iframe responses are controlled; actual third-party playback is separately scoped. See [community verification](../verification/Demo-Community-and-Questions.md) and [copy-cleanup verification](../verification/Copy-Cleanup-and-Readiness.md) for identified revisions and outcomes.

The [production demo](https://itlegend-course-player-taupe.vercel.app/) opens anonymously under the Vercel project's existing protection settings. The public [GitHub repository](https://github.com/ahmadkassar1/itlegend-course-player) belongs to the user's verified account. See [release review](../verification/GitHub-and-Acceptance.md) for current revisions and outcomes, and [earlier deployment evidence](../verification/Shared-Controls-and-Release.md) for the original source-upload release. Physical-device, exact-design and organizer-policy acceptance remain separate; no competition submission has been sent.
