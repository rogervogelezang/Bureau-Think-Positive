import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { diensten } from "@/lib/nav";

export const metadata: Metadata = { title: "Diensten" };

export default function DienstenHubPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Wat we doen"
          title="Onze diensten"
          intro="Wij bieden een integraal pakket: van gespecialiseerde ambulante begeleiding en opvoedingsondersteuning tot crisisinterventie en coaching. Projectmatig en oplossingsgericht, met als doel de jongere en zijn/haar systeem zo snel mogelijk weer te laten functioneren."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {diensten.map((d) => (
            <Link
              key={d.slug}
              href={`/diensten/${d.slug}`}
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
