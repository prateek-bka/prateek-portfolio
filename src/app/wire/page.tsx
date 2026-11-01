import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { site } from "@/portfolio";
import { formatDate } from "@/lib/blog";
import { getWire } from "@/lib/wire";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Wire",
  description: `AI engineering news worth your time, each with a one-line take from ${site.name}.`,
  alternates: { canonical: "/wire" },
};

export default async function WirePage() {
  const items = await getWire();
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Wire", href: "/wire" }]}
        title={
          <>
            The <span className="text-gradient">AI wire</span>
          </>
        }
        subtitle="What happened in AI engineering, filtered — with my take on why it matters."
      />
      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        {items.length === 0 ? (
          <div className="glass rounded-3xl p-10 text-center text-muted-foreground">The first items land here soon.</div>
        ) : (
          <ol className="relative space-y-6 border-l border-border pl-6">
            {items.map((i) => (
              <li key={i.id} className="relative">
                <span className="absolute -left-[1.94rem] top-2 size-3 rounded-full border-2 border-background bg-primary" />
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={i.date}>{formatDate(i.date)}</time>
                  <Badge variant="outline">{i.topic}</Badge>
                </div>
                <h2 className="mt-2 font-display text-xl font-semibold leading-snug">{i.title}</h2>
                {i.take && <p className="mt-2 text-foreground/85">{i.take}</p>}
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {i.sources.slice(0, 3).map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 text-primary hover:underline">
                        <ExternalLink className="size-3.5" /> {s.source || new URL(s.url).hostname}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
