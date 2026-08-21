import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RenderBlocks from "@/components/blocks/RenderBlocks";
import { getPageBySlug } from "@/components/pages/PageBySlug";

// Catches any URL not matched by a more specific route above it — this is
// what lets the client create a brand-new page in the admin and have it
// appear live at its slug, with no developer involved. "/" itself is
// handled by app/(nl)/page.tsx (a required catch-all, [...slug], never
// matches zero segments) — pages already covered by their own dedicated
// route (diensten, contact, kennisbank, etc.) are resolved by Next before
// this ever runs, so there's no conflict to guard against here.
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug.join("/"), "nl");
  return { title: page?.metaTitle ?? page?.title, description: page?.metaDescription ?? undefined };
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug.join("/"), "nl");
  if (!page) notFound();
  return <RenderBlocks blocks={page.layout ?? []} locale="nl" />;
}
