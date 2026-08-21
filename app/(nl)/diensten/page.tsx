import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RenderBlocks from "@/components/blocks/RenderBlocks";
import { getPageBySlug } from "@/components/pages/PageBySlug";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("diensten", "nl");
  return { title: page?.metaTitle ?? "Diensten", description: page?.metaDescription ?? undefined };
}

export default async function DienstenHubPage() {
  const page = await getPageBySlug("diensten", "nl");
  if (!page) notFound();
  return <RenderBlocks blocks={page.layout ?? []} locale="nl" />;
}
