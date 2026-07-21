import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { doelgroepen } from "@/lib/nav";
import { doelgroepDetails } from "@/lib/doelgroepDetails";

export function generateStaticParams() {
  return doelgroepen.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = doelgroepen.find((d) => d.slug === slug);
  return { title: item ? `Voor ${item.label.toLowerCase()}` : "Doelgroep" };
}

export default async function DoelgroepDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = doelgroepen.find((d) => d.slug === slug);
  const details = doelgroepDetails[slug];
  if (!item || !details) notFound();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="eyebrow mb-4">Doelgroep</p>
        <h1 className="text-4xl font-extrabold text-balance">Voor {item.label.toLowerCase()}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted text-pretty">{details.intro}</p>

        <ul className="mt-10 flex flex-col gap-4 max-w-2xl">
          {details.bullets.map((b) => (
            <li key={b} className="card flex gap-4 p-5">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary-dark">
                ✓
              </span>
              <span className="text-foreground text-pretty">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/contact" className="btn btn-primary">
            Vraag een gratis oriënterend gesprek aan
          </Link>
          <Link href="/over-ons/doelgroep" className="btn btn-outline">
            Bekijk alle doelgroepen
          </Link>
        </div>
      </Container>

      <Container className="mt-16 pt-16 border-t border-border">
        <SectionHeading eyebrow="Verder lezen" title="Ook interessant" />
        <div className="mt-6 flex flex-wrap gap-3">
          {doelgroepen
            .filter((d) => d.slug !== slug)
            .map((d) => (
              <Link
                key={d.slug}
                href={`/over-ons/doelgroep/${d.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-light"
              >
                {d.label}
              </Link>
            ))}
        </div>
      </Container>
    </section>
  );
}
