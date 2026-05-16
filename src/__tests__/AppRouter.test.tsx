import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import AppRouter from "@/routes/AppRouter";

function renderApp(initialPath = "/") {
  window.history.pushState({}, "", initialPath);
  const store = makeStore();
  return {
    store,
    ...render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    ),
  };
}

describe("AppRouter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the Search route by default", () => {
    renderApp("/");
    expect(screen.getByRole("heading", { name: /find a recipe/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search recipes/i)).toBeInTheDocument();
  });

  it("navigates to the Shopping List route via the nav link", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await user.click(screen.getByRole("link", { name: /shopping list/i }));
    expect(screen.getByRole("heading", { name: /my shopping list/i })).toBeInTheDocument();
  });

  it("navigates to the About route via the nav link", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await user.click(screen.getByRole("link", { name: /^about$/i }));
    expect(screen.getByRole("heading", { name: /about this project/i })).toBeInTheDocument();
  });

  it("renders the NotFound page for unknown routes", () => {
    renderApp("/this-does-not-exist");
    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
  });

  it("hydrates the shopping list from localStorage on mount", async () => {
    localStorage.setItem(
      "nib-recipe-planner-shopping-list",
      JSON.stringify([{ name: "Beef", measures: ["500g"] }])
    );
    const user = userEvent.setup();
    await act(async () => {
      renderApp("/shopping-list");
    });
    await user.click(screen.getByRole("link", { name: /shopping list/i }));
    expect(screen.getByText("Beef")).toBeInTheDocument();
    expect(screen.getByText("500g")).toBeInTheDocument();
  });
});
