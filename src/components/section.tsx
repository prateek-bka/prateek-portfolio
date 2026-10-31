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

// Static radial gradients instead of animated blur filters: same glow, but the
// browser paints it once instead of re-blurring huge layers every frame.
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 55% 45% at 15% 10%, color-mix(in oklab, var(--brand-1) calc(var(--glow) * 70%), transparent), transparent 70%)",
            "radial-gradient(ellipse 50% 45% at 90% 25%, color-mix(in oklab, var(--brand-3) calc(var(--glow) * 60%), transparent), transparent 70%)",
            "radial-gradient(ellipse 45% 40% at 50% 100%, color-mix(in oklab, var(--brand-2) calc(var(--glow) * 50%), transparent), transparent 70%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
