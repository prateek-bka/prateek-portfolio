import type { MetadataRoute } from "next";
import { projects, site } from "@/portfolio";
import { getPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const latest = posts[0]?.updated ?? posts[0]?.date;
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/resume`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/blog`, ...(latest && { lastModified: new Date(latest) }), changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), priority: 0.7 })),
  ];
}
