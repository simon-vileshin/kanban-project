import type { BoardAction, BoardState, Card } from "./types";

let nextCardId = 1000;

export function generateCardId(): string {
  nextCardId += 1;
  return `card-${nextCardId}`;
}

export function resetCardIdCounter(): void {
  nextCardId = 1000;
}

function cardsInColumn(cards: Card[], columnId: string): Card[] {
  return cards.filter((card) => card.columnId === columnId);
}

function reorderCards(
  cards: Card[],
  cardId: string,
  toColumnId: string,
  toIndex: number,
): Card[] {
  const moving = cards.find((card) => card.id === cardId);
  if (!moving) return cards;

  const withoutMoving = cards.filter((card) => card.id !== cardId);
  const updated: Card = { ...moving, columnId: toColumnId };

  const targetColumnCards = cardsInColumn(withoutMoving, toColumnId);
  const otherCards = withoutMoving.filter((card) => card.columnId !== toColumnId);

  const clampedIndex = Math.max(0, Math.min(toIndex, targetColumnCards.length));
  const reorderedTarget = [...targetColumnCards];
  reorderedTarget.splice(clampedIndex, 0, updated);

  return [...otherCards, ...reorderedTarget];
}

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "renameColumn": {
      const title = action.title.trim();
      if (!title) return state;

      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.columnId ? { ...column, title } : column,
        ),
      };
    }

    case "addCard": {
      const title = action.title.trim();
      if (!title) return state;

      const newCard: Card = {
        id: generateCardId(),
        title,
        details: action.details.trim(),
        columnId: action.columnId,
      };

      return {
        ...state,
        cards: [...state.cards, newCard],
      };
    }

    case "deleteCard": {
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.cardId),
      };
    }

    case "moveCard": {
      return {
        ...state,
        cards: reorderCards(
          state.cards,
          action.cardId,
          action.toColumnId,
          action.toIndex,
        ),
      };
    }

    default:
      return state;
  }
}

export function getCardsForColumn(state: BoardState, columnId: string): Card[] {
  return cardsInColumn(state.cards, columnId);
}
