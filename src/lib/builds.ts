import { cacheLife, cacheTag } from "next/cache";

export type Build = { id: string; title: string; blurb: string; repoUrl: string | null; area: string };

const INKWIRE = process.env.INKWIRE_URL ?? "https://inkwire.prateekagrawal.com";

// Projects from his AI engineering path that he added to the portfolio in Inkwire.
export async function getBuilds(): Promise<Build[]> {
  "use cache";
  cacheTag("blog");
  cacheLife({ stale: 300, revalidate: 300, expire: 86400 });
  const res = await fetch(`${INKWIRE}/api/public/projects`, { signal: AbortSignal.timeout(8000) }).catch(() => null);
  if (!res?.ok) return [];
  return ((await res.json()) as { projects: Build[] }).projects;
}
