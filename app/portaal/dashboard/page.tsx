import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Container from "@/components/Container";
import { signOutAction } from "./actions";

export const metadata: Metadata = { title: "Dashboard" };

const voortgang = [
  { label: "Startgesprek", status: "done" },
  { label: "Zorgplan opgesteld", status: "done" },
  { label: "Lopende begeleiding", status: "active" },
  { label: "Evaluatie", status: "upcoming" },
];

const documenten = [
  { name: "Zorgplan — versie 1", date: "voorbeelddatum" },
  { name: "Evaluatieverslag Q1", date: "voorbeelddatum" },
];

const berichten = [
  { from: "Begeleider", preview: "Voorbeeldbericht — dit onderdeel wordt nog gekoppeld aan echte gegevens." },
];

export default async function PortaalDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portaal/login");

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Oudersportaal</p>
            <h1 className="text-3xl font-extrabold">Welkom terug</h1>
            <p className="mt-1 text-sm text-muted">{user.email}</p>
          </div>
          <form action={signOutAction}>
            <button type="submit" className="btn btn-outline">
              Uitloggen
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-[var(--radius-sm)] border border-accent bg-accent-light px-4 py-3 text-sm text-primary-dark">
          Dit dashboard toont voorbeeldgegevens. Zodra het portaal gekoppeld is aan echte
          cliëntgegevens, ziet u hier de actuele stand van zaken.
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="card p-6 lg:col-span-2">
            <h2 className="font-display text-lg font-bold text-primary-dark">Voortgang</h2>
            <ol className="mt-5 flex flex-col gap-4">
              {voortgang.map((v) => (
                <li key={v.label} className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full ${
                      v.status === "done"
                        ? "bg-primary"
                        : v.status === "active"
                          ? "bg-accent"
                          : "bg-border"
                    }`}
                  />
                  <span className={v.status === "upcoming" ? "text-muted" : "text-foreground"}>
                    {v.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-primary-dark">Documenten &amp; rapportages</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {documenten.map((d) => (
                <li key={d.name} className="flex items-center justify-between rounded-[var(--radius-sm)] border border-border px-3 py-2 text-sm">
                  <span>{d.name}</span>
                  <span className="text-xs text-muted">{d.date}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 lg:col-span-3">
            <h2 className="font-display text-lg font-bold text-primary-dark">Berichten</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {berichten.map((b, i) => (
                <li key={i} className="rounded-[var(--radius-sm)] border border-border p-4 text-sm">
                  <p className="font-semibold text-foreground">{b.from}</p>
                  <p className="mt-1 text-muted">{b.preview}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
