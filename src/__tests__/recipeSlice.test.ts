import reducer, {
  clearSelectedMeal,
  searchRecipes,
  setSearchTerm,
  setSelectedMeal,
} from "@/store/slices/recipeSlice";
import type { Meal } from "@/features/recipes/types/meal";

const baseMeal = (id: string, name: string): Meal =>
  ({
    idMeal: id,
    strMeal: name,
    strCategory: "Test",
    strArea: "Test",
    strMealThumb: "",
    strInstructions: "",
  }) as Meal;

const initialState = {
  searchTerm: "",
  meals: [],
  selectedMeal: null,
  loading: false,
  error: null,
  randomLoading: false,
  randomError: null,
};

describe("recipeSlice", () => {
  it("setSearchTerm updates searchTerm", () => {
    const state = reducer(initialState, setSearchTerm("beef"));
    expect(state.searchTerm).toBe("beef");
  });

  it("setSelectedMeal updates selectedMeal", () => {
    const meal = baseMeal("1", "Beef Stew");
    const state = reducer(initialState, setSelectedMeal(meal));
    expect(state.selectedMeal).toEqual(meal);
  });

  it("clearSelectedMeal resets selectedMeal to null", () => {
    const meal = baseMeal("1", "Beef Stew");
    const withMeal = reducer(initialState, setSelectedMeal(meal));
    const cleared = reducer(withMeal, clearSelectedMeal());
    expect(cleared.selectedMeal).toBeNull();
  });

  it("sets loading=true on searchRecipes.pending and clears any error", () => {
    const state = reducer({ ...initialState, error: "old" }, { type: searchRecipes.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("sets meals on searchRecipes.fulfilled", () => {
    const meals = [baseMeal("1", "Beef"), baseMeal("2", "Chicken")];
    const state = reducer(initialState, { type: searchRecipes.fulfilled.type, payload: meals });
    expect(state.loading).toBe(false);
    expect(state.meals).toEqual(meals);
  });

  it("sets error on searchRecipes.rejected", () => {
    const state = reducer(initialState, {
      type: searchRecipes.rejected.type,
      payload: "Network error",
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Network error");
  });
});
