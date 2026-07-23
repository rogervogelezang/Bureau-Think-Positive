import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import Container from "@/components/Container";
import ScoreGauge from "@/components/team/ScoreGauge";
import { signOutAction } from "./actions";

export const metadata: Metadata = { title: "Dashboard" };

const DOEL_STATUS_LABELS: Record<string, string> = {
  open: "Open",
  bezig: "Bezig",
  behaald: "Behaald",
};

const AGENDA_TYPE_LABELS: Record<string, string> = {
  individueel: "Individueel",
  midweek_groep: "Midweek groepsbegeleiding",
  weekend_groep: "Weekendbegeleiding",
};

export default async function PortaalDashboardPage() {
  // Supabase isn't provisioned in every environment yet — bail out instead
  // of crashing (createClient() throws if the env vars are missing).
  if (!isSupabaseConfigured()) redirect("/portaal");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portaal/login");

  const { data: kinderen } = await supabase
    .from("kinderen")
    .select("id, naam, voortgang_score")
    .eq("ouder_id", user.id)
    .order("naam");

  const kindIds = (kinderen ?? []).map((k) => k.id);

  const [{ data: doelen }, { data: agendaItems }, { data: updates }] =
    kindIds.length > 0
      ? await Promise.all([
          supabase.from("doelen").select("id, kind_id, titel, status").in("kind_id", kindIds).order("created_at"),
          supabase
            .from("agenda_items")
            .select("id, titel, type, start_at, end_at, beschrijving, agenda_deelnemers!inner(kind_id)")
            .in("agenda_deelnemers.kind_id", kindIds)
            .gte("start_at", new Date().toISOString())
            .order("start_at"),
          supabase
            .from("updates")
            .select("id, titel, bericht, created_at, update_ontvangers!inner(kind_id)")
            .in("update_ontvangers.kind_id", kindIds)
            .order("created_at", { ascending: false })
            .limit(10),
        ])
      : [{ data: [] }, { data: [] }, { data: [] }];

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Ouderportaal</p>
            <h1 className="text-3xl font-extrabold">Welkom terug</h1>
            <p className="mt-1 text-sm text-muted">{user.email}</p>
          </div>
          <form action={signOutAction}>
            <button type="submit" className="btn btn-outline">
              Uitloggen
            </button>
          </form>
        </div>

        {(kinderen ?? []).length === 0 ? (
          <div className="mt-10 card p-8 text-center">
            <h2 className="font-display text-lg font-bold">Nog niet gekoppeld</h2>
            <p className="mt-2 text-muted text-pretty">
              Je account is nog niet gekoppeld aan een traject. Zodra je trajectleider dit doet,
              verschijnt hier de voortgang, doelen, agenda en updates.
            </p>
          </div>
        ) : (
          (kinderen ?? []).map((kind) => {
            const kindDoelen = (doelen ?? []).filter((d) => d.kind_id === kind.id);
            const kindAgenda = (agendaItems ?? []).filter((a) =>
              (a.agenda_deelnemers ?? []).some((d: { kind_id: string }) => d.kind_id === kind.id),
            );

            return (
              <div key={kind.id} className="mt-10">
                {(kinderen ?? []).length > 1 && (
                  <h2 className="mb-4 font-display text-xl font-extrabold">{kind.naam}</h2>
                )}
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="card p-6 flex flex-col items-center text-center lg:col-span-1">
                    <h3 className="font-display text-lg font-bold self-start">Voortgang</h3>
                    <div className="mt-4">
                      <ScoreGauge score={kind.voortgang_score} />
                    </div>
                  </div>

                  <div className="card p-6 lg:col-span-2">
                    <h3 className="font-display text-lg font-bold">Doelen</h3>
                    <ul className="mt-4 flex flex-col gap-2">
                      {kindDoelen.map((d) => (
                        <li key={d.id} className="flex items-center justify-between rounded-[var(--radius-sm)] border border-border px-3 py-2 text-sm">
                          <span>{d.titel}</span>
                          <span className="text-xs font-semibold text-primary">
                            {DOEL_STATUS_LABELS[d.status] ?? d.status}
                          </span>
                        </li>
                      ))}
                      {kindDoelen.length === 0 && <p className="text-sm text-muted">Nog geen doelen.</p>}
                    </ul>
                  </div>

                  <div className="card p-6 lg:col-span-3">
                    <h3 className="font-display text-lg font-bold">Agenda</h3>
                    <ul className="mt-4 flex flex-col gap-2">
                      {kindAgenda.map((a) => (
                        <li key={a.id} className="rounded-[var(--radius-sm)] border border-border p-3 text-sm">
                          <p className="font-semibold text-foreground">{a.titel}</p>
                          <p className="text-xs text-muted">
                            {AGENDA_TYPE_LABELS[a.type] ?? a.type} —{" "}
                            {new Date(a.start_at).toLocaleString("nl-NL", { dateStyle: "medium", timeStyle: "short" })}
                          </p>
                          {a.beschrijving && <p className="mt-1 text-muted">{a.beschrijving}</p>}
                        </li>
                      ))}
                      {kindAgenda.length === 0 && <p className="text-sm text-muted">Geen aankomende afspraken.</p>}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {kindIds.length > 0 && (
          <div className="mt-10 card p-6">
            <h3 className="font-display text-lg font-bold">Updates</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {(updates ?? []).map((u) => (
                <li key={u.id} className="rounded-[var(--radius-sm)] border border-border p-4 text-sm">
                  <p className="font-semibold text-foreground">{u.titel}</p>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(u.created_at).toLocaleString("nl-NL", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                  <p className="mt-2 text-muted text-pretty">{u.bericht}</p>
                </li>
              ))}
              {(updates ?? []).length === 0 && <p className="text-sm text-muted">Nog geen updates ontvangen.</p>}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
