import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cacheLife, cacheTag } from "next/cache";

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
  // mdx: a file in src/content/blog; markdown: an article published from Inkwire.
  format: "mdx" | "markdown";
  cover?: string;
  coverAlt?: string;
  oldSlugs?: string[];
};

const DIR = path.join(process.cwd(), "src/content/blog");
// Inside tara the portfolio reaches Inkwire over the Docker network.
const INKWIRE = process.env.INKWIRE_URL ?? "https://inkwire.prateekagrawal.com";
const minutes = (text: string) => Math.max(1, Math.round(text.split(/\s+/).length / 220));

async function fileposts(): Promise<Post[]> {
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
        readingMinutes: minutes(content),
        content,
        format: "mdx" as const,
      };
    });
}

type InkwirePost = {
  slug: string;
  oldSlugs: string[];
  title: string;
  description: string;
  tags: string[];
  body: string;
  coverUrl: string | null;
  coverAlt: string;
  publishedAt: string;
  updatedAt: string;
};

async function inkwirePosts(): Promise<Post[]> {
  const res = await fetch(`${INKWIRE}/api/public/posts`, { signal: AbortSignal.timeout(8000) }).catch(() => null);
  if (!res?.ok) return [];
  const { posts } = (await res.json()) as { posts: InkwirePost[] };
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.publishedAt,
    updated: p.updatedAt,
    tags: p.tags,
    draft: false,
    readingMinutes: minutes(p.body),
    content: p.body,
    format: "markdown",
    cover: p.coverUrl ?? undefined,
    coverAlt: p.coverAlt,
    oldSlugs: p.oldSlugs,
  }));
}

// Drafts show in `npm run dev` only. Inkwire refreshes this within a minute,
// or at once by calling /api/revalidate after a publish or edit.
export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheTag("blog");
  cacheLife({ stale: 60, revalidate: 60, expire: 86400 });
  const posts = [...(await fileposts()), ...(await inkwirePosts())];
  return posts
    .filter((p) => process.env.NODE_ENV === "development" || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}

// The current slug for an article whose URL was changed in Inkwire.
export async function movedTo(slug: string) {
  return (await getPosts()).find((p) => p.oldSlugs?.includes(slug))?.slug;
}

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
