import type { IconType } from "react-icons";
import {
  SiAnthropic,
  SiCypress,
  SiDocker,
  SiGithubactions,
  SiLangchain,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVault,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

export const TECH: Record<string, { label: string; Icon: IconType; color: string }> = {
  anthropic: { label: "LLMs", Icon: SiAnthropic, color: "#d97757" },
  langchain: { label: "LangChain", Icon: SiLangchain, color: "#1c3c3c" },
  python: { label: "Python", Icon: SiPython, color: "#3776ab" },
  postgresql: { label: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
  typescript: { label: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
  react: { label: "React", Icon: SiReact, color: "#58c4dc" },
  nextjs: { label: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
  nodejs: { label: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
  tailwind: { label: "Tailwind", Icon: SiTailwindcss, color: "#06b6d4" },
  aws: { label: "AWS", Icon: FaAws, color: "#ff9900" },
  docker: { label: "Docker", Icon: SiDocker, color: "#2496ed" },
  terraform: { label: "Terraform", Icon: SiTerraform, color: "#844fba" },
  githubactions: { label: "GitHub Actions", Icon: SiGithubactions, color: "#2088ff" },
  linux: { label: "Linux", Icon: SiLinux, color: "currentColor" },
  mongodb: { label: "MongoDB", Icon: SiMongodb, color: "#47a248" },
  redis: { label: "Redis", Icon: SiRedis, color: "#ff4438" },
  vault: { label: "Vault", Icon: SiVault, color: "#ffd814" },
  cypress: { label: "Cypress", Icon: SiCypress, color: "currentColor" },
};

export function TechChip({ id }: { id: string }) {
  const t = TECH[id];
  if (!t) return null;
  const { Icon } = t;
  return (
    <span
      title={t.label}
      className="group/chip glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:-translate-y-0.5 hover:text-foreground"
    >
      <Icon className="size-4 transition group-hover/chip:scale-110" style={{ color: t.color }} aria-hidden />
      {t.label}
    </span>
  );
}
