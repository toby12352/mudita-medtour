# Medical tourism website

Static, content-driven website built with [Astro](https://astro.build), TypeScript, and Tailwind CSS, deployed to Netlify.

The site is fully pre-rendered at build time. There is no backend, database, API server, or user accounts. Articles are Markdown/MDX files in the repository, which a Git-based CMS (Decap CMS) can manage later.

The site is bilingual: English at `/` and Myanmar (Burmese) at `/my/`. Every page and article exists in both languages, and a switcher in the header links each page to its translation. See [`docs/design/languages.md`](docs/design/languages.md).

## Tech stack

| Area      | Choice                                                       |
| --------- | ------------------------------------------------------------ |
| Framework | Astro 7, static output (SSG)                                 |
| Language  | TypeScript (strict)                                          |
| Styling   | Tailwind CSS 4 via `@tailwindcss/vite`                       |
| Content   | Astro content collections (Markdown and MDX)                 |
| Languages | Astro i18n routing, English (default) and Myanmar            |
| Islands   | React, only for components that need client-side interaction |
| SEO       | Shared `Seo` component and `@astrojs/sitemap`                |
| Hosting   | Netlify static hosting                                       |

## Prerequisites

- Node.js 22.23.4 or newer (the repository pins 22.23.5 in `.node-version`)
- npm 10 or newer

## Getting started

```sh
npm install
cp .env.example .env   # optional for local work
npm run dev
```

The dev server runs at <http://localhost:4321>.

## Scripts

| Command                | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start the local dev server                           |
| `npm run build`        | Build the production site into `dist/`               |
| `npm run preview`      | Serve the production build locally                   |
| `npm run check`        | Type-check `.astro`, `.ts`, and content schemas      |
| `npm run lint`         | Lint with ESLint (Astro, TypeScript, and a11y rules) |
| `npm run format`       | Format all files with Prettier                       |
| `npm run format:check` | Check formatting without writing changes             |

To check the production output locally, run `npm run build` and then `npm run preview`.

## Environment variables

| Variable   | Required for production | Purpose                                                                                                   |
| ---------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `SITE_URL` | Yes                     | Public origin, e.g. `https://www.example.org`. Used for canonical URLs, Open Graph URLs, and the sitemap. |

If `SITE_URL` is not set, the build falls back to `https://example.com`. Never commit real secrets; only `.env.example` is tracked.

## Project structure

```text
assets/
  logo/logo.jpg             Brand logo; header, footer, favicon, and default share image
src/
  components/
    common/                 Shared content components (Seo, ArticleCard)
    layout/                 Site chrome (Header, Footer, LanguageSwitcher)
    ui/                     Generic building blocks (Button, Container)
  content/
    articles/en/            English article Markdown/MDX files
    articles/my/            Myanmar translations, same file names
  content.config.ts         Content collection schemas
  i18n/ui.ts                Locales, interface translations, locale URL helpers
  layouts/
    MainLayout.astro        HTML shell, SEO tags, header, footer
  lib/                      Site config, navigation, content queries
  pages/                    File-based routes, one per locale
    index.astro             /
    articles/index.astro    /articles/
    articles/[slug].astro   /articles/<slug>/
    my/                     The same routes under /my/
  views/                    Page markup shared by the English and Myanmar routes
  styles/global.css         Tailwind import, design tokens, base styles
  types/                    Shared TypeScript types
  utils/                    Small pure helpers
astro.config.mjs
netlify.toml
```

Add folders such as `public/images/` or new `src/pages/` sections when real content needs them.

## Conventions

Design rules for typography, color, buttons, navigation, cards, layout, and content live in [`docs/design/`](docs/design/README.md). Cursor agents follow them through the project rules in `.cursor/rules/`. When you change shared tokens, layout components, or templates, update the matching design document and the changelog in the same change.

- **Astro first.** Build pages, layouts, and content UI as `.astro` components. They render to HTML with no client JavaScript.
- **React only for interactivity.** Put interactive components in `src/components/` as `.tsx` and hydrate them with a `client:*` directive such as `client:visible`. Do not use React Router; every page is a file in `src/pages/`.
- **Design tokens.** Colors, radii, shadows, and container widths are defined in the `@theme` block of `src/styles/global.css` and used as Tailwind classes (`bg-primary-700`, `rounded-card`, `shadow-card`, `max-w-page`). Spacing uses Tailwind's default scale.
- **Images.** Use `<Image />` or `<Picture />` from `astro:assets` for images imported from `src/assets/`. Astro generates responsive, optimized output and lazy-loads by default. Set `loading="eager"` only on above-the-fold images.
- **SEO.** Pass `title`, `description`, and optionally `image` to `MainLayout`; the `Seo` component renders the meta tags.

## Adding a page

1. Build the page markup as a view in `src/views/` using `MainLayout`, with all visible text from `src/i18n/ui.ts`.
2. Add an English and a Myanmar route that render it, for example `src/pages/about/index.astro` and `src/pages/my/about/index.astro`.
3. Add any new strings to both `en` and `my` in `src/i18n/ui.ts`.
4. Add a navigation entry in `src/lib/navigation.ts` if it belongs in the menu.

## Articles

Articles live in `src/content/articles/` as `.md` or `.mdx` files, one folder per language. The file name becomes the URL and pairs the translations:

| File                    | URL                             |
| ----------------------- | ------------------------------- |
| `en/hip-replacement.md` | `/articles/hip-replacement/`    |
| `my/hip-replacement.md` | `/my/articles/hip-replacement/` |

Write both files together. A production build fails if a published article has no published translation.

Required frontmatter (translate `title` and `description`; keep dates and `draft` the same in both files):

```yaml
---
title: Article title
description: One or two sentences used in listings and search results.
pubDate: 2026-11-12
updatedDate: 2026-11-20 # optional
draft: false # optional; drafts are hidden in production builds
---
```

The schema in `src/content.config.ts` validates every file, and the build fails on invalid frontmatter. Keep article files directly inside `en/` and `my/`.

### Future CMS integration

A Git-based CMS (Decap CMS or Sveltia CMS) can be added later at `/admin` without restructuring. Every save is a commit to GitHub, and the commit triggers a normal Netlify deploy. There is no database.

- Add `public/admin/index.html` and `public/admin/config.yml`.
- Point an `articles` collection at `src/content/articles` with fields matching the schema above, using the CMS `i18n` setting (`structure: multiple_folders`, locales `en` and `my`) so editors fill in both languages.
- Store uploaded media under `public/images/articles`.
- Use the `github` backend, with editors signing in through GitHub OAuth. Do not use the `git-gateway` backend: Netlify has deprecated Git Gateway for new sites.

## Deployment (Netlify)

The site deploys as static files. No adapter, serverless functions, or paid add-ons are required.

1. Push the repository to GitHub ([toby12352/mudita-medtour](https://github.com/toby12352/mudita-medtour)).
2. In Netlify, choose **Add new site** and **Import an existing project**, then select the repository and approve GitHub access.
3. Netlify reads `netlify.toml`. Keep these settings and do not override them in the dashboard:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `22.23.5`
   - Production branch: `main`
4. Deploy, then copy the `https://<name>.netlify.app` URL.
5. Under **Site configuration**, open **Environment variables**, set `SITE_URL` to that origin (no trailing slash), and trigger one more deploy so canonical URLs and the sitemap use it.

Each push to `main` then triggers a production deploy, and each pull request gets a Deploy Preview. For a custom domain, change `SITE_URL` and redeploy.

Astro writes every route as `<route>/index.html`, so clean URLs, nested routes, page refreshes, and direct links work without redirect rules. Unknown URLs return Netlify's default 404 page until a `src/pages/404.astro` is added.

## License

Copyright (c) 2026 [Copyright holder's legal name]

This project is licensed under the GNU General Public License version 3 only (`GPL-3.0-only`). See [`LICENSE`](LICENSE) for the full text.

You may copy, modify, and distribute this project only under the terms of that license, including keeping this copyright notice and licensing any distributed changes under GPL-3.0. Third-party dependencies remain under their own licenses.
