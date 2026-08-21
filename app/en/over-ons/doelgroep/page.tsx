import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RenderBlocks from "@/components/blocks/RenderBlocks";
import { getPageBySlug } from "@/components/pages/PageBySlug";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("doelgroep", "en");
  return { title: page?.metaTitle ?? "Who We Help", description: page?.metaDescription ?? undefined };
}

export default async function DoelgroepHubPage() {
  const page = await getPageBySlug("doelgroep", "en");
  if (!page) notFound();
  return <RenderBlocks blocks={page.layout ?? []} locale="en" />;
}
