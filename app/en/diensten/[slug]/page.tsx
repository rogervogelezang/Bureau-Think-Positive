import type { Metadata } from "next";
import ServiceDetailPage, { getService, getAllServiceSlugs } from "@/components/pages/ServiceDetailPage";

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug, "en");
  return {
    title: service?.label ?? "Service",
    description: service?.summary,
    alternates: { canonical: `/en/diensten/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceDetailPage slug={slug} locale="en" />;
}
