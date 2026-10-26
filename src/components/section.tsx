import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28", className)}>
      <Reveal className="mb-12 max-w-2xl md:mb-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
        {subtitle && <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
      </Reveal>
      {children}
    </section>
  );
}

export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div
        className="animate-aurora absolute -top-1/3 left-[-10%] h-[70vh] w-[70vw] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-1), transparent 65%)", opacity: "var(--glow)" }}
      />
      <div
        className="animate-aurora absolute top-[10%] right-[-15%] h-[60vh] w-[60vw] rounded-full blur-3xl [animation-delay:-6s]"
        style={{ background: "radial-gradient(circle, var(--brand-3), transparent 65%)", opacity: "var(--glow)" }}
      />
      <div
        className="animate-aurora absolute bottom-[-30%] left-[25%] h-[55vh] w-[50vw] rounded-full blur-3xl [animation-delay:-12s]"
        style={{ background: "radial-gradient(circle, var(--brand-2), transparent 65%)", opacity: "calc(var(--glow) * 0.8)" }}
      />
    </div>
  );
}
