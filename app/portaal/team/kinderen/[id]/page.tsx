import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import TeamNav from "@/components/team/TeamNav";
import ScoreGauge from "@/components/team/ScoreGauge";
import { requireTrajectleider } from "@/lib/supabase/trajectleider";
import { createClient } from "@/lib/supabase/server";
import { addScoreAction, addDoelAction, updateDoelStatusAction, koppelOuderAction, reassignTrajectleiderAction } from "./actions";

export const metadata: Metadata = { title: "Gezin" };

const ERROR_MESSAGES: Record<string, string> = {
  ongeldige_score: "Vul een score tussen 0 en 100 in.",
  score_mislukt: "Opslaan van de score is niet gelukt.",
  doel_verplicht: "Vul een titel voor het doel in.",
  doel_mislukt: "Toevoegen van het doel is niet gelukt.",
  email_verplicht: "Vul een e-mailadres in.",
  ouder_niet_gevonden: "Geen account gevonden met dit e-mailadres — de ouder moet eerst zelf een account aanmaken.",
  koppelen_mislukt: "Koppelen is niet gelukt.",
  doel_status_mislukt: "Bijwerken van de doelstatus is niet gelukt.",
  toewijzen_mislukt: "Toewijzen aan een andere trajectleider is niet gelukt.",
};

const DOEL_STATUSSEN = [
  { value: "open", label: "Open" },
  { value: "bezig", label: "Bezig" },
  { value: "behaald", label: "Behaald" },
];

export default async function KindDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; gekoppeld?: string }>;
}) {
  const trajectleider = await requireTrajectleider();
  const { id } = await params;
  const { error, gekoppeld } = await searchParams;
  const supabase = await createClient();

  const { data: kind } = await supabase
    .from("kinderen")
    .select("id, naam, voortgang_score, ouder_id, trajectleider_id")
    .eq("id", id)
    .maybeSingle();
  if (!kind) notFound();

  const [{ data: scores }, { data: doelen }, { data: trajectleiders }] = await Promise.all([
    supabase
      .from("voortgang_scores")
      .select("id, score, toelichting, created_at")
      .eq("kind_id", id)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase.from("doelen").select("id, titel, status").eq("kind_id", id).order("created_at"),
    trajectleider.is_coordinator
      ? supabase.from("trajectleiders").select("id, naam").order("naam")
      : Promise.resolve({ data: null }),
  ]);

  return (
    <>
      <TeamNav naam={trajectleider.naam} isCoordinator={trajectleider.is_coordinator} active="dashboard" />
      <section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <p className="eyebrow mb-2">Gezin</p>
          <h1 className="text-3xl font-extrabold">{kind.naam}</h1>

          {gekoppeld === "1" && (
            <p className="mt-4 rounded-[var(--radius-sm)] border border-primary/30 bg-primary-light p-3 text-sm text-primary-dark">
              Ouderaccount gekoppeld.
            </p>
          )}
          {error && (
            <p className="mt-4 rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-3 text-sm text-danger">
              {ERROR_MESSAGES[error] ?? "Er ging iets mis."}
            </p>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold">Voortgangsscore</h2>
              <div className="mt-4 flex items-center gap-6">
                <ScoreGauge score={kind.voortgang_score} />
                <div className="flex-1 text-sm text-muted">
                  {scores && scores.length > 0 ? (
                    <ul className="flex flex-col gap-1">
                      {scores.map((s) => (
                        <li key={s.id}>
                          <span className="font-semibold text-foreground">{s.score}</span> —{" "}
                          {new Date(s.created_at).toLocaleDateString("nl-NL")}
                          {s.toelichting ? `: ${s.toelichting}` : ""}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "Nog geen score ingevuld."
                  )}
                </div>
              </div>
              <form action={addScoreAction} className="mt-5 flex flex-col gap-3">
                <input type="hidden" name="kind_id" value={kind.id} />
                <div>
                  <label htmlFor="score" className="mb-1 block text-sm text-muted">
                    Nieuwe score (0–100)
                  </label>
                  <input id="score" name="score" type="number" min={0} max={100} required className="input-field" />
                </div>
                <div>
                  <label htmlFor="toelichting" className="mb-1 block text-sm text-muted">
                    Toelichting (optioneel)
                  </label>
                  <textarea id="toelichting" name="toelichting" rows={2} className="input-field resize-y" />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Score opslaan
                </button>
              </form>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-lg font-bold">Ouderaccount</h2>
              <p className="mt-2 text-sm text-muted">
                {kind.ouder_id ? "Er is een ouderaccount gekoppeld." : "Nog geen ouderaccount gekoppeld."}
              </p>
              <form action={koppelOuderAction} className="mt-4 flex flex-col gap-3">
                <input type="hidden" name="kind_id" value={kind.id} />
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm text-muted">
                    E-mailadres van de ouder
                  </label>
                  <input id="email" name="email" type="email" required className="input-field" />
                </div>
                <button type="submit" className="btn btn-outline w-full">
                  {kind.ouder_id ? "Andere ouder koppelen" : "Koppelen"}
                </button>
              </form>
              <p className="mt-2 text-xs text-muted">
                De ouder moet eerst zelf een account aanmaken via het ouderportaal.
              </p>

              {trajectleider.is_coordinator && trajectleiders && (
                <form action={reassignTrajectleiderAction} className="mt-6 flex flex-col gap-3 border-t border-border pt-4">
                  <input type="hidden" name="kind_id" value={kind.id} />
                  <label htmlFor="trajectleider_id" className="mb-1 block text-sm text-muted">
                    Toegewezen trajectleider
                  </label>
                  <select id="trajectleider_id" name="trajectleider_id" defaultValue={kind.trajectleider_id} className="input-field">
                    {trajectleiders.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.naam}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="btn btn-outline w-full">
                    Toewijzen
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-6 card p-6">
            <h2 className="font-display text-lg font-bold">Doelen</h2>
            <div className="mt-4 flex flex-col gap-3">
              {(doelen ?? []).map((d) => (
                <div key={d.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-border p-3">
                  <span className="text-sm">{d.titel}</span>
                  <form action={updateDoelStatusAction} className="flex items-center gap-2">
                    <input type="hidden" name="kind_id" value={kind.id} />
                    <input type="hidden" name="doel_id" value={d.id} />
                    <select
                      name="status"
                      aria-label={`Status van ${d.titel}`}
                      defaultValue={d.status}
                      className="input-field !w-auto py-1.5 text-sm"
                    >
                      {DOEL_STATUSSEN.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="btn btn-outline py-1.5 text-xs">
                      Bijwerken
                    </button>
                  </form>
                </div>
              ))}
              {(doelen ?? []).length === 0 && <p className="text-sm text-muted">Nog geen doelen toegevoegd.</p>}
            </div>
            <form action={addDoelAction} className="mt-4 flex flex-wrap gap-3">
              <input type="hidden" name="kind_id" value={kind.id} />
              <input
                name="titel"
                placeholder="Nieuw doel..."
                aria-label="Nieuw doel"
                required
                className="input-field flex-1"
              />
              <button type="submit" className="btn btn-primary">
                Toevoegen
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
