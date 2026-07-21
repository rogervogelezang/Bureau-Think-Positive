import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderBlock from "@/components/PlaceholderBlock";

export const metadata: Metadata = { title: "Oudersportaal" };

const features = [
  {
    title: "Voortgang",
    body: "Volg op hoofdlijnen hoe het traject van uw kind verloopt, in duidelijke taal.",
  },
  {
    title: "Documenten & rapportages",
    body: "Vind zorgplannen, evaluaties en rapportages op één centrale plek terug.",
  },
  {
    title: "Berichten",
    body: "Korte lijnen met de begeleider van uw kind, ook tussen de afspraken door.",
  },
];

export default function PortaalPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-4">Voor ouders &amp; verzorgers</p>
          <h1 className="text-4xl font-extrabold text-balance">Het oudersportaal</h1>
          <p className="mt-6 text-lg text-muted text-pretty">
            Korte lijnen horen bij onze werkwijze — ook digitaal. In het oudersportaal houdt u
            straks eenvoudig zicht op de voortgang, documenten en berichten rond de begeleiding
            van uw kind.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/portaal/login" className="btn btn-primary">
              Inloggen
            </Link>
            <Link href="/portaal/registreren" className="btn btn-outline">
              Account aanmaken
            </Link>
          </div>
        </div>
        <PlaceholderBlock variant="soft" className="h-72 sm:h-96" label="Oudersportaal" />
      </Container>

      <Container className="mt-20">
        <SectionHeading eyebrow="Wat kunt u verwachten" title="Alles rond de begeleiding, overzichtelijk bij elkaar" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card p-6">
              <h3 className="font-display text-lg font-bold text-primary-dark">{f.title}</h3>
              <p className="mt-2 text-sm text-muted text-pretty">{f.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted max-w-2xl">
          Het portaal wordt de komende tijd verder gevuld. Heeft u nu al vragen over het traject
          van uw kind? Neem dan gerust{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            contact
          </Link>{" "}
          op — dat blijft altijd de snelste weg.
        </p>
      </Container>
    </section>
  );
}
