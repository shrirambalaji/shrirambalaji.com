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
- Completed: grouped recent open source contributions into the Projects section
- Completed: Writing section now renders the latest blog posts from the RSS feed in newest-first order
- Completed: navigation order now mirrors the homepage sections, with Writing included and Uses moved to the end
- Completed: writing entries now show editorial date labels, with an All posts archive link
- Completed: removed the Blog nav item and the redundant All projects GitHub link
- Completed: talk title and venue now render inline, separated by a middot
- Completed: talk title and venue now share the same type size
- Completed: added the Rootconf 2025 gossip protocols talk as the newest talk entry
- Completed: writing title underline now matches the shared project/link hover treatment
- Completed: light and dark themes now follow `prefers-color-scheme` using the production dark palette
- Completed: intro/body copy rhythm loosened to a `1.6rem` line-height
- Completed: dark-mode hover highlights now use `indigo-200` for text and underline accents
- Completed: intro paragraphs now use `text-wrap: pretty`
- Completed: adjusted the `/uses` lead section down slightly for optical alignment with the homepage photo
- Completed: uses page now reflects Codex, Neovim, and Gitless instead of Edge, Helix, and GitLens
- Completed: homepage first-load animation timing now runs slightly slower than the inner pages
- Completed: mobile menu overlay now portals to the document root and uses a subtle blurred background treatment
- Completed: mobile menu sheet fill was reduced and the Navigate/Close row was nudged down for better visual alignment
- Completed: talk titles now use a `1.5rem` line-height and keep the venue inline on the same text row
- Completed: Watch icon hover uses a softer rose accent in the talks section
- Completed: talk title middot was enlarged slightly and Slides now uses a softer sky-blue hover accent
- Completed: writing CTA now reads `Read all posts` instead of sounding archival
- Completed: the `Read all posts` CTA now uses an always-visible right arrow instead of the hover-only external arrow
- Completed: the Rust OSS entry now links to PR `131315`, and backticked inline tokens render in Paper Mono
- Completed: inline backticked tokens now render slightly larger for better monospace emphasis
- Completed: OSS contribution descriptions were tightened, and inline code was reduced to `14.5px`
- Completed: Excalidraw OSS copy now reflects the actual authored PRs around persistence, CSP, and selection restore
- Completed: homepage contact line now says `Find me on` instead of `Reach out on`
- Completed: removed the duplicated homepage contact line and kept the footer as the single contact surface
- Completed: talk action arrows now use the same tighter text-to-arrow spacing pattern as other site links
- Completed: Rootconf talk copy now mentions Rust, Maelstrom, and Jepsen, and the `Read all posts` arrow now nudges right on hover
- Completed: Excalidraw OSS copy was toned down to describe the work as small fixes
- Completed: Rootconf talk description now uses the shorter Maelstrom & Jepsen wording
- Completed: WRY OSS copy was toned down to describe the work as small fixes
- Completed: Excalidraw and WRY OSS copy now use the cleaner `Fixes in ...` phrasing
- Completed: the Rootconf gossip talk now includes its slides link

## Current Pass

1. Pin the repo to a Node runtime compatible with Astro 6.
2. Upgrade Astro and first-party integrations to their current major versions.
3. Install Tailwind 4 through Astro's official Vite-based setup.
4. Replace the current global-CSS-heavy page styling with Tailwind-first templates and keep only the small amount of global CSS that still belongs there.
5. Re-run build, e2e, and browser screenshot verification in `chrome-beta`.
