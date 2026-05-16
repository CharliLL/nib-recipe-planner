export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube?: string | null;
  strSource?: string | null;
  // TheMealDB returns strIngredient1..20 and strMeasure1..20 dynamically
  [key: string]: string | null | undefined;
}

export interface MealApiResponse {
  meals: Meal[] | null;
}

export interface Ingredient {
  name: string;
  measure: string;
}
