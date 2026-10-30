import type { Metadata } from "next";
import { Download, Mail, MapPin } from "lucide-react";
import { certifications, education, experience, site, socials, whatIDo } from "@/portfolio";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, ${site.role} — experience, skills and education. Download the PDF.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Resume", href: "/resume" }]}
        title={
          <>
            {site.name} <span className="text-gradient">— Resume</span>
          </>
        }
        subtitle={site.description}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild variant="brand">
            <a href={site.resumePdf} download>
              <Download /> Download PDF
            </a>
          </Button>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" /> {site.location}
          </span>
          <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Mail className="size-4" /> {site.email}
          </a>
        </div>
      </PageHeader>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[2fr_1fr]">
        <section>
          <h2 className="mb-6 font-display text-2xl font-semibold">Experience</h2>
          <div className="space-y-6">
            {experience.map((e) => (
              <Reveal key={`${e.company}-${e.role}`}>
                <div className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold">
                      {e.role} · <span className="text-primary">{e.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-foreground/85">{e.summary}</p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-foreground/80">
                    {e.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <aside className="space-y-8">
          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold">Skills</h2>
            {whatIDo.map((g) => (
              <div key={g.title} className="mb-5">
                <p className="mb-2 text-sm font-medium">{g.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.points.map((pt) => (
                    <Badge key={pt} variant="outline" className="whitespace-normal">
                      {pt}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold">Certifications</h2>
            <ul className="space-y-2">
              {certifications.map((c) => (
                <li key={c.name} className="glass rounded-2xl p-4 text-sm font-medium">
                  {c.name}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold">Education</h2>
            {education.map((ed) => (
              <div key={ed.school} className="glass rounded-2xl p-5 text-sm">
                <p className="font-medium">{ed.degree}</p>
                <p className="text-muted-foreground">
                  {ed.school} · {ed.period}
                </p>
              </div>
            ))}
          </section>
          <section className="text-sm">
            <h2 className="mb-3 font-display text-2xl font-semibold">Links</h2>
            <p>
              <a className="text-primary hover:underline" href={socials.linkedin} rel="me">
                LinkedIn
              </a>{" "}
              ·{" "}
              <a className="text-primary hover:underline" href={socials.github} rel="me">
                GitHub
              </a>
            </p>
          </section>
        </aside>
      </div>
    </>
  );
}
