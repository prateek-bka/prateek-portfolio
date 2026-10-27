"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/portfolio";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme";
import { CommandMenuTrigger } from "@/components/command-menu";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-3">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-3 pl-4 transition-all duration-500",
          scrolled || open ? "glass shadow-lg shadow-black/5" : "border border-transparent",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <span className="bg-brand-gradient grid size-8 place-items-center rounded-full font-display text-sm font-bold text-white shadow-md shadow-brand-1/30">
            PA
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <CommandMenuTrigger />
          <ThemeToggle />
          <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex">
            <Link href="/#contact">Let&apos;s talk</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-2 shadow-xl lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm text-foreground/85 hover:bg-accent"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
