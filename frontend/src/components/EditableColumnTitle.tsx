"use client";

import { useState, useRef, useEffect } from "react";

type EditableColumnTitleProps = {
  title: string;
  onRename: (title: string) => void;
};

export function EditableColumnTitle({ title, onRename }: EditableColumnTitleProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(title);
  }, [title]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const save = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== title) {
      onRename(trimmed);
    } else {
      setValue(title);
    }
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        data-testid="column-title-input"
        className="w-full rounded border border-[var(--color-primary)] bg-white px-2 py-1 text-sm font-semibold text-[var(--color-navy)] outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") {
            setValue(title);
            setEditing(false);
          }
        }}
      />
    );
  }

  return (
    <button
      type="button"
      data-testid="column-title"
      className="w-full text-left text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-primary)]"
      onClick={() => setEditing(true)}
    >
      {title}
    </button>
  );
}
