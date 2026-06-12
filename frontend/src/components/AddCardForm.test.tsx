import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddCardForm } from "./AddCardForm";

describe("AddCardForm", () => {
  it("shows toggle button initially", () => {
    render(<AddCardForm onAdd={vi.fn()} />);
    expect(screen.getByTestId("add-card-toggle")).toBeInTheDocument();
  });

  it("opens form and submits a new card", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddCardForm onAdd={onAdd} />);

    await user.click(screen.getByTestId("add-card-toggle"));
    await user.type(screen.getByTestId("add-card-title"), "New task");
    await user.type(screen.getByTestId("add-card-details"), "Task details");
    await user.click(screen.getByTestId("add-card-submit"));

    expect(onAdd).toHaveBeenCalledWith("New task", "Task details");
    expect(screen.getByTestId("add-card-toggle")).toBeInTheDocument();
  });

  it("does not submit with empty title", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddCardForm onAdd={onAdd} />);

    await user.click(screen.getByTestId("add-card-toggle"));
    await user.click(screen.getByTestId("add-card-submit"));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it("cancels and closes the form", async () => {
    const user = userEvent.setup();
    render(<AddCardForm onAdd={vi.fn()} />);

    await user.click(screen.getByTestId("add-card-toggle"));
    await user.type(screen.getByTestId("add-card-title"), "Draft");
    await user.click(screen.getByTestId("add-card-cancel"));

    expect(screen.queryByTestId("add-card-form")).not.toBeInTheDocument();
  });
});
