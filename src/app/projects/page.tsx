import type { Metadata } from "next";
import { projects, site } from "@/portfolio";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/home/sections";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Projects",
  description: `Case studies by ${site.name}: production AI pipelines, agent runtimes, microservices and self-hosted cloud platforms.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
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
