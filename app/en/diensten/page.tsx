import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RenderBlocks from "@/components/blocks/RenderBlocks";
import { getPageBySlug } from "@/components/pages/PageBySlug";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("diensten", "en");
  return { title: page?.metaTitle ?? "Services", description: page?.metaDescription ?? undefined };
}

export default async function DienstenHubPage() {
  const page = await getPageBySlug("diensten", "en");
  if (!page) notFound();
  return <RenderBlocks blocks={page.layout ?? []} locale="en" />;
}
