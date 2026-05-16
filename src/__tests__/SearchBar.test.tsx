import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/recipe/SearchBar";

describe("SearchBar", () => {
  it("lets the user type and triggers search on submit", async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    render(<SearchBar loading={false} onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search recipes/i);
    await user.type(input, "beef");
    await user.click(screen.getByRole("button", { name: /^search$/i }));
    expect(onSearch).toHaveBeenCalledWith("beef");
  });

  it("submits when pressing Enter inside the input", async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    render(<SearchBar loading={false} onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search recipes/i);
    await user.type(input, "chicken{Enter}");
    expect(onSearch).toHaveBeenCalledWith("chicken");
  });

  it("does not trigger search on empty / whitespace input", async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    render(<SearchBar loading={false} onSearch={onSearch} />);
    const button = screen.getByRole("button", { name: /^search$/i });
    expect(button).toBeDisabled();
    const input = screen.getByPlaceholderText(/search recipes/i);
    await user.type(input, "   ");
    expect(button).toBeDisabled();
    await user.keyboard("{Enter}");
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("disables search while loading", () => {
    render(<SearchBar initialValue="beef" loading={true} onSearch={() => {}} />);
    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });
});
