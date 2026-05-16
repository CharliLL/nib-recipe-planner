"use client";

import { useCallback } from "react";
import SearchBar from "@/components/recipe/SearchBar";
import RecipeGrid from "@/components/recipe/RecipeGrid";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { searchRecipes, setSearchTerm, setSelectedMeal } from "@/store/slices/recipeSlice";
import { openRecipeModal } from "@/store/slices/uiSlice";
import type { Meal } from "@/features/recipes/types/meal";

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { meals, loading, error, searchTerm } = useAppSelector((s) => s.recipe);

  const handleSearch = useCallback(
    (term: string) => {
      dispatch(setSearchTerm(term));
      dispatch(searchRecipes(term));
    },
    [dispatch]
  );

  const handleSelect = useCallback(
    (meal: Meal) => {
      dispatch(setSelectedMeal(meal));
      dispatch(openRecipeModal());
    },
    [dispatch]
  );

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">Find a recipe</h2>
        <p className="text-sm text-slate-600">
          Search TheMealDB. Click any result to see ingredients, instructions, and add it to your
          shopping list.
        </p>
      </div>

      <SearchBar initialValue={searchTerm} loading={loading} onSearch={handleSearch} />

      {loading ? <LoadingState message="Searching recipes…" /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error && meals.length === 0 && searchTerm ? (
        <EmptyState
          title={`No results for “${searchTerm}”`}
          description="Try a different keyword like beef, chicken, or pasta."
        />
      ) : null}
      {!loading && !error && meals.length === 0 && !searchTerm ? (
        <EmptyState
          title="Search for a recipe to get started"
          description="Type something like “beef” or “pasta”, or hit Surprise me in the header."
        />
      ) : null}
      {!loading && !error && meals.length > 0 ? (
        <RecipeGrid meals={meals} onSelectMeal={handleSelect} />
      ) : null}
    </section>
  );
}
