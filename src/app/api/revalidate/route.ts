import { revalidateTag } from "next/cache";

// Called by Inkwire after an article is published, edited or unpublished.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });
  revalidateTag("blog", { expire: 0 });
  return Response.json({ ok: true });
}
