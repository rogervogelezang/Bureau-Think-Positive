import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RenderBlocks from "@/components/blocks/RenderBlocks";
import { getPageBySlug } from "@/components/pages/PageBySlug";

// English mirror of app/(nl)/[...slug]/page.tsx — see that file's comment.
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug.join("/"), "en");
  return { title: page?.metaTitle ?? page?.title, description: page?.metaDescription ?? undefined };
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug.join("/"), "en");
  if (!page) notFound();
  return <RenderBlocks blocks={page.layout ?? []} locale="en" />;
}
