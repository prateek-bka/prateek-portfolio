import Link from "next/link";
import { ArrowUpRight, Briefcase, Check, GraduationCap, Quote } from "lucide-react";
import { FaAws } from "react-icons/fa6";
import { certifications, education, experience, projects, proficiency, testimonials, whatIDo, type Project } from "@/portfolio";
import { Section } from "@/components/section";
import { Reveal, SpotlightCard } from "@/components/motion";
import { TechChip } from "@/components/tech-icon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function WhatIDo() {
  return (
    <Section
      id="about"
      eyebrow="What I do"
      title={
        <>
          Engineer who takes AI from <span className="text-gradient">demo to production</span>
        </>
      }
      subtitle="Full-stack roots, cloud discipline and a focus on LLM systems that are reliable, observable and cheap to run."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {whatIDo.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.1}>
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col p-7">
                <span className="bg-brand-gradient mb-5 inline-flex size-11 items-center justify-center rounded-2xl font-display text-lg font-bold text-white shadow-lg shadow-brand-1/30">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl font-semibold">{g.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{g.blurb}</p>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {g.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-foreground/85">{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {g.tools.map((t) => (
                    <TechChip key={t} id={t} />
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="glass mt-8 grid gap-6 rounded-3xl p-7 md:grid-cols-2 md:p-9">
        {proficiency.map((p) => (
          <div key={p.stack}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">{p.stack}</span>
              <span className="font-mono text-muted-foreground">{p.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="bg-brand-gradient h-full rounded-full" style={{ width: `${p.value}%` }} />
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've built things"
      subtitle="Product companies and client platforms across enterprise AI, industrial software and consumer apps."
    >
      <ol className="relative space-y-8 pl-8 md:ml-4 md:pl-12">
        {experience.map((e, i) => (
          <li key={`${e.company}-${e.role}`} className="relative">
            <span aria-hidden className="bg-brand-gradient absolute -top-8 -bottom-8 -left-[32px] w-px opacity-60 md:-left-[48px]" />
            <span className="bg-brand-gradient absolute top-7 -left-[41px] grid size-5 place-items-center rounded-full ring-4 ring-background md:-left-[57px]">
              <Briefcase className="size-2.5 text-white" />
            </span>
            <Reveal delay={i * 0.05}>
              <SpotlightCard>
                <div className="p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold">
                      {e.role}{" "}
                      {e.url ? (
                        <a href={e.url} target="_blank" rel="noopener noreferrer" className="text-gradient hover:underline">
                          @ {e.company}
                        </a>
                      ) : (
                        <span className="text-gradient">@ {e.company}</span>
                      )}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{e.location}</p>
                  <p className="mt-4 text-foreground/85">{e.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <span className="bg-brand-gradient mt-2 size-1.5 shrink-0 rounded-full" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {e.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.05}>
            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#ff9900]/15 text-[#ff9900]">
                <FaAws className="size-6" />
              </span>
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.issuer}</p>
              </div>
            </div>
          </Reveal>
        ))}
        {education.map((ed) => (
          <Reveal key={ed.school}>
            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <GraduationCap className="size-5" />
              </span>
              <div>
                <p className="font-medium">{ed.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {ed.school} · {ed.period}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function ProjectCard({ p, large }: { p: Project; large?: boolean }) {
  return (
    <SpotlightCard className="h-full">
      <Link href={`/projects/${p.slug}`} className="flex h-full flex-col p-7" aria-label={`${p.name} — case study`}>
        <div
          aria-hidden
          className={cn("relative mb-6 overflow-hidden rounded-2xl border border-border", large ? "h-44 md:h-56" : "h-32")}
          style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
        >
          <div className="bg-grid absolute inset-0 opacity-40 mix-blend-overlay" />
          <span className="absolute bottom-3 left-4 font-display text-2xl font-bold text-white/90 drop-shadow md:text-3xl">
            {p.name.split(" — ")[0]}
          </span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">{p.name}</h3>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-primary">{p.domain}</p>
        <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {p.tech.slice(0, 5).map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
      </Link>
    </SpotlightCard>
  );
}

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={
        <>
          Projects I&apos;m <span className="text-gradient">proud of</span>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-6">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08} className={i === 0 ? "md:col-span-4" : i === 1 ? "md:col-span-2" : "md:col-span-3"}>
            <ProjectCard p={p} large={i === 0} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <Link href="/projects" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          All projects →
        </Link>
      </Reveal>
    </Section>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <Section eyebrow="Kind words" title="What people say">
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <SpotlightCard className="h-full">
              <figure className="flex h-full flex-col p-7">
                <Quote className="size-7 text-primary" />
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">{t.quote}</blockquote>
                <figcaption className="mt-auto pt-6">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
