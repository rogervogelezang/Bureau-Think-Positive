import type { Metadata } from "next";
import Container from "@/components/Container";
import HoneypotFields from "@/components/HoneypotFields";
import { submitContactFormAction } from "./actions";

export const metadata: Metadata = { title: "Contact" };

const kenmerken = ["Kleinschalig", "Korte lijnen", "No-nonsensmentaliteit", "Bevoegd en bekwaam", "Hart voor de jongeren"];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;

  return (
    <section className="py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Kom langs voor een kop koffie</p>
          <h1 className="text-4xl font-extrabold text-balance">Neem contact op</h1>
          <p className="mt-4 text-muted text-pretty">
            Vraag een vrijblijvend oriënterend gesprek aan — we denken graag met je mee.
          </p>

          <address className="mt-8 not-italic">
            <p className="font-semibold text-foreground">Bureau Think Positive</p>
            <p className="text-muted">Stationsweg 59</p>
            <p className="text-muted">2681 SM Honselersdijk</p>
            <p className="mt-2">
              <a href="tel:0648252166" className="font-semibold text-primary hover:underline">
                06 48 25 21 66
              </a>
            </p>
          </address>

          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-wide text-primary">
              Kenmerken Bureau Think Positive
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {kenmerken.map((k) => (
                <li key={k} className="card px-4 py-3 text-sm font-medium">
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="font-display text-xl font-bold">Contactformulier</h2>

          {sent ? (
            <p className="mt-6 rounded-[var(--radius-sm)] border border-primary/30 bg-primary-light p-4 text-sm text-primary-dark">
              Bedankt voor je bericht — we nemen zo snel mogelijk contact met je op.
            </p>
          ) : (
            <form action={submitContactFormAction} className="mt-6 flex flex-col gap-4">
              {error === "missing_fields" && (
                <p className="rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-4 text-sm text-danger">
                  Vul alstublieft alle verplichte velden in.
                </p>
              )}
              {error === "invalid_email" && (
                <p className="rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-4 text-sm text-danger">
                  Dit lijkt geen geldig e-mailadres te zijn.
                </p>
              )}

              <HoneypotFields />

              <div>
                <label htmlFor="name" className="mb-1 block text-sm text-muted">
                  Naam
                </label>
                <input id="name" name="name" required className="input-field" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-muted">
                  E-mailadres
                </label>
                <input id="email" name="email" type="email" required className="input-field" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm text-muted">
                  Telefoonnummer (optioneel)
                </label>
                <input id="phone" name="phone" type="tel" className="input-field" />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm text-muted">
                  Bericht
                </label>
                <textarea id="message" name="message" required rows={5} className="input-field resize-y" />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Stuur bericht
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
