"use client";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import ShoppingListItem from "@/components/shopping-list/ShoppingListItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearShoppingListItems } from "@/store/slices/shoppingListSlice";

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingListModal({ isOpen, onClose }: ShoppingListModalProps) {
  const items = useAppSelector((s) => s.shoppingList.items);
  const dispatch = useAppDispatch();

  return (
    <Modal isOpen={isOpen} title="My shopping list" onClose={onClose}>
      {items.length === 0 ? (
        <EmptyState
          title="Your shopping list is empty"
          description="Open a recipe and add it to your shopping list to see ingredients here."
        />
      ) : (
        <div className="space-y-4">
          <ul
            className="divide-y divide-slate-100 overflow-hidden rounded-md border border-slate-200 bg-white"
            aria-label="Shopping list items"
          >
            {items.map((item) => (
              <ShoppingListItem key={item.name.toLowerCase()} item={item} />
            ))}
          </ul>
          <div className="flex justify-end">
            <Button variant="danger" onClick={() => dispatch(clearShoppingListItems())}>
              Clear shopping list
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
