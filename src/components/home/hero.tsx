import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { hero, site, socials, stats } from "@/portfolio";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/section";
import { CountUp, Reveal, TypingRoles } from "@/components/motion";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <Aurora />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <Reveal className="flex flex-wrap items-center gap-4">
            <span className="bg-brand-gradient rounded-full p-[3px] shadow-lg shadow-brand-1/30">
              <Image
                src={site.photo}
                alt={`${site.name}, ${site.role}`}
                width={80}
                height={80}
                priority
                className="size-20 rounded-full border-2 border-background object-cover"
              />
            </span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-foreground/80">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {hero.available}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              {hero.greeting.replace("Prateek", "")}
              <span className="text-gradient">Prateek</span>
              <span className="sr-only"> Agrawal — {site.role}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 font-display text-2xl font-medium text-foreground/90 sm:text-3xl" aria-live="off">
              <TypingRoles roles={hero.roles} />
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{hero.pitch}</p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild variant="brand" size="lg">
                <Link href="/projects">
                  See my work <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/resume">
                  <Download /> Resume
                </Link>
              </Button>
              <div className="ml-1 flex items-center gap-1">
                <Button asChild variant="ghost" size="icon" aria-label="GitHub">
                  <a href={socials.github} target="_blank" rel="noopener noreferrer me">
                    <FaGithub className="size-5" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer me">
                    <FaLinkedin className="size-5" />
                  </a>
                </Button>
              </div>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
              <MapPin className="size-4" /> Based in {site.location} · open to {hero.regions.join(", ")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">
          <CodeCard />
        </Reveal>
      </div>

      <div className="relative mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-3 px-4 sm:px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={0.1 * i}>
            <div className="glass rounded-2xl p-5 text-center">
              <div className="text-gradient font-display text-3xl font-bold md:text-4xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CodeCard() {
  const k = "text-brand-1";
  const s = "text-emerald-500 dark:text-emerald-300";
  const p = "text-brand-3";
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem]"
        style={{ background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--brand-1) 35%, transparent), transparent 70%)" }}
      />
      <div className="glow-border relative rounded-3xl before:rounded-3xl before:opacity-100">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-popover/90 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
            <span className="size-3 rounded-full bg-red-400/90" />
            <span className="size-3 rounded-full bg-amber-400/90" />
            <span className="size-3 rounded-full bg-emerald-400/90" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">prateek.ts</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm" aria-label="Profile summary as code">
            <code>
              <span className={k}>const</span> <span className={p}>prateek</span> = {"{"}
              {"\n"}  role: <span className={s}>&quot;AI Platform Engineer&quot;</span>,
              {"\n"}  now: <span className={s}>&quot;Senior SWE @ a21.ai&quot;</span>,
              {"\n"}  stack: [<span className={s}>&quot;Node&quot;</span>, <span className={s}>&quot;React&quot;</span>, <span className={s}>&quot;Python&quot;</span>, <span className={s}>&quot;AWS&quot;</span>],
              {"\n"}  ships: [<span className={s}>&quot;agents&quot;</span>, <span className={s}>&quot;RAG&quot;</span>, <span className={s}>&quot;forecasting&quot;</span>],
              {"\n"}  certs: <span className={p}>3</span>, <span className="text-muted-foreground">{"// "}AWS · incl. GenAI Pro</span>
              {"\n"}  motto: <span className={s}>&quot;AI that survives production&quot;</span>,
              {"\n"}{"}"};
              {"\n"}
              {"\n"}<span className="text-muted-foreground">{"// "}hire(prateek) → 🚀</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
