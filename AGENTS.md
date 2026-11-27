# AGENTS.md — Rocky Blog Agent Instructions

Repository-level instructions for AI coding agents. Read this file and [docs/PRODUCT-SCOPE.md](./docs/PRODUCT-SCOPE.md) before changing code, content, configuration, or documentation.

## 1. Product identity and truth

This repository is **Rocky Blog**, a static personal blog built with Astro 7, React 19, TypeScript, and Tailwind CSS 4.

When facts conflict, use this order:
1. The maintainer's latest explicit decision in the active task.
2. Current source code and configuration for implementation facts.
3. `docs/PRODUCT-SCOPE.md` for product intent.
4. Other documentation and historical reports.

Do not treat an old tutorial, screenshot, changelog entry, or performance report as proof that a feature still exists.

## 2. Preserve these capabilities

- Existing homepage modules and editorial hierarchy. Improve composition without deleting or reducing established content modules.
- Articles, categories, tags, archives, pagination, weekly / series pages, About, and existing navigation.
- Pagefind static search, command palette, recent / continue reading, local reading history, local saved-article Reading Shelf, collection filters, and series reading progress.
- Light / dark themes, built-in reader font presets, typography controls, reading progress, focus mode, and table of contents.
- GFM, Shiki, KaTeX, Mermaid, Infographic, Shoka-style Markdown extensions, encrypted content, image lightbox / zoom, responsive images, and LQIP.
- Existing page transitions, scroll reveals, Sakura effects, interaction feedback, and reduced-motion support.
- Chinese, English, Japanese, and French UI / routing support.
- canonical, Open Graph, hreflang, sitemap, robots, and Pagefind.

## 3. Do not reintroduce without an explicit decision

Friends / links, Writing Room, CMS / admin dashboard, global music player or playlist, Bangumi tracker, Moments, Christmas effects, comments, Umami or other analytics, Koharu CLI, Docker deployment, announcements, Tweet / X embeds, CodePen embeds, random or semantic recommendations, local font-file picker, Colophon metadata, AI summaries, embedding-based similarity, custom article audio / video players, LRC lyrics, media playlists, quizzes, and external-link OG preview cards.

The product has no user accounts, cloud database, cloud bookshelf, or server-side reading-history sync.

RSS is a product non-goal, but legacy source and configuration references remain in the repository baseline. Do not claim RSS code has already been removed, do not add RSS UI, and do not expand RSS support. A complete cleanup must be a dedicated change and preserve canonical, Open Graph, hreflang, sitemap, robots, and Pagefind.

## 4. Visual direction

Use **Premium Editorial × Contemporary Magazine × Sakura Botanical × Celestial Details**.

- Prioritize hierarchy, legibility, whitespace, editorial typography, composition, and responsive rhythm.
- Use petals, botanical lines, stars, constellations, orbit marks, fine rules, micro-labels, and subtle texture as controlled accents.
- Keep the result mature, polished, expressive, and calm.
- Avoid anime / manga / kawaii / chibi styling, childish illustration, random neon, excessive glassmorphism, and generic dashboard cards.
- Reuse existing design tokens and theme variables; do not invent arbitrary local palettes.
- Do not solve a sparse layout by deleting modules or indiscriminately shrinking information density.

## 5. Locale contract

Supported locales are exactly:
- `zh` — Chinese, default, no URL prefix.
- `en` — English, `/en/`.
- `ja` — Japanese, `/ja/`.
- `fr` — French, `/fr/`.

Do not add Korean. UI copy changes should update all four dictionaries where applicable. Article translations are content files and may be incomplete; do not label fallback content as translated.

## 6. Architecture

- Astro owns file-based routing, static generation, layouts, and content rendering.
- React is for interactive islands. Avoid hydrating static content without a user-visible need.
- Markdown / MDX content lives in `src/content/blog/` and is validated by `src/content.config.ts`.
- Site configuration is declared in `config/site.yaml` and normalized through `src/lib/config/`.
- UI locale dictionaries and helpers live in `src/i18n/`.
- Shared state and browser persistence live in `src/store/` and supporting libraries.
- Styles and tokens live under `src/styles/` and component styles.
- Keep dependency flow acyclic and data transformations testable.

Before creating an abstraction, search for an existing equivalent. Search all import sites before renaming or deleting exports. Do not casually change public article slugs.

### Client navigation lifecycle

The site uses Astro client-side navigation. Event listeners, observers, and subscriptions must support route swaps and cleanup. Do not assume a full document reload or register duplicate global listeners after each navigation.

### State and encryption

Reading history, reader preferences, series progress, and saved articles in the Reading Shelf are local browser features, not cloud-synced data. Saved-article state uses the versioned localStorage key `rocky-blog:saved-articles:v1`; reading status is derived from the existing reading-history store.

AES-256-GCM is static / build-time encryption. Ciphertext and public derivation parameters are delivered with the page and can be attacked offline. Never describe it as server authentication, DRM, or private server storage.

## 7. Quality and accessibility

- Preserve semantic HTML, keyboard behavior, visible focus, accessible names, and appropriate ARIA.
- Test responsive behavior and touch interaction, not desktop alone.
- Respect `prefers-reduced-motion` and configured motion levels.
- Avoid layout shift; preserve image aspect ratios and loading behavior.
- Treat Markdown and external content as untrusted; maintain safe rendering boundaries.
- Do not add analytics, tracking, or unexpected network requests.

## 8. Commands

Node.js must be `>=22.20.0` and pnpm is `10.28.2`.

```bash
pnpm dev
pnpm check
pnpm lint
pnpm test
pnpm knip
pnpm build
pnpm preview
```

Use `pnpm lint` for a non-mutating check. `pnpm lint:fix` modifies files and should not be run casually across unrelated files. Browser scripts such as `pnpm test:motion:browser`, `pnpm test:diagram:browser`, and `pnpm test:search:browser` may require Playwright browsers.

Do not delete a file based on a single Knip warning without checking Astro imports, dynamic imports, content discovery, route generation, and runtime registration. In particular, `src/components/home/SeriesShowcaseProgress.tsx` is used by the Astro `SeriesShowcase` island and must not be removed solely because a static entry-point scan reports it.

## 9. Git discipline

The default branch is `main`. Use a focused branch and PR for routine contributions unless the maintainer explicitly authorizes a direct commit to `main`. Before a direct update, inspect the latest branch head and use an expected-head guard. Never overwrite concurrent commits.
