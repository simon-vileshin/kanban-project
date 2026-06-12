import { describe, it, expect, beforeEach } from "vitest";
import { boardReducer, getCardsForColumn, resetCardIdCounter } from "./board-reducer";
import { initialBoardState } from "./dummy-data";

describe("boardReducer", () => {
  beforeEach(() => {
    resetCardIdCounter();
  });

  describe("renameColumn", () => {
    it("renames a column with trimmed title", () => {
      const result = boardReducer(initialBoardState, {
        type: "renameColumn",
        columnId: "col-backlog",
        title: "  Ideas  ",
      });

      expect(result.columns.find((c) => c.id === "col-backlog")?.title).toBe("Ideas");
    });

    it("does not rename when title is empty after trim", () => {
      const result = boardReducer(initialBoardState, {
        type: "renameColumn",
        columnId: "col-backlog",
        title: "   ",
      });

      expect(result).toBe(initialBoardState);
    });
  });

  describe("addCard", () => {
    it("adds a card to a column with unique id", () => {
      const result = boardReducer(initialBoardState, {
        type: "addCard",
        columnId: "col-backlog",
        title: "New task",
        details: "Some details",
      });

      const backlogCards = getCardsForColumn(result, "col-backlog");
      expect(backlogCards).toHaveLength(3);
      const newCard = backlogCards.find((c) => c.title === "New task");
      expect(newCard).toBeDefined();
      expect(newCard?.details).toBe("Some details");
      expect(newCard?.id).toMatch(/^card-\d+$/);
    });

    it("does not add card when title is empty", () => {
      const result = boardReducer(initialBoardState, {
        type: "addCard",
        columnId: "col-backlog",
        title: "  ",
        details: "details",
      });

      expect(result).toBe(initialBoardState);
    });
  });

  describe("deleteCard", () => {
    it("removes a card by id", () => {
      const result = boardReducer(initialBoardState, {
        type: "deleteCard",
        cardId: "card-1",
      });

      expect(result.cards.find((c) => c.id === "card-1")).toBeUndefined();
      expect(result.cards).toHaveLength(initialBoardState.cards.length - 1);
    });
  });

  describe("moveCard", () => {
    it("reorders a card within the same column", () => {
      const backlogBefore = getCardsForColumn(initialBoardState, "col-backlog");
      const firstId = backlogBefore[0].id;
      const secondId = backlogBefore[1].id;

      const result = boardReducer(initialBoardState, {
        type: "moveCard",
        cardId: firstId,
        toColumnId: "col-backlog",
        toIndex: 1,
      });

      const backlogAfter = getCardsForColumn(result, "col-backlog");
      expect(backlogAfter[0].id).toBe(secondId);
      expect(backlogAfter[1].id).toBe(firstId);
    });

    it("moves a card to a different column at specified index", () => {
      const result = boardReducer(initialBoardState, {
        type: "moveCard",
        cardId: "card-1",
        toColumnId: "col-done",
        toIndex: 0,
      });

      const doneCards = getCardsForColumn(result, "col-done");
      expect(doneCards[0].id).toBe("card-1");
      expect(getCardsForColumn(result, "col-backlog")).toHaveLength(1);
    });

    it("appends to end when index exceeds column length", () => {
      const result = boardReducer(initialBoardState, {
        type: "moveCard",
        cardId: "card-1",
        toColumnId: "col-ready",
        toIndex: 99,
      });

      const readyCards = getCardsForColumn(result, "col-ready");
      expect(readyCards[readyCards.length - 1].id).toBe("card-1");
    });
  });
});
