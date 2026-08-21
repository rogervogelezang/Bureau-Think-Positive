import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getPayloadClient } from "@/lib/payload";
import type { ServiceGridBlockType, Service } from "@/lib/payloadTypes";

export default async function ServiceGridBlock({ eyebrow, title, intro, limit, showAllLabel, showAllHref, locale }: ServiceGridBlockType & { locale: "nl" | "en" }) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "services",
    locale,
    limit: limit ?? 6,
    sort: "order",
  });
  const services = docs as unknown as Service[];
  const dienstenBase = locale === "en" ? "/en/diensten" : "/diensten";

  return (
    <section className="py-16 sm:py-24">
      <Container>
        {(eyebrow || title || intro) && <SectionHeading eyebrow={eyebrow ?? undefined} title={title ?? ""} intro={intro ?? undefined} />}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} href={`${dienstenBase}/${s.slug}`} className="card p-6 hover:shadow-lg hover:-translate-y-0.5 transition">
              <h3 className="font-display text-lg font-bold text-primary-dark">{s.label}</h3>
              <p className="mt-2 text-sm text-muted text-pretty">{s.summary}</p>
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
