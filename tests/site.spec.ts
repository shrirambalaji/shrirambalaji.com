import { expect, test } from "@playwright/test";

test("core pages render and navigation works", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("banner").getByRole("link", { name: "Shriram Balaji" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Projects" }).first()).toBeVisible();

  await page.getByRole("link", { name: "Projects" }).first().click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { level: 1, name: "Projects" })).toBeVisible();
  await expect(page.getByRole("link", { name: "linkerland" })).toBeVisible();
  await expect(page.locator('img[src="/images/projects/linkerland-mark.svg"]').first()).toBeVisible();

  await page.goto("/talks");
  await expect(page.getByRole("heading", { level: 1, name: "Talks" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Rust Unlinked" })).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Watch" }).first()).toBeVisible();
});
