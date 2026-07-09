# Add Rust India Talk To Talks Section

## Context

- Add `https://www.youtube.com/watch?v=CtjfotvkJGo` to the homepage Talks section.
- Existing talks live as JSON content entries under `src/content/talks`.
- Talks are sorted by ascending `order`; the homepage de-duplicates by title.

## Plan

- [x] Verify the video metadata and event context.
- [x] Add a new talk content JSON entry.
- [x] Update e2e coverage for the new first Talks item.
- [x] Run format/check/build/e2e validation.
- [x] Browser-validate the homepage Talks section.
- [x] Add the new slides PDF link to the Rust India talk.
- [x] Validate the Slides link with automated and browser checks.

## Source Notes

- YouTube oEmbed title: `Unstoppable Events: Building Reliable Event-Driven Systems in Rust`.
- Event source: Hasgeek/Rust India Conference 2026 pages list the talk under Rust India Conference 2026 on 18 April 2026.
- Slides PDF path: `/slides/a-series-of-unstoppable-events.pdf`.
