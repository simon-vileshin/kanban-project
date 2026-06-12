export type Card = {
  id: string;
  title: string;
  details: string;
  columnId: string;
};

export type Column = {
  id: string;
  title: string;
};

export type BoardState = {
  columns: Column[];
  cards: Card[];
};

export type BoardAction =
  | { type: "renameColumn"; columnId: string; title: string }
  | { type: "addCard"; columnId: string; title: string; details: string }
  | { type: "deleteCard"; cardId: string }
  | {
      type: "moveCard";
      cardId: string;
      toColumnId: string;
      toIndex: number;
    };
