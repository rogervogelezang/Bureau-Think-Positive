import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getAllKennisbankArticles } from "@/lib/kennisbank";

export const metadata: Metadata = {
  title: "Knowledge Base",
  description: "Articles on the theories, methods and tools that Bureau Think Positive uses in practice.",
};

export default function KennisbankHubPage() {
  const articles = getAllKennisbankArticles("en");
  const categories = Array.from(new Set(articles.map((a) => a.category))).sort((a, b) =>
    a.localeCompare(b, "en"),
  );

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Knowledge Base"
          title="Methods, models and ways of working"
          intro="Our collection of articles on the theories, methods and tools we use in practice."
        />

        {articles.length === 0 && (
          <p className="mt-12 text-muted">We&apos;re currently building out the knowledge base.</p>
        )}

        {categories.map((category) => (
          <div key={category} className="mt-14">
            <h2 className="font-display text-xl font-extrabold text-primary-dark">{category}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles
                .filter((a) => a.category === category)
                .map((a) => (
                  <Link
                    key={a.slug}
                    href={`/en/kennisbank/${a.slug}`}
                    className="card p-6 hover:shadow-lg hover:-translate-y-0.5 transition"
                  >
                    <h3 className="font-display text-lg font-bold text-primary-dark">{a.title}</h3>
                    <p className="mt-2 text-sm text-muted text-pretty">{a.description}</p>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
