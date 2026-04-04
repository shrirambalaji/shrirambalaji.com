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
- Completed: Astro 6 runtime alignment
- Completed: Tailwind 4 installation and Tailwind-first styling rewrite
- Completed: header/nav and underline parity fixes after the Tailwind pass
- Completed: inner-page intro simplification for Projects, Talks, and Uses
- Completed: collapsed About, Projects, and Talks into a single-page navigation structure
- Completed: homepage section navigation visibly tracks the selected section, including the bottom-of-page Talks case

## Current Pass

1. Pin the repo to a Node runtime compatible with Astro 6.
2. Upgrade Astro and first-party integrations to their current major versions.
3. Install Tailwind 4 through Astro's official Vite-based setup.
4. Replace the current global-CSS-heavy page styling with Tailwind-first templates and keep only the small amount of global CSS that still belongs there.
5. Re-run build, e2e, and browser screenshot verification in `chrome-beta`.
