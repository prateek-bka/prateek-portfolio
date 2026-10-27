import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Rss } from "lucide-react";
import { cacheLife } from "next/cache";
import { nav, site, socials } from "@/portfolio";

async function Year() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="relative mt-10 border-t border-border">
      <div className="bg-brand-gradient absolute inset-x-0 top-0 h-px opacity-60" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {site.role} · {site.location}
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3" aria-label="Footer">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-muted-foreground transition hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2">
          {[
            { href: socials.github, label: "GitHub", Icon: FaGithub },
            { href: socials.linkedin, label: "LinkedIn", Icon: FaLinkedin },
            ...(socials.x ? [{ href: socials.x, label: "X", Icon: FaXTwitter }] : []),
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={label}
              className="glass grid size-10 place-items-center rounded-full text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
          <a
            href="/feed.xml"
            aria-label="RSS feed"
            className="glass grid size-10 place-items-center rounded-full text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
          >
            <Rss className="size-4" />
          </a>
        </div>
      </div>
      <p className="pb-10 text-center text-xs text-muted-foreground">
        © <Year /> {site.name} · Designed &amp; built with{" "}
        <span role="img" aria-label="love" className="inline-block animate-pulse">
          ❤️
        </span>{" "}
        and lots of{" "}
        <span role="img" aria-label="coffee">
          ☕
        </span>
      </p>
    </footer>
  );
}
