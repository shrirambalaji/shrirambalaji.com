import { expect, test } from "@playwright/test";

import { getRecentBlogPosts, toWritingPath } from "../src/lib/blog-rss";

const PROJECTS_HASH_RE = /\/#projects$/;
const WRITING_HASH_RE = /\/#writing$/;
const TALKS_HASH_RE = /\/#talks$/;
const TALK_TITLE_RE =
  /Unstoppable Events: Building Reliable Event-Driven Systems in Rust\s*·\s*Rust India Conference 2026/;
const ROOTCONF_TALK_TITLE_RE =
  /Rumour has it: Gossip Protocols for Eventual Consistency\s*·\s*Rootconf 2025/;
const SKY_CLASS_RE = /group-hover:text-sky-400/;
const PAPER_MONO_RE = /Paper Mono/;
const NON_EMPTY_RE = /.+/;
const BLUR_RE = /blur/;

test("blog URLs are normalized to the same-origin writing path", () => {
  expect(
    toWritingPath(
      "https://blog.shrirambalaji.com/posts/resolving-rust-symbols/"
    )
  ).toBe("/writing/posts/resolving-rust-symbols");
  expect(
    toWritingPath(
      "https://www.shrirambalaji.com/writing/posts/resolving-rust-symbols/"
    )
  ).toBe("/writing/posts/resolving-rust-symbols");
  expect(toWritingPath("https://example.com/posts/untrusted")).toBe("");
});

test("homepage publishes canonical person structured data", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.shrirambalaji.com/"
  );
  await expect(page).toHaveTitle(
    "Shriram Balaji, Software Engineer at Microsoft"
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Shriram Balaji is a Senior Software Engineer at Microsoft building distributed systems for the Microsoft 365 Data & Compute Platform."
  );
  await expect(
    page.getByText("I’m Shriram Balaji", { exact: false })
  ).toBeVisible();

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(jsonLd).not.toBeNull();

  const structuredData = JSON.parse(jsonLd ?? "{}") as {
    "@context": string;
    "@graph": Record<string, unknown>[];
  };
  expect(structuredData["@context"]).toBe("https://schema.org");

  const person = structuredData["@graph"].find(
    (entity) => entity["@type"] === "Person"
  );
  const profilePage = structuredData["@graph"].find(
    (entity) => entity["@type"] === "ProfilePage"
  );

  expect(profilePage).toMatchObject({
    "@id": "https://www.shrirambalaji.com/#profile",
    mainEntity: { "@id": "https://www.shrirambalaji.com/#person" },
    url: "https://www.shrirambalaji.com",
  });
  expect(person).toMatchObject({
    "@id": "https://www.shrirambalaji.com/#person",
    alternateName: "shrirambalaji",
    image: "https://www.shrirambalaji.com/images/shriram-balaji.jpg",
    jobTitle: "Senior Software Engineer",
    name: "Shriram Balaji",
    sameAs: [
      "https://github.com/shrirambalaji",
      "https://x.com/shrirambalaji",
      "https://www.linkedin.com/in/shrirambalaji/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Microsoft",
      url: "https://www.microsoft.com/",
    },
  });
});

test("robots metadata points at the generated sitemap", async ({ request }) => {
  const robotsResponse = await request.get("/robots.txt");

  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain(
    "Sitemap: https://www.shrirambalaji.com/sitemap-index.xml"
  );
});

test("core pages render and navigation works", async ({ page }) => {
  const latestBlogPosts = await getRecentBlogPosts(4);
  const [latestBlogPost] = latestBlogPosts;

  if (!latestBlogPost) {
    throw new Error("Expected at least one blog post from the RSS feed.");
  }

  const latestBlogPostDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(latestBlogPost.publishedTime));

  await page.goto("/");
  const desktopNav = page.getByRole("navigation", { name: "Primary" });
  const aboutNav = desktopNav.getByRole("link", { name: "About" });
  const projectsNav = desktopNav.getByRole("link", { name: "Projects" });
  const writingNav = desktopNav.getByRole("link", { name: "Writing" });
  const talksNav = desktopNav.getByRole("link", { name: "Talks" });
  const usesNav = desktopNav.getByRole("link", { name: "Uses" });
  const projectsHeading = page.locator("#projects").getByRole("heading", {
    exact: true,
    level: 2,
    name: "Projects",
  });
  const ossHeading = page.locator("#projects").getByRole("heading", {
    level: 2,
    name: "Recent Open Source Contributions",
  });
  const writingSection = page.locator("#writing");

  await expect(
    page.getByRole("banner").getByRole("link", { name: "Shriram Balaji" })
  ).toBeVisible();
  await expect(page.getByText("Find me on")).toBeVisible();
  await expect(page.locator("footer").getByText("Find me on")).toHaveCount(0);
  await expect(projectsNav).toBeVisible();
  await expect(desktopNav.getByRole("link", { name: "Blog" })).toHaveCount(0);
  await expect(aboutNav).toHaveAttribute("aria-current", "location");

  await projectsNav.click();
  await expect(page).toHaveURL(PROJECTS_HASH_RE);
  await expect(projectsHeading).toBeVisible();
  await expect(ossHeading).toBeVisible();
  await expect(
    page
      .locator("#projects")
      .locator('a[href="https://github.com/shrirambalaji/linkerland"]')
      .first()
  ).toBeVisible();
  await expect(
    page
      .locator("#projects")
      .locator('a[href="https://github.com/rust-lang/rust/pull/131315"]')
      .first()
  ).toBeVisible();
  const rustCodeToken = page.locator("#projects code", {
    hasText: "std_features",
  });
  await expect(rustCodeToken).toBeVisible();
  await expect(rustCodeToken).toHaveCSS("font-family", PAPER_MONO_RE);
  await expect(rustCodeToken).toHaveCSS("font-size", "14.5px");
  await expect(
    page.locator("#projects").getByRole("link", { name: "All projects" })
  ).toHaveCount(0);
  await expect(
    page.locator('img[src="/images/projects/linkerland-mark.svg"]').first()
  ).toBeVisible();
  await expect(
    writingSection.getByRole("link", { name: latestBlogPost.title })
  ).toHaveAttribute("href", latestBlogPost.href);
  await expect(
    writingSection.getByRole("link", { name: latestBlogPost.title })
  ).not.toHaveAttribute("target", NON_EMPTY_RE);
  await expect(writingSection.getByText(latestBlogPostDate)).toBeVisible();
  await expect(
    writingSection.locator('a[href="/writing/posts"]').first()
  ).toBeVisible();
  await expect(projectsNav).toHaveAttribute("aria-current", "location");
  await expect(aboutNav).not.toHaveAttribute("aria-current", NON_EMPTY_RE);

  const [ossBox, writingBox] = await Promise.all([
    ossHeading.boundingBox(),
    writingSection.boundingBox(),
  ]);

  expect(ossBox?.y).toBeLessThan(writingBox?.y ?? Number.POSITIVE_INFINITY);

  await writingNav.click();
  await expect(page).toHaveURL(WRITING_HASH_RE);
  await expect(
    writingSection.getByRole("heading", {
      exact: true,
      level: 2,
      name: "Writing",
    })
  ).toBeVisible();
  await expect(
    writingSection.getByRole("link", { name: latestBlogPost.title })
  ).toBeVisible();
  await expect(writingNav).toHaveAttribute("aria-current", "location");

  await page.goto("/#writing");
  await expect(page).toHaveURL(WRITING_HASH_RE);
  await expect(writingNav).toHaveAttribute("aria-current", "location");

  await talksNav.click();
  await expect(page).toHaveURL(TALKS_HASH_RE);
  await expect(page.locator("#talks ul h2").first()).toHaveText(TALK_TITLE_RE);
  await expect(page.locator("#talks ul h2").nth(1)).toHaveText(
    ROOTCONF_TALK_TITLE_RE
  );
  await expect(page.locator("#talks ul h2").first()).toHaveCSS(
    "line-height",
    "24px"
  );
  await expect(page.getByRole("link", { name: "Watch" }).first()).toBeVisible();
  const firstSlidesLink = page.getByRole("link", { name: "Slides" }).first();
  await expect(firstSlidesLink).toBeVisible();
  await expect(firstSlidesLink).toHaveAttribute(
    "href",
    "/slides/a-series-of-unstoppable-events.pdf"
  );
  await firstSlidesLink.hover();
  await expect(firstSlidesLink.locator("span").first()).toHaveClass(
    SKY_CLASS_RE
  );
  await expect(
    page.getByRole("link", { name: "Watch" }).first()
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=CtjfotvkJGo");
  await expect(talksNav).toHaveAttribute("aria-current", "location");

  await page.goto("/");
  await page.evaluate(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight });
  });
  await expect(talksNav).toHaveAttribute("aria-current", "location");

  await page.goto("/uses");
  await expect(
    page.getByRole("heading", { level: 2, name: "Hardware" })
  ).toBeVisible();
  await expect(usesNav).toHaveAttribute("aria-current", "page");
});

test("site respects prefers-color-scheme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(17, 17, 24)"
  );
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Shriram Balaji" })
  ).toHaveCSS("color", "rgb(255, 255, 255)");

  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();

  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(252, 252, 250)"
  );
});

test("homepage uses the slower first-load animation timing", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("body")).toHaveAttribute("data-page", "/");
  await expect(page.locator("header.site-intro-fade")).toHaveCSS(
    "animation-duration",
    "0.76s"
  );
  await expect(page.locator("main.page-content > article").first()).toHaveCSS(
    "animation-duration",
    "0.76s"
  );
  await expect(page.locator("#projects .detail-list > li").first()).toHaveCSS(
    "animation-duration",
    "0.68s"
  );
});

test("mobile menu overlays the viewport cleanly", async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto("/");

  const aboutArticle = page.locator("#about");
  const firstIntroParagraph = aboutArticle.locator("p").first();
  const aboutBox = await aboutArticle.boundingBox();

  await expect(firstIntroParagraph).toHaveCSS("font-size", "15px");
  await expect(firstIntroParagraph).toHaveCSS("line-height", "26.88px");
  expect(Math.round(aboutBox?.width ?? 0)).toBeGreaterThan(350);

  await page.getByRole("banner").getByRole("button", { name: "Menu" }).click();

  const overlay = page.locator(".mobile-nav-overlay");
  await expect(overlay).toHaveCSS("position", "fixed");
  await expect(overlay).toHaveCSS("z-index", "50");
  await expect(overlay).toHaveCSS("backdrop-filter", BLUR_RE);
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "About" })
  ).toBeVisible();

  const box = await overlay.boundingBox();
  expect(box?.x).toBe(0);
  expect(box?.y).toBe(0);
  expect(Math.round(box?.width ?? 0)).toBe(390);
  expect(Math.round(box?.height ?? 0)).toBe(844);
});

test("talk titles fit on mobile", async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto("/#talks");

  const talksSection = page.locator("#talks");
  const firstTalkTitle = talksSection.locator("ul h2").first();
  const firstWatchLink = talksSection
    .locator('a[href="https://www.youtube.com/watch?v=CtjfotvkJGo"]')
    .first();

  await expect(firstTalkTitle).toHaveText(TALK_TITLE_RE);
  await expect(firstWatchLink).toBeVisible();

  const titleBox = await firstTalkTitle.boundingBox();
  expect(Math.round(titleBox?.width ?? 0)).toBeLessThanOrEqual(390);
});
