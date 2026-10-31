import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.min.css";
import { Mermaid } from "./mermaid";

type HastNode = { properties?: { className?: string[] }; children?: HastNode[]; value?: string };
const textOf = (n?: HastNode): string => (n?.value ?? "") + (n?.children ?? []).map(textOf).join("");

// Articles published from Inkwire: GitHub-flavoured Markdown with code and
// ```mermaid diagrams.
export function MarkdownArticle({ source }: { source: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeHighlight, { plainText: ["mermaid"], detect: false }]]}
      components={{
        pre({ node, children }) {
          const code = (node as HastNode | undefined)?.children?.[0];
          if (code?.properties?.className?.includes("language-mermaid")) return <Mermaid chart={textOf(code).trim()} />;
          return <pre>{children}</pre>;
        },
        a({ href, children }) {
          const external = href && !href.startsWith("/") && !href.startsWith("#");
          return (
            <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {children}
            </a>
          );
        },
        table({ children }) {
          return (
            <div className="my-6 overflow-x-auto rounded-xl border border-border">
              <table>{children}</table>
            </div>
          );
        },
        img({ src, alt }) {
          // eslint-disable-next-line @next/next/no-img-element
          return <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" className="my-6 w-full rounded-2xl" />;
        },
      }}
    >
      {source}
    </Markdown>
  );
}
