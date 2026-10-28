import Image from "next/image";
import { CalendarDays, Flame, GitCommitHorizontal, Trophy } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { getContributions, getGithubProfile, type Day } from "@/lib/github";
import { Section } from "@/components/section";
import { CountUp, Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

const LEVEL_BG = [
  "var(--muted)",
  "color-mix(in oklab, var(--brand-1) 35%, transparent)",
  "color-mix(in oklab, var(--brand-1) 60%, transparent)",
  "color-mix(in oklab, var(--brand-1) 85%, var(--brand-2))",
  "var(--brand-2)",
];

const fmt = (d: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { timeZone: "UTC", ...opts });

export async function Github() {
  const [profile, c] = await Promise.all([getGithubProfile(), getContributions()]);
  if (!profile || !c) return null;

  const stats = [
    { icon: GitCommitHorizontal, value: String(c.total), label: "contributions in the last year" },
    { icon: CalendarDays, value: String(c.activeDays), label: "days with commits" },
    { icon: Flame, value: `${c.longestStreak}`, label: "day longest streak" },
    {
      icon: Trophy,
      value: String(c.bestMonth.count),
      label: `in ${fmt(`${c.bestMonth.month}-01`, { month: "long", year: "numeric" })}, my busiest month`,
    },
  ];

  return (
    <Section
      eyebrow="Engineering activity"
      title={
        <>
          Shipping code <span className="text-gradient">every week</span>
        </>
      }
      subtitle="My GitHub contribution graph for the last 12 months — mostly private client work, counted without revealing the code."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_2.4fr]">
        <Reveal>
          <div className="glow-border h-full rounded-3xl before:rounded-3xl before:opacity-60">
            <div className="glass flex h-full flex-col items-center rounded-3xl p-8 text-center">
              <Image
                src={profile.avatar_url}
                alt={`${profile.name ?? profile.login} on GitHub`}
                width={96}
                height={96}
                className="rounded-full ring-4 ring-primary/30"
              />
              <p className="mt-4 font-display text-xl font-semibold">{profile.name ?? profile.login}</p>
              <p className="font-mono text-sm text-muted-foreground">@{profile.login}</p>
              {profile.bio && <p className="mt-3 text-sm text-foreground/80">{profile.bio}</p>}
              <p className="mt-5 text-sm">
                <b className="text-gradient font-display text-lg">{profile.followers}</b> followers
              </p>
              <Button asChild variant="brand" className="mt-6">
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer me">
                  <FaGithub /> Follow on GitHub
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="flex min-w-0 flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <div className="glass h-full rounded-2xl p-4">
                  <Icon className="size-4 text-primary" />
                  <p className="text-gradient mt-2 font-display text-2xl font-bold md:text-3xl">
                    <CountUp value={value} />
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="glass rounded-3xl p-5 md:p-6">
            <Heatmap days={c.days} className="hidden sm:block" />
            <Heatmap days={c.days.slice(-7 * 20)} className="sm:hidden" />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                Best day: <b className="text-foreground">{c.bestDay.count}</b> contributions on{" "}
                {fmt(c.bestDay.date, { day: "numeric", month: "short", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                Less
                {LEVEL_BG.map((bg) => (
                  <span key={bg} className="size-[11px] rounded-[3px]" style={{ background: bg }} />
                ))}
                More
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Heatmap({ days, className }: { days: Day[]; className?: string }) {
  // Pad the first week so each column runs Sunday → Saturday, like GitHub.
  const pad = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array(pad).fill(null), ...days];
  const weeks = Math.ceil(cells.length / 7);
  const months = Array.from({ length: weeks }, (_, w) => {
    const first = cells.slice(w * 7, w * 7 + 7).find(Boolean);
    const prev = w > 0 ? cells.slice(w * 7 - 7, w * 7).find(Boolean) : null;
    return first && (!prev || first.date.slice(5, 7) !== prev.date.slice(5, 7))
      ? fmt(first.date, { month: "short" })
      : "";
  });

  return (
    <div className={className}>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}>
        {months.map((m, i) => (
          <span key={i} className="h-4 overflow-visible text-[10px] whitespace-nowrap text-muted-foreground">
            {m}
          </span>
        ))}
      </div>
      <div
        className="grid grid-flow-col gap-[3px]"
        style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))", gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
        role="img"
        aria-label={`GitHub contributions: ${days.reduce((s, d) => s + d.count, 0)} in this period`}
      >
        {cells.map((d, i) =>
          d ? (
            <span
              key={d.date}
              title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${fmt(d.date, { day: "numeric", month: "short", year: "numeric" })}`}
              className="aspect-square rounded-[3px] transition-transform hover:scale-150"
              style={{ background: LEVEL_BG[d.level] }}
            />
          ) : (
            <span key={`pad-${i}`} />
          ),
        )}
      </div>
    </div>
  );
}
