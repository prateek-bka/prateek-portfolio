"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import { Command as CommandIcon, Copy, FileText, FolderGit2, Home, Mail, Moon, PenLine, Search, User } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { site, socials, projects } from "@/portfolio";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  const item =
    "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/85 data-[selected=true]:bg-accent data-[selected=true]:text-foreground [&_svg]:size-4 [&_svg]:text-muted-foreground";
  const group =
    "px-2 pb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      overlayClassName="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[18%] z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-brand-1/20"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="size-4 text-muted-foreground" />
        <Command.Input
          placeholder="Search pages, projects, actions…"
          className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <Command.List className="max-h-[60vh] overflow-y-auto py-2">
        <Command.Empty className="py-10 text-center text-sm text-muted-foreground">No results.</Command.Empty>
        <Command.Group heading="Pages" className={group}>
          <Command.Item className={item} onSelect={() => run(() => router.push("/"))}><Home />Home</Command.Item>
          <Command.Item className={item} onSelect={() => run(() => router.push("/#about"))}><User />About</Command.Item>
          <Command.Item className={item} onSelect={() => run(() => router.push("/projects"))}><FolderGit2 />Projects</Command.Item>
          <Command.Item className={item} onSelect={() => run(() => router.push("/blog"))}><PenLine />Blog</Command.Item>
          <Command.Item className={item} onSelect={() => run(() => router.push("/resume"))}><FileText />Resume</Command.Item>
          <Command.Item className={item} onSelect={() => run(() => router.push("/#contact"))}><Mail />Contact</Command.Item>
        </Command.Group>
        <Command.Group heading="Projects" className={group}>
          {projects.map((p) => (
            <Command.Item key={p.slug} className={item} onSelect={() => run(() => router.push(`/projects/${p.slug}`))}>
              <FolderGit2 />
              {p.name}
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Actions" className={group}>
          <Command.Item className={item} onSelect={() => run(() => navigator.clipboard.writeText(site.email))}>
            <Copy />Copy email
          </Command.Item>
          <Command.Item className={item} onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}>
            <Moon />Toggle theme
          </Command.Item>
          <Command.Item className={item} onSelect={() => run(() => window.open(socials.github, "_blank"))}>
            <FaGithub />GitHub
          </Command.Item>
          <Command.Item className={item} onSelect={() => run(() => window.open(socials.linkedin, "_blank"))}>
            <FaLinkedin />LinkedIn
          </Command.Item>
        </Command.Group>
      </Command.List>
      <div className="flex items-center justify-end gap-1.5 border-t border-border px-4 py-2 text-xs text-muted-foreground">
        <CommandIcon className="size-3" />K to toggle
      </div>
    </Command.Dialog>
  );
}

export function CommandMenuTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
      className="hidden h-9 items-center gap-2 rounded-full border border-border bg-background/40 px-3 text-xs text-muted-foreground transition hover:text-foreground md:flex"
      aria-label="Open command menu"
    >
      <Search className="size-3.5" />
      Search
      <kbd className="rounded border border-border bg-muted px-1.5 font-mono text-[10px]">⌘K</kbd>
    </button>
  );
}
