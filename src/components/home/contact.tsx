"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Loader2, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { site, socials } from "@/portfolio";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

type State = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
    }).catch(() => null);
    if (res?.ok) return setState("sent");
    setError((await res?.json().catch(() => null))?.error ?? "Something went wrong — please email me directly.");
    setState("error");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="glass flex flex-col rounded-3xl p-8">
        <h3 className="font-display text-2xl font-semibold">Let&apos;s build something</h3>
        <p className="mt-3 text-muted-foreground">
          Hiring for AI platform, backend or full-stack roles — or need a second pair of eyes on an LLM system? I reply
          within a day.
        </p>
        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(site.email);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className="glass flex w-full items-center gap-3 rounded-2xl p-4 text-left transition hover:-translate-y-0.5"
          >
            <span className="bg-brand-gradient grid size-10 place-items-center rounded-xl text-white">
              <Mail className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block text-xs text-muted-foreground">Email</span>
              <span className="text-sm font-medium">{site.email}</span>
            </span>
            {copied ? <CheckCircle2 className="size-4 text-emerald-500" /> : <Copy className="size-4 text-muted-foreground" />}
          </button>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer me"
            className="glass flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-[#0a66c2] text-white">
              <FaLinkedin className="size-5" />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">LinkedIn</span>
              <span className="text-sm font-medium">Connect with me</span>
            </span>
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer me"
            className="glass flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-foreground text-background">
              <FaGithub className="size-5" />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">GitHub</span>
              <span className="text-sm font-medium">See my code</span>
            </span>
          </a>
        </div>
      </div>

      <div className="glow-border rounded-3xl before:rounded-3xl before:opacity-60">
        <div className="glass h-full rounded-3xl p-8">
          {state === "sent" ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
              <CheckCircle2 className="size-14 text-emerald-500" />
              <p className="mt-4 font-display text-2xl font-semibold">Message sent</p>
              <p className="mt-2 text-muted-foreground">Thanks — I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium">Name</span>
                  <Input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium">Email</span>
                  <Input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@company.com" />
                </label>
              </div>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Message</span>
                <Textarea name="message" required minLength={10} maxLength={5000} placeholder="Role, project or idea…" />
              </label>
              {/* Honeypot — real visitors never see or fill this. */}
              <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              {state === "error" && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" variant="brand" size="lg" className="w-full" disabled={state === "sending"}>
                {state === "sending" ? <Loader2 className="animate-spin" /> : <Send />}
                {state === "sending" ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
