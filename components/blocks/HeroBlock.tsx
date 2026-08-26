import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import ParallaxLayer from "@/components/ParallaxLayer";
import type { HeroBlock as HeroBlockType, Media } from "@/lib/payloadTypes";

function splitHeading(heading: string, highlight?: string | null) {
  if (!highlight) return { before: heading, highlight: "", after: "" };
  const idx = heading.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return { before: heading, highlight: "", after: "" };
  return {
    before: heading.slice(0, idx),
    highlight: heading.slice(idx, idx + highlight.length),
    after: heading.slice(idx + highlight.length),
  };
}

export default function HeroBlock({ eyebrow, heading, highlightText, intro, primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref, image }: HeroBlockType) {
  const { before, highlight, after } = splitHeading(heading, highlightText);
  const img = typeof image === "object" ? (image as Media) : null;

  return (
    <section className="overflow-hidden">
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-balance">
            {before}
            {highlight && <span className="text-primary">{highlight}</span>}
            {after}
          </h1>
          {intro && <p className="mt-6 text-lg text-muted text-pretty">{intro}</p>}
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCtaLabel && primaryCtaHref && (
              <Link href={primaryCtaHref} className="btn btn-primary">
                {primaryCtaLabel}
              </Link>
            )}
            {secondaryCtaLabel && secondaryCtaHref && (
              <Link href={secondaryCtaHref} className="btn btn-outline">
                {secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>
        {img?.url && (
          <ParallaxLayer speed={0.12} className="relative h-72 sm:h-96 overflow-hidden rounded-[var(--radius-lg)]">
            <Image src={img.url} alt={img.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </ParallaxLayer>
        )}
      </Container>
    </section>
  );
}
