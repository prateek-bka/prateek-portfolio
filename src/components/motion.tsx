"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

// Types out each role, pauses, deletes, moves to the next.
export function TypingRoles({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[i % roles.length];
    const done = !deleting && text === full;
    const empty = deleting && text === "";
    const t = setTimeout(
      () => {
        if (done) setDeleting(true);
        else if (empty) {
          setDeleting(false);
          setI((n) => n + 1);
        } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      },
      done ? 1800 : deleting ? 35 : 70,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, roles]);

  return (
    <span aria-label={roles.join(", ")}>
      <span aria-hidden className="text-gradient animate-gradient">{text}</span>
      <span aria-hidden className="ml-0.5 inline-block w-[3px] animate-pulse bg-brand-2 align-middle" style={{ height: "0.9em" }} />
    </span>
  );
}

// Card with a radial highlight that follows the cursor.
export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "glow-border group relative overflow-hidden rounded-3xl",
        "before:rounded-3xl",
        className,
      )}
    >
      <div className="glass relative h-full rounded-3xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--x) var(--y), color-mix(in oklab, var(--brand-1) 18%, transparent), transparent 60%)",
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

export function CountUp({ value }: { value: string }) {
  const num = parseInt(value.replace(/,/g, ""), 10);
  const suffix = value.replace(/,/g, "").replace(/^\d+/, "");
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (Number.isNaN(num)) return;
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1200, 1);
        setN(Math.round(num * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [num]);

  return <span ref={ref}>{Number.isNaN(num) ? value : `${n.toLocaleString("en-US")}${suffix}`}</span>;
}
