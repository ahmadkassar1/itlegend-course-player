# Ali Shahin video library

A Next.js App Router and TypeScript implementation of the ITLegend course-player challenge. The catalogue contains four published Ali Shahin videos, with their original Arabic titles, YouTube thumbnails and native player. Search, topic/status filters, sorting and resume information use the same learning state as the detail pages.

This is an independent challenge project, not a creator product or an endorsed course platform. Editorial descriptions and the companion worksheet/study-skills check are written for this site. Each entry contains **one published video and two site exercises**; it is not an imported playlist syllabus. Full creator collections remain available through source links.

## Run locally

Use Node.js `^22.13.0 || >=24` and npm. From this directory:

```sh
npm ci
npm run dev -- --port 3100
```

Open [localhost](http://127.0.0.1:3100/). For the production version:

```sh
npm run build
npm run start -- --port 3100
```

No YouTube API key, account, database or environment variable is required. An internet connection is needed for the original thumbnails, player and creator links. Fonts, the worksheet and site interface are local. No dependencies were added for YouTube.

## Explore and learn

Choose a video from the catalogue. Its detail page plays the actual YouTube video inline with native controls, captions when available, playback speed and fullscreen. There is no autoplay. Desktop Wide moves the curriculum below the player. Mobile keeps the player at the top; short displays provide vertical scrolling without covering YouTube controls. Browser/device fullscreen support varies.

Progress starts at **zero**. A video earns one learning step when the official player reports its end, or when you choose **I watched this video**. Pause, periodic playing updates and page exit save the actual playback position; reopening resumes at that position. An unavailable YouTube SDK displays a clear message and retains the native iframe, direct source link and explicit watched action. Watching related previews does not give completion credit.

Under **Topics for This Course → Your study practice**, open:

- **Study worksheet · Site exercise**: a full-screen dialog with the original site PDF, rendered page, accessible text, zoom controls and a Mark read action.
- **Study skills check · Site exercise**: five original questions, a ten-minute practice clock, saved answers, unanswered-question guidance and scored review. This is neither an Ali Shahin assessment nor a certification.

The exam route for the first video is `/courses/webology?lesson=study-check`; the worksheet is `/courses/webology?lesson=study-worksheet`. Timers, grades and completion describe your local practice, not published creator statistics.

Comments and questions start empty. Posting adds your own literal text at the top of the bounded history. Drafts survive closing and reopening dialogs. Nothing is posted to YouTube or sent to an instructor. The leaderboard dialog shows only your saved activity; no classmates, enrollments, reviews or comparative ranking are fabricated. Curriculum lock icons indicate unfinished steps, with completed steps available for review; they do not impose an unconfirmed prerequisite policy.

## Structure

| Location                                       | Responsibility                                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/app`                                      | App Router pages, metadata, global tokens and self-hosted fonts                            |
| `src/data/video-references.ts`                 | Verified video IDs, original titles/thumbnails, source collections and editorial summaries |
| `src/data/courses.ts`                          | Typed video entries and explicitly independent study exercises                             |
| `src/data/study-practice.ts`, `worksheet.json` | Original site exercise content                                                             |
| `src/components`                               | Shared dialog, icons and native YouTube player                                             |
| `src/lib/youtube.ts`                           | Typed, deduplicated official iframe SDK loader with failure handling                       |
| `src/features/catalogue`                       | Cards, search/filter/sort, summary and learning-data reset                                 |
| `src/features/course`                          | Responsive player layout, curriculum, PDF/exam, comments and questions                     |
| `src/features/learning`                        | Provider-scoped learning/interaction stores, validation and atomic browser persistence     |
| `src/features/references`                      | Related videos and an intent-loaded preview dialog                                         |
| `tests/unit`, `tests/e2e`                      | State invariants and production-browser journeys                                           |
| `verification`                                 | Dated results, captures, source records and limitations                                    |

The server selects route data; client providers own each browser's learning state. Discriminated lesson types require the correct resource for video, PDF or exam. UI components do not write storage directly. Validated stores reject unknown IDs, invalid options, oversized drafts and duplicate completion, and recompute submitted scores when restoring saved data.

Learning is stored under `course-library:youtube-learner:v1`, content version `2026-10-youtube-content-1`. Earlier fictional-course history is preserved under its old key and is not imported. Browser storage can be cleared, blocked or full; the UI reports memory-only operation honestly. **Clear my learning data** asks for confirmation and resets all current entries to empty history. Data is local to this browser/origin, with no cross-device sync or shared backend.

## Source and media handling

Four titles, authors and thumbnails were verified against YouTube's official oEmbed responses on **10 October 2026**. See [metadata](verification/youtube-20261010-metadata.json) and [asset provenance](ASSETS.md). Thumbnails load directly from their published `i.ytimg.com` URLs, preserving the original 4:3 image. No creator footage or image is downloaded or rehosted.

Opening a video detail page contacts YouTube through the official privacy-enhanced iframe and SDK. The catalogue contacts the thumbnail CDN, but does not mount a player or load the SDK. Related preview dialogs mount their player only after **Load YouTube player**. Each iframe has an explicit title, origin, inline playback, fullscreen permission and `strict-origin-when-cross-origin` referrer policy. YouTube controls advertising, regional availability and captions; the direct source link remains available.

For a new video, verify its channel ownership and published metadata first, then add a typed record to `video-references.ts`. Do not invent durations, reviews or playlist lesson counts. Record source/date/permissions in `ASSETS.md` and update the real-content journeys.

Earlier locally authored demo media, worksheets and `course-content.json` are preserved for provenance and the historical authoring scripts. They are **not active course data**. The unused demo adapter was removed. Source screenshots/DOCX, Obsidian notes and the user's existing private app are outside this isolated repository.

## Check the project

```sh
npm run check
npm run test:unit
npm run format:check
npm run build
npm run test:e2e
```

The browser suite uses the installed Chrome channel, one worker and no retries. It starts the production server on port 3100; stop an existing preview first when using `CI=true`. Set `PLAYWRIGHT_CHANNEL=msedge` for installed Edge or `chromium` for an already available Playwright browser. No browser download is part of these commands.

The current suite replaces obsolete fictional-course assertions with real-content journeys: exact titles/thumbnail URLs, all four routes, zero history, SDK position/end handling, storage failures/reset, PDF/exam, search, bounded message histories, modal focus, accessibility and 26 representative viewport profiles. The SDK and embed response are controlled in automated tests to verify our integration deterministically. Actual third-party playback is checked separately and recorded with its scope. Axe and emulated viewports are bounded checks, not accessibility certification or physical-device acceptance.

[Current verification](verification/Real-YouTube-Content.md) identifies the tested revision/build and results. Earlier reports retain their original revisions; the previous 84-case suite does not certify this content replacement.

## Performance

With the production server running:

```sh
node scripts/measure-production.mjs
node node_modules/next/dist/bin/next experimental-analyze --output
node scripts/summarize-bundle.mjs
```

The measurement script uses three cache-disabled loads per catalogue/player route and desktop/mobile profile, observed through load plus four seconds without input. Mobile conditions are 430×932/DPR2/touch, 4× CPU slowdown, 150ms latency, 1.6Mbps download and 0.75Mbps upload. Results include requests, LCP, session-window CLS and long tasks, plus question/PDF snapshots. Pass an output filename followed by `--interactions-only` to check just those interactions without repeating navigation timings. Playback is deliberately verified separately; the script does not fabricate a successful external stream. Default `local-*.json` reports are ignored. `PERF_BASE_URL` and an output argument select a target/report.

Native YouTube introduces third-party costs on the player page, and original CDN thumbnails require network access. Earlier local-demo timings do not describe this version. Lab measurements are not field Core Web Vitals or INP.

## Release boundary

There is no configured Git remote or public demo. Local commits use the user's configured author and committer. No push, deployment or submission has occurred.

The last successful official terms/form inspection was **4 October 2026**. Public GitHub and an anonymously accessible live demo were required; the displayed deadline was **31 October 2026, 9:59 p.m.**, with timezone unresolved. A 10 October access recheck failed, including one browser fallback. AI assistance, reuse, external assets, extras and eligibility nuance remain unanswered; silence is not permission.

Exact original Figma assets/font/presentation reconciliation, physical phone/Safari/fullscreen with rotation off, browser-native zoom, screen-reader and virtual-keyboard checks remain open. The real-content change preserves core reference layout while deliberately replacing placeholder identity and local demo media.

The dated 10 October npm audit reports zero production advisories and five high-severity development lint-chain entries. An incompatible forced downgrade was not applied. See [readiness audit](verification/Final-Readiness-Audit.md) for historical raw records and pending acceptance. Local verification alone is not submission readiness.
