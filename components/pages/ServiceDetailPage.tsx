import { notFound } from "next/navigation";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getPayloadClient } from "@/lib/payload";
import type { Service } from "@/lib/payloadTypes";

const COPY = {
  nl: {
    eyebrow: "Dienst",
    ctaLabel: "Maak nu een afspraak voor een vrijblijvend gesprek",
    ctaHref: "/contact",
    allLabel: "Bekijk alle diensten",
    allHref: "/diensten",
    readMore: "Verder lezen",
    otherTitle: "Andere diensten",
    base: "/diensten",
  },
  en: {
    eyebrow: "Service",
    ctaLabel: "Book a free introductory conversation now",
    ctaHref: "/en/contact",
    allLabel: "View all services",
    allHref: "/en/diensten",
    readMore: "Read more",
    otherTitle: "Other services",
    base: "/en/diensten",
  },
};

export async function getService(slug: string, locale: "nl" | "en") {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "services", locale, where: { slug: { equals: slug } }, limit: 1 });
  return (docs[0] as unknown as Service) ?? null;
}

export async function getAllServiceSlugs() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "services", limit: 200, depth: 0 });
  return (docs as unknown as Service[]).map((s) => s.slug);
}

export default async function ServiceDetailPage({ slug, locale }: { slug: string; locale: "nl" | "en" }) {
  const t = COPY[locale];
  const [service, payload] = await Promise.all([getService(slug, locale), getPayloadClient()]);
  if (!service) notFound();

  const { docs: others } = await payload.find({
    collection: "services",
    locale,
    where: { slug: { not_equals: slug } },
    limit: 6,
    sort: "order",
  });

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-4">{t.eyebrow}</p>
        <h1 className="text-4xl font-extrabold text-balance">{service.label}</h1>
        <div className="mt-8 flex flex-col gap-5 text-muted text-pretty leading-relaxed">
          <p>{service.summary}</p>
          {service.body ? (
            <div className="prose-kennisbank">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <RichText data={service.body as any} />
            </div>
          ) : null}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href={t.ctaHref} className="btn btn-primary">
            {t.ctaLabel}
          </Link>
          <Link href={t.allHref} className="btn btn-outline">
            {t.allLabel}
          </Link>
        </div>
      </Container>

      {others.length > 0 && (
        <Container className="mt-16 pt-16 border-t border-border">
          <SectionHeading eyebrow={t.readMore} title={t.otherTitle} />
          <div className="mt-6 flex flex-wrap gap-3">
            {(others as unknown as Service[]).map((s) => (
              <Link key={s.slug} href={`${t.base}/${s.slug}`} className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-light">
                {s.label}
              </Link>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
