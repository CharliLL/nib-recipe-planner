import reducer, {
  addMealIngredientsToShoppingList,
  clearShoppingListItems,
  hydrateShoppingList,
} from "@/store/slices/shoppingListSlice";

const initialState = { items: [], hydrated: false };

describe("shoppingListSlice", () => {
  it("hydrateShoppingList sets items and marks hydrated", () => {
    const state = reducer(
      initialState,
      hydrateShoppingList([{ name: "Beef", measures: ["500g"] }])
    );
    expect(state.items).toEqual([{ name: "Beef", measures: ["500g"] }]);
    expect(state.hydrated).toBe(true);
  });

  it("addMealIngredientsToShoppingList merges ingredients", () => {
    const hydrated = reducer(
      initialState,
      hydrateShoppingList([{ name: "Onion", measures: ["1"] }])
    );
    const state = reducer(
      hydrated,
      addMealIngredientsToShoppingList([
        { name: "onion", measure: "2" },
        { name: "Beef", measure: "500g" },
      ])
    );
    expect(state.items).toEqual([
      { name: "Beef", measures: ["500g"] },
      { name: "Onion", measures: ["1", "2"] },
    ]);
  });

  it("clearShoppingListItems empties the list", () => {
    const hydrated = reducer(
      initialState,
      hydrateShoppingList([{ name: "Beef", measures: ["500g"] }])
    );
    const cleared = reducer(hydrated, clearShoppingListItems());
    expect(cleared.items).toEqual([]);
    // hydration flag should remain true so persistence keeps working
    expect(cleared.hydrated).toBe(true);
  });
});
