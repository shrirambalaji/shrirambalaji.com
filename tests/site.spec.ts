import { expect, test } from "@playwright/test";

test("core pages render and navigation works", async ({ page }) => {
  await page.goto("/");
  const desktopNav = page.getByRole("navigation", { name: "Primary" });
  const aboutNav = desktopNav.getByRole("link", { name: "About" });
  const projectsNav = desktopNav.getByRole("link", { name: "Projects" });
  const talksNav = desktopNav.getByRole("link", { name: "Talks" });
  const usesNav = desktopNav.getByRole("link", { name: "Uses" });

  await expect(
    page.getByRole("banner").getByRole("link", { name: "Shriram Balaji" })
  ).toBeVisible();
  await expect(projectsNav).toBeVisible();
  await expect(aboutNav).toHaveAttribute("aria-current", "location");

  await projectsNav.click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(
    page.locator("#projects").getByRole("heading", {
      level: 2,
      name: "Projects",
      exact: true,
    })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "linkerland" })).toBeVisible();
  await expect(
    page.locator('img[src="/images/projects/linkerland-mark.svg"]').first()
  ).toBeVisible();
  await expect(projectsNav).toHaveAttribute("aria-current", "location");
  await expect(aboutNav).not.toHaveAttribute("aria-current", /.+/);

  await talksNav.click();
  await expect(page).toHaveURL(/\/#talks$/);
  await expect(
    page.locator("#talks").getByRole("heading", {
      level: 2,
      name: "Rust Unlinked",
    })
  ).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Watch" }).first()).toBeVisible();
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
