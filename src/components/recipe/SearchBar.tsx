"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import Button from "@/components/ui/Button";

interface SearchBarProps {
  initialValue?: string;
  loading: boolean;
  onSearch: (term: string) => void;
}

export default function SearchBar({ initialValue = "", loading, onSearch }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // form submit will fire too — no extra action needed, just guard against IME composition
    }
  };

  const disabled = loading || value.trim().length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Recipe search"
      className="flex flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="recipe-search-input" className="sr-only">
        Search recipes
      </label>
      <input
        id="recipe-search-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search recipes, e.g. beef, chicken, pudding"
        className="w-full flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
      />
      <Button type="submit" disabled={disabled} aria-label="Search">
        {loading ? "Searching…" : "Search"}
      </Button>
    </form>
  );
}
