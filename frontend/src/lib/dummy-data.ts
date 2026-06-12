import type { BoardState } from "./types";

export const initialBoardState: BoardState = {
  columns: [
    { id: "col-backlog", title: "Backlog" },
    { id: "col-ready", title: "Ready" },
    { id: "col-in-progress", title: "In Progress" },
    { id: "col-review", title: "Review" },
    { id: "col-done", title: "Done" },
  ],
  cards: [
    {
      id: "card-1",
      title: "Define project scope",
      details: "Document MVP requirements and success criteria for the kanban board.",
      columnId: "col-backlog",
    },
    {
      id: "card-2",
      title: "Design wireframes",
      details: "Sketch column layout, card structure, and drag-and-drop interactions.",
      columnId: "col-backlog",
    },
    {
      id: "card-3",
      title: "Set up Next.js project",
      details: "Scaffold frontend with TypeScript, Tailwind, and testing tooling.",
      columnId: "col-ready",
    },
    {
      id: "card-4",
      title: "Implement board reducer",
      details: "Pure state logic for add, delete, rename, and move operations.",
      columnId: "col-ready",
    },
    {
      id: "card-5",
      title: "Build column components",
      details: "Render five fixed columns with editable titles and card lists.",
      columnId: "col-in-progress",
    },
    {
      id: "card-6",
      title: "Add drag and drop",
      details: "Integrate dnd-kit for moving cards within and across columns.",
      columnId: "col-in-progress",
    },
    {
      id: "card-7",
      title: "Write unit tests",
      details: "Cover reducer logic and interactive component behavior.",
      columnId: "col-review",
    },
    {
      id: "card-8",
      title: "Run Playwright e2e tests",
      details: "Verify rename, add, delete, and drag flows in the browser.",
      columnId: "col-review",
    },
    {
      id: "card-9",
      title: "Polish UI styling",
      details: "Apply brand colors, shadows, and responsive column layout.",
      columnId: "col-done",
    },
  ],
};
