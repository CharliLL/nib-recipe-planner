import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecipeCard from "@/components/recipe/RecipeCard";
import type { Meal } from "@/features/recipes/types/meal";

const meal: Meal = {
  idMeal: "1",
  strMeal: "Beef Stew",
  strCategory: "Beef",
  strArea: "British",
  strMealThumb: "https://example.com/beef.jpg",
  strInstructions: "",
};

describe("RecipeCard", () => {
  it("renders title, category, and area", () => {
    render(<RecipeCard meal={meal} onSelect={() => {}} />);
    expect(screen.getByText("Beef Stew")).toBeInTheDocument();
    expect(screen.getByText("Beef")).toBeInTheDocument();
    expect(screen.getByText("British")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<RecipeCard meal={meal} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: /open recipe beef stew/i }));
    expect(onSelect).toHaveBeenCalledWith(meal);
  });
});
