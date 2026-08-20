import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { diensten } from "@/lib/nav";
import { dienstenContent } from "@/lib/dienstenContent";

export function generateStaticParams() {
  return diensten.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = diensten.find((d) => d.slug === slug);
  return {
    title: item?.label ?? "Dienst",
    description: item?.summary,
    alternates: { canonical: `/diensten/${slug}` },
  };
}

export default async function DienstDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = diensten.find((d) => d.slug === slug);
  const body = dienstenContent[slug];
  if (!item || !body) notFound();

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-4">Dienst</p>
        <h1 className="text-4xl font-extrabold text-balance">{item.label}</h1>
        <div className="mt-8 flex flex-col gap-5 text-muted text-pretty leading-relaxed">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/contact" className="btn btn-primary">
            Maak nu een afspraak voor een vrijblijvend gesprek
          </Link>
          <Link href="/diensten" className="btn btn-outline">
            Bekijk alle diensten
          </Link>
        </div>
      </Container>

      <Container className="mt-16 pt-16 border-t border-border">
        <SectionHeading eyebrow="Verder lezen" title="Andere diensten" />
        <div className="mt-6 flex flex-wrap gap-3">
          {diensten
            .filter((d) => d.slug !== slug)
            .slice(0, 6)
            .map((d) => (
              <Link
                key={d.slug}
                href={`/diensten/${d.slug}`}
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
