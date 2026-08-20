import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { doelgroepen } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Doelgroep",
  description: "Voor wie is Bureau Think Positive er? Ontdek onze doelgroepen, van gezinnen tot zorg- en onderwijsinstellingen.",
};

export default function DoelgroepHubPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Voor wie zijn wij"
          title="Wij zijn er voor..."
          intro="Van particuliere gezinnen tot zorginstellingen en scholen — ontdek hoe we per doelgroep ondersteunen."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doelgroepen.map((d) => (
            <Link
              key={d.slug}
              href={`/over-ons/doelgroep/${d.slug}`}
              className="card p-6 hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <h3 className="font-display text-lg font-bold text-primary-dark">{d.label}</h3>
              <p className="mt-2 text-sm text-muted text-pretty">{d.summary}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
