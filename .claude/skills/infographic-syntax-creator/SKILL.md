---
name: infographic-syntax-creator
description: Generate AntV Infographic syntax outputs. Use when asked to turn user content into the Infographic DSL (template selection, data structuring, theme), or to output `infographic <template>` plain syntax.
---

# Infographic Syntax Creator

## Overview

Generate AntV Infographic syntax output from user content, following the rules in `references/prompt.md`.

## Rocky Blog integration contract

Before preparing or editing repository content, read `AGENTS.md`, `docs/PRODUCT-SCOPE.md`, `docs/PROJECT-STATUS.md`, and `docs/overview/10-markdown-system.md`. This skill generates syntax for the existing integration; it does not authorize adding a new renderer, server, or feature outside the approved product scope.

This skill is the preferred workflow for an infographic that will be embedded in a Rocky Blog Markdown article. The current implementation uses a fenced `infographic` block and the existing `@antv/infographic` renderer in `src/components/markdown/InfographicToolbar.tsx`.

- Generate syntax only; do not create custom Item / Structure components, a local template registry, a playground, or a new renderer.
- Do not add CDN scripts or runtime infrastructure to the blog.
- Use a template supported by the installed package and current renderer; do not assume every upstream template is available.
- Use only user-provided or verifiable numeric data. When data is illustrative, label it clearly as simulated / demonstration data; otherwise omit values.
- For a standalone HTML / SVG artifact, use the separate `infographic-creator` workflow instead.

## Workflow

1. Read `references/prompt.md` for syntax rules, templates, and output constraints.
2. Extract the user's key structure: title, desc, items, hierarchy, metrics; infer missing pieces if needed.
3. Select a template that matches the structure (sequence/list/compare/hierarchy/chart).
4. Compose the syntax using `references/prompt.md` as the formatting baseline.
5. Preserve hard constraints in every output:
   - Output is a single `plain` code block; no extra text.
   - First line is `infographic <template-name>`.
   - Use two-space indentation; key/value pairs are `key value`; arrays use `-`.
   - Compare templates (`compare-*`) must have exactly two root nodes with children.
