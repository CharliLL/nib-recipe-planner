import type { Ingredient, Meal } from "@/features/recipes/types/meal";

export function extractIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const rawName = meal[`strIngredient${i}`];
    const rawMeasure = meal[`strMeasure${i}`];
    const name = typeof rawName === "string" ? rawName.trim() : "";
    const measure = typeof rawMeasure === "string" ? rawMeasure.trim() : "";
    if (!name) continue;
    ingredients.push({ name, measure });
  }
  return ingredients;
}
