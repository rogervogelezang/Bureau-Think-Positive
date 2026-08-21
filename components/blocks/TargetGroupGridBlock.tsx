import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getPayloadClient } from "@/lib/payload";
import type { TargetGroupGridBlockType, TargetGroup } from "@/lib/payloadTypes";

export default async function TargetGroupGridBlock({ eyebrow, title, intro, showAllLabel, showAllHref, locale }: TargetGroupGridBlockType & { locale: "nl" | "en" }) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "target-groups",
    locale,
    limit: 100,
    sort: "order",
  });
  const groups = docs as unknown as TargetGroup[];
  const base = locale === "en" ? "/en/over-ons/doelgroep" : "/over-ons/doelgroep";

  return (
    <section className="py-16 sm:py-24">
      <Container>
        {(eyebrow || title || intro) && <SectionHeading eyebrow={eyebrow ?? undefined} title={title ?? ""} intro={intro ?? undefined} />}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <Link key={g.slug} href={`${base}/${g.slug}`} className="card p-6 hover:shadow-lg hover:-translate-y-0.5 transition">
              <h3 className="font-display text-lg font-bold text-primary-dark">{g.label}</h3>
              <p className="mt-2 text-sm text-muted text-pretty">{g.summary}</p>
            </Link>
          ))}
        </div>
        {showAllLabel && showAllHref && (
          <div className="mt-8">
            <Link href={showAllHref} className="btn btn-secondary">
              {showAllLabel}
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
