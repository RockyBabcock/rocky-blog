# Rocky Blog

**Language:** [中文](../README.md) | **English** | [日本語](./README.ja.md)

A fast, static personal blog built with **Astro 7, React 19, TypeScript, and Tailwind CSS 4**, derived from the open-source theme [astro-koharu](https://github.com/cosZone/astro-koharu) (originally inspired by Hexo's [Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)). It preserves the warm pink-and-blue aesthetic, sakura motion effects, and reading experience in a streamlined static-first architecture.

[Getting started](../GETTING-STARTED.md) · [Full guide](../src/content/blog/tools/astro-koharu-guide.md) · [GitHub Repository](https://github.com/RockyBabcock/rocky-blog)

> **License: AGPL-3.0.** Read [LICENSE](../LICENSE) before using, modifying, or deploying.

- Built on **Astro 7** with pure static output and fast page loads
- Warm light theme and night-sakura dark theme with sakura petals, petal bursts, silk-thread TOC, and View Transitions
- Hierarchical categories, tags, archives, and featured series
- Serverless full-site static search powered by Pagefind
- LQIP (Low Quality Image Placeholders) gradient placeholders before images load
- Built-in Chinese, English, Japanese, and Korean UI dictionaries and localized routes

## A look around

<table>
  <tr>
    <td width="50%"><img src="../docs/assets/showcase/home.webp" alt="Sakura petals drift over the cover; the header floats as a capsule once you scroll" /><br /><sub>Sakura petals drift over the cover; the header floats as a capsule once you scroll</sub></td>
    <td width="50%"><img src="../docs/assets/showcase/theme.webp" alt="A circular reveal into the night-sakura dark theme" /><br /><sub>A circular reveal into the night-sakura dark theme</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="../docs/assets/showcase/pages.webp" alt="Petal bursts, a gliding nav pill and smooth transitions across archives, categories and series" /><br /><sub>Petal bursts, a gliding nav pill and smooth transitions across archives, categories and series</sub></td>
    <td width="50%"><img src="../docs/assets/showcase/toc.webp" alt="A silk-thread table of contents follows your reading" /><br /><sub>A silk-thread table of contents follows your reading</sub></td>
  </tr>
</table>

## What you can do

| Use case | Features and guides |
| --- | --- |
| Write rich Markdown | GFM, Shiki syntax highlighting, KaTeX math, Mermaid, Infographic; toggleable Shoka admonitions, collapsible blocks, tabs, text effects, spoilers, and ruby; see the [syntax guide](../src/content/blog/tools/astro-koharu-guide.md#markdown-增强) |
| Share post source | Post actions to copy or download full Markdown source for public posts (automatically disabled for encrypted posts) |
| Organize content | Nested categories, tags, archives, drafts, pinned posts; [featured series](../src/content/blog/tools/astro-koharu-guide.md#系列文章系统) with dedicated pages and homepage highlights; custom pages under `src/pages/` |
| Read comfortably | Light/dark themes, reader typography settings (4 bundled font presets, font size, line height, measure, justify), mobile section header and TOC, reading progress, lightbox; Pagefind static search, LQIP image placeholders; three `motion` levels respecting reduced-motion preferences |
| Publish in multiple languages | Chinese, English, Japanese, and Korean UI dictionaries; content translations, language switcher, hreflang, and locale-specific RSS; see [i18n setup](../src/content/blog/tools/astro-koharu-guide.md#多语言支持i18n) |
| Optional asset scripts | On-demand script to generate LQIP image placeholders |
| Content encryption | AES-256-GCM build-time encryption for full posts or inline blocks |

## Writing and managing posts

Create a Markdown file directly under `src/content/blog/`:

```markdown
---
title: My first post
date: 2026-10-09
link: hello-rocky-blog
tags: [Life]
---

A place to keep the things I want to remember.
```

With `pnpm dev` running, open `/post/hello-rocky-blog`.

## Local setup

Requires **Node.js ≥ 22.20.0** and **pnpm 10.28.2**; [package.json](../package.json) is the source of truth.

```bash
pnpm install
pnpm dev
```

Edit [config/site.yaml](../config/site.yaml) to customize site metadata, author, domain, avatar, and navigation. Restart the dev server or rebuild after configuration changes. Follow [getting started](../GETTING-STARTED.md) for setup details.

## Deployment

```bash
pnpm build
pnpm preview
```

This site outputs pure static HTML/CSS/JS into `dist/` and can be hosted on GitHub Pages, Vercel, Netlify, Cloudflare Pages, or any static file server without a backend.

## Configuration and documentation

| What to configure | Reference |
| --- | --- |
| Site details, navigation, motion, and optional features | [Site configuration](../config/site.yaml) and [full guide](../src/content/blog/tools/astro-koharu-guide.md) |
| Translated category and series labels | [Content translations](../config/i18n-content.yaml); translated posts go in `src/content/blog/<locale>/` |
| Development guidelines | [AGENTS.md](../AGENTS.md) · [CONTRIBUTING.md](../CONTRIBUTING.md) |

## Before you start

- **Source and encryption:** When post actions are enabled, public Markdown includes frontmatter. Encrypted posts and posts with encrypted blocks do not expose source files. AES-256-GCM uses passwords at build time for encryption without shipping them to the client; readers enter passwords themselves.
- **Asset generation scripts:** LQIP image placeholder generation (`pnpm generate:lqips`) is an optional pre-build script.

## Acknowledgements

Derived from [cosZone/astro-koharu](https://github.com/cosZone/astro-koharu) (AGPL-3.0), with design inspiration from:

- [astro-koharu](https://github.com/cosZone/astro-koharu)
- [Hexo Theme Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)
- Fonts: [Chill Round](https://chinese-font.netlify.app/zh-cn/fonts/hcqyt/ChillRoundFRegular) and LXGW WenKai

## License

[GNU Affero General Public License version 3 (AGPL-3.0)](../LICENSE)
