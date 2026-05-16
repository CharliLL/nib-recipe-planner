import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Ingredient } from "@/features/recipes/types/meal";
import type { ShoppingListItem } from "@/features/shopping-list/types/shoppingList";
import { mergeShoppingListItems } from "@/features/shopping-list/utils/mergeShoppingList";

export interface ShoppingListState {
  items: ShoppingListItem[];
  hydrated: boolean;
}

const initialState: ShoppingListState = {
  items: [],
  hydrated: false,
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    hydrateShoppingList(state, action: PayloadAction<ShoppingListItem[]>) {
      state.items = action.payload;
      state.hydrated = true;
    },
    addMealIngredientsToShoppingList(state, action: PayloadAction<Ingredient[]>) {
      state.items = mergeShoppingListItems(state.items, action.payload);
    },
    clearShoppingListItems(state) {
      state.items = [];
    },
  },
});

export const { hydrateShoppingList, addMealIngredientsToShoppingList, clearShoppingListItems } =
  shoppingListSlice.actions;

export default shoppingListSlice.reducer;
