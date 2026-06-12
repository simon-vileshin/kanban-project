import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditableColumnTitle } from "./EditableColumnTitle";

describe("EditableColumnTitle", () => {
  it("displays the column title", () => {
    render(<EditableColumnTitle title="Backlog" onRename={vi.fn()} />);
    expect(screen.getByTestId("column-title")).toHaveTextContent("Backlog");
  });

  it("enters edit mode on click and saves on Enter", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();
    render(<EditableColumnTitle title="Backlog" onRename={onRename} />);

    await user.click(screen.getByTestId("column-title"));
    const input = screen.getByTestId("column-title-input");
    await user.clear(input);
    await user.type(input, "Ideas{Enter}");

    expect(onRename).toHaveBeenCalledWith("Ideas");
    expect(screen.queryByTestId("column-title-input")).not.toBeInTheDocument();
  });

  it("does not rename with empty title", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();
    render(<EditableColumnTitle title="Backlog" onRename={onRename} />);

    await user.click(screen.getByTestId("column-title"));
    const input = screen.getByTestId("column-title-input");
    await user.clear(input);
    await user.tab();

    expect(onRename).not.toHaveBeenCalled();
  });
});
