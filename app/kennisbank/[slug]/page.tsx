import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/Container";
import { getAllKennisbankSlugs, getKennisbankArticle, getAllKennisbankArticles } from "@/lib/kennisbank";

export function generateStaticParams() {
  return getAllKennisbankSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getKennisbankArticle(slug);
  return { title: article?.title ?? "Kennisbank" };
}

export default async function KennisbankArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getKennisbankArticle(slug);
  if (!article) notFound();

  const related = getAllKennisbankArticles()
    .filter((a) => a.category === article.category && a.slug !== slug)
    .slice(0, 4);

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-4">{article.category}</p>
        <h1 className="text-4xl font-extrabold text-balance">{article.title}</h1>
        <div className="prose-kennisbank mt-8 text-muted text-pretty leading-relaxed">
          <MDXRemote source={article.content} />
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/contact" className="btn btn-primary">
            Vraag een gratis oriënterend gesprek aan
          </Link>
          <Link href="/kennisbank" className="btn btn-outline">
            Terug naar de kennisbank
          </Link>
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-16 pt-16 border-t border-border">
          <h2 className="font-display text-lg font-extrabold">Ook interessant</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/kennisbank/${a.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-light"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
