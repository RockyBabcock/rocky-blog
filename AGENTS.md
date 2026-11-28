# AGENTS.md — Rocky Blog Agent Instructions

Repository-level instructions for AI coding agents. Read this file, [docs/PRODUCT-SCOPE.md](./docs/PRODUCT-SCOPE.md), and [docs/PROJECT-STATUS.md](./docs/PROJECT-STATUS.md) before changing code, content, configuration, or documentation.

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

## 3. Confirmed removals and pending decisions

### Confirmed removals — do not reintroduce

- Friends / friend links.
- Writing Room, browser-based editor, CMS / admin dashboard, article-management console, and Blog Writer coding-agent Skill (MuseAI is the sole authoring agent).
- Site-wide music player and playlists.
- Bangumi tracker.
- Moments.
- Comments.
- Umami or other analytics / visitor-behavior tracking.
- AI article summaries.
- Embedding / vector-index semantic-similarity recommendations.
- Raw Markdown source copy / download actions, public `.md` source routes, and local editor deep links (VS Code / Cursor / Zed). These are authoring conveniences, not reader features.

RSS is also fully removed from the product and current codebase, including feed routes, locale mirrors, XSL/helper files, styles, package dependency, configuration hooks, and autodiscovery metadata. Do not reintroduce RSS UI, routes, dependencies, or subscription configuration. Preserve canonical, Open Graph, hreflang, sitemap, robots, and Pagefind.

### Pending decisions — do not implement or delete on your own

See [docs/PROJECT-STATUS.md](./docs/PROJECT-STATUS.md) and [docs/PRODUCT-SCOPE.md](./docs/PRODUCT-SCOPE.md) for the decision matrix. In particular:

- Weekly / series pages exist today. Keep current routes, homepage modules, and progress behavior; future direction is pending. Do not remove them.
- KaTeX, Mermaid, Infographic, and full / partial AES-256-GCM static encryption exist today. Preserve current behavior; removal, replacement, or major expansion requires a maintainer decision.
- Announcements, Quiz / interactive exercises, native media embeds, custom audio / video players, LRC, Koharu CLI, Docker, seasonal / Christmas effects, random recommendations, Tweet / X, CodePen, external OG preview cards, Colophon, and local font-file picker are not approved as new work. Do not implement these unless the maintainer explicitly approves a defined scope.
- The project has no user accounts, cloud database, cloud bookshelf, or server-side reading-history sync.

**Important:** “not currently implemented”, “pending decision”, and “confirmed removed” are different states. Never describe a pending item as a maintainer-confirmed deletion. Never remove an existing capability just because its future priority is pending.

## 4. Visual direction

Use **Premium Editorial × Contemporary Magazine × Sakura Botanical × Celestial Details**.

- Prioritize hierarchy, legibility, whitespace, editorial typography, composition, and responsive rhythm.
- Use petals, botanical lines, stars, constellations, orbit marks, fine rules, micro-labels, and subtle texture as controlled accents.
- Keep the result mature, polished, expressive, and calm.
- Avoid anime / manga / kawaii / chibi styling, childish illustration, random neon, excessive glassmorphism, and generic dashboard cards.
- Reuse existing design tokens and theme variables; do not invent arbitrary local palettes.
- Do not solve a sparse layout by deleting modules or indiscriminately shrinking information density.
- The maintainer has explicitly identified sparse, visually under-expressive pages as an ongoing improvement target. Improve section-specific composition and intentional detail (eyebrows, numbering, fine rules, borders, editorial grids, timelines, botanical / celestial motifs, controlled texture and interaction feedback) while preserving legibility.
- Never create whitespace by hiding sections, removing entries, reducing copy, or weakening existing modules. Do not fill space with arbitrary cards, shadows, gradients, particles, or decorative noise.
- Check desktop / mobile, light / dark, keyboard focus, and reduced-motion before calling a visual task complete.
- For every frontend / UI / visual-design task, read `docs/FRONTEND-DESIGN-PROMPT.md` before implementation and follow its audit → plan → implement → verify → report workflow and definition of done. Also read `docs/design/EDITORIAL-REFERENCE-AND-ADAPTATION.md` for the documented open-source / editorial benchmarks and the explicit translation into Rocky's own visual language; do not clone the reference brands.

## 5. Locale contract

Supported locales are exactly:
- `zh` — Chinese, default, no URL prefix.
- `en` — English, `/en/`.
- `ja` — Japanese, `/ja/`.
- `fr` — French, `/fr/`.

Do not add Korean. UI copy changes should update all four dictionaries where applicable. Article translations are content files and may be incomplete; do not label fallback content as translated.

## MuseAI content workflow

MuseAI is the maintainer-designated and sole article authoring / translation agent. It operates outside this website repository; it is not a site runtime dependency or a CMS.

- For content schema, article paths, locale mirrors, supported Markdown syntax, editorial rules, upload checks, and prompts, read [`docs/muse/README.md`](./docs/muse/README.md) and its linked specifications.
- The canonical authoring output is complete Markdown / MDX files plus any real media assets. The site validates and renders those files; it does not author, edit, or manage them through a browser UI.
- Do not reintroduce the deleted Blog Writer Skill, local editor launch links, raw Markdown copy / download UI, `.md` source routes, or CMS-like authoring utilities.
- Coding agents may validate or repair content only when the maintainer explicitly asks. Keep code changes to the content schema / renderer separate from content authoring; never invent frontmatter fields or categories to accommodate a generated article.
- If content conventions change, update `docs/muse/`, `src/content.config.ts` / configuration as necessary, and the related architecture documentation together.

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

## 9. Task execution and documentation protocol

1. For substantial work, state a short plan and acceptance criteria before editing. Inspect the current branch head and relevant source; do not treat remembered context or historical documentation as current implementation evidence.
2. Read the relevant architecture chapter before changing routing, content, state, themes, motion, Markdown, or SEO.
3. For frontend, homepage, layout, styling, or visual-design work, also read `docs/FRONTEND-DESIGN-PROMPT.md`; treat it as the required implementation and acceptance checklist.
4. Search for existing implementations and all import / registration / route entry points before adding, renaming, or deleting code.
5. Keep changes scoped. Do not perform broad formatting, dependency replacement, module removal, or unrelated refactors as a side effect of a focused task.
6. After a product decision changes, update `docs/PRODUCT-SCOPE.md` first and synchronize the relevant READMEs, user instructions, architecture docs, and Skills.
7. Update `docs/PROJECT-STATUS.md` only when a verified implementation, decision, blocker, or milestone changes. Record evidence; do not invent percentages, owners, ETAs, or a roadmap.
8. Before reporting completion, state modified files, commands actually run, results, unverified areas, deployment evidence when applicable, and the resulting commit.
9. `CHANGELOG.md` currently contains inherited upstream `astro-koharu` history. It is not a current Rocky Blog feature list or project status source. Do not infer enabled features from its historical entries.

## 10. Git discipline

The default branch is `main`. Use a focused branch and PR for routine contributions unless the maintainer explicitly authorizes a direct commit to `main`. Before a direct update, inspect the latest branch head and use an expected-head guard. Never overwrite concurrent commits.
