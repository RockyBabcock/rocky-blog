---
name: infographic-item-creator
description: Legacy upstream skill reference only. Do not use for Rocky Blog implementation; this repository has no src/designs/items custom item registry.
---

# Legacy Infographic Item Skill — Not Applicable to Rocky Blog

This file is retained only as historical context from an upstream infographic framework. It is **not an implementation guide for the current Rocky Blog repository**.

## Repository reality

- The current repository does not contain `src/designs/items/`, a custom Item registry, or the referenced `registerItem` extension point.
- Rocky Blog article infographics use the existing `@antv/infographic` dependency and the Markdown content pipeline.
- Do not create the missing directories or copy the old framework into this project merely because this legacy skill describes them.

## Correct workflow

For an infographic embedded in a Rocky Blog article:

1. Use `infographic-syntax-creator` to produce AntV Infographic syntax.
2. Confirm the syntax and Markdown fence match the current parser / renderer.
3. Place it in the article's Markdown source.
4. Run the relevant Markdown tests and `pnpm build` when changing rendering behavior.

A new custom visual-component framework is a separate architecture proposal. Inspect the current code and dependency first, explain the trade-offs, and obtain explicit maintainer approval before introducing one.
