# prateekagrawal.com

Personal portfolio of Prateek Agrawal, AI Platform Engineer.

**Stack:** Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS v4, shadcn/ui, Motion, MDX.

## Editing content

- **Everything about me:** `src/portfolio.ts` (hero, experience, projects, skills, links)
- **Blog posts:** add `src/content/blog/<slug>.mdx` with `title`, `description`, `date`, `tags` (and `draft: true` to keep it local)
- **Resume PDF:** `public/prateek-agrawal-resume.pdf`

The sitemap, RSS feed, `llms.txt`, preview images and structured data update from these automatically.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`: lint and typecheck, then an SSH call to the VM. The deploy key can only run `deploy/deploy.sh` (installed on the server as `/srv/projects/prateek-portfolio/deploy.sh`), which checks out the commit, builds the Docker image and restarts the container behind Caddy.

Secrets (Gmail app password for the contact form) live only in the server's `.env`.

## Credits

Layout and section structure inspired by [developer-portfolio](https://github.com/1hanzla100/developer-portfolio) by Hanzla Tauqeer, rebuilt from scratch on a modern stack.
