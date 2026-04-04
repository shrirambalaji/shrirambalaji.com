import { expect, test } from "@playwright/test";
import { getRecentBlogPosts } from "../src/lib/blog-rss";

test("core pages render and navigation works", async ({ page }) => {
  const latestBlogPosts = await getRecentBlogPosts(4);
  const [latestBlogPost] = latestBlogPosts;
  const latestBlogPostDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(latestBlogPost!.publishedTime));

  expect(latestBlogPost).toBeTruthy();

  await page.goto("/");
  const desktopNav = page.getByRole("navigation", { name: "Primary" });
  const aboutNav = desktopNav.getByRole("link", { name: "About" });
  const projectsNav = desktopNav.getByRole("link", { name: "Projects" });
  const writingNav = desktopNav.getByRole("link", { name: "Writing" });
  const talksNav = desktopNav.getByRole("link", { name: "Talks" });
  const usesNav = desktopNav.getByRole("link", { name: "Uses" });
  const projectsHeading = page.locator("#projects").getByRole("heading", {
    level: 2,
    name: "Projects",
    exact: true,
  });
  const ossHeading = page.locator("#projects").getByRole("heading", {
    level: 2,
    name: "Recent Open Source Contributions",
  });
  const writingSection = page.locator("#writing");

  await expect(
    page.getByRole("banner").getByRole("link", { name: "Shriram Balaji" })
  ).toBeVisible();
  await expect(projectsNav).toBeVisible();
  await expect(desktopNav.getByRole("link", { name: "Blog" })).toHaveCount(0);
  await expect(aboutNav).toHaveAttribute("aria-current", "location");

  await projectsNav.click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(projectsHeading).toBeVisible();
  await expect(ossHeading).toBeVisible();
  await expect(
    page
      .locator("#projects")
      .locator('a[href="https://github.com/shrirambalaji/linkerland"]')
      .first()
  ).toBeVisible();
  await expect(
    page.locator("#projects").getByRole("link", { name: "All projects" })
  ).toHaveCount(0);
  await expect(
    page.locator('img[src="/images/projects/linkerland-mark.svg"]').first()
  ).toBeVisible();
  await expect(
    writingSection.getByRole("link", { name: latestBlogPost!.title })
  ).toBeVisible();
  await expect(writingSection.getByText(latestBlogPostDate)).toBeVisible();
  await expect(
    writingSection
      .locator('a[href="https://blog.shrirambalaji.com/posts"]')
      .first()
  ).toBeVisible();
  await expect(projectsNav).toHaveAttribute("aria-current", "location");
  await expect(aboutNav).not.toHaveAttribute("aria-current", /.+/);

  const [ossBox, writingBox] = await Promise.all([
    ossHeading.boundingBox(),
    writingSection.boundingBox(),
  ]);

  expect(ossBox?.y).toBeLessThan(writingBox?.y ?? Number.POSITIVE_INFINITY);

  await writingNav.click();
  await expect(page).toHaveURL(/\/#writing$/);
  await expect(
    writingSection.getByRole("heading", {
      level: 2,
      name: "Writing",
      exact: true,
    })
  ).toBeVisible();
  await expect(
    writingSection.getByRole("link", { name: latestBlogPost!.title })
  ).toBeVisible();
  await expect(writingNav).toHaveAttribute("aria-current", "location");

  await page.goto("/#writing");
  await expect(page).toHaveURL(/\/#writing$/);
  await expect(writingNav).toHaveAttribute("aria-current", "location");

  await talksNav.click();
  await expect(page).toHaveURL(/\/#talks$/);
  await expect(page.locator("#talks ul h2").first()).toHaveText(
    /Rumour has it: Gossip Protocols for Eventual Consistency\s*·\s*Rootconf 2025/
  );
  await expect(page.getByRole("link", { name: "Watch" }).first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Watch" }).first()
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=gHlwPfWzseo");
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

  const firstWritingLink = page.locator("#writing a").first();
  await firstWritingLink.hover();
  await expect(
    firstWritingLink.locator(".hover-inline-title").first()
  ).toHaveCSS("color", "rgb(199, 210, 254)");
  await expect(
    firstWritingLink.locator(".hover-inline-title").first()
  ).toHaveCSS("text-decoration-color", "rgb(199, 210, 254)");

  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();

  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(252, 252, 250)"
  );
});
