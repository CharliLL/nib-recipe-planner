import axios from "axios";
import { MEALDB_BASE_URL } from "@/lib/constants";
import type { Meal, MealApiResponse } from "@/features/recipes/types/meal";

const client = axios.create({
  baseURL: MEALDB_BASE_URL,
  timeout: 15000,
});

export async function searchMeals(searchTerm: string): Promise<Meal[]> {
  const trimmed = searchTerm.trim();
  if (!trimmed) {
    return [];
  }
  const response = await client.get<MealApiResponse>("/search.php", {
    params: { s: trimmed },
  });
  return response.data.meals ?? [];
}

export async function getRandomMeal(): Promise<Meal> {
  const response = await client.get<MealApiResponse>("/random.php");
  const meal = response.data.meals?.[0];
  if (!meal) {
    throw new Error("No random recipe returned from TheMealDB");
  }
  return meal;
}
