import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getRandomMeal, searchMeals } from "@/features/recipes/services/mealApi";
import type { Meal } from "@/features/recipes/types/meal";

export interface RecipeState {
  searchTerm: string;
  meals: Meal[];
  selectedMeal: Meal | null;
  loading: boolean;
  error: string | null;
  randomLoading: boolean;
  randomError: string | null;
}

const initialState: RecipeState = {
  searchTerm: "",
  meals: [],
  selectedMeal: null,
  loading: false,
  error: null,
  randomLoading: false,
  randomError: null,
};

export const searchRecipes = createAsyncThunk<Meal[], string, { rejectValue: string }>(
  "recipes/search",
  async (term, { rejectWithValue }) => {
    try {
      return await searchMeals(term);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to search recipes";
      return rejectWithValue(message);
    }
  }
);

export const fetchRandomRecipe = createAsyncThunk<Meal, void, { rejectValue: string }>(
  "recipes/random",
  async (_, { rejectWithValue }) => {
    try {
      return await getRandomMeal();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch random recipe";
      return rejectWithValue(message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    clearResults(state) {
      state.meals = [];
      state.error = null;
    },
    setSelectedMeal(state, action: PayloadAction<Meal>) {
      state.selectedMeal = action.payload;
    },
    clearSelectedMeal(state) {
      state.selectedMeal = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Search failed";
      })
      .addCase(fetchRandomRecipe.pending, (state) => {
        state.randomLoading = true;
        state.randomError = null;
      })
      .addCase(fetchRandomRecipe.fulfilled, (state, action) => {
        state.randomLoading = false;
        state.selectedMeal = action.payload;
      })
      .addCase(fetchRandomRecipe.rejected, (state, action) => {
        state.randomLoading = false;
        state.randomError = action.payload ?? "Random recipe failed";
      });
  },
});

export const { setSearchTerm, clearResults, setSelectedMeal, clearSelectedMeal } =
  recipeSlice.actions;

export default recipeSlice.reducer;
