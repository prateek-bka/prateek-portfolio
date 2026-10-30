import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/portfolio";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { JsonLd, person } from "@/components/json-ld";

export async function generateStaticParams() {
  const posts = await getPosts();
  // At least one param is required for a static build, even with no posts yet.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = await getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    keywords: p.tags,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.description,
      publishedTime: p.date,
      modifiedTime: p.updated ?? p.date,
      authors: [site.name],
      tags: p.tags,
    },
  };
}

export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Post params={params} />
    </Suspense>
  );
}

async function Post({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const p = await getPost((await params).slug);
  if (!p) notFound();

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Blog", href: "/blog" },
          { name: p.title, href: `/blog/${p.slug}` },
        ]}
        title={p.title}
        subtitle={p.description}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="text-foreground/85">{site.name}</span>·<time dateTime={p.date}>{formatDate(p.date)}</time>·
          <span>{p.readingMinutes} min read</span>
          {p.tags.map((t) => (
            <Badge key={t} variant="glass">
              {t}
            </Badge>
          ))}
        </div>
      </PageHeader>
      <article className="prose-post mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <MDXRemote source={p.content} />
      </article>
      <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="size-4" /> All posts
        </Link>
      </div>
      <JsonLd
        data={{
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.updated ?? p.date,
          url: `${site.url}/blog/${p.slug}`,
          mainEntityOfPage: `${site.url}/blog/${p.slug}`,
          image: `${site.url}/opengraph-image`,
          keywords: p.tags.join(", "),
          author: { "@type": "Person", "@id": person["@id"], name: site.name, url: site.url },
        }}
      />
    </>
  );
}
