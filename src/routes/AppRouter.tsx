"use client";

import { useCallback, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AppHeader from "@/components/layout/AppHeader";
import AppShell from "@/components/layout/AppShell";
import RecipeModal from "@/components/recipe/RecipeModal";
import SearchPage from "@/routes/SearchPage";
import ShoppingListRoute from "@/routes/ShoppingListRoute";
import AboutPage from "@/routes/AboutPage";
import NotFoundPage from "@/routes/NotFoundPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearSelectedMeal, fetchRandomRecipe } from "@/store/slices/recipeSlice";
import {
  clearSuccessMessage,
  closeRecipeModal,
  openRecipeModal,
  setSuccessMessage,
} from "@/store/slices/uiSlice";
import {
  addMealIngredientsToShoppingList,
  hydrateShoppingList,
} from "@/store/slices/shoppingListSlice";
import {
  getShoppingList,
  saveShoppingList,
} from "@/features/shopping-list/services/shoppingListStorage";
import { extractIngredients } from "@/features/recipes/utils/ingredientMapper";
import type { Meal } from "@/features/recipes/types/meal";

function AppContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedMeal = useAppSelector((s) => s.recipe.selectedMeal);
  const isRecipeModalOpen = useAppSelector((s) => s.ui.isRecipeModalOpen);
  const randomLoading = useAppSelector((s) => s.recipe.randomLoading);
  const randomError = useAppSelector((s) => s.recipe.randomError);
  const successMessage = useAppSelector((s) => s.ui.successMessage);
  const shoppingItems = useAppSelector((s) => s.shoppingList.items);
  const hydrated = useAppSelector((s) => s.shoppingList.hydrated);
  const hasHydratedRef = useRef(false);

  // Hydrate shopping list from localStorage once on mount.
  useEffect(() => {
    if (hasHydratedRef.current) return;
    hasHydratedRef.current = true;
    const stored = getShoppingList();
    dispatch(hydrateShoppingList(stored));
  }, [dispatch]);

  // Persist shopping list after hydration only.
  useEffect(() => {
    if (!hydrated) return;
    saveShoppingList(shoppingItems);
  }, [hydrated, shoppingItems]);

  // Auto-dismiss success toast.
  useEffect(() => {
    if (!successMessage) return;
    const id = window.setTimeout(() => dispatch(clearSuccessMessage()), 3000);
    return () => window.clearTimeout(id);
  }, [successMessage, dispatch]);

  const handleSurpriseMe = useCallback(async () => {
    const action = await dispatch(fetchRandomRecipe());
    if (fetchRandomRecipe.fulfilled.match(action)) {
      dispatch(openRecipeModal());
    }
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    dispatch(closeRecipeModal());
    dispatch(clearSelectedMeal());
  }, [dispatch]);

  const handleAddToShoppingList = useCallback(
    (meal: Meal) => {
      const ingredients = extractIngredients(meal);
      dispatch(addMealIngredientsToShoppingList(ingredients));
      dispatch(setSuccessMessage(`Added ingredients from “${meal.strMeal}”`));
      dispatch(closeRecipeModal());
      dispatch(clearSelectedMeal());
      navigate("/shopping-list");
    },
    [dispatch, navigate]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AppHeader onSurpriseMe={handleSurpriseMe} randomLoading={randomLoading} />

      {successMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="mx-auto mt-3 max-w-6xl px-4 sm:px-6"
        >
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
            {successMessage}
          </div>
        </div>
      ) : null}

      {randomError ? (
        <div className="mx-auto mt-3 max-w-6xl px-4 sm:px-6">
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800"
          >
            Surprise me failed: {randomError}
          </div>
        </div>
      ) : null}

      <AppShell>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/shopping-list" element={<ShoppingListRoute />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>

      <RecipeModal
        meal={selectedMeal}
        isOpen={isRecipeModalOpen}
        onClose={handleCloseModal}
        onAddToShoppingList={handleAddToShoppingList}
      />
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
