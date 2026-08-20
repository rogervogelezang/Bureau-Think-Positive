import type { Metadata } from "next";
import Container from "@/components/Container";
import TeamNav from "@/components/team/TeamNav";
import { requireCoordinator } from "@/lib/supabase/trajectleider";
import { createClient } from "@/lib/supabase/server";
import { inviteTrajectleiderAction, toggleCoordinatorAction, deleteTrajectleiderAction } from "./actions";

export const metadata: Metadata = { title: "Beheer" };

const ERROR_MESSAGES: Record<string, string> = {
  velden_verplicht: "Vul een naam en e-mailadres in.",
  uitnodigen_mislukt: "Uitnodigen is niet gelukt — bestaat dit e-mailadres al?",
  opslaan_mislukt: "De uitnodiging is verstuurd, maar opslaan als trajectleider is niet gelukt.",
  kan_zichzelf_niet_verwijderen: "Je kunt je eigen account niet verwijderen.",
  status_wijzigen_mislukt: "Wijzigen van de coördinator-status is niet gelukt.",
  // Deleting the auth user fails on any FK still pointing at them — not
  // just kinderen (voortgang_scores/agenda_items/updates all reference
  // trajectleider_id too), so this message stays deliberately generic
  // rather than naming one specific cause.
  verwijderen_mislukt:
    "Verwijderen is niet gelukt — deze trajectleider heeft nog gekoppelde gegevens (gezinnen, scores, agenda-items of updates). Wijs gezinnen eerst opnieuw toe via de detailpagina van elk gezin; voor scores/agenda-items/updates is handmatige opschoning nodig.",
};

export default async function BeheerPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; uitgenodigd?: string; verwijderd?: string }>;
}) {
  const trajectleider = await requireCoordinator();

  const { error, uitgenodigd, verwijderd } = await searchParams;
  const supabase = await createClient();
  const { data: trajectleiders } = await supabase
    .from("trajectleiders")
    .select("id, naam, is_coordinator")
    .order("naam");

  return (
    <>
      <TeamNav naam={trajectleider.naam} isCoordinator={trajectleider.is_coordinator} active="beheer" />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="eyebrow mb-2">Beheer</p>
            <h1 className="text-3xl font-extrabold">Trajectleiders</h1>

            {uitgenodigd === "1" && (
              <p className="mt-4 rounded-[var(--radius-sm)] border border-primary/30 bg-primary-light p-3 text-sm text-primary-dark">
                Uitnodiging verstuurd.
              </p>
            )}
            {verwijderd === "1" && (
              <p className="mt-4 rounded-[var(--radius-sm)] border border-primary/30 bg-primary-light p-3 text-sm text-primary-dark">
                Account verwijderd.
              </p>
            )}
            {error && (
              <p className="mt-4 rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-3 text-sm text-danger">
                {ERROR_MESSAGES[error] ?? "Er ging iets mis."}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3">
              {(trajectleiders ?? []).map((t) => (
                <div key={t.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-semibold">{t.naam}</p>
                    <p className="text-xs text-muted">{t.is_coordinator ? "Coördinator" : "Trajectleider"}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <form action={toggleCoordinatorAction}>
                      <input type="hidden" name="id" value={t.id} />
                      <input type="hidden" name="nieuwe_status" value={(!t.is_coordinator).toString()} />
                      <button type="submit" className="btn btn-outline text-xs">
                        {t.is_coordinator ? "Coördinator-rechten intrekken" : "Maak coördinator"}
                      </button>
                    </form>
                    {t.id !== trajectleider.id && (
                      <form action={deleteTrajectleiderAction}>
                        <input type="hidden" name="id" value={t.id} />
                        <button type="submit" className="btn btn-outline text-xs text-danger">
                          Verwijderen
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
              {(trajectleiders ?? []).length === 0 && <p className="text-muted">Nog geen trajectleiders.</p>}
            </div>
          </div>

          <div className="card h-fit p-6">
            <h2 className="font-display text-lg font-bold">Trajectleider uitnodigen</h2>
            <form action={inviteTrajectleiderAction} className="mt-4 flex flex-col gap-3">
              <div>
                <label htmlFor="naam" className="mb-1 block text-sm text-muted">
                  Naam
                </label>
                <input id="naam" name="naam" required className="input-field" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-muted">
                  E-mailadres
                </label>
                <input id="email" name="email" type="email" required className="input-field" />
              </div>
              <label className="flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" name="is_coordinator" />
                Coördinator-rechten geven
              </label>
              <button type="submit" className="btn btn-primary w-full">
                Uitnodigen
              </button>
            </form>
            <p className="mt-3 text-xs text-muted">
              De uitnodiging wordt per e-mail verstuurd met een link om een wachtwoord in te stellen.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
