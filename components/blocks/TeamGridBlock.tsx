import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getPayloadClient } from "@/lib/payload";
import type { TeamGridBlockType, TeamMember, Media } from "@/lib/payloadTypes";

const SPECIALISTS_LABEL = { nl: "Onze specialisten", en: "Our specialists" };

export default async function TeamGridBlock({ eyebrow, title, intro, locale }: TeamGridBlockType & { locale: "nl" | "en" }) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "team-members",
    locale,
    limit: 100,
    sort: "order",
  });
  const members = docs as unknown as TeamMember[];
  const [featured, ...rest] = members;
  const featuredPhoto = featured && typeof featured.photo === "object" ? (featured.photo as Media) : null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        {(eyebrow || title || intro) && <SectionHeading as="h1" eyebrow={eyebrow ?? undefined} title={title ?? ""} intro={intro ?? undefined} />}

        {featured && (
          <div className="mt-12 card p-8 sm:p-10 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
            {featuredPhoto?.url && (
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full">
                <Image src={featuredPhoto.url} alt={featured.name} fill sizes="160px" className="object-cover object-top" />
              </div>
            )}
            <div>
              <h3 className="font-display text-2xl font-extrabold">{featured.name}</h3>
              <p className="mt-1 font-semibold text-primary">{featured.role}</p>
              {featured.email && (
                <a href={`mailto:${featured.email}`} className="mt-1 inline-block text-sm text-muted hover:text-primary">
                  {featured.email}
                </a>
              )}
              {featured.bio && <p className="mt-4 text-muted text-pretty leading-relaxed">{featured.bio}</p>}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-xl font-extrabold">{SPECIALISTS_LABEL[locale]}</h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((m) => {
                const photo = typeof m.photo === "object" ? (m.photo as Media) : null;
                return (
                  <div key={m.id} className="card p-8 text-center">
                    {photo?.url && (
                      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
                        <Image src={photo.url} alt={m.name} fill sizes="96px" className="object-cover object-top" />
                      </div>
                    )}
                    <p className="mt-4 font-semibold">{m.name}</p>
                    <p className="text-sm text-muted">{m.role}</p>
                    {m.email && (
                      <a href={`mailto:${m.email}`} className="mt-1 inline-block text-xs text-muted hover:text-primary">
                        {m.email}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
