"use client";

import { useState } from "react";

// Multi-select gezinnen picker with an "iedereen" quick-toggle, shared by
// the agenda and updates composers. Selected ids are submitted as repeated
// hidden inputs sharing `name`, so a plain server action can read them via
// formData.getAll(name) — no client-side fetch needed.
export default function AudiencePicker({
  kinderen,
  name = "kind_ids",
}: {
  kinderen: { id: string; naam: string }[];
  name?: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const alleGeselecteerd = kinderen.length > 0 && selected.length === kinderen.length;

  function toggleAlle() {
    setSelected(alleGeselecteerd ? [] : kinderen.map((k) => k.id));
  }

  function toggleOne(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div>
      <label className="mb-1 block text-sm text-muted">Voor wie is dit zichtbaar?</label>
      <div className="flex flex-col gap-2 rounded-[var(--radius-sm)] border border-border p-3 max-h-56 overflow-y-auto">
        <label className="flex items-center gap-2 border-b border-border pb-2 text-sm font-semibold">
          <input type="checkbox" checked={alleGeselecteerd} onChange={toggleAlle} />
          Iedereen
        </label>
        {kinderen.map((k) => (
          <label key={k.id} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={selected.includes(k.id)} onChange={() => toggleOne(k.id)} />
            {k.naam}
          </label>
        ))}
        {kinderen.length === 0 && <p className="text-sm text-muted">Nog geen gezinnen gekoppeld.</p>}
      </div>
      {selected.map((id) => (
        <input key={id} type="hidden" name={name} value={id} />
      ))}
    </div>
  );
}
