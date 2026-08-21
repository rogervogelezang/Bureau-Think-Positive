import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import type { RichTextBlockType, Media } from "@/lib/payloadTypes";

export default function RichTextBlock({ eyebrow, title, body, linkLabel, linkHref, image, imagePosition }: RichTextBlockType) {
  const img = typeof image === "object" ? (image as Media) : null;
  const showImage = imagePosition !== "none" && img?.url;

  const textColumn = (
    <div>
      {(eyebrow || title) && <SectionHeading eyebrow={eyebrow ?? undefined} title={title ?? ""} />}
      {body ? (
        <div className="prose-kennisbank mt-6 text-muted text-pretty leading-relaxed">
          {/* Lexical's exact SerializedEditorState type isn't hand-typed in lib/payloadTypes.ts (see its top comment) */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <RichText data={body as any} />
        </div>
      ) : null}
      {linkLabel && linkHref && (
        <Link href={linkHref} className="mt-6 inline-block font-semibold text-primary hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );

  const imageColumn = showImage ? (
    <div className="relative h-64 sm:h-80 overflow-hidden rounded-[var(--radius-lg)]">
      <Image src={img!.url!} alt={img!.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
    </div>
  ) : null;

  return (
    <section className="py-16 sm:py-24 bg-background-elevated border-y border-border">
      <Container className={showImage ? "grid gap-12 lg:grid-cols-2 lg:items-center" : ""}>
        {showImage && imagePosition === "left" && <div className="order-last lg:order-first">{imageColumn}</div>}
        {textColumn}
        {showImage && imagePosition === "right" && imageColumn}
      </Container>
    </section>
  );
}
