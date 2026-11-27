---
title: Welcome to Rocky Blog
link: getting-started
catalog: true
date: 2024-01-01 00:00:00
description: An introduction to Rocky Blog, a static editorial-style personal blog built with Astro, React, and Tailwind CSS.
tags:
  - 入门
  - Astro
categories:
  - 工具
sticky: true
translationKey: getting-started
---

Welcome to **Rocky Blog**, a static personal blog focused on writing, reading, and content discovery.

## About the project

Rocky Blog is built with Astro 7, React 19, TypeScript, and Tailwind CSS 4. It uses static generation with selectively hydrated interactions. Its visual direction combines premium editorial layouts, contemporary magazine typography, and restrained sakura, botanical, and celestial details.

Core capabilities include:

- Homepage editorial sections, articles, categories, tags, archives, and series.
- Pagefind static search, command palette, local reading history, and continue-reading entry points.
- Light and dark themes, reader preferences, focus mode, and table of contents.
- GFM, Shiki, KaTeX, Mermaid, Infographic, and Shoka-style Markdown extensions.
- Chinese, English, Japanese, and French UI routes.
- Static SEO metadata and deployment.

The project does not include a CMS, comments, analytics, a site-wide music player, RSS subscriptions, AI summaries, or cloud-synced reading history. See the repository's Product Scope for the complete list.

## Personal Reading Shelf

Save articles from supported article cards or article pages, then manage them at `/shelf`. The shelf supports To Read, In Progress, and Completed filters, search, sorting, and grid or list layouts. Saved items and reading history stay in the current browser; they are not synced across devices.

## Quick start

Requirements: Node.js `>=22.20.0` and pnpm `10.28.2`.

```bash
git clone https://github.com/RockyBabcock/rocky-blog.git
cd rocky-blog
pnpm install
pnpm dev
```

The development server defaults to port 3000. Set `BLOG_PORT` to override it.

## Write your first post

Create a Markdown file under `src/content/blog/`:

```markdown
---
title: My First Post
description: A short introduction
date: 2026-11-27
link: my-first-post
tags:
  - Astro
categories:
  - 笔记
---

Your content starts here.
```

The content schema is defined in `src/content.config.ts`. Available fields include `title`, `date`, `description`, `link`, `updated`, `cover`, `tags`, `categories`, `sticky`, `draft`, `catalog`, `tocNumbering`, `math`, `password`, `keywords`, and `translationKey`.

## Translations

Chinese is the default locale. Translated posts mirror the default post's relative path under the `en/`, `ja/`, or `fr/` directory. Keep the same `link` and, where useful, the same `translationKey`.

UI support for four locales does not mean every article has four translations. Missing translations follow the site's fallback behavior.

## Configuration and deployment

Edit `config/site.yaml` to customize site identity, domain, timezone, locale settings, navigation, categories, series, and motion. Content label translations live in `config/i18n-content.yaml`.

Run `pnpm build` to generate `dist/`. Deploy the output to GitHub Pages, Vercel, Netlify, Cloudflare Pages, or another static host. No application server or database is required.

## Learn more

- [Rocky Blog usage guide](/en/post/astro-koharu-guide)
- [Markdown feature showcase](/en/post/markdown-features)
- [Archives](/en/archives)
- [Repository on GitHub](https://github.com/RockyBabcock/rocky-blog)
