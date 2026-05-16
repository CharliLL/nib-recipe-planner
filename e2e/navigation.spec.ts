import { test, expect } from "@playwright/test";

test("client-side navigation between Search, Shopping List, and About", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /find a recipe/i })).toBeVisible();

  await page.getByRole("link", { name: /shopping list/i }).click();
  await expect(page).toHaveURL(/\/shopping-list$/);
  await expect(page.getByRole("heading", { name: /my shopping list/i })).toBeVisible();

  await page.getByRole("link", { name: /^about$/i }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: /about this project/i })).toBeVisible();

  await page.getByRole("link", { name: /^search$/i }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { name: /find a recipe/i })).toBeVisible();
});
