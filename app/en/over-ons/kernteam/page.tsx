import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RenderBlocks from "@/components/blocks/RenderBlocks";
import { getPageBySlug } from "@/components/pages/PageBySlug";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("kernteam", "en");
  return { title: page?.metaTitle ?? "The core team", description: page?.metaDescription ?? undefined };
}

export default async function KernteamPage() {
  const page = await getPageBySlug("kernteam", "en");
  if (!page) notFound();
  return <RenderBlocks blocks={page.layout ?? []} locale="en" />;
}
