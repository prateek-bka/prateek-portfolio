import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Aurora } from "@/components/section";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/portfolio";

export function PageHeader({
  title,
  subtitle,
  crumbs,
  children,
}: {
  title: React.ReactNode;
  subtitle?: string;
  crumbs: { name: string; href: string }[];
  children?: React.ReactNode;
}) {
  const all = [{ name: "Home", href: "/" }, ...crumbs];
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
      <Aurora className="opacity-70" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {all.map((c, i) => (
            <span key={c.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3" />}
              {i < all.length - 1 ? (
                <Link href={c.href} className="hover:text-foreground">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-foreground/80">
                  {c.name}
                </span>
              )}
            </span>
          ))}
        </nav>
        <Reveal>
          <h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
          {children}
        </Reveal>
      </div>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${site.url}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </section>
  );
}
