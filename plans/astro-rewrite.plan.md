# Astro Rewrite Plan

## Goal

Rewrite the site from Next.js to Astro with React islands where interactivity is justified, keep the existing ghostindigo palette, and align the typography and page rhythm with `https://benji.org/`.

## Constraints

- Follow the official Astro migration guide for Next.js:
  - keep `public/`
  - move the rebuilt app into `src/`
  - add Astro config and required integrations
  - convert non-interactive JSX to `.astro`
  - keep React only for interactive islands
- Verify UI changes with browser automation and screenshots.
- Add e2e coverage for the migrated feature flow.

## Initial Plan

1. Audit the current Next.js site structure, content sources, and dependencies.
2. Capture the visual reference from `benji.org` and inspect its typography/layout proportions.
3. Replace Next.js runtime and routing with Astro, `@astrojs/react`, and MDX support.
4. Rebuild the shared layout and page templates in Astro using the existing content and ghostindigo color system.
5. Keep React only for the navigation/menu island if it still needs client-side state.
6. Add tests and run validation: build, e2e, browser screenshots, and React Doctor.

## Progress

- Completed: repo audit
- Completed: visual reference capture
- Completed: Astro project conversion
- Completed: dependency install and config cleanup
- Completed: final build validation
- Completed: local dev server startup
- Completed: browser verification and screenshots
- Completed: Linkerland SVG mark extraction and custom project icon wiring
- Completed: Paper Mono installation and project initial overlay treatment
- Completed: adaptive contrast selection for project initials on marble avatars
- Completed: talk row layout refresh and OSS section label update
- Completed: deduped talks list and inline Watch/Slides CTA treatment
