# Editorial Design Reference & Rocky Blog Adaptation Guide

> Research snapshot: 2026-11-28  
> Purpose: translate useful patterns from mature editorial publications and open-source blog systems into Rocky Blog's own visual language. This is a design benchmark, not a request to copy another site's theme, source code, assets, or brand.

## 1. The design objective

Rocky Blog should feel like a **personal editorial journal with the craft of a small independent magazine**: visually expressive, intellectually curious, tactile, calm, and recognizably its own.

The established visual direction remains:

**Premium Editorial × Contemporary Magazine × Sakura Botanical × Celestial Details**

External references are evidence of useful design patterns, not a new art direction. Keep Rocky's warm archival-paper / nocturnal-charcoal foundation, muted sakura-rose primary accent, dusty celestial-slate secondary accent, editorial typography, fine rules, botanical marks, and restrained constellation geometry.

Do not turn the site into AstroPaper, Cactus, Fuwari, The New Yorker, The Verge, or Stripe Press. Do not turn it into an anime / manga / kawaii blog, generic news portal, SaaS dashboard, or bookstore storefront. Borrow **composition, hierarchy, editorial pacing, reading ergonomics, and interaction clarity**, then translate those principles into existing Rocky components and tokens.

## 2. Reference study: what to learn and what not to copy

### A. AstroPaper — accessible personal-blog information architecture

References:
- [Repository](https://github.com/satnaing/astro-paper)
- [Official feature guide](https://github.com/satnaing/astro-paper/wiki/Features)
- [Astro theme listing](https://astro.build/themes/details/astropaper/)

Useful patterns:
- A direct, readable content hierarchy that makes posts easy to scan.
- Explicit featured / recent content separation rather than making every post compete equally.
- Clear archives, tags, pagination, breadcrumbs, and table-of-contents behavior.
- Responsive and keyboard-accessible navigation, light / dark theme support, and static search.
- A cohesive article toolkit rather than one-off controls scattered around the page.

Rocky adaptation:
- Keep Rocky's richer editorial homepage, but make the relationship between Featured, Latest Writing, Series, Topics, and Timeline even more legible.
- Refine category / archive / tag entry points and the reading hierarchy around article title, metadata, contents, and body.
- Treat keyboard access, focus states, theme parity, and static behavior as design requirements, not final technical chores.

Do not copy AstroPaper's minimal monochrome theme or replace Rocky's homepage with a sparse list.

### B. Astro Cactus — text-first clarity and technical reading

References:
- [Repository](https://github.com/chrismwilliams/astro-theme-cactus)
- [Live demo](https://astro-theme-cactus.netlify.app/)

Useful patterns:
- Semantic, responsive structure with an uncomplicated content-first reading path.
- Text-first post listings that remain compact and easy to scan.
- A clear distinction between post titles, dates, tags, and supporting metadata.
- Strong code-block presentation without requiring a heavy application shell.

Rocky adaptation:
- Use this restraint inside the Latest Writing stream and long-form article body.
- Make compact rows genuinely compact: title first, metadata second, thumbnail only where it adds context.
- Let code, tables, diagrams, and the article itself be the visual focus inside reading pages.
- Use clean separators and typographic rhythm in places where another card would add noise.

Do not flatten the entire Rocky homepage into a text-only list.

### C. astro-erudite — fluid typography and reader-first native CSS

References:
- [Repository](https://github.com/jktrn/astro-erudite)
- [Author site / design context](https://enscribe.dev/)

Useful patterns:
- A carefully considered native-CSS design system with fluid type and spacing.
- Reader-experience enhancements that do not require a large client-side framework.
- A responsive table of contents and clear long-form article rhythm.
- Low dependency and low hydration overhead.

Rocky adaptation:
- Inspect Rocky's existing design tokens and spacing scale, then improve the consistency of page rhythm and text measure.
- Prefer fluid sizing and responsive grid rules where they fit the existing CSS architecture.
- Keep static content in Astro-rendered markup and reserve React hydration for controls that need state.
- Improve article prose styles, code / figure spacing, and the TOC's relationship with the reading column.

Do not replace Rocky's token system with a second, competing CSS framework or copy another site's typeface.

### D. Fuwari — modular profile / category / post-card composition

References:
- [Repository](https://github.com/saicaca/fuwari)
- [Astro theme overview](https://astro.build/themes/details/fuwari/)
- [Live demo](https://fuwari.vercel.app/)

Useful patterns:
- A clear relationship between profile information, category discovery, tags, and post cards.
- Consistent metadata placement across post cards.
- A responsive side column that helps readers orient themselves.
- Card layouts that create distinct content groups and useful scanning anchors.

Rocky adaptation:
- Refine the relationship between the profile / navigation sidebar, right utility rail, and content sheet.
- Give different card roles distinct silhouettes and proportions rather than one repeated shape.
- Use image crops, slim metadata rows, and active category cues to help readers understand where they are.

Explicitly avoid Fuwari's anime-style illustration language, saturated pastel palette, and any aesthetic that would push Rocky toward kawaii styling. Its visual identity is not Rocky's identity.

### E. The New Yorker — publication hierarchy and editorial sectioning

References:
- [Current homepage](https://www.newyorker.com/)
- [Cover Story archive](https://www.newyorker.com/culture/cover-story)
- [A New Look for newyorker.com](https://www.newyorker.com/news/news-desk/a-new-look-for-newyorker-com)

Useful patterns:
- A clear lead story with secondary stories that have intentionally different visual weight.
- Strong editorial section identities: essays, columns, culture, fiction, and recurring departments feel related but not identical.
- Art direction and typography work together instead of relying on decorative UI chrome.
- The homepage functions as a publication front page, not just a chronological database.

Rocky adaptation:
- Let Featured feel like the lead story on a magazine front page.
- Let Weekly / Series feel like recurring departments or collected dossiers.
- Let Explore Topics function like a section directory.
- Let the Timeline feel like an archival index.
- Introduce subtle section-specific visual signatures while retaining common rules for numbering, typography, dividers, and metadata.

Do not imitate The New Yorker's masthead, proprietary display lettering, illustrations, or dense multi-column newspaper layout.

### F. The Verge — lead stories plus a dependable latest stream

Reference:
- [The Verge's homepage redesign explanation](https://www.theverge.com/bulletin/914842/the-next-evolution-of-the-verges-homepage-is-here)

Useful pattern:
- A publication can serve discovery and recency at the same time by giving top stories / story sets their own space while keeping the newest feed uninterrupted.
- Topic collections create an additional editorial path without replacing chronological browsing.
- The desktop layout can allocate different visual roles to different columns.

Rocky adaptation:
- Preserve the Featured Showcase as the high-attention editorial layer and Latest Writing as the dependable chronological layer.
- Do not let visual upgrades disrupt the order, pagination, or real content selection of Latest Writing.
- Make the section transitions between featured content, regular writing, series, topics, and timeline more intentional.
- Preserve the current compact utility behavior on screens where the right rail is hidden.

Do not introduce personalized feeds, social follows, comments, notifications, analytics, or other product capabilities that are not part of Rocky's approved scope.

### G. Stripe Press — tactile publishing and typography-led presentation

References:
- [Stripe Press](https://press.stripe.com/)
- [Stripe Press design study](https://opendesign.cc/en/sites/stripe-press)

Useful patterns:
- Books and editorial objects are presented with a sense of materiality and deliberate art direction.
- Strong display typography, disciplined secondary labels, and calm layouts make content feel considered.
- Cover artwork is treated as a focal object rather than a generic thumbnail.
- Surfaces and colors support the content instead of competing with it.

Rocky adaptation:
- Give Featured and Series cover images a more tactile, collected-publication feeling.
- Use fine framing, subtle paper / ink contrast, folio-like metadata, and carefully balanced title scale.
- Treat a reading page like an editorial spread: typography and content first, decoration at the margins.
- Use Rocky's existing paper / charcoal and rose / slate palette; do not copy Stripe's exact colors or fonts.

Do not redesign the blog as a shop, product catalog, or book purchasing experience.

### H. A List Apart and USWDS — editorial discipline and reading ergonomics

References:
- [A List Apart editorial style guide](https://alistapart.com/editorial-style-guide/)
- [U.S. Web Design System typography guidance](https://designsystem.digital.gov/components/typography/)

Useful patterns:
- Concise introductions and descriptive headings help readers understand an article quickly.
- Body text should use a comfortable measure and line height.
- Headings, links, images, tables, and callouts should have semantic and visual roles.
- A long-form article should not become an excessively wide wall of text.

Rocky adaptation:
- For long-form prose, aim around 60–75 Latin characters per line on desktop as a practical starting point, then verify the actual Chinese / English / Japanese / French rendering. The USWDS reference describes a 45–90 character range and approximately 66 characters as a useful long-text target.
- Keep body line height generous enough for sustained reading (around 1.5 or the existing equivalent).
- Use a comfortable reading column, but allow diagrams, tables, and code blocks to use the available article width when necessary.
- Make links, blockquotes, captions, lists, tables, and headings visually distinguishable without relying on color alone.
- Preserve a concise page introduction and useful article metadata; do not bury the actual content beneath decorative hero elements.

Do not impose English line-length assumptions blindly on CJK text. Inspect glyph density, line breaks, and rhythm in all four locales.

## 3. The synthesis: Rocky's own editorial design grammar

Use the following design rules consistently.

### 3.1 Composition

- **Editorial front page:** a strong site cover, then a featured lead / secondary story composition, then a dependable latest stream, then recurring series, topic discovery, and the archive timeline.
- **Distinct section roles:** every section should have a different content composition, but share typography, rules, labels, image framing, and spacing tokens.
- **Asymmetric balance:** allow lead stories, secondary story stacks, offset lists, split panels, and varied card ratios where the actual data supports them.
- **Editorial pacing:** alternate image-led moments with quiet text-led moments. Do not put three dense image grids back to back.
- **Useful density:** fill the visual field with real content hierarchy, context, metadata, and carefully composed surfaces. Do not invent stats, cards, labels, or content to fill empty space.

### 3.2 Typography

Use the typography already defined by the repository and its CSS variables.

Establish a clear role for:
- Display / hero title.
- Section title.
- Article title.
- Article body.
- Metadata / captions.
- Monospaced folio labels and small editorial annotations.

Requirements:
- Use the existing editorial monospace font token for restrained issue numbers, section indices, date stamps, and micro labels where appropriate.
- Use tabular numerals for dates, counts, and progress values.
- Let size, weight, line height, and spacing establish hierarchy before adding decorative marks.
- Avoid excessive all-caps, large tracking, tiny text, and decorative letter spacing that harms Chinese / Japanese readability.
- Reuse existing font families; do not introduce Google Fonts, remote font services, or a new font package without approval.

### 3.3 Color and material

- Foundation: warm archival paper in light mode, nocturnal charcoal in dark mode.
- Primary accent: muted sakura / botanical rose.
- Secondary accent: dusty celestial slate.
- Supporting colors: existing semantic tokens for muted, border, card, success, warning, and danger.
- Use a surface hierarchy of canvas → editorial paper sheet → selected inset / card → floating control.
- Keep gradients, shadows, grain, blur, and translucent surfaces subtle and intentional.
- Preserve contrast and hierarchy in both themes. Do not use the same low-opacity treatment if it becomes illegible in dark mode.

### 3.4 Decorative vocabulary

Choose a small, repeatable set of details:
- Section index / folio number.
- Editorial kicker and short category label.
- Hairline divider and inset rule.
- Crop marks and image frame.
- Tiny diamond / star point / constellation link.
- Botanical line art or a single Sakura petal accent.
- Date stamp and tabular number.
- Small watermark on one focal region.

Use decoration as punctuation. Do not apply every motif to every card. Every ornament must be non-interactive, not obscure content, and disappear or simplify cleanly on smaller screens.

### 3.5 Surfaces and geometry

- Do not place every module in a large rounded rectangle.
- Mix framed image cards, borderless text rows, ruled editorial lists, inset panels, and a small number of elevated surfaces.
- Use the existing corner-radius scale; keep radii consistent within each component family.
- Vary card proportions and image ratios where that improves hierarchy, not randomly.
- Reserve stronger shadows for floating UI or a focal element. Use rules and tonal contrast for most editorial separation.

### 3.6 Image direction

- Treat cover images as editorial artwork: deliberate crop, focal point, contrast, and ratio.
- Do not crop faces, diagrams, screenshots, or embedded text carelessly.
- Use real article cover data and the current default-cover fallback. Do not generate fake cover art or add image paths that do not exist.
- Keep the current responsive image pipeline, source sets, LQIP, and image dimensions.
- Use one or two dominant images per visual composition; avoid turning every card into an image tile.
- Captions and attribution may be shown only when their data exists.

## 4. Rocky-specific component translation map

This map is grounded in the current source structure. It is a visual brief, not a request to add new product features.

| Rocky area | Current entry points | Design target |
|---|---|---|
| Site cover / hero | **src/components/ui/cover/Cover.astro**, **HeroImage.astro**, **SakuraPetals.astro** | A recognizable publication cover with title, controlled celestial / botanical framing, strong image crop, and a refined transition into the page |
| Featured | **src/components/home/FeaturedShowcase.astro** | One lead feature plus a quiet, clearly subordinate stack; magazine-cover hierarchy and distinct one / two / many item states |
| Latest Writing | **src/components/post/PostList.astro**, **src/components/home/CompactPostRow.astro** | Dependable chronological stream with varied row density, strong titles, legible metadata, clean separators, and preserved pagination |
| Series / Weekly | **src/components/home/SeriesShowcase.astro**, **SeriesShowcaseProgress.tsx** | Collectible issue / dossier presentation using real series metadata, latest post, post count, and local progress |
| Topics | **src/components/home/ExploreTopics.astro**, **src/components/post/CategoryCards.astro** | An editorial section directory plus a typographically weighted tag index; avoid repetitive pill clouds |
| Timeline | **src/components/home/EditorialTimeline.astro** | A refined archive spine with date hierarchy, clear year grouping, real post links, and a mobile-friendly vertical rhythm |
| Left identity / navigation | **src/components/layout/HomeInfo.astro**, **HomeSider.astro** | Author identity panel with clear profile, stats, social links, active navigation, and grouped secondary navigation |
| Right rail / compact utilities | **HomeRightRail.astro**, **HomeCompactUtility.tsx**, **RightRailWidgets.tsx** | A compact reader's desk: search, commands, shelf, recent reading, progress, categories, and archive context; maintain the 1280px responsive behavior |
| Article reading | **src/layouts/TwoColumnLayout.astro**, article page components, **src/styles/theme/editorial-system.css** | Focused reading column, title / metadata hierarchy, coherent TOC companion, refined prose, figures, code / diagram surfaces, and end-of-article colophon |

### 4.1 Homepage-specific refinement targets

**Cover / hero**
- Strengthen the relationship between the title, subtitle, background image, overlay, frame, and celestial / botanical marks.
- Make the hero transition into the first content section intentional: one clear transition line, folio marker, or subtle surface edge.
- Keep hero actions visually clear and genuinely actionable.
- Avoid adding another petal loop, large overlay text, or an oversized second hero.

**Featured Showcase**
- Use a lead card as the visual anchor and secondary content as a quieter editorial index.
- Make title legibility robust on both bright and dark image regions.
- Give category, date, and reading time clear but subordinate placement.
- Keep bookmark interaction discoverable and accessible.
- Test exactly 1, 2, 3, and 4+ items, because the real content count can vary.

**Latest Writing**
- Establish 2–3 presentation weights, not a new unrelated card for every post.
- Let the first few items have more visual presence, then transition into a tighter editorial list.
- Use consistent metadata order and image behavior.
- Maintain exact ordering, page size, next-page URL, and all post links.

**Series / Weekly**
- Make a series feel like a curated collection rather than a generic category card.
- Use its actual name, description, cover, newest article, article count, and local progress only.
- A series index / folio marker is allowed only when derived from actual series data.
- Do not fabricate issue numbers, issue dates, reading progress, or series milestones.

**Explore Topics**
- Give featured categories a clear, recognizable role and enough visual variety to be distinct.
- Preserve the real weighted tag tiers and counts. Style them with typography and rhythm instead of adding dozens of rounded pills.
- Keep the category and tag hierarchy understandable on mobile.

**Timeline**
- Make years, dates, and post titles easy to scan at a glance.
- Keep the connecting line / nodes fine and quiet; content titles remain the focus.
- Use real archive grouping and do not add fictitious milestones.

**Sidebars / reader utilities**
- Present the author profile and navigation as one coherent editorial identity area.
- Group utilities by task: discover (search / command), continue (recent reading / progress), and collect (Reading Shelf).
- Avoid dashboard-like borders around every widget. Use alignment, spacing, and separators to express grouping.
- Keep all utility actions accessible below the right-rail breakpoint.

### 4.2 Article-page reading experience

Article pages are not secondary to the homepage. Many visitors arrive from a direct article link, so reading quality must receive a dedicated design pass.

- Make title, description, category, publication date, update date, word count / reading time, and cover image form one coherent article introduction.
- Do not invent an author byline or publication series metadata when the schema does not provide it.
- Set a readable body measure; use approximately 60–75 Latin characters per line as an initial desktop target, then inspect CJK line length visually. The USWDS guide gives 45–90 characters as a broad range and about 66 as a useful long-text target.
- Use line height around 1.5 or the closest existing reading token for long prose; do not apply heading line-height to body text.
- Keep the article body visually distinct from surrounding navigation and utility panels. Avoid wrapping every paragraph or heading in a card.
- Give H2 / H3 / H4 a consistent hierarchy, with modest rules or markers that do not compete with text.
- Treat blockquotes, callouts, lists, tables, inline code, fenced code, Mermaid, Infographic, KaTeX, and encrypted regions as related but distinct content types.
- Keep wide code / diagram / table content inside the article's available measure without causing whole-page horizontal overflow.
- Keep image figures responsive and their alt text intact; captions / credits only appear when real data exists.
- Preserve active TOC state, scroll progress, focus mode, saved-article action, share action, mobile TOC, encrypted content, and client-navigation cleanup.
- End the article with an intentional reading close / colophon / navigation area using existing data and actions. Do not introduce a new comment, social feed, recommendation, or author-management feature.

## 5. Visual quality checklist

Evaluate each major page or section against these questions:

### Hierarchy
- Can a reader identify the primary element in 2–3 seconds?
- Is the relationship between headline, supporting description, metadata, and action unambiguous?
- Are secondary elements quiet but still legible?

### Editorial rhythm
- Does the page alternate visual weight rather than repeating one card pattern?
- Are image-led sections balanced by text-led areas?
- Are section transitions clear without excessive whitespace or decorative clutter?

### Craft
- Are image crops intentional?
- Are text baselines, card edges, rules, section labels, and metadata aligned?
- Are selected details deliberate and consistent rather than random?

### Reading
- Is article content comfortable at desktop, tablet, and phone widths?
- Can readers distinguish headings, prose, links, code, callouts, captions, and tables?
- Does the TOC help orientation without stealing the reading column?

### Product integrity
- Does every existing action still work?
- Are all counts, dates, progress values, and labels grounded in actual data?
- Do all four locales fit the same design without clipping or poor wrapping?

### System integrity
- Do light and dark modes remain coherent?
- Are reduced-motion preferences respected?
- Did CSS additions reuse tokens and avoid a competing component system?
- Did client-side JavaScript and hydration remain limited to existing interactive needs?

## 6. Implementation priority

Use these passes in order. Do not try to redesign all pages simultaneously.

1. **Front page composition:** hero transition, featured lead / secondary balance, Latest Writing rhythm, Series / Weekly identity, Topics directory, Timeline, and sidebars.
2. **Article reading:** headline and metadata, prose measure and hierarchy, code / diagram / image surfaces, TOC, and end-of-article area.
3. **Shared system:** section headings, editorial kickers, cards / rows, dividers, metadata, buttons, inputs, empty states, dialogs, and responsive utility groups.
4. **Polish:** hover / focus / pressed states, dark mode, responsive details, reduced motion, image loading, and visual regression.

A visual improvement is successful only when the original Rocky Blog identity becomes clearer and more distinctive—not when it looks more like one of the references.
