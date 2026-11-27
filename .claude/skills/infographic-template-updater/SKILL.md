---
name: infographic-template-updater
description: Legacy upstream skill reference only. Do not use for Rocky Blog implementation; this repository has no local infographic template registry or AI playground gallery.
---

# Legacy Infographic Template Updater — Not Applicable to Rocky Blog

This file is retained only as historical context from an upstream infographic application. It is **not a valid update workflow for the current Rocky Blog repository**.

## Repository reality

The current Rocky Blog repository does not contain the paths assumed by the former skill:

- No local `src/templates/` infographic registry.
- No `site/src/components/AIPlayground/` prompt catalog.
- No local infographic gallery dataset registry.
- No `.skills/` directory; repository Agent Skills are under `.claude/skills/`.

Do not create or update these missing paths based on this legacy document. Do not claim a new AntV template is integrated merely because it appears in an Agent prompt list.

## Correct workflow

Rocky Blog consumes the installed `@antv/infographic` package through its Markdown integration. If a template capability must be changed:

1. Inspect the installed package version and current Markdown renderer.
2. Confirm the template is supported by that package version.
3. Update only the actual prompt / documentation files that exist and are used by the repository.
4. Add or update a rendering test and run `pnpm build`.
5. Update the content-system documentation if user-facing syntax or behavior changed.

Any proposal to build a local template registry or playground requires a separate architecture review and explicit maintainer approval.
