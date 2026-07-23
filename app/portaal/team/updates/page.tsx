import type { Metadata } from "next";
import Container from "@/components/Container";
import TeamNav from "@/components/team/TeamNav";
import AudiencePicker from "@/components/team/AudiencePicker";
import { requireTrajectleider } from "@/lib/supabase/trajectleider";
import { createClient } from "@/lib/supabase/server";
import { createUpdateAction, deleteUpdateAction } from "./actions";

export const metadata: Metadata = { title: "Updates" };

const ERROR_MESSAGES: Record<string, string> = {
  velden_verplicht: "Vul een titel, bericht en minimaal één gezin in.",
  aanmaken_mislukt: "Versturen van de update is niet gelukt.",
  ontvangers_mislukt: "De update is aangemaakt, maar koppelen van ontvangers is niet gelukt.",
};

export default async function TeamUpdatesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; verstuurd?: string }>;
}) {
  const trajectleider = await requireTrajectleider();
  const { error, verstuurd } = await searchParams;
  const supabase = await createClient();

  const [{ data: kinderen }, { data: updates }] = await Promise.all([
    supabase.from("kinderen").select("id, naam").order("naam"),
    supabase
      .from("updates")
      .select("id, titel, bericht, created_at, update_ontvangers(kinderen(naam))")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <>
      <TeamNav naam={trajectleider.naam} isCoordinator={trajectleider.is_coordinator} active="updates" />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="eyebrow mb-2">Updates</p>
            <h1 className="text-3xl font-extrabold">Berichten aan ouders</h1>

            {verstuurd === "1" && (
              <p className="mt-4 rounded-[var(--radius-sm)] border border-primary/30 bg-primary-light p-3 text-sm text-primary-dark">
                Update verstuurd.
              </p>
            )}
            {error && (
              <p className="mt-4 rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-3 text-sm text-danger">
                {ERROR_MESSAGES[error] ?? "Er ging iets mis."}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-4">
              {(updates ?? []).map((u) => (
                <div key={u.id} className="card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold">{u.titel}</h3>
                      <p className="mt-1 text-xs text-muted">
                        {new Date(u.created_at).toLocaleString("nl-NL", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                      <p className="mt-2 text-sm text-muted text-pretty">{u.bericht}</p>
                      <p className="mt-2 text-xs text-muted">
                        Naar:{" "}
                        {(u.update_ontvangers ?? [])
                          // Without generated Supabase types, this many-to-one embed is inferred as
                          // an array even though Postgrest returns a single object at runtime — `any`
                          // avoids fighting the wrong inferred shape.
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          .map((o: any) => o.kinderen?.naam)
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </p>
                    </div>
                    <form action={deleteUpdateAction}>
                      <input type="hidden" name="id" value={u.id} />
                      <button type="submit" className="text-xs text-danger hover:underline">
                        Verwijderen
                      </button>
                    </form>
                  </div>
                </div>
              ))}
              {(updates ?? []).length === 0 && <p className="text-muted">Nog geen updates verstuurd.</p>}
            </div>
          </div>

          <div className="card h-fit p-6">
            <h2 className="font-display text-lg font-bold">Nieuwe update</h2>
            <form action={createUpdateAction} className="mt-4 flex flex-col gap-3">
              <div>
                <label htmlFor="titel" className="mb-1 block text-sm text-muted">
                  Titel
                </label>
                <input id="titel" name="titel" required className="input-field" />
              </div>
              <div>
                <label htmlFor="bericht" className="mb-1 block text-sm text-muted">
                  Bericht
                </label>
                <textarea id="bericht" name="bericht" rows={4} required className="input-field resize-y" />
              </div>
              <AudiencePicker kinderen={kinderen ?? []} />
              <button type="submit" className="btn btn-primary w-full">
                Versturen
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
