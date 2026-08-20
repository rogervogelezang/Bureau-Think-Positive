import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import TeamNav from "@/components/team/TeamNav";
import ScoreGauge from "@/components/team/ScoreGauge";
import { requireTrajectleider } from "@/lib/supabase/trajectleider";
import { createClient } from "@/lib/supabase/server";
import { createKindAction } from "./actions";

export const metadata: Metadata = { title: "Gezinnen" };

export default async function TeamDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; toegevoegd?: string }>;
}) {
  const trajectleider = await requireTrajectleider();
  const { error, toegevoegd } = await searchParams;
  const supabase = await createClient();

  // RLS already scopes this to "own gezinnen" unless is_coordinator, so no
  // extra filtering needed here — a plain select just returns what this
  // trajectleider is allowed to see.
  const { data: kinderen } = await supabase
    .from("kinderen")
    .select("id, naam, voortgang_score")
    .order("naam");

  return (
    <>
      <TeamNav naam={trajectleider.naam} isCoordinator={trajectleider.is_coordinator} active="dashboard" />
      <section className="py-12 sm:py-16">
        <Container>
          <p className="eyebrow mb-2">Team</p>
          <h1 className="text-3xl font-extrabold">
            {trajectleider.is_coordinator ? "Alle gezinnen" : "Jouw gezinnen"}
          </h1>
          <p className="mt-2 text-muted">
            {(kinderen ?? []).length} {(kinderen ?? []).length === 1 ? "gezin" : "gezinnen"}
          </p>

          {toegevoegd === "1" && (
            <p className="mt-6 rounded-[var(--radius-sm)] border border-primary/30 bg-primary-light p-4 text-sm text-primary-dark">
              Gezin toegevoegd.
            </p>
          )}
          {error && (
            <p className="mt-6 rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-4 text-sm text-danger">
              {error === "naam_verplicht" ? "Vul een naam in." : "Aanmaken is niet gelukt."}
            </p>
          )}

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-4 sm:grid-cols-2">
              {(kinderen ?? []).map((k) => (
                <Link
                  key={k.id}
                  href={`/portaal/team/kinderen/${k.id}`}
                  className="card flex items-center gap-4 p-5 hover:shadow-lg hover:-translate-y-0.5 transition"
                >
                  <ScoreGauge score={k.voortgang_score} size={64} />
                  <div>
                    <p className="font-semibold">{k.naam}</p>
                    <p className="text-sm text-primary">Bekijk details →</p>
                  </div>
                </Link>
              ))}
              {(kinderen ?? []).length === 0 && (
                <p className="text-muted">Nog geen gezinnen — voeg er hiernaast een toe.</p>
              )}
            </div>

            <div className="card h-fit p-6">
              <h2 className="font-display text-lg font-bold">Nieuw gezin toevoegen</h2>
              <form action={createKindAction} className="mt-4 flex flex-col gap-3">
                <div>
                  <label htmlFor="naam" className="mb-1 block text-sm text-muted">
                    Naam van het kind
                  </label>
                  <input id="naam" name="naam" required className="input-field" />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Toevoegen
                </button>
              </form>
              <p className="mt-3 text-xs text-muted">
                Een ouderaccount koppel je daarna vanuit de detailpagina van het gezin.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
