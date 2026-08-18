// Shared by the agenda and updates team pages to render "Voor: ..." / "Naar:
// ..." from a junction-table select like `agenda_deelnemers(kinderen(naam))`.
// Without generated Supabase types, this many-to-one embed is inferred as an
// array even though Postgrest returns a single object at runtime, so this
// accepts (and handles) both shapes instead of relying on an `any` cast at
// each call site — the workaround now lives in one place, not two.
type KindNaamRow = { kinderen: { naam: string } | { naam: string }[] | null };

export function joinKinderenNamen(rows: KindNaamRow[]): string {
  return (
    rows
      .map((r) => (Array.isArray(r.kinderen) ? r.kinderen[0]?.naam : r.kinderen?.naam))
      .filter(Boolean)
      .join(", ") || "—"
  );
}
