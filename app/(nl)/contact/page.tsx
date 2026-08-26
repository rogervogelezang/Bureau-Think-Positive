import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/Container";
import ContactFormCard from "@/components/ContactFormCard";
import ContactFormFields from "@/components/ContactFormFields";
import { submitContactFormAction } from "./actions";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Bureau Think Positive voor een vrijblijvend oriënterend gesprek over ambulante begeleiding, crisisinterventie of coaching.",
};

const kenmerken = ["Kleinschalig", "Korte lijnen", "No-nonsensmentaliteit", "Bevoegd en bekwaam", "Hart voor de jongeren"];

export default function ContactPage() {
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

        <Suspense
          fallback={
            <div className="card p-8">
              <h2 className="font-display text-xl font-bold">Contactformulier</h2>
              <ContactFormFields lang="nl" action={submitContactFormAction} />
            </div>
          }
        >
          <ContactFormCard lang="nl" action={submitContactFormAction} />
        </Suspense>
      </Container>
    </section>
  );
}
