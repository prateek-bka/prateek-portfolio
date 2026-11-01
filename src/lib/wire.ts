import { cacheLife, cacheTag } from "next/cache";

export type WireItem = {
  id: string;
  title: string;
  take: string;
  topic: string;
  pillar: string;
  date: string;
  sources: { title: string; url: string; source: string }[];
};

const INKWIRE = process.env.INKWIRE_URL ?? "https://inkwire.prateekagrawal.com";

// AI news items Prateek approved in Inkwire, each with his one-line take.
export async function getWire(): Promise<WireItem[]> {
  "use cache";
  cacheTag("blog");
  cacheLife({ stale: 300, revalidate: 300, expire: 86400 });
  const res = await fetch(`${INKWIRE}/api/public/wire?limit=60`, { signal: AbortSignal.timeout(8000) }).catch(() => null);
  if (!res?.ok) return [];
  return ((await res.json()) as { items: WireItem[] }).items;
}
