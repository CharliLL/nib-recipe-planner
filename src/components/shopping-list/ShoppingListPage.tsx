"use client";

import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ShoppingListItem from "@/components/shopping-list/ShoppingListItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearShoppingListItems } from "@/store/slices/shoppingListSlice";

export default function ShoppingListPage() {
  const items = useAppSelector((s) => s.shoppingList.items);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">My shopping list</h2>
        <EmptyState
          title="Your shopping list is empty"
          description="Search for a recipe and add its ingredients to start building your list."
          action={
            <Link
              to="/"
              className="inline-block rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Go to search
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-slate-900">My shopping list</h2>
        <Button
          variant="danger"
          onClick={() => dispatch(clearShoppingListItems())}
          aria-label="Clear shopping list"
        >
          Clear shopping list
        </Button>
      </div>
      <ul
        className="divide-y divide-slate-100 overflow-hidden rounded-md border border-slate-200 bg-white"
        aria-label="Shopping list items"
      >
        {items.map((item) => (
          <ShoppingListItem key={item.name.toLowerCase()} item={item} />
        ))}
      </ul>
    </section>
  );
}
