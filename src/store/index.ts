import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "@/store/slices/recipeSlice";
import shoppingListReducer from "@/store/slices/shoppingListSlice";
import uiReducer from "@/store/slices/uiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      recipe: recipeReducer,
      shoppingList: shoppingListReducer,
      ui: uiReducer,
    },
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
