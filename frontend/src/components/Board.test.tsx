import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Board } from "./Board";

describe("Board", () => {
  it("renders board with dummy data columns and cards", () => {
    render(<Board />);

    expect(screen.getByTestId("kanban-board")).toBeInTheDocument();
    expect(screen.getByText("Project Board")).toBeInTheDocument();
    expect(screen.getByTestId("column-col-backlog")).toBeInTheDocument();
    expect(screen.getByTestId("column-col-done")).toBeInTheDocument();
    expect(screen.getByText("Define project scope")).toBeInTheDocument();
    expect(screen.getByText("Polish UI styling")).toBeInTheDocument();
  });
});
