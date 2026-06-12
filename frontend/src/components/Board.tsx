"use client";

import { useReducer, useState } from "react";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { boardReducer, getCardsForColumn } from "@/lib/board-reducer";
import { initialBoardState } from "@/lib/dummy-data";
import type { Card } from "@/lib/types";
import { Column } from "./Column";
import { KanbanCardOverlay } from "./KanbanCard";

export function Board() {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const card = state.cards.find((c) => c.id === event.active.id);
    setActiveCard(card ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const activeCardData = state.cards.find((c) => c.id === activeId);
    if (!activeCardData) return;

    let toColumnId: string;
    let toIndex: number;

    const overColumn = state.columns.find((c) => c.id === over.id);
    if (overColumn) {
      toColumnId = overColumn.id;
      toIndex = getCardsForColumn(state, toColumnId).length;
    } else {
      const overCard = state.cards.find((c) => c.id === over.id);
      if (!overCard) return;

      toColumnId = overCard.columnId;
      const columnCards = getCardsForColumn(state, toColumnId);
      toIndex = columnCards.findIndex((c) => c.id === over.id);

      if (activeCardData.columnId === toColumnId) {
        const oldIndex = columnCards.findIndex((c) => c.id === activeId);
        if (oldIndex < toIndex) {
          toIndex -= 1;
        }
      }
    }

    dispatch({
      type: "moveCard",
      cardId: activeId,
      toColumnId,
      toIndex,
    });
  };

  return (
    <div data-testid="kanban-board" className="mx-auto max-w-[1600px]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-navy)]">
          Project Board
        </h1>
        <div className="mt-2 h-1 w-16 rounded bg-[var(--color-accent)]" />
        <p className="mt-3 text-sm text-[var(--color-gray)]">
          Drag cards between columns to track progress
        </p>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {state.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              cards={getCardsForColumn(state, column.id)}
              onRename={(title) =>
                dispatch({ type: "renameColumn", columnId: column.id, title })
              }
              onAddCard={(title, details) =>
                dispatch({ type: "addCard", columnId: column.id, title, details })
              }
              onDeleteCard={(cardId) =>
                dispatch({ type: "deleteCard", cardId })
              }
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? <KanbanCardOverlay card={activeCard} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
