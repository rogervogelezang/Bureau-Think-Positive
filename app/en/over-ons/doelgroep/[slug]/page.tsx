import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { doelgroepen } from "@/lib/nav.en";
import { doelgroepDetails } from "@/lib/doelgroepDetails.en";

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
  return {
    title: item ? `For ${item.label.toLowerCase()}` : "Target group",
    description: item?.summary,
    alternates: { canonical: `/en/over-ons/doelgroep/${slug}` },
  };
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
      <Container className="max-w-3xl">
        <p className="eyebrow mb-4">Target group</p>
        <h1 className="text-4xl font-extrabold text-balance">For {item.label.toLowerCase()}</h1>
        <p className="mt-4 text-lg text-muted text-pretty">{details.intro}</p>

        <ul className="mt-10 flex flex-col gap-4">
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
          <Link href="/en/contact" className="btn btn-primary">
            Request a free introductory conversation
          </Link>
          <Link href="/en/over-ons/doelgroep" className="btn btn-outline">
            View all target groups
          </Link>
        </div>
      </Container>

      <Container className="mt-16 pt-16 border-t border-border">
        <SectionHeading eyebrow="Further reading" title="Also of interest" />
        <div className="mt-6 flex flex-wrap gap-3">
          {doelgroepen
            .filter((d) => d.slug !== slug)
            .map((d) => (
              <Link
                key={d.slug}
                href={`/en/over-ons/doelgroep/${d.slug}`}
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
