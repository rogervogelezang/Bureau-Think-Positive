import type { Metadata } from "next";
import Container from "@/components/Container";
import TeamNav from "@/components/team/TeamNav";
import AudiencePicker from "@/components/team/AudiencePicker";
import { requireTrajectleider } from "@/lib/supabase/trajectleider";
import { createClient } from "@/lib/supabase/server";
import { joinKinderenNamen } from "@/lib/kinderenNames";
import { createAgendaItemAction, deleteAgendaItemAction } from "./actions";

export const metadata: Metadata = { title: "Agenda" };

const TYPE_LABELS: Record<string, string> = {
  individueel: "Individueel",
  midweek_groep: "Midweek groepsbegeleiding",
  weekend_groep: "Weekend groepsbegeleiding",
};

const ERROR_MESSAGES: Record<string, string> = {
  velden_verplicht: "Vul een titel, startdatum en minimaal één gezin in.",
  aanmaken_mislukt: "Aanmaken van het agenda-item is niet gelukt.",
  deelnemers_mislukt: "Het item is aangemaakt, maar koppelen van deelnemers is niet gelukt.",
  verwijderen_mislukt: "Verwijderen van het agenda-item is niet gelukt.",
};

export default async function TeamAgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; toegevoegd?: string }>;
}) {
  const trajectleider = await requireTrajectleider();
  const { error, toegevoegd } = await searchParams;
  const supabase = await createClient();

  const [{ data: kinderen }, { data: items }] = await Promise.all([
    supabase.from("kinderen").select("id, naam").order("naam"),
    supabase
      .from("agenda_items")
      .select("id, titel, type, start_at, end_at, beschrijving, agenda_deelnemers(kinderen(naam))")
      .order("start_at", { ascending: true }),
  ]);

  return (
    <>
      <TeamNav naam={trajectleider.naam} isCoordinator={trajectleider.is_coordinator} active="agenda" />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="eyebrow mb-2">Agenda</p>
            <h1 className="text-3xl font-extrabold">Individuele en groepsafspraken</h1>

            {toegevoegd === "1" && (
              <p className="mt-4 rounded-[var(--radius-sm)] border border-primary/30 bg-primary-light p-3 text-sm text-primary-dark">
                Agenda-item toegevoegd.
              </p>
            )}
            {error && (
              <p className="mt-4 rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-3 text-sm text-danger">
                {ERROR_MESSAGES[error] ?? "Er ging iets mis."}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-4">
              {(items ?? []).map((item) => (
                <div key={item.id} className="card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="eyebrow mb-1">{TYPE_LABELS[item.type] ?? item.type}</p>
                      <h2 className="font-display text-lg font-bold">{item.titel}</h2>
                      <p className="mt-1 text-sm text-muted">
                        {new Date(item.start_at).toLocaleString("nl-NL", { dateStyle: "medium", timeStyle: "short" })}
                        {item.end_at &&
                          ` – ${new Date(item.end_at).toLocaleString("nl-NL", { timeStyle: "short" })}`}
                      </p>
                      {item.beschrijving && <p className="mt-2 text-sm text-muted">{item.beschrijving}</p>}
                      <p className="mt-2 text-xs text-muted">
                        Voor: {joinKinderenNamen(item.agenda_deelnemers ?? [])}
                      </p>
                    </div>
                    <form action={deleteAgendaItemAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="btn btn-outline text-xs text-danger">
                        Verwijderen
                      </button>
                    </form>
                  </div>
                </div>
              ))}
              {(items ?? []).length === 0 && <p className="text-muted">Nog geen agenda-items.</p>}
            </div>
          </div>

          <div className="card h-fit p-6">
            <h3 className="font-display text-lg font-bold">Nieuw item</h3>
            <form action={createAgendaItemAction} className="mt-4 flex flex-col gap-3">
              <div>
                <label htmlFor="titel" className="mb-1 block text-sm text-muted">
                  Titel
                </label>
                <input id="titel" name="titel" required className="input-field" />
              </div>
              <div>
                <label htmlFor="type" className="mb-1 block text-sm text-muted">
                  Type
                </label>
                <select id="type" name="type" className="input-field" defaultValue="individueel">
                  <option value="individueel">Individueel</option>
                  <option value="midweek_groep">Midweek groepsbegeleiding</option>
                  <option value="weekend_groep">Weekend groepsbegeleiding</option>
                </select>
              </div>
              <div>
                <label htmlFor="start_at" className="mb-1 block text-sm text-muted">
                  Start
                </label>
                <input id="start_at" name="start_at" type="datetime-local" required className="input-field" />
              </div>
              <div>
                <label htmlFor="end_at" className="mb-1 block text-sm text-muted">
                  Eind (optioneel)
                </label>
                <input id="end_at" name="end_at" type="datetime-local" className="input-field" />
              </div>
              <div>
                <label htmlFor="beschrijving" className="mb-1 block text-sm text-muted">
                  Beschrijving (optioneel)
                </label>
                <textarea id="beschrijving" name="beschrijving" rows={2} className="input-field resize-y" />
              </div>
              <AudiencePicker kinderen={kinderen ?? []} />
              <button type="submit" className="btn btn-primary w-full">
                Toevoegen
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
