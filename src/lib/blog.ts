import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cacheLife } from "next/cache";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
  content: string;
};

const DIR = path.join(process.cwd(), "src/content/blog");

// Drafts show in `npm run dev` only.
export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("max");
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, f), "utf8"));
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: data.title,
        description: data.description,
        date: String(data.date),
        updated: data.updated ? String(data.updated) : undefined,
        tags: data.tags ?? [],
        draft: Boolean(data.draft),
        readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
        content,
      };
    })
    .filter((p) => process.env.NODE_ENV === "development" || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
