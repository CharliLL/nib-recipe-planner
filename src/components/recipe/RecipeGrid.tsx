"use client";

import RecipeCard from "@/components/recipe/RecipeCard";
import type { Meal } from "@/features/recipes/types/meal";

interface RecipeGridProps {
  meals: Meal[];
  onSelectMeal: (meal: Meal) => void;
}

export default function RecipeGrid({ meals, onSelectMeal }: RecipeGridProps) {
  return (
    <div
      role="list"
      aria-label="Recipe results"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {meals.map((meal) => (
        <div role="listitem" key={meal.idMeal}>
          <RecipeCard meal={meal} onSelect={onSelectMeal} />
        </div>
      ))}
    </div>
  );
}
