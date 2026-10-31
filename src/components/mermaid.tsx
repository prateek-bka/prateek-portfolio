"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

// Draws a Mermaid diagram in the browser; shows the source if it can't.
export function Mermaid({ chart }: { chart: string }) {
  const id = `m${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: resolvedTheme === "light" ? "default" : "dark" });
      try {
        const { svg } = await mermaid.render(id, chart);
        if (alive) setSvg(svg);
      } catch {
        if (alive) setFailed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [chart, id, resolvedTheme]);

  if (failed) return <pre>{chart}</pre>;
  return svg ? (
    <div className="my-8 flex justify-center overflow-x-auto rounded-2xl border border-border bg-muted/40 p-4" dangerouslySetInnerHTML={{ __html: svg }} />
  ) : (
    <div className="my-8 h-48 animate-pulse rounded-2xl bg-muted" />
  );
}
