import type { Metadata } from "next";
import TargetGroupDetailPage, { getTargetGroup, getAllTargetGroupSlugs } from "@/components/pages/TargetGroupDetailPage";

export async function generateStaticParams() {
  const slugs = await getAllTargetGroupSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const group = await getTargetGroup(slug, "nl");
  return {
    title: group ? `Voor ${group.label.toLowerCase()}` : "Doelgroep",
    description: group?.summary,
    alternates: { canonical: `/over-ons/doelgroep/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TargetGroupDetailPage slug={slug} locale="nl" />;
}
