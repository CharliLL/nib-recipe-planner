"use client";

import { useMemo } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import IngredientList from "@/components/recipe/IngredientList";
import { extractIngredients } from "@/features/recipes/utils/ingredientMapper";
import type { Meal } from "@/features/recipes/types/meal";

interface RecipeModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToShoppingList: (meal: Meal) => void;
}

export default function RecipeModal({
  meal,
  isOpen,
  onClose,
  onAddToShoppingList,
}: RecipeModalProps) {
  const ingredients = useMemo(() => (meal ? extractIngredients(meal) : []), [meal]);

  if (!meal) {
    return (
      <Modal isOpen={isOpen} title="Recipe" onClose={onClose}>
        <p className="text-sm text-slate-600">No recipe selected.</p>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} title={meal.strMeal} onClose={onClose}>
      <div className="space-y-4">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="aspect-[16/9] w-full rounded-md object-cover"
        />
        <div className="flex flex-wrap gap-2 text-xs">
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

        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Ingredients
          </h3>
          <IngredientList ingredients={ingredients} />
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Instructions
          </h3>
          <div className="max-h-72 overflow-y-auto whitespace-pre-line rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-800">
            {meal.strInstructions}
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          {meal.strYoutube ? (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-brand-dark underline hover:text-brand"
            >
              Watch on YouTube ↗
            </a>
          ) : null}
          {meal.strSource ? (
            <a
              href={meal.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-brand-dark underline hover:text-brand"
            >
              View source ↗
            </a>
          ) : null}
        </div>

        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onAddToShoppingList(meal)}>Add to my shopping list</Button>
        </div>
      </div>
    </Modal>
  );
}
