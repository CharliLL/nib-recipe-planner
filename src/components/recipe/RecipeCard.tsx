"use client";

import type { KeyboardEvent } from "react";
import type { Meal } from "@/features/recipes/types/meal";

interface RecipeCardProps {
  meal: Meal;
  onSelect: (meal: Meal) => void;
}

export default function RecipeCard({ meal, onSelect }: RecipeCardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(meal);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(meal)}
      onKeyDown={handleKeyDown}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      aria-label={`Open recipe ${meal.strMeal}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{meal.strMeal}</h3>
        <div className="mt-auto flex flex-wrap gap-2 pt-2 text-xs">
          {meal.strCategory ? (
            <span className="rounded-full bg-brand-light/40 px-2 py-0.5 text-brand-dark">
              {meal.strCategory}
            </span>
          ) : null}
          {meal.strArea ? (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">
              {meal.strArea}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
