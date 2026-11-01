import type { Metadata } from "next";
import { projects, site } from "@/portfolio";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/home/sections";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { FaGithub } from "react-icons/fa6";
import { getBuilds } from "@/lib/builds";

export const metadata: Metadata = {
  title: "Projects",
  description: `Case studies by ${site.name}: production AI pipelines, agent runtimes, microservices and self-hosted cloud platforms.`,
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const builds = await getBuilds();
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Projects", href: "/projects" }]}
        title={
          <>
            Things I&apos;ve <span className="text-gradient">built and shipped</span>
          </>
        }
        subtitle="Each one has a short case study: the problem, the architecture and what it achieved."
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 pb-24 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.08}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
      {builds.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <h2 className="mb-2 font-display text-2xl font-semibold">Recent builds</h2>
          <p className="mb-6 text-muted-foreground">Hands-on projects from my AI engineering practice, with the code.</p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {builds.map((b) => (
              <article key={b.id} className="glass flex flex-col rounded-3xl p-6">
                <p className="text-xs text-muted-foreground">{b.area}</p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{b.title.split(" — ")[0]}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{b.blurb}</p>
                {b.repoUrl && (
                  <a href={b.repoUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <FaGithub className="size-4" /> View the code
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
      <JsonLd
        data={{
          "@type": "ItemList",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}/projects/${p.slug}`,
            name: p.name,
          })),
        }}
      />
    </>
  );
}
