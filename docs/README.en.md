# Rocky Blog

**Language:** [中文](../README.md) · **English** · [日本語](./README.ja.md)

Rocky Blog is a static personal blog focused on reading and content discovery; article authoring and translation are handled by the external MuseAI workflow. It is built with **Astro 7, React 19, TypeScript, and Tailwind CSS 4**, using static generation with selectively hydrated interactions. Its visual direction is **Premium Editorial × Contemporary Magazine × Sakura Botanical × Celestial Details**: editorial typography and clear hierarchy first, with restrained sakura, botanical, and celestial accents.

This repository is maintained as Rocky Blog. Upstream code and design references do not override the product scope or implementation in this repository.

[Getting Started](../GETTING-STARTED.md) · [Product Scope](./PRODUCT-SCOPE.md) · [Architecture](./overview/00-overview.md) · [Usage Guide](../src/content/blog/tools/astro-koharu-guide.md)

## Product at a glance

- **Content organization:** featured homepage sections, latest writing, series and weekly posts, categories, tags, archives, timelines, and pagination.
- **Reading experience:** light/dark themes, reader preferences, reading progress, table of contents, focus mode, local reading history, and continue-reading entry points.
- **Discovery:** static full-text search powered by Pagefind, command palette, and site navigation.
- **Personal Reading Shelf:** save posts locally, filter by To Read / In Progress / Completed, search and sort saved items, and switch between grid and list views. Category and archive lists also support in-collection search and sorting.
- **Markdown:** GFM, Shiki, KaTeX, Mermaid, Infographic, and Shoka-style containers, tabs, collapsible sections, ruby annotations, and text effects.
- **Protected content:** build-time AES-256-GCM encryption for full posts or selected blocks. This is not server-side access control; see [security boundaries](./PRODUCT-SCOPE.md).
- **Locales:** Chinese (default), English, Japanese, and French. UI dictionaries cover all four; individual posts may not have every translation.
- **SEO and delivery:** canonical URLs, Open Graph, hreflang, sitemap, robots, and static deployment.
- **Visual details:** responsive editorial layouts, sakura petals, page transitions, and motion levels that respect reduced-motion preferences.

The product does not include accounts, cloud-synced reading history, comments, analytics, a CMS, a site-wide music player, or RSS subscriptions. See [Product Scope](./PRODUCT-SCOPE.md) for the full list of retained features and non-goals.

## Screenshots

The images below are historical captures. They illustrate earlier page structures and interaction ideas and may not match the latest `main` branch pixel for pixel. Update this section when current screenshots are available.

<table>
  <tr>
    <td width="50%"><img src="./assets/showcase/home.webp" alt="Historical Rocky Blog homepage" /><br /><sub>Homepage (historical)</sub></td>
    <td width="50%"><img src="./assets/showcase/theme.webp" alt="Historical theme preview" /><br /><sub>Theme (historical)</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="./assets/showcase/pages.webp" alt="Historical page transition preview" /><br /><sub>Page transitions (historical)</sub></td>
    <td width="50%"><img src="./assets/showcase/toc.webp" alt="Historical table of contents preview" /><br /><sub>Table of contents (historical)</sub></td>
  </tr>
</table>

## Development

Requirements:

- Node.js `>=22.20.0`
- pnpm `10.28.2`

```bash
git clone https://github.com/RockyBabcock/rocky-blog.git
cd rocky-blog
pnpm install
pnpm dev
```

The development server defaults to port 3000. Set `BLOG_PORT` to override it.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Generate the static site |
| `pnpm preview` | Preview the production build |
| `pnpm check` | Run Astro and TypeScript checks |
| `pnpm lint` | Run Biome checks |
| `pnpm test` | Run the core test suite |
| `pnpm knip` | Find unused files and dependencies |
| `pnpm generate:lqips` | Generate low-quality image placeholders |

## MuseAI content intake

All Rocky Blog articles are authored and translated through the external MuseAI workflow. This repository does not include a CMS, browser-based writing room, article-management dashboard, or local-editor integration. Muse delivers validated Markdown / MDX files and any real media assets; the site schema validates and statically renders them.

Start with the [Muse content workflow](./muse/README.md), which links to the frontmatter schema, real directory and category mapping, locale mirrors, supported Markdown syntax, editorial standards, upload checklist, and reusable prompts for new articles, translations, and reviews.

The content root is `src/content/blog/`. Chinese source articles live under the category folders; translations mirror each relative path under `en/`, `ja/`, or `fr/`. Site identity, locales, navigation, series, theme, and motion remain configured in `config/site.yaml`.

Run `pnpm build` to generate `dist/` and deploy it to a static host. No application server or database is required.

## Documentation

- [Product Scope](./PRODUCT-SCOPE.md)
- [Frontend Design & Implementation Prompt](./FRONTEND-DESIGN-PROMPT.md)
- [Muse Content Workflow](./muse/README.md)
- [Project Status and Agent Handoff](./PROJECT-STATUS.md)
- [Getting Started](../GETTING-STARTED.md)
- [Architecture Overview](./overview/00-overview.md)
- [Internationalization and SEO](./overview/11-i18n-and-seo.md)
- [Contributing](../CONTRIBUTING.md)
- [AI Agent Guidelines](../AGENTS.md) — shared rules also linked by [Gemini](../GEMINI.md), [Claude Code](../CLAUDE.md), and [GitHub Copilot](../.github/copilot-instructions.md).

## License

Rocky Blog is distributed under [AGPL-3.0](../LICENSE). Review the license and applicable upstream notices before redistributing modified versions.
