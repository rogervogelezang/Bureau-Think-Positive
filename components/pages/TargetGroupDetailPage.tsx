import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getPayloadClient } from "@/lib/payload";
import type { TargetGroup } from "@/lib/payloadTypes";

const COPY = {
  nl: {
    eyebrow: "Doelgroep",
    heading: (label: string) => `Voor ${label.toLowerCase()}`,
    ctaLabel: "Vraag een gratis oriënterend gesprek aan",
    ctaHref: "/contact",
    allLabel: "Bekijk alle doelgroepen",
    allHref: "/over-ons/doelgroep",
    readMore: "Verder lezen",
    otherTitle: "Ook interessant",
    base: "/over-ons/doelgroep",
  },
  en: {
    eyebrow: "Who we help",
    heading: (label: string) => `For ${label.toLowerCase()}`,
    ctaLabel: "Request a free introductory conversation",
    ctaHref: "/en/contact",
    allLabel: "View all target groups",
    allHref: "/en/over-ons/doelgroep",
    readMore: "Read more",
    otherTitle: "Also of interest",
    base: "/en/over-ons/doelgroep",
  },
};

export async function getTargetGroup(slug: string, locale: "nl" | "en") {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "target-groups", locale, where: { slug: { equals: slug } }, limit: 1 });
  return (docs[0] as unknown as TargetGroup) ?? null;
}

export async function getAllTargetGroupSlugs() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "target-groups", limit: 200, depth: 0 });
  return (docs as unknown as TargetGroup[]).map((g) => g.slug);
}

export default async function TargetGroupDetailPage({ slug, locale }: { slug: string; locale: "nl" | "en" }) {
  const t = COPY[locale];
  const [group, payload] = await Promise.all([getTargetGroup(slug, locale), getPayloadClient()]);
  if (!group) notFound();

  const { docs: others } = await payload.find({
    collection: "target-groups",
    locale,
    where: { slug: { not_equals: slug } },
    limit: 20,
    sort: "order",
  });

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-4">{t.eyebrow}</p>
        <h1 className="text-4xl font-extrabold text-balance">{t.heading(group.label)}</h1>
        <p className="mt-4 text-lg text-muted text-pretty">{group.intro}</p>

        <ul className="mt-10 flex flex-col gap-4">
          {(group.bullets ?? []).map((b, i) => (
            <li key={i} className="card flex gap-4 p-5">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary-dark">✓</span>
              <span className="text-foreground text-pretty">{b.text}</span>
            </li>
          ))}
        </ul>

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
            {(others as unknown as TargetGroup[]).map((g) => (
              <Link key={g.slug} href={`${t.base}/${g.slug}`} className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-light">
                {g.label}
              </Link>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
