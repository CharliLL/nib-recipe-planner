import { mergeShoppingListItems } from "@/features/shopping-list/utils/mergeShoppingList";

describe("mergeShoppingListItems", () => {
  it("appends a new measure when the ingredient already exists (case-insensitive)", () => {
    const result = mergeShoppingListItems(
      [{ name: "Onion", measures: ["1"] }],
      [{ name: " onion ", measure: "2" }]
    );
    expect(result).toEqual([{ name: "Onion", measures: ["1", "2"] }]);
  });

  it("trims ingredient names and uses existing display name on duplicates", () => {
    const result = mergeShoppingListItems(
      [{ name: "Chicken", measures: ["500g"] }],
      [{ name: "  chicken", measure: "300g" }]
    );
    expect(result).toEqual([{ name: "Chicken", measures: ["500g", "300g"] }]);
  });

  it("sorts the final list alphabetically", () => {
    const result = mergeShoppingListItems(
      [],
      [
        { name: "Tomato", measure: "2" },
        { name: "Apple", measure: "1" },
        { name: "Beef", measure: "500g" },
      ]
    );
    expect(result.map((i) => i.name)).toEqual(["Apple", "Beef", "Tomato"]);
  });

  it("skips empty measures", () => {
    const result = mergeShoppingListItems(
      [],
      [
        { name: "Salt", measure: "" },
        { name: "Salt", measure: "   " },
        { name: "Salt", measure: "a pinch" },
      ]
    );
    expect(result).toEqual([{ name: "Salt", measures: ["a pinch"] }]);
  });

  it("skips ingredients with empty names", () => {
    const result = mergeShoppingListItems(
      [],
      [
        { name: "", measure: "1" },
        { name: "  ", measure: "2" },
        { name: "Beef", measure: "500g" },
      ]
    );
    expect(result).toEqual([{ name: "Beef", measures: ["500g"] }]);
  });

  it("does not perform unit conversion — measures remain free-text strings", () => {
    const result = mergeShoppingListItems(
      [{ name: "Flour", measures: ["1 cup"] }],
      [{ name: "Flour", measure: "240g" }]
    );
    expect(result).toEqual([{ name: "Flour", measures: ["1 cup", "240g"] }]);
  });
});
