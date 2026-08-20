import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type KennisbankLocale = "nl" | "en";

// A plain if/branch (rather than indexing a Record by a variable) so
// Turbopack's file tracer can see each path.join call as statically scoped
// to its own literal subfolder — bracket-indexing made it treat this as
// dynamic enough to warn about tracing the whole project.
function contentDir(locale: KennisbankLocale): string {
  if (locale === "en") return path.join(process.cwd(), "content", "kennisbank-en");
  return path.join(process.cwd(), "content", "kennisbank");
}

export type KennisbankFrontmatter = {
  title: string;
  description: string;
  category: string;
  sourceSlug: string;
};

export type KennisbankArticle = KennisbankFrontmatter & {
  slug: string;
  content: string;
};

export function getAllKennisbankSlugs(locale: KennisbankLocale = "nl"): string[] {
  const dir = contentDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllKennisbankArticles(
  locale: KennisbankLocale = "nl",
): (KennisbankFrontmatter & { slug: string })[] {
  const dir = contentDir(locale);
  return getAllKennisbankSlugs(locale)
    .map((slug) => {
      const raw = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
      const { data } = matter(raw);
      return { slug, ...(data as KennisbankFrontmatter) };
    })
    .sort((a, b) => a.title.localeCompare(b.title, locale));
}

export function getKennisbankArticle(slug: string, locale: KennisbankLocale = "nl"): KennisbankArticle | null {
  const filePath = path.join(contentDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, content, ...(data as KennisbankFrontmatter) };
}
