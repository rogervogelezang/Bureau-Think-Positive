import { notFound } from "next/navigation";
import RenderBlocks from "@/components/blocks/RenderBlocks";
import { getPayloadClient } from "@/lib/payload";
import type { Page } from "@/lib/payloadTypes";

export async function getPageBySlug(slug: string, locale: "nl" | "en") {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "pages", locale, where: { slug: { equals: slug } }, limit: 1 });
  return (docs[0] as unknown as Page) ?? null;
}

export default async function PageBySlug({ slug, locale }: { slug: string; locale: "nl" | "en" }) {
  const page = await getPageBySlug(slug, locale);
  if (!page) notFound();

  return <RenderBlocks blocks={page.layout ?? []} locale={locale} />;
}
