# Rocky Blog — Frontend Design & Implementation Prompt

> **Use this prompt for:** Google AI Studio / Gemini, Claude Code, GitHub Copilot, Cursor, or any coding agent asked to improve Rocky Blog's frontend UI, visual design, responsive composition, or interaction details.
>
> **Before editing:** read `AGENTS.md`, `docs/PRODUCT-SCOPE.md`, and `docs/PROJECT-STATUS.md`. This prompt is a frontend task specification, not permission to change the approved product scope.

---

## Your role

Act as a senior product designer, editorial art director, and frontend engineer working directly inside the existing **Rocky Blog** repository.

Your task is to make the current website feel significantly more expressive, visually rich, intentional, and publication-quality while preserving its existing functionality and architecture.

This is an implementation task, not a request for a moodboard, generic design critique, static mockup, isolated demo, or new starter project. Inspect the actual repository, modify the real application, and verify the result.

## 1. Understand the actual product before designing

Rocky Blog is a static personal blog built with:

- Astro 7
- React 19 and TypeScript
- Tailwind CSS 4
- Pagefind static search
- Nanostores for browser-local state
- Motion for existing client-side animation
- Markdown / MDX content collections

The site is static-first. Astro owns file-based routing, content rendering, and static generation. React is used only where client-side interaction is needed. The site does not depend on a CMS, user accounts, an application database, or a permanently running application server.

**Do not replace this architecture.** Do not scaffold a new app, migrate frameworks, rebuild the site as a React SPA, or introduce a backend merely to improve the visual layer.

Before changing a page, inspect its current Astro / React components, imported styles, data dependencies, route generation, and responsive behavior.

## 2. The maintainer's design brief

The visual direction is:

# Premium Editorial × Contemporary Magazine × Sakura Botanical × Celestial Details

The result should feel like a carefully art-directed independent publication: confident typography, sophisticated layout, tactile editorial surfaces, deliberate negative space, meaningful visual rhythm, and a recognizable botanical / celestial identity.

The current design must not feel empty, sparse, generic, unfinished, or functionally thin. The explicit goal is to **increase visual richness, detail, and visual expression without deleting content or reducing the information already present**.

### Visual qualities to achieve

- Strong editorial hierarchy: distinctive display headings, readable body typography, restrained mono labels, issue numbers, publication metadata, and clear secondary information.
- Rich but controlled compositions: asymmetrical grids, varied card proportions, image-led features, staggered content groups, timeline structures, layered editorial surfaces, and section-specific layout personalities.
- Fine-grained visual accents: hairline rules, folio numbers, corner labels, micro badges, small geometric marks, subtle dot grids, delicate borders, inset rules, paper-like texture, crop marks, botanical line art, petal motifs, star points, constellation links, orbital arcs, and small typographic annotations.
- More deliberate image treatment: art-directed crops, consistent aspect ratios, clear focal points, image overlays with readable text, elegant image framing, and subtle hover states.
- Intentional depth: use tonal surfaces, restrained shadows, fine strokes, and subtle background variation. Avoid turning every section into an identical rounded card.
- Consistent interaction language: polished hover, focus, pressed, selected, loading, and disabled states.
- A coherent visual identity across the homepage, article pages, collection pages, navigation, sidebars, dialogs, and reader controls.

### What the design must not become

- Anime, manga, kawaii, chibi, childish, or cartoon-like.
- A generic SaaS dashboard, admin template, or component-library showcase.
- A page made entirely of identical cards or pills.
- Excessively glassy, neon, glossy, or gradient-heavy.
- A busy particle field or decoration layered over every surface.
- An ultra-minimal page that removes information or creates large empty areas to look fashionable.
- A purely decorative design where controls no longer communicate their actions.

Whitespace is a design tool, not a substitute for content. Keep the page breathable, but do not solve sparse areas by simply increasing gaps, shrinking content, or hiding modules.

## 3. Non-negotiable preservation rules

**Do not delete, hide, remove, disable, or reduce any existing homepage module, page, navigation entry, reading capability, or useful interaction to make the design simpler.**

You may reorganize layout, improve grouping, change visual hierarchy, refine card composition, introduce new decorative details, and improve interaction feedback, but preserve each module's content and function.

The current homepage data and section structure in `src/pages/index.astro` includes:

1. Compact Search / Shelf / Command utility for viewports below the desktop right-rail breakpoint.
2. Featured Editorial Showcase, when real featured / pinned content exists.
3. Latest Writing, using the existing paginated and mixed-rhythm post list.
4. Series & Weekly Showcase, when enabled series have content.
5. Explore Topics, including featured categories and weighted popular tags.
6. Editorial Timeline, grouped from actual archive data.

The surrounding shell also includes:

- The cover / hero banner, title treatment, image, Sakura petals and celestial decoration.
- The left profile / navigation sidebar, with avatar, biography, real article / category / tag counts, social links, navigation and search / command actions.
- The desktop right utility rail at the existing desktop breakpoint, with quick search, command launcher, Reading Shelf summary, continue-reading history, series progress, top categories and archive-year summaries.
- A compact utility replacement at narrower widths, so essential discovery actions do not disappear when the right rail is hidden.

The article, category, tag, archive, series / weekly, shelf, About, search, settings, navigation, language-switching, and reader experiences must remain accessible.

**Important data rule:** Render from existing content and stores. Do not invent article cards, post counts, reader statistics, page views, popularity metrics, series progress, user activity, testimonials, or publication metadata. This site does not have analytics; never introduce fake analytics UI.

## 4. Existing visual system and implementation entry points

Inspect and reuse the existing implementation before creating new primitives.

### Homepage and layout

- `src/pages/index.astro` — homepage composition and actual section order.
- `src/components/home/FeaturedShowcase.astro` — featured editorial bento layout.
- `src/components/home/CompactPostRow.astro` and the existing post-list components — latest-writing rhythm.
- `src/components/home/SeriesShowcase.astro` and `SeriesShowcaseProgress.tsx` — series cards and local reading progress.
- `src/components/home/ExploreTopics.astro` — category discovery and weighted tag cloud.
- `src/components/home/EditorialTimeline.astro` — archive timeline preview.
- `src/components/home/HomeCompactUtility.tsx`, `HomeRightRail.astro`, and `RightRailWidgets.tsx` — search, shelf, recent reading, and utility rail.
- `src/components/layout/HomeInfo.astro` and `HomeSider.astro` — profile, statistics, navigation, and sidebar behavior.
- `src/layouts/TwoColumnLayout.astro` and `src/layouts/Layout.astro` — page composition and shared shell.
- `src/components/layout/Header.astro` and `Navigator.astro` — global header and navigation.
- `src/components/ui/cover/Cover.astro`, `HeroImage.astro`, and `SakuraPetals.astro` — hero / cover system.

### Styles and tokens

- `src/styles/index.css` — CSS import entry and style-layer order.
- `src/styles/components/home-editorial.css` — homepage editorial composition, featured bento, compact rows, and right rail.
- `src/styles/theme/editorial-system.css` — editorial surfaces, kicker styles, fine rules, watermark details, and celestial / botanical primitives.
- `src/styles/theme/index.css` and `src/styles/theme/shadcn.css` — existing theme variables and semantic color tokens.
- `src/styles/global/motion.css`, `src/styles/global/animate.css`, and motion-related component styles — existing animation and reduced-motion behavior.

The current design system already contains warm archival-paper / nocturnal-charcoal surfaces, muted botanical-rose accents, dusty celestial-slate accents, fine rules, editorial section indexing, subtle ambient light, paper-like details, and Sakura / constellation artwork.

**Extend and refine this system instead of creating a competing one.** Prefer existing CSS custom properties, semantic tokens, spacing conventions, typography, `BotanicalMarks`, `EditorialKicker`, `ResponsiveImage`, and current interaction primitives.

If a reusable design primitive is genuinely missing, add it once in the appropriate shared component or stylesheet layer and document its purpose.

## 5. Concrete design direction by homepage section

Do not apply one visual treatment to every section. Give each section its own editorial role while maintaining a coherent shared system.

### A. Cover / hero

Create a stronger first impression using the existing cover image and hero composition.

- Improve the relationship between the cover image, crop, scrim, title, and decorative marks.
- Make the site identity and title legible and memorable.
- Treat celestial arcs, botanical line art, and petals as deliberate margin details, not a full-screen visual obstruction.
- Improve the hero's visual transition into the page body with a purposeful edge, layered surface, fine line, or small editorial marker.
- Preserve the existing hero image pipeline, responsive picture sources, LQIP, copy-link action, locale-aware metadata, and reduced-motion behavior.
- Do not add a second competing hero system or duplicate existing petal effects.

### B. Featured Editorial Showcase

Make the featured area feel like a magazine cover story rather than a generic content grid.

- Strengthen the visual hierarchy between the lead story and secondary stories.
- Improve cover crops, text overlay contrast, metadata placement, category labels, date / reading time, and bookmark affordance.
- Use proportion, framing, image masks, small editorial annotations, and carefully controlled accents.
- Keep the lead / secondary relationship responsive and ensure one-, two-, and many-item states still work.
- Do not fabricate featured content; preserve the existing real-data selection logic.

### C. Latest Writing

Make the latest-post stream feel curated, varied, and easy to scan.

- Preserve the mixed-rhythm list and pagination.
- Establish a clear contrast between image-led rows, compact editorial rows, and any existing feature cards.
- Improve title hierarchy, date / category metadata, reading time, cover framing, separators, list numbering where appropriate, and hover feedback.
- Avoid repeating the same large rounded card for every post.
- Make long titles, missing covers, fallback translations, and empty metadata degrade gracefully.

### D. Series & Weekly Showcase

Give series cards a distinct, collectible editorial identity.

- Emphasize the series name, description, latest issue, issue count, cover image, and existing local progress affordance.
- Consider issue-number motifs, editorial folio labels, a subtle series index, or a visual reading-path cue where it fits the existing data.
- Retain every enabled series and its current route.
- Do not create fictional series, milestones, progress, or issue metadata.
- Preserve local reading-progress behavior and the `SeriesShowcaseProgress` island.

### E. Explore Topics

Make topic discovery feel intentional and visually interesting.

- Give featured category cards a clearer visual system, meaningful variation, and stronger typography.
- Improve the weighted tag cloud's composition and hierarchy without returning to a wall of identical pills.
- Preserve real category and tag counts, their routes, and existing localized labels.
- Use restrained visual cues such as category indexing, small geometric markers, typographic scale, or a fine grid surface.

### F. Editorial Timeline

Turn the timeline into a strong chronological editorial index.

- Make year markers, date labels, category details, entry titles, and the connecting line / nodes feel deliberate.
- Add a visual rhythm that distinguishes years without adding fake milestones.
- Keep the data derived from the existing archive grouping and preserve all links.
- Ensure mobile layout remains easy to scan and does not become a cramped horizontal timeline.

### G. Sidebars and utility rails

Improve both desktop and compact utility experiences.

- Make profile, avatar, author name, description, social links, statistics, and navigation feel like one cohesive identity panel.
- Improve active navigation state, nested navigation, section separators, icon alignment, and micro labels.
- Present search, command palette, Reading Shelf, recent history, series progress, category summary, and archive summary in a clear, compact information hierarchy.
- Preserve the desktop rail behavior at its current breakpoint and the compact search / shelf / command utility below it.
- Do not make important functionality available only on hover.
- Do not remove utilities to create visual calm; refine their density and grouping.

## 6. Site-wide consistency beyond the homepage

The homepage is the primary visual priority, but improvements must establish reusable rules that also work on:

- Article header, metadata, body, TOC, code blocks, Mermaid / Infographic viewers, encrypted blocks, article actions, and series context.
- Category and tag index pages and their post lists.
- Archive pages and timeline / year groups.
- Weekly / series index and issue pages.
- Reading Shelf and its filters, controls, empty states, and list / grid modes.
- Search dialog, command palette, settings panel, language selector, mobile drawer, modals, tooltips, toasts, and footer.

Do not redesign every page independently. Establish shared patterns for page intros, section headings, editorial metadata, dividers, list rhythm, surface hierarchy, buttons, inputs, dialogs, and responsive content widths.

## 7. Internationalization

Exactly four UI locales are supported:

- `zh` — Chinese, default, no URL prefix.
- `en` — English, `/en/`.
- `ja` — Japanese, `/ja/`.
- `fr` — French, `/fr/`.

Rules:

- Never add Korean.
- Any new visible UI copy must use the existing `src/i18n/` translation system and be supplied for all four locales.
- Do not hardcode user-facing labels in a component when they should be localized.
- Preserve the existing locale-aware routes, content fallback, canonical URLs, and hreflang behavior.
- If a new visual label is decorative and intentionally language-neutral (for example, an editorial number or short section code), keep it genuinely neutral rather than embedding English prose.

## 8. Responsive design and behavior

Design and inspect at representative widths, including:

- Wide desktop: 1600–1920px.
- Standard desktop / laptop: 1280–1440px.
- Tablet and small laptop: around 768–1024px.
- Mobile: 390px and 320px.

Use existing breakpoints and layout rules where possible. The homepage's right utility rail appears only at its existing wide-screen breakpoint; below it, compact search / shelf / command controls provide access to those actions.

Requirements:

- No horizontal overflow or clipped essential content.
- Preserve readable type sizes and line lengths.
- Do not rely on hover-only interaction.
- Ensure touch targets are comfortably usable.
- Long headings, translated text, empty covers, one-item lists, and unusually long tags must remain stable.
- Avoid CLS by preserving image dimensions / aspect ratios.
- Test drawers, dialogs, sticky areas, and scroll containers on narrow viewports.

## 9. Accessibility, motion, and performance

### Accessibility

- Preserve semantic HTML and heading order.
- Provide accessible names for icon-only controls.
- Keep keyboard navigation and visible focus states.
- Maintain adequate contrast in both themes and over imagery.
- Do not use color or animation alone to communicate essential status.
- Ensure dialogs, drawers, dropdowns, and controls remain keyboard operable.

### Motion

- Reuse the existing Motion / CSS animation architecture.
- Keep motion purposeful: reveal hierarchy, express transitions, and provide feedback.
- Avoid continuous decorative motion and particle overload.
- Respect the site's `lively`, `subtle`, and `reduced` settings.
- Always respect `prefers-reduced-motion`; no animation, auto-scroll, or particle loop should continue against the user's reduced-motion preference.
- Keep animation cleanup correct across Astro client-side navigation.

### Performance

- Do not add heavy client-side frameworks or unnecessary React hydration.
- Prefer Astro-rendered markup for static content.
- Use existing `ResponsiveImage`, image size conventions, lazy loading, and LQIP where appropriate.
- Animate transform / opacity where practical.
- Avoid excessive blur, large backdrop filters, oversized shadows, and expensive full-screen effects.
- Do not add new dependencies, external font services, analytics, tracking, or unexpected network requests without explicit approval.

## 10. Implementation workflow — follow in this order

### Step 1: Audit before editing

Read the canonical product and agent documents. Inspect the homepage and the actual shared components / styles listed above. Identify:

- Which parts already work well and should be preserved.
- Which sections feel sparse, repetitive, visually weak, or poorly balanced.
- Which existing design tokens / primitives can be reused.
- Which layout issues are caused by CSS, component composition, content density, or responsive breakpoints.
- Which changes can be limited to presentation without touching data or business logic.

Do not make assumptions from an old screenshot alone. Inspect the current implementation and, where possible, run the current site to see the real output.

### Step 2: Establish a concise design plan

Write a short implementation plan containing:

- The main visual problems found.
- The sections / components to refine.
- The shared visual rules to reuse or add.
- Responsive and accessibility risks.
- The files expected to change.
- How the result will be verified.

Do not spend the whole task on analysis. Proceed to implementation after the plan.

### Step 3: Implement the real frontend

- Modify the current components and styles in place.
- Preserve all existing content sources, route destinations, state stores, actions, and feature entry points.
- Prefer semantic, reusable styles over isolated one-off overrides.
- Avoid large rewrites of working components.
- Keep CSS responsibilities in the established stylesheet structure.
- Avoid unrelated code cleanup and dependency changes.
- Do not stop after creating a design spec or mockup. Implement the actual interface.

### Step 4: Verify the implementation

Run checks appropriate to the change. At minimum for frontend code changes, run:

```bash
pnpm lint
pnpm check
pnpm test
pnpm build
```

For visual changes, also inspect the browser output at representative desktop, tablet, and mobile widths, in both light and dark themes. Check keyboard focus and reduced-motion. Run relevant browser tests when existing functionality is affected:

- `pnpm test:motion:browser`
- `pnpm test:diagram:browser`
- `pnpm test:search:browser`

Do not claim a browser or device was tested unless it was actually tested. CI success does not prove visual quality or physical-device behavior.

### Step 5: Report the result

The final handoff must include:

1. What changed and why.
2. Which existing modules / interactions were preserved.
3. Exact files changed.
4. Actual commands run and their results.
5. Screenshots or visual evidence, when available.
6. Remaining visual issues or unverified states.
7. The resulting commit / branch status.

Do not invent completion percentages or claim the whole frontend is finished after changing only one section.

## 11. Definition of done

A frontend design task is complete only when:

- The real application has been changed, not just a standalone mockup.
- Existing homepage sections, pages, navigation, actions, and reading features remain available.
- The visual result is noticeably richer and more expressive, with distinct section compositions and purposeful detail.
- The site still feels mature, editorial, coherent, and readable rather than cluttered.
- Shared tokens and design primitives are reused; the design does not fragment into arbitrary local styles.
- All visible new UI copy is translated across zh / en / ja / fr.
- Desktop, tablet, and mobile layouts are checked.
- Light / dark themes and reduced-motion are checked.
- Accessibility and performance have not been materially degraded.
- Relevant checks and production build pass, or any failure is reported precisely.
- The final handoff distinguishes completed work from unverified work.

---

## Start instruction

Begin by reading `AGENTS.md`, `docs/PRODUCT-SCOPE.md`, and `docs/PROJECT-STATUS.md`, then inspect `src/pages/index.astro`, its imported homepage components, and the existing editorial styles.

Your first implementation priority is to make the homepage substantially more visually expressive while preserving every module. Improve the hero transition, featured showcase, latest-writing rhythm, series showcase, topic exploration, editorial timeline, and supporting sidebars / utility rails as one coherent editorial system. Then carry the same visual language into shared components and other key pages where the changes naturally apply.

**Do not delete features. Do not invent data. Do not build a new application. Do not stop at a proposal. Implement, test, and report.**
