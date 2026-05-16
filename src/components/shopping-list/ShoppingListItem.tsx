import type { ShoppingListItem as ShoppingListItemType } from "@/features/shopping-list/types/shoppingList";

interface ShoppingListItemProps {
  item: ShoppingListItemType;
}

export default function ShoppingListItem({ item }: ShoppingListItemProps) {
  const measuresText = item.measures.length > 0 ? item.measures.join(" + ") : "—";
  return (
    <li className="flex items-baseline justify-between gap-3 px-4 py-3 text-sm">
      <span className="font-medium text-slate-800">{item.name}</span>
      <span className="text-slate-600">{measuresText}</span>
    </li>
  );
}
