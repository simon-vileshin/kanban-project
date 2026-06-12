"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Card, Column as ColumnType } from "@/lib/types";
import { EditableColumnTitle } from "./EditableColumnTitle";
import { KanbanCard } from "./KanbanCard";
import { AddCardForm } from "./AddCardForm";

type ColumnProps = {
  column: ColumnType;
  cards: Card[];
  onRename: (title: string) => void;
  onAddCard: (title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
};

export function Column({
  column,
  cards,
  onRename,
  onAddCard,
  onDeleteCard,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const cardIds = cards.map((card) => card.id);

  return (
    <div
      data-testid={`column-${column.id}`}
      className="flex w-72 shrink-0 flex-col rounded-xl bg-white shadow-sm"
    >
      <div className="border-t-4 border-[var(--color-accent)] rounded-t-xl px-4 pt-4">
        <EditableColumnTitle title={column.title} onRename={onRename} />
        <p className="mt-1 text-xs text-[var(--color-gray)]">
          {cards.length} {cards.length === 1 ? "card" : "cards"}
        </p>
      </div>

      <div
        ref={setNodeRef}
        className={`flex min-h-[120px] flex-1 flex-col gap-2 px-3 py-3 transition ${
          isOver ? "bg-blue-50/50" : ""
        }`}
      >
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {cards.length === 0 && (
            <p className="py-4 text-center text-xs text-[var(--color-gray)]">
              Drop cards here
            </p>
          )}
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} onDelete={onDeleteCard} />
          ))}
        </SortableContext>

        <AddCardForm onAdd={onAddCard} />
      </div>
    </div>
  );
}
