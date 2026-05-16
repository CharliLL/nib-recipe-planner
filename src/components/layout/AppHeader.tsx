"use client";

import { NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";

interface AppHeaderProps {
  onSurpriseMe: () => void;
  randomLoading: boolean;
}

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-brand text-white"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

export default function AppHeader({ onSurpriseMe, randomLoading }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            🍳
          </span>
          <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Recipe Search &amp; Meal Planner
          </h1>
        </div>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-1 sm:gap-2">
          <NavLink to="/" end className={navItemClass}>
            Search
          </NavLink>
          <NavLink to="/shopping-list" className={navItemClass}>
            Shopping List
          </NavLink>
          <NavLink to="/about" className={navItemClass}>
            About
          </NavLink>
          <Button
            variant="secondary"
            onClick={onSurpriseMe}
            disabled={randomLoading}
            aria-label="Surprise me with a random recipe"
          >
            {randomLoading ? "Loading…" : "Surprise me"}
          </Button>
        </nav>
      </div>
    </header>
  );
}
