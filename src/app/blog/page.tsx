import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/portfolio";
import { formatDate, getPosts } from "@/lib/blog";
import { PageHeader } from "@/components/page-header";
import { Reveal, SpotlightCard } from "@/components/motion";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description: `Notes from ${site.name} on shipping AI to production: LLM pipelines, agents, cloud platforms and engineering fundamentals.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Blog", href: "/blog" }]}
        title={
          <>
            Notes on <span className="text-gradient">AI in production</span>
          </>
        }
        subtitle="What I learn building LLM systems, platforms and products — written for engineers."
      />
      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        {posts.length === 0 ? (
          <div className="glass rounded-3xl p-10 text-center text-muted-foreground">
            First posts are on the way. Follow the <a href="/feed.xml" className="text-primary underline">RSS feed</a> to
            get them.
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <SpotlightCard>
                  <Link href={`/blog/${p.slug}`} className="block p-7">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <time dateTime={p.date}>{formatDate(p.date)}</time>·<span>{p.readingMinutes} min read</span>
                      {p.draft && <Badge>draft</Badge>}
                    </div>
                    <h2 className="mt-3 flex items-start justify-between gap-4 font-display text-2xl font-semibold">
                      {p.title}
                      <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition group-hover:text-primary" />
                    </h2>
                    <p className="mt-2 text-muted-foreground">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </Link>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
