import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { diensten } from "@/lib/nav.en";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From in-home support and parenting support to crisis intervention and coaching — the complete range of services from Bureau Think Positive.",
};

export default function DienstenHubPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="What we do"
          title="Our services"
          intro="We offer an integrated package: from specialised in-home support and parenting support to crisis intervention and coaching. Project-based and solution-focused, with the goal of getting the young person and their system functioning again as quickly as possible."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {diensten.map((d) => (
            <Link
              key={d.slug}
              href={`/en/diensten/${d.slug}`}
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
