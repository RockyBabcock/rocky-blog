---
name: infographic-structure-creator
description: Legacy upstream skill reference only. Do not use for Rocky Blog implementation; this repository has no src/designs/structures custom structure registry.
---

# Legacy Infographic Structure Skill — Not Applicable to Rocky Blog

This file is retained only as historical context from an upstream infographic framework. It is **not an implementation guide for the current Rocky Blog repository**.

## Repository reality

- The current repository does not contain `src/designs/structures/`, a custom Structure registry, or the referenced `registerStructure` extension point.
- Rocky Blog article infographics use the existing `@antv/infographic` dependency and the Markdown content pipeline.
- Do not create the missing directories or copy the old framework into this project merely because this legacy skill describes them.

## Correct workflow

For an infographic embedded in a Rocky Blog article:

1. Use `infographic-syntax-creator` to choose a supported AntV template and create syntax.
2. Verify that the chosen template and syntax are supported by the installed integration.
3. Place the syntax in the article's Markdown source.
4. Run the relevant Markdown tests and `pnpm build` when changing rendering behavior.

A new custom structure / layout framework is a separate architecture proposal. Inspect the current code and dependency first, explain the trade-offs, and obtain explicit maintainer approval before introducing one.
