import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Layers, Target, Trophy } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, site } from "@/portfolio";
import { PageHeader } from "@/components/page-header";
import { Reveal, SpotlightCard } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd, person } from "@/components/json-ld";
import { ProjectCard } from "@/components/home/sections";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.tagline}. ${p.description}`.slice(0, 158),
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { type: "article", title: p.name, description: p.tagline },
  };
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Project params={params} />
    </Suspense>
  );
}

async function Project({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const others = projects.filter((x) => x.slug !== slug).slice(0, 3);

  const blocks = [
    { icon: Target, title: "The problem", items: [p.problem] },
    { icon: Layers, title: "Architecture", items: p.architecture },
    { icon: Trophy, title: "Results", items: p.results },
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Projects", href: "/projects" },
          { name: p.name, href: `/projects/${p.slug}` },
        ]}
        title={p.name}
        subtitle={p.tagline}
      >
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <Badge key={t} variant="glass">
              {t}
            </Badge>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {p.link && (
            <Button asChild variant="brand">
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                Visit live <ArrowUpRight />
              </a>
            </Button>
          )}
          {p.repo && (
            <Button asChild variant="outline">
              <a href={p.repo} target="_blank" rel="noopener noreferrer">
                <FaGithub /> Source
              </a>
            </Button>
          )}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div
            className="relative mb-12 h-56 overflow-hidden rounded-3xl border border-border md:h-80"
            style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
          >
            <div className="bg-grid absolute inset-0 opacity-40 mix-blend-overlay" />
            <p className="absolute bottom-6 left-7 max-w-2xl text-lg font-medium text-white/95 md:text-2xl">{p.description}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {blocks.map(({ icon: Icon, title, items }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <SpotlightCard className="h-full">
                <div className="p-7">
                  <Icon className="size-6 text-primary" />
                  <h2 className="mt-4 font-display text-xl font-semibold">{title}</h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-foreground/85">
                    {items.map((it) => (
                      <li key={it} className="flex gap-2.5">
                        <span className="bg-brand-gradient mt-2 size-1.5 shrink-0 rounded-full" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <h2 className="mt-20 mb-6 font-display text-2xl font-semibold">More projects</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {others.map((o) => (
            <ProjectCard key={o.slug} p={o} />
          ))}
        </div>
        <Link href="/projects" className="mt-10 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="size-4" /> All projects
        </Link>
      </div>

      <JsonLd
        data={{
          "@type": "CreativeWork",
          name: p.name,
          headline: p.tagline,
          description: p.description,
          url: `${site.url}/projects/${p.slug}`,
          author: { "@id": person["@id"] },
          keywords: p.tech.join(", "),
          ...(p.link ? { sameAs: p.link } : {}),
        }}
      />
    </>
  );
}
