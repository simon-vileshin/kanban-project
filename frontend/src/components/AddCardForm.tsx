"use client";

import { useState, FormEvent } from "react";

type AddCardFormProps = {
  onAdd: (title: string, details: string) => void;
};

export function AddCardForm({ onAdd }: AddCardFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const reset = () => {
    setTitle("");
    setDetails("");
    setOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onAdd(trimmedTitle, details.trim());
    reset();
  };

  if (!open) {
    return (
      <button
        type="button"
        data-testid="add-card-toggle"
        className="mt-2 w-full rounded-lg border border-dashed border-[var(--color-border)] py-2 text-sm text-[var(--color-gray)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
        onClick={() => setOpen(true)}
      >
        + Add card
      </button>
    );
  }

  return (
    <form
      data-testid="add-card-form"
      className="mt-2 space-y-2 rounded-lg border border-[var(--color-border)] bg-white p-3 shadow-sm"
      onSubmit={handleSubmit}
    >
      <input
        data-testid="add-card-title"
        className="w-full rounded border border-[var(--color-border)] px-2 py-1.5 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-primary)]"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        data-testid="add-card-details"
        className="w-full resize-none rounded border border-[var(--color-border)] px-2 py-1.5 text-sm text-[var(--color-gray)] outline-none focus:border-[var(--color-primary)]"
        placeholder="Details (optional)"
        rows={2}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          data-testid="add-card-submit"
          className="rounded bg-[var(--color-secondary)] px-3 py-1.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Add
        </button>
        <button
          type="button"
          data-testid="add-card-cancel"
          className="rounded px-3 py-1.5 text-sm text-[var(--color-gray)] transition hover:text-[var(--color-navy)]"
          onClick={reset}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
