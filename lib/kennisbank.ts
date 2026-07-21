import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "kennisbank");

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

export function getAllKennisbankSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllKennisbankArticles(): (KennisbankFrontmatter & { slug: string })[] {
  return getAllKennisbankSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
      const { data } = matter(raw);
      return { slug, ...(data as KennisbankFrontmatter) };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "nl"));
}

export function getKennisbankArticle(slug: string): KennisbankArticle | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, content, ...(data as KennisbankFrontmatter) };
}
