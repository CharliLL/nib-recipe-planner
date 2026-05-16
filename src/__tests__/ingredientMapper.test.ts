import { extractIngredients } from "@/features/recipes/utils/ingredientMapper";
import type { Meal } from "@/features/recipes/types/meal";

function makeMeal(overrides: Partial<Meal>): Meal {
  return {
    idMeal: "1",
    strMeal: "Test",
    strCategory: "Cat",
    strArea: "Area",
    strMealThumb: "",
    strInstructions: "",
    ...overrides,
  } as Meal;
}

describe("extractIngredients", () => {
  it("extracts ingredients with their measures", () => {
    const meal = makeMeal({
      strIngredient1: "Beef",
      strMeasure1: "500g",
      strIngredient2: "Onion",
      strMeasure2: "1",
    });
    expect(extractIngredients(meal)).toEqual([
      { name: "Beef", measure: "500g" },
      { name: "Onion", measure: "1" },
    ]);
  });

  it("skips empty / missing ingredient slots", () => {
    const meal = makeMeal({
      strIngredient1: "Beef",
      strMeasure1: "500g",
      strIngredient2: "",
      strMeasure2: "1",
      strIngredient3: "   ",
      strMeasure3: "2",
      strIngredient4: "Salt",
      strMeasure4: "",
    });
    expect(extractIngredients(meal)).toEqual([
      { name: "Beef", measure: "500g" },
      { name: "Salt", measure: "" },
    ]);
  });

  it("trims whitespace from names and measures", () => {
    const meal = makeMeal({
      strIngredient1: "  Beef ",
      strMeasure1: "  500g ",
    });
    expect(extractIngredients(meal)).toEqual([{ name: "Beef", measure: "500g" }]);
  });

  it("treats null and undefined measures as empty string", () => {
    const meal = makeMeal({
      strIngredient1: "Beef",
      strMeasure1: null,
      strIngredient2: "Salt",
      strMeasure2: undefined,
    });
    expect(extractIngredients(meal)).toEqual([
      { name: "Beef", measure: "" },
      { name: "Salt", measure: "" },
    ]);
  });
});
