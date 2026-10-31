import Link from "next/link";
import { Aurora } from "@/components/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden px-4 text-center">
      <Aurora />
      <div className="relative">
        <p className="text-gradient font-display text-8xl font-bold md:text-9xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold">This page doesn&apos;t exist</h1>
        <p className="mt-2 text-muted-foreground">Maybe it was refactored away.</p>
        <Button asChild variant="brand" className="mt-8">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </section>
  );
}
