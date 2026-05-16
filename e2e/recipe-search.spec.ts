import { test, expect } from "@playwright/test";

test("user can search recipes and open a recipe modal", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /find a recipe/i })).toBeVisible();

  const input = page.getByPlaceholder(/search recipes/i);
  await input.fill("beef");
  await page.getByRole("button", { name: /^search$/i }).click();

  // Recipe cards should appear (TheMealDB returns several beef recipes)
  const firstCard = page.getByRole("button", { name: /open recipe/i }).first();
  await expect(firstCard).toBeVisible({ timeout: 15_000 });

  await firstCard.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: /add to my shopping list/i })).toBeVisible();
});
