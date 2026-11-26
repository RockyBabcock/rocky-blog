# astro-koharu

**Language:** [中文](../README.md) | **English** | [日本語](./README.ja.md)

![astro-koharu blog with a pink-and-blue palette](https://r2.cosine.ren/i/2026/01/94383107ba4586f773938ed4dae34ff1.webp)

A cute / anime-style / pink-blue themed blog, perfect for ACG, frontend dev, and journaling personal sites with excellent performance.

> The name is inspired by "Koharu-biyori" (こはるびより), which refers to the period from late autumn to early winter when there's a stretch of warm, spring-like sunny days — known as "Indian summer" in English.

The overall design is inspired by the Hexo [Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/) theme, rebuilt with a modern tech stack for your personal blog.

This repository has been cleaned up as a demo repository. Visit the theme developer's blog at https://blog.cosine.ren/ — give it a star if you like it!

[Getting started](../GETTING-STARTED.md) · [Full guide](../src/content/blog/tools/astro-koharu-guide.md) · [Feedback](https://github.com/cosZone/astro-koharu/issues)

> **License: AGPL-3.0.** Read [LICENSE](../LICENSE) before using, modifying, or deploying the theme.

Under active development

- Built on **Astro**, static output, fast loading
- Cute / anime-style / pink-blue color scheme, ideal for ACG, frontend, and journaling sites
- Multi-category and multi-tag support without forcing complex information architecture
- Minimal performance overhead
- Serverless full-site search powered by Pagefind
- LQIP (Low Quality Image Placeholders) — gradient placeholders shown before images load

## A look around

Recorded on this repository’s demo site (Chinese UI).

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
| Write rich Markdown | GFM, syntax highlighting, math, Mermaid, Infographic, link cards; toggleable Shoka admonitions, collapsible blocks, tabs, text effects, spoilers, ruby, quizzes, and in-article media; see the [syntax guide](../src/content/blog/tools/astro-koharu-guide.md#markdown-增强) |
| Mark and share posts | [Colophon marks](../src/content/blog/tools/astro-koharu-guide.md#文章落款) for authorship, spoilers, and outdated content, with archive filtering; post actions to copy or download full Markdown source |
| Organize content | Nested categories, tags, archives, drafts, pinned posts; [featured series](../src/content/blog/tools/astro-koharu-guide.md#系列文章系统) with dedicated pages and homepage highlights; custom pages under `src/pages/` |
| Read comfortably | Light/dark themes, mobile section header and TOC, reading progress and time; Pagefind search, LQIP image placeholders; three `motion` levels and sakura effects that respect reduced-motion preferences |
| Publish in multiple languages | Chinese, English, Japanese, and Korean UI dictionaries; content translations, language switcher, hreflang, and locale-specific RSS; see [i18n setup](../src/content/blog/tools/astro-koharu-guide.md#多语言支持i18n) |
| Announcements & assets | Site announcement system plus optional asset generation scripts for LQIP, semantic recommendations, and AI summaries |
| Content encryption | AES-256-GCM encryption for full posts or inline blocks |

## Writing and managing posts

Create a Markdown file directly under `src/content/blog/`:

```markdown
---
title: My first post
date: 2026-10-09
link: hello-koharu
tags: [Life]
---

A place to keep the things I want to remember.
```

With `pnpm dev` running, open `/post/hello-koharu`.

## Local setup

Requires **Node.js ≥ 22.20.0** and **pnpm 10.28.2**; [package.json](../package.json) is the source of truth.

```bash
pnpm install
pnpm dev
```

Edit [config/site.yaml](../config/site.yaml) to set your site name, author, domain, avatar, and navigation, then replace the example posts. Restart the dev server or rebuild after configuration changes. Follow [getting started](../GETTING-STARTED.md) for the steps.

## Deployment

```bash
pnpm build
pnpm preview
```

This site outputs pure static HTML/CSS/JS into `dist/` and can be hosted on Vercel, Netlify, Cloudflare Pages, or any static file server without a backend.

## Configuration and documentation

| What to configure | Reference |
| --- | --- |
| Site details, navigation, motion, and optional features | [Site configuration](../config/site.yaml) and [full guide](../src/content/blog/tools/astro-koharu-guide.md) |
| Translated category, series, and colophon labels | [Content translations](../config/i18n-content.yaml); translated posts go in `src/content/blog/<locale>/` |
| Link embeds and OG metadata cache | [Link embedding guide](./features/link-embedding.md) |
| Contributing to the theme | [Contributing guide](../CONTRIBUTING.md) |

## Before you start

- **Source and encryption:** When post actions are enabled, public Markdown includes frontmatter. Encrypted posts and posts with encrypted blocks do not expose source files. AES-256-GCM uses passwords at build time for encryption without shipping them to the client; readers enter passwords themselves.
- **Asset generation scripts:** LQIP (`pnpm generate:lqips`), semantic similarity (`pnpm generate:similarities`), and AI summaries (`pnpm generate:summaries`) are optional generation steps.
- **Performance:** The screenshots below are historical examples. Results depend on content, configuration, and hosting; measure your own site.

## Interface preview

The original demo images are preserved below; some predate the current release.

![Blog interaction demo](https://r2.cosine.ren/i/2025/12/417b098dffce2ced9c0ff6009e5213df.gif)

[Excellent Performance](https://pagespeed.web.dev/analysis/https-blog-cosine-ren/w6qzrwbp9b?hl=en&form_factor=desktop): Aiming for all-green on desktop, though continuous checking is needed as features evolve!

![Historical performance report (December 2025)](https://r2.cosine.ren/i/2025/12/e93f40c340a626c4ab72212a84cf6d5d.webp)

[Issues](https://github.com/cosZone/astro-koharu/issues) are welcome — but since this is a personal project, feel free to fork and customize!

![Blog page preview one](https://r2.cosine.ren/i/2026/01/f1c239b4adf7771f10b954c389d87a74.webp)
![Blog page preview two](https://r2.cosine.ren/i/2026/01/c962f82503abf68eb1f21b835873f241.webp)

## Feature Showcase

- Gradient placeholders before images load for better visual experience - [Blog Post](https://blog.cosine.ren/post/astro-lqip-implementation)
  ![LQIP](https://r2.cosine.ren/i/2025/12/40e44c8ac166183d5f823d7aa81fa792.webp)
- Smooth dark mode transition animation powered by View Transitions API
  ![Theme Transition](https://r2.cosine.ren/i/2025/12/418c7602ce115660bed9db66739370d5.gif)
- Markdown enhancement - Link embed feature - [Example](https://blog.cosine.ren/post/my-claude-code-record-2)
  ![Link Embed](https://r2.cosine.ren/i/2026/01/6804aa167fd4cf7022a9b511d52017ce.webp)
- Markdown enhancement - Create beautiful infographics with [@antv/infographic](https://github.com/antvis/Infographic)
  [Infographic Guide](https://koharu.cosine.ren/post/infographic-guide)
  ![Infographic Syntax](https://r2.cosine.ren/i/2026/01/581893e18557bcb837177cb2d6fb7af7.webp)
- Styled RSS feed page - [Example](https://blog.cosine.ren/rss.xml)
  ![RSS Feed](https://r2.cosine.ren/i/2026/01/4476f67d1acea2e0991cc70d1d3cf6a1.webp)
- Announcement system
- Shoka-compatible Markdown syntax - Admonition blocks, collapsible blocks, tab cards, text effects, spoiler text, ruby annotations, quizzes, and more
- Audio/video player - Supports music playlists and video playback through [Meting](https://github.com/metowolf/meting); self-hosting the API is recommended

## Blogs Using This Theme

> Inspired by [Zhilu's Blog](https://github.com/L33Z22L11/blog-v3), here's a showcase of blogs using this theme.\
> Join QQ group 598022684 for discussion, or chat in the comments of my [frontend channel](https://t.me/cosine_front_end).

| Blog                                         | Author     | Repository                                                      | Notes                                   |
| -------------------------------------------- | ---------- | --------------------------------------------------------------- | --------------------------------------- |
| **[Cosine's Blog](http://blog.cosine.ren/)** | **cosine** | [cosZone/astro-koharu](https://github.com/cosZone/astro-koharu) | This theme                              |
| [XueHua's Blog](https://xhblog.top/)         | XueHua-s   | [XueHua-s/astro-snow](https://github.com/XueHua-s/astro-snow)   | Simplified features, added a start page |
| [Ksable's Blog](https://blog.ksable.top/)    | Ksable     | [God-2077/astro-blog](https://github.com/God-2077/astro-blog) | Modified / added some features          |

## Acknowledgements

Font used: [Chill Round](https://chinese-font.netlify.app/zh-cn/fonts/hcqyt/ChillRoundFRegular)

Thanks to the following projects for providing inspiration and reference for astro-koharu:

- [mx-space](https://github.com/mx-space)
- [Hexo Theme Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)
- [waterwater.moe](https://github.com/lawvs/lawvs.github.io)
- [yfi.moe](https://github.com/yy4382/yfi.moe)
- [4ark.me](https://github.com/gd4Ark/gd4Ark.github.io)
- [Zhilu's Blog](https://blog.zhilu.site/)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=cosZone/astro-koharu&type=date&legend=top-left)](https://www.star-history.com/#cosZone/astro-koharu&type=date&legend=top-left)

## License

[GNU Affero General Public License version 3 (AGPL-3.0)](../LICENSE)
