# Google Knowledge Panel groundwork for Shriram Balaji

## Goal

Make `shrirambalaji.com` a clear, accurate canonical source for Shriram Balaji's public identity, then document the external entity signals that can responsibly support Google's understanding of that identity.

## Guardrails

- Treat a Knowledge Panel as an outcome Google may choose to show; do not promise one.
- Publish only claims that are visible on the page and can be kept accurate.
- Do not create a Wikidata item until Shriram satisfies Wikidata's notability policy with serious, independent references.
- Do not create promotional profiles solely to manufacture `sameAs` links.
- Keep private personal data out of structured data.

## Current findings

- The homepage has strong visible identity content and stable links to GitHub, X, and LinkedIn.
- The site currently has no `Person`, `ProfilePage`, or `WebSite` JSON-LD.
- Search results already connect the intended Shriram Balaji with Microsoft, GitHub, the personal domain, open source work, and conference talks.
- The name is ambiguous: several unrelated people named Shriram Balaji appear in search, so explicit entity reconciliation matters.

## Implementation

- [x] Read the reference guide and compare it with current Google and Wikidata guidance.
- [x] Audit the repository and existing public identity signals.
- [x] Add a typed, canonical identity model derived from site content.
- [x] Add homepage JSON-LD connecting `ProfilePage`, `Person`, and `WebSite` entities with stable `@id` values.
- [x] Include only verified public profiles in `sameAs`.
- [x] Add automated coverage for the structured data contract.
- [x] Build, lint, and run end-to-end tests.
- [x] Validate the rendered page in a browser.
- [x] Produce a staged external checklist for Search Console, profile consistency, independent references, Wikimedia Commons, and Wikidata eligibility.

## Progress log

- 2026-07-11: Audited Ben Sigman's recipe. Schema and consistency are sound groundwork; his claim that a personal `/about` page is an independent Wikidata reference is unsafe.
- 2026-07-11: Confirmed `shrirambalaji.com` is an Astro site with Playwright coverage and no existing JSON-LD.
- 2026-07-11: Added a typed `ProfilePage` + `Person` + `WebSite` graph and a canonical homepage URL. The person entity links GitHub, X, and LinkedIn and describes the visible Microsoft role.
- 2026-07-11: Found and removed a stale hand-written sitemap that advertised two dead routes. `robots.txt` now points to Astro's generated sitemap index.
- 2026-07-11: Verified the rendered graph in the local browser. Type checking, lint, production build, and all end-to-end tests pass.

## External rollout checklist

1. Deploy this repository and verify the production HTML contains `https://shrirambalaji.com/#person`.
2. In Google Search Console, submit `https://shrirambalaji.com/sitemap-index.xml`, run Live URL Test on the homepage, and request indexing.
3. Use one compact public description everywhere: `Senior Software Engineer at Microsoft building distributed systems for the Microsoft 365 Data & Compute Platform.` Keep the name `Shriram Balaji` and handle `shrirambalaji` consistent.
4. Update or redirect the old `shrirambalaji.github.io` portfolio so it clearly names `https://shrirambalaji.com` as the canonical current site; its older copy competes with the current description.
5. Retain the independent identity sources that already exist: Rust Tokyo, Conf42, Rootconf/Hasgeek, Rust India, and Pesto speaker pages. Prefer conference-owned pages over reposted social content when citing claims.
6. Choose a current headshot you own and are comfortable licensing permanently under CC BY-SA 4.0. Uploading it to Wikimedia Commons is a separate public licensing decision.
7. Before creating a Wikidata item, assemble at least two serious public references that identify the same person and substantiate the proposed claims. Current conference pages are promising, while Wikidata's criterion remains community-judged. If created, keep the item minimal and reference each statement precisely.
8. Once a legitimate Wikidata item survives review, add its canonical Q-item URL to this site's `sameAs` array and request one final recrawl. Then leave the identity data stable for several crawl cycles.
