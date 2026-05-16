import { test, expect } from "@playwright/test";

test("ingredients are added to the shopping list and persist after refresh", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder(/search recipes/i).fill("beef");
  await page.getByRole("button", { name: /^search$/i }).click();

  const firstCard = page.getByRole("button", { name: /open recipe/i }).first();
  await expect(firstCard).toBeVisible({ timeout: 15_000 });
  await firstCard.click();

  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: /add to my shopping list/i }).click();

  // Navigation should land us on the shopping list page.
  await expect(page).toHaveURL(/\/shopping-list$/);
  const list = page.getByRole("list", { name: /shopping list items/i });
  await expect(list).toBeVisible();
  await expect(list.locator("li").first()).toBeVisible();

  // Persist after refresh.
  await page.goto("/");
  await page.getByRole("link", { name: /shopping list/i }).click();

  await expect(page.getByRole("list", { name: /shopping list items/i })).toBeVisible({
    timeout: 10000,
  });
  await expect(
    page
      .getByRole("list", { name: /shopping list items/i })
      .locator("li")
      .first()
  ).toBeVisible();
});
