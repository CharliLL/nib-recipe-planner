import type { Ingredient } from "@/features/recipes/types/meal";

interface IngredientListProps {
  ingredients: Ingredient[];
}

export default function IngredientList({ ingredients }: IngredientListProps) {
  if (ingredients.length === 0) {
    return <p className="text-sm text-slate-600">No ingredients listed.</p>;
  }
  return (
    <ul className="divide-y divide-slate-100 rounded-md border border-slate-200 bg-white">
      {ingredients.map((ing, idx) => (
        <li
          key={`${ing.name}-${idx}`}
          className="flex items-baseline justify-between gap-3 px-3 py-2 text-sm"
        >
          <span className="font-medium text-slate-800">{ing.name}</span>
          <span className="text-slate-600">{ing.measure || "—"}</span>
        </li>
      ))}
    </ul>
  );
}
