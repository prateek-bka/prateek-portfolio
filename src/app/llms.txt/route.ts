import { experience, projects, site, socials, whatIDo } from "@/portfolio";
import { getPosts } from "@/lib/blog";

// Plain-text summary for AI assistants (llmstxt.org).
export async function GET() {
  const posts = await getPosts();
  const body = [
    `# ${site.name}`,
    `> ${site.description}`,
    "",
    `${site.role} based in ${site.location}. Currently ${experience[0].role} at ${experience[0].company}.`,
    "",
    "## Skills",
    ...whatIDo.map((g) => `- ${g.title}: ${g.points.join("; ")}`),
    "",
    "## Projects",
    ...projects.map((p) => `- [${p.name}](${site.url}/projects/${p.slug}): ${p.tagline}`),
    "",
    ...(posts.length ? ["## Blog", ...posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description}`), ""] : []),
    "## Links",
    `- [Resume](${site.url}/resume)`,
    `- [GitHub](${socials.github})`,
    `- [LinkedIn](${socials.linkedin})`,
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
