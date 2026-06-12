"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card as CardType } from "@/lib/types";

type KanbanCardProps = {
  card: CardType;
  onDelete: (cardId: string) => void;
};

export function KanbanCard({ card, onDelete }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-testid={`card-${card.id}`}
      className="group relative rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 shadow-sm transition hover:shadow-md"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <h3 className="pr-6 text-sm font-semibold text-[var(--color-navy)]">
          {card.title}
        </h3>
        {card.details && (
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-gray)]">
            {card.details}
          </p>
        )}
      </div>
      <button
        type="button"
        data-testid={`delete-card-${card.id}`}
        aria-label={`Delete ${card.title}`}
        className="absolute right-2 top-2 rounded p-1 text-[var(--color-gray)] opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
        onClick={() => onDelete(card.id)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

export function KanbanCardOverlay({ card }: { card: CardType }) {
  return (
    <div className="rounded-lg border border-[var(--color-accent)] bg-[var(--color-card)] p-3 shadow-lg ring-2 ring-[var(--color-accent)]">
      <h3 className="text-sm font-semibold text-[var(--color-navy)]">{card.title}</h3>
      {card.details && (
        <p className="mt-1 text-xs text-[var(--color-gray)]">{card.details}</p>
      )}
    </div>
  );
}
