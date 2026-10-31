// All site content lives here — edit this file to update the portfolio.
// Client work is anonymised: describe the domain, never the client's name.

export const site = {
  url: "https://prateekagrawal.com",
  name: "Prateek Agrawal",
  role: "AI Platform Engineer",
  // Shown in Google results and link previews — keep it under ~155 characters.
  description:
    "Prateek Agrawal — Senior Software Engineer and 3× AWS certified, building production AI: LLM agents, RAG and forecasting on Node.js, Python and AWS.",
  location: "New Delhi, India",
  email: "prateek.bka@gmail.com",
  photo: "/prateek-agrawal.jpg",
  resumePdf: "/prateek-agrawal-resume.pdf",
  locale: "en_IN",
  keywords: [
    "Prateek Agrawal",
    "AI Platform Engineer",
    "Senior Software Engineer",
    "Generative AI developer",
    "LLM engineer",
    "Full-stack developer",
    "Node.js",
    "React",
    "AWS Certified",
    "LangGraph",
    "RAG",
    "New Delhi",
    "Remote AI engineer",
    "Open to relocation",
  ],
};

export const hero = {
  greeting: "Hi, I'm Prateek",
  roles: ["AI Platform Engineer", "Full-stack Engineer", "AWS Certified · GenAI", "LLM Agents & RAG"],
  pitch:
    "I build AI that survives production — LLM agents, RAG pipelines and the cloud platforms underneath them. Senior Software Engineer at a21.ai, shipping for clients across India, the US and the Middle East.",
  available: "Open to AI platform roles worldwide · India, Middle East, Europe, Japan & remote",
  // Used for "willing to relocate / work with" lines and structured data.
  regions: ["India", "UAE & Middle East", "Europe", "Japan", "Singapore", "Remote"],
};

export const socials = {
  github: "https://github.com/prateek-bka",
  linkedin: "https://www.linkedin.com/in/prateek-bka",
  x: "",
};

export const stats = [
  { value: "5+", label: "years shipping software" },
  { value: "3", label: "AWS certifications" },
  { value: "99.9%", label: "uptime on systems I've run" },
  { value: "30%", label: "faster DB queries via indexing" },
];

export const certifications = [
  { name: "AWS Certified Generative AI Developer – Professional", issuer: "Amazon Web Services" },
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services" },
  { name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services" },
];

export type SkillGroup = { title: string; blurb: string; points: string[]; tools: string[] };

export const whatIDo: SkillGroup[] = [
  {
    title: "AI Platform Engineering",
    blurb: "LLMs wired into real products, with guardrails.",
    points: [
      "LLM agents with LangGraph — root-cause analysis, memory, Slack alerts",
      "RAG with pgvector and cross-encoder re-ranking",
      "Generative AI workflows, chat interfaces and intelligent automation",
    ],
    tools: ["anthropic", "langchain", "python", "postgresql"],
  },
  {
    title: "Full-stack Development",
    blurb: "Fast, accessible products from database to UI.",
    points: [
      "React, Next.js, Tailwind and shadcn/ui front ends",
      "Node.js / Express REST APIs and microservices with JWT auth",
      "Role-based dashboards and data visualisation",
    ],
    tools: ["typescript", "react", "nextjs", "nodejs", "mongodb"],
  },
  {
    title: "Cloud, DevOps & Quality",
    blurb: "Infrastructure that is secure, observable and boring.",
    points: [
      "AWS (EC2, serverless), Docker, Terraform, GitLab & GitHub CI/CD",
      "Secrets management with HashiCorp Vault",
      "Cypress E2E and API test suites",
    ],
    tools: ["aws", "docker", "terraform", "vault", "cypress"],
  },
];

export const proficiency = [
  { stack: "Backend & APIs (Node.js, Express)", value: 92 },
  { stack: "Frontend (React, Next.js)", value: 88 },
  { stack: "AI / LLM engineering", value: 85 },
  { stack: "Cloud & DevOps (AWS)", value: 85 },
];

export type Experience = {
  role: string;
  company: string;
  url?: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "a21.ai",
    url: "https://www.a21.ai",
    period: "Nov 2025 – Present",
    location: "Delhi",
    summary: "AI-powered enterprise applications for clients across India, the US and the Middle East.",
    highlights: [
      "Integrate Generative AI and LLM services into production — chatbots, AI-driven workflows and automation",
      "Architect microservices and REST APIs on AWS with serverless patterns for high availability",
      "Build role-based enterprise dashboards and data-visualisation interfaces",
      "Work client-facing with product managers and designers to turn requirements into shipped systems",
    ],
    tech: ["React", "Next.js", "Node.js", "Python", "LLMs", "AWS"],
  },
  {
    role: "Full Stack Engineer",
    company: "NTWIST",
    url: "https://www.ntwist.com",
    period: "Sep 2023 – Oct 2025",
    location: "Hyderabad",
    summary: "Enterprise industrial-AI platform for process industries such as mining and food.",
    highlights: [
      "Built scalable Node.js APIs and React components for enterprise applications",
      "Architected HashiCorp Vault on AWS EC2 to centralise credentials across services",
      "Built Cypress E2E and API suites that raised coverage and stability",
      "Cut average MongoDB response times by 30%+ with strategic indexing",
      "Kept production at 99.9% uptime by debugging critical full-stack issues",
    ],
    tech: ["Node.js", "React", "MongoDB", "AWS EC2", "Vault", "Cypress"],
  },
  {
    role: "Full Stack Engineer",
    company: "Glow and Grow Limited",
    period: "May 2021 – Aug 2023",
    location: "Mumbai",
    summary: "Consumer-facing web applications, front to back.",
    highlights: [
      "Shipped React, Tailwind and shadcn/ui front ends — 20% lift in user engagement",
      "Engineered REST APIs with Node.js and Express",
      "Designed MongoDB schemas with Mongoose for integrity and fast reads",
    ],
    tech: ["React", "Tailwind", "Node.js", "Express", "MongoDB"],
  },
  {
    role: "Associate",
    company: "Innodata",
    url: "https://www.innodata.com",
    period: "Feb 2020 – May 2021",
    location: "Noida",
    summary: "Responsive React interfaces and third-party API integrations.",
    highlights: [
      "Built React UIs with Tailwind CSS and Chakra UI",
      "Integrated and optimised third-party APIs",
    ],
    tech: ["React", "Tailwind", "Chakra UI"],
  },
];

export const education = [
  {
    school: "Manipal Institute of Technology",
    degree: "B.Tech, Electrical and Electronics Engineering",
    period: "2012 – 2016",
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  architecture: string[];
  results: string[];
  tech: string[];
  domain: string;
  link?: string;
  repo?: string;
  featured?: boolean;
  // Accent for the card glow — any two CSS colours.
  gradient: [string, string];
};

// Projects with any TODO left in them stay off the site until filled in.
export const allProjects: Project[] = [
  {
    slug: "last-mile-early-warning-system",
    name: "Last-mile Early Warning System",
    domain: "Quick-commerce & logistics",
    tagline: "Forecasts delivery stress 30 minutes ahead and lets an AI agent explain it",
    description:
      "A production early-warning system for last-mile delivery: it tracks ~21 KPIs every 2 minutes, forecasts 15 and 30 minutes ahead, and hands anomalies to a LangGraph agent that finds the root cause and alerts the ops team on Slack.",
    problem:
      "Delivery operations only noticed demand spikes and rider shortages after orders were already late. They needed warning early enough to act.",
    architecture: [
      "ClickHouse event data → 2-minute KPI slots stored in PostgreSQL",
      "Anomaly detection with z-scores against day-of-week and rolling baselines",
      "XGBoost forecasts at 15- and 30-minute horizons drive a stress score",
      "LangGraph agent with long-term memory for root-cause analysis and a mitigation ladder",
      "Tiered L1–L3 alerts to Slack, plus simulation and velocity models running alongside",
    ],
    results: ["~21 KPIs scored every 2 minutes", "15 & 30-minute forecasts", "Agent-written root cause in every alert"],
    tech: ["Python", "XGBoost", "LangGraph", "ClickHouse", "PostgreSQL", "Slack"],
    featured: true,
    gradient: ["#8b5cf6", "#22d3ee"],
  },
  {
    slug: "healthcare-document-ai",
    name: "Healthcare Document AI",
    domain: "Healthcare data",
    tagline: "RAG over pharmacy-benefit reports: extraction, summaries and Q&A",
    description:
      "An AI backend that ingests pharmacy-benefit (PBM) report PDFs, extracts tables and metrics, redacts sensitive data, and answers questions about them with retrieval-augmented generation.",
    problem:
      "Analysts spent hours reading long, table-heavy PDF reports to answer simple questions, and the data includes sensitive information that must be protected.",
    architecture: [
      "PDF ingestion pipeline extracting text, tables and key metrics",
      "Redaction service before anything reaches the LLM",
      "Embeddings in PostgreSQL + pgvector; cross-encoder re-ranking for answers",
      "Summary and Q&A agents on Azure OpenAI behind a REST API",
      "Containerised with Docker; infrastructure as code with Terraform",
    ],
    results: ["Structured data out of unstructured PDFs", "Grounded answers with re-ranked sources"],
    tech: ["Python", "RAG", "pgvector", "Azure OpenAI", "Docker", "Terraform"],
    featured: true,
    gradient: ["#ec4899", "#8b5cf6"],
  },
  {
    slug: "legal-ai-content-platform",
    name: "Legal AI Content Platform",
    domain: "Legal services",
    tagline: "Production website + AI publishing pipeline for a law firm",
    description:
      "A Next.js platform with a full admin panel and an AI pipeline that drafts SEO pages, legal news and social posts, with a human-approval step for blog and social content.",
    problem:
      "A law firm needed to rank on Google and publish consistently without a content team, while keeping legal accuracy — no unreviewed publishing.",
    architecture: [
      "Next.js App Router + PostgreSQL, Docker on ARM cloud servers behind Caddy",
      "4 swappable LLM providers with encrypted, database-stored keys",
      "Draft → review with live MDX preview → publish, with Search Console + IndexNow feedback",
      "GitHub Actions feature → UAT → production, nightly backups and restore drills",
    ],
    results: ["900+ local SEO pages planned and publishing", "AI-written daily ops report", "Near-zero hosting cost"],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "LLMs", "GitHub Actions"],
    featured: true,
    gradient: ["#f59e0b", "#ec4899"],
  },
  {
    slug: "industrial-ai-platform",
    name: "Industrial AI Platform",
    domain: "Mining, food & process industries",
    tagline: "Secure, tested full-stack platform for industrial process optimisation",
    description:
      "Full-stack work on an enterprise AI platform that helps process plants — mining, food and more — optimise operations: APIs, dashboards, secrets management and test automation.",
    problem:
      "Enterprise plant customers needed a platform that stays fast and available, with credentials for many services managed safely.",
    architecture: [
      "Node.js APIs and React dashboards for plant data",
      "HashiCorp Vault on AWS EC2 centralising credentials for multiple services",
      "Cypress E2E and API test suites in CI",
      "MongoDB with strategic indexing",
    ],
    results: ["30%+ faster average DB responses", "99.9% application uptime"],
    tech: ["Node.js", "React", "MongoDB", "AWS", "Vault", "Cypress"],
    featured: true,
    gradient: ["#10b981", "#06b6d4"],
  },
  {
    slug: "banking-platform",
    name: "Banking Platform",
    domain: "Banking & fintech",
    tagline: "TODO: one line on what the banking platform does",
    description: "TODO: two sentences — what it does and your part in it.",
    problem: "TODO",
    architecture: ["TODO"],
    results: ["TODO"],
    tech: ["Node.js", "TypeScript"],
    gradient: ["#6366f1", "#22d3ee"],
  },
  {
    slug: "self-hosted-cloud-platform",
    name: "Self-hosted Cloud Platform",
    domain: "Platform engineering",
    tagline: "Multi-project hosting on one ARM cloud VM with CI/CD and AI reports",
    description:
      "One ARM cloud VM hosting isolated projects behind Caddy — per-project Docker, databases and secrets, GitHub Actions deploys and an AI-written daily health email.",
    problem: "Run several production and test apps for ₹0/month without them stepping on each other.",
    architecture: [
      "Caddy with one site file per project, automatic HTTPS",
      "Per-project folder, .env, Postgres role and memory limit",
      "Restricted deploy keys — each repo can only deploy itself",
    ],
    results: ["Several production and test apps on one VM — including this site"],
    tech: ["Linux", "Docker", "Caddy", "PostgreSQL", "GitHub Actions"],
    gradient: ["#22d3ee", "#8b5cf6"],
  },
  {
    slug: "food-ordering-microservices",
    name: "Food-ordering Microservices",
    domain: "Food & delivery",
    tagline: "Auth, catalog, orders, websockets and notifications as separate services",
    description:
      "A food-ordering platform split into independently deployed services — auth, catalog, order, websocket and notification — with a React admin UI.",
    problem: "TODO: why microservices, and what you learned",
    architecture: ["TODO"],
    results: ["TODO"],
    tech: ["TypeScript", "Node.js", "React"],
    gradient: ["#f97316", "#ec4899"],
  },
];

export const projects = allProjects.filter((p) => !JSON.stringify(p).includes("TODO"));

export const testimonials: { name: string; role: string; quote: string }[] = [
  // Add 2–3 LinkedIn recommendations here (name, role, quote) — the section stays hidden while empty.
];

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];
