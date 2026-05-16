import type { Ingredient } from "@/features/recipes/types/meal";
import type { ShoppingListItem } from "@/features/shopping-list/types/shoppingList";

/**
 * Merge new ingredients into an existing shopping list.
 *
 * - Case-insensitive duplicate detection (with trimming).
 * - Existing display name is preserved when a duplicate is encountered.
 * - Measures are stored as free-text strings (no unsafe unit conversion).
 * - Empty measures are not added.
 * - Final list is sorted alphabetically by name.
 */
export function mergeShoppingListItems(
  existingItems: ShoppingListItem[],
  newIngredients: Ingredient[]
): ShoppingListItem[] {
  const map = new Map<string, ShoppingListItem>();

  for (const item of existingItems) {
    const name = item.name.trim();
    if (!name) continue;
    map.set(name.toLowerCase(), {
      name,
      measures: item.measures.filter((m) => m.trim() !== ""),
    });
  }

  for (const ing of newIngredients) {
    const name = ing.name.trim();
    if (!name) continue;
    const key = name.toLowerCase();
    const measure = (ing.measure ?? "").trim();
    const existing = map.get(key);
    if (existing) {
      if (measure) {
        existing.measures.push(measure);
      }
    } else {
      map.set(key, {
        name,
        measures: measure ? [measure] : [],
      });
    }
  }

  return Array.from(map.values()).sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}
