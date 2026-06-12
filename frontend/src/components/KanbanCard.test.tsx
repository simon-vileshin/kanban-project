import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanCard } from "./KanbanCard";

const card = {
  id: "card-test",
  title: "Test card",
  details: "Test details",
  columnId: "col-backlog",
};

function renderCard(onDelete = vi.fn()) {
  return render(
    <DndContext>
      <SortableContext items={[card.id]} strategy={verticalListSortingStrategy}>
        <KanbanCard card={card} onDelete={onDelete} />
      </SortableContext>
    </DndContext>,
  );
}

describe("KanbanCard", () => {
  it("renders title and details", () => {
    renderCard();
    expect(screen.getByText("Test card")).toBeInTheDocument();
    expect(screen.getByText("Test details")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderCard(onDelete);

    await user.click(screen.getByTestId("delete-card-card-test"));
    expect(onDelete).toHaveBeenCalledWith("card-test");
  });
});
