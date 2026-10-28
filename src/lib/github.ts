import { cacheLife } from "next/cache";
import { socials } from "@/portfolio";

export type GithubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
};

export type Day = { date: string; count: number; level: number };

export type Contributions = {
  days: Day[];
  total: number;
  activeDays: number;
  longestStreak: number;
  currentStreak: number;
  bestDay: Day;
  bestMonth: { month: string; count: number };
};

const user = socials.github.split("/").pop()!;
const headers = { Accept: "application/vnd.github+json", "User-Agent": "prateekagrawal.com" };

// Public GitHub API, no token. Cached for a day so the 60/hour limit is never hit.
export async function getGithubProfile(): Promise<GithubProfile | null> {
  "use cache";
  cacheLife("days");
  try {
    const r = await fetch(`https://api.github.com/users/${user}`, { headers });
    return r.ok ? r.json() : null;
  } catch {
    return null;
  }
}

// The contribution calendar from github.com/users/<user>/contributions — the same
// public HTML the profile page uses (includes private contributions if enabled).
export async function getContributions(): Promise<Contributions | null> {
  "use cache";
  cacheLife("hours");
  try {
    const r = await fetch(`https://github.com/users/${user}/contributions`, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!r.ok) return null;
    const html = await r.text();
    const dateById = new Map<string, { date: string; level: number }>();
    for (const m of html.matchAll(/data-date="([\d-]+)" id="([^"]+)"[^>]*data-level="(\d)"/g)) {
      dateById.set(m[2], { date: m[1], level: Number(m[3]) });
    }
    const days: Day[] = [];
    for (const m of html.matchAll(/for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      const d = dateById.get(m[1]);
      if (d) days.push({ ...d, count: Number(/^(\d+) contribution/.exec(m[2])?.[1] ?? 0) });
    }
    if (days.length < 300) return null;
    days.sort((a, b) => a.date.localeCompare(b.date));

    let longestStreak = 0;
    let run = 0;
    const months = new Map<string, number>();
    for (const d of days) {
      run = d.count > 0 ? run + 1 : 0;
      longestStreak = Math.max(longestStreak, run);
      months.set(d.date.slice(0, 7), (months.get(d.date.slice(0, 7)) ?? 0) + d.count);
    }
    // Today may have no contributions yet — the streak still counts up to yesterday.
    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) currentStreak++;
      else if (i < days.length - 1) break;
    }
    const [month, count] = [...months].sort((a, b) => b[1] - a[1])[0];
    return {
      days,
      total: days.reduce((s, d) => s + d.count, 0),
      activeDays: days.filter((d) => d.count > 0).length,
      longestStreak,
      currentStreak,
      bestDay: days.reduce((a, b) => (b.count > a.count ? b : a)),
      bestMonth: { month, count },
    };
  } catch {
    return null;
  }
}
