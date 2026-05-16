import { SHOPPING_LIST_STORAGE_KEY } from "@/lib/constants";
import type { ShoppingListItem } from "@/features/shopping-list/types/shoppingList";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getShoppingList(): ShoppingListItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(SHOPPING_LIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is ShoppingListItem =>
        item &&
        typeof item.name === "string" &&
        Array.isArray(item.measures) &&
        item.measures.every((m: unknown) => typeof m === "string")
    );
  } catch {
    return [];
  }
}

export function saveShoppingList(items: ShoppingListItem[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Silently ignore storage errors (quota, private mode, etc.)
  }
}

export function clearShoppingList(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(SHOPPING_LIST_STORAGE_KEY);
  } catch {
    // ignore
  }
}
