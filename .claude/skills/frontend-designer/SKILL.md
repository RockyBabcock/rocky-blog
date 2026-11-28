---
name: frontend-designer
description: Audit, redesign, refine, and implement Rocky Blog frontend UI, homepage composition, visual hierarchy, editorial details, responsive layouts, interaction states, themes, and motion. Trigger for requests to improve the frontend, make pages more attractive or expressive, enrich visual details, redesign homepage sections, fix spacing / density, or polish components.
---

# Rocky Blog — Frontend Designer Skill

Use this skill for any frontend visual-design or UI implementation task in Rocky Blog.

## Mandatory reading

Read these files before editing:

1. `AGENTS.md` — repository-wide rules and preservation constraints.
2. `docs/PRODUCT-SCOPE.md` — approved product scope, confirmed removals, pending decisions.
3. `docs/PROJECT-STATUS.md` — current implementation baseline and known decisions.
4. `docs/FRONTEND-DESIGN-PROMPT.md` — required visual direction, actual homepage modules, implementation workflow, responsive / accessibility requirements, and definition of done.
5. `docs/design/EDITORIAL-REFERENCE-AND-ADAPTATION.md` — external reference study, design patterns worth borrowing, explicit exclusions, and the translation map into Rocky's design language.
5. Relevant architecture chapters:
   - `docs/overview/05-ui-components.md`
   - `docs/overview/07-theme-system.md`
   - `docs/overview/08-animation-system.md`
   - `docs/overview/09-styling.md`

Do not assume the environment has loaded these documents automatically.

## Required design direction

**Premium Editorial × Contemporary Magazine × Sakura Botanical × Celestial Details**

The maintainer explicitly wants the interface to feel less sparse, more visually expressive, and richer in purposeful detail. Improve editorial rhythm, layout composition, typography, image framing, fine rules, folio numbers, micro labels, botanical marks, constellation details, surfaces, and interaction states. Use the research guide to understand what AstroPaper, Cactus, Erudite, Fuwari, The New Yorker, The Verge, Stripe Press, A List Apart, and USWDS each contribute; adapt the principle, never clone their visual identity.

Do not turn the site into an anime / kawaii theme, generic SaaS dashboard, repeated card grid, noisy particle background, or excessive glassmorphism.

## Non-negotiable product constraints

- Preserve every existing homepage section, route, navigation entry, and reading feature.
- Never hide, delete, disable, or reduce functionality to create whitespace.
- Do not invent article content, counts, analytics, reading activity, progress, or user statistics.
- Do not reintroduce confirmed removals or implement pending product decisions without maintainer approval.
- Reuse current Astro / React architecture, design tokens, translation dictionaries, state stores, and components.
- Do not introduce a backend, CMS, analytics, new framework, heavy dependency, or unexpected network request for visual polish.

## Workflow

1. **Inspect:** read the homepage entry point `src/pages/index.astro`; inspect imported components and the shared styles before making assumptions.
2. **Map the current UI:** identify the real module order, data sources, breakpoints, interactive islands, and style entry points.
3. **Plan:** provide a short plan with target components, visual improvements, risks, and acceptance checks.
4. **Implement:** modify the actual application, not a standalone mockup. Use shared tokens and reusable patterns; avoid broad rewrites.
5. **Localize:** any new user-visible copy must be translated for zh / en / ja / fr.
6. **Verify:** run `pnpm lint`, `pnpm check`, `pnpm test`, and `pnpm build` as applicable. Inspect desktop, tablet, mobile, light / dark, keyboard focus, and reduced-motion behavior. Run relevant browser tests when interactions are affected.
7. **Report:** list changed files, preserved features, commands and outcomes, visual evidence, unverified cases, and commit status.

## Homepage modules to preserve

- Cover / hero and its existing image, copy-link, Sakura, and celestial details.
- Featured Editorial Showcase.
- Latest Writing with mixed-rhythm post rows and pagination.
- Series & Weekly Showcase and its local reading-progress interaction.
- Explore Topics, featured categories, and weighted tag cloud.
- Editorial Timeline.
- Left profile / navigation sidebar.
- Desktop right utility rail, including search, command palette, Reading Shelf, recent reading, series progress, category summary, and archive summary.
- Compact search / shelf / command utilities on narrower viewports.

The actual composition is defined in `src/pages/index.astro`; do not rebuild this list from memory.

## Primary implementation files

Inspect as relevant:

- `src/pages/index.astro`
- `src/components/home/FeaturedShowcase.astro`
- `src/components/home/CompactPostRow.astro`
- `src/components/home/SeriesShowcase.astro`
- `src/components/home/SeriesShowcaseProgress.tsx`
- `src/components/home/ExploreTopics.astro`
- `src/components/home/EditorialTimeline.astro`
- `src/components/home/HomeCompactUtility.tsx`
- `src/components/home/HomeRightRail.astro`
- `src/components/home/RightRailWidgets.tsx`
- `src/components/layout/HomeInfo.astro`
- `src/components/layout/HomeSider.astro`
- `src/components/ui/cover/Cover.astro`
- `src/components/common/BotanicalMarks.astro`
- `src/components/common/EditorialKicker.astro`
- `src/styles/components/home-editorial.css`
- `src/styles/theme/editorial-system.css`
- `src/styles/theme/index.css`
- `src/styles/index.css`

Not every task needs to modify every file. Read only the relevant modules and keep the change scoped.

## Definition of done

The real UI is more expressive and compositionally varied; existing modules and behaviors remain accessible; the current visual language is coherent; zh / en / ja / fr copy is complete; responsive layouts, both themes, accessibility, and reduced-motion are checked; relevant checks are reported accurately. A proposal or screenshot-only mockup is not implementation completion.
