# Claude Code Entry Point

Before making changes in this repository, read these canonical instructions in order:

1. [AGENTS.md](./AGENTS.md) — repository-wide implementation, visual design, architecture, quality, and Git rules.
2. [docs/PRODUCT-SCOPE.md](./docs/PRODUCT-SCOPE.md) — maintainer-approved product requirements, confirmed removals, and pending decisions.
3. [docs/PROJECT-STATUS.md](./docs/PROJECT-STATUS.md) — current implementation baseline, verified progress, blockers, and handoff protocol.

These documents are the single source of truth. Do not duplicate or independently redefine product rules in this file. When this file conflicts with a canonical document, follow the latest explicit maintainer decision and the precedence defined in `AGENTS.md`.

Then load the relevant skill from `.claude/skills/` for the requested task. For Markdown content conventions, frontmatter, article paths, translations, or content validation, first read [`docs/muse/README.md`](./docs/muse/README.md) and the relevant specifications under `docs/muse/`. MuseAI is the sole authoring agent; do not use or recreate a repository Blog Writer Skill or site-side writing tools. For frontend / homepage / visual-design work, use `.claude/skills/frontend-designer/SKILL.md` and read [the Frontend Design Prompt](./docs/FRONTEND-DESIGN-PROMPT.md). Also read [the Editorial Design Reference & Rocky Adaptation Guide](./docs/design/EDITORIAL-REFERENCE-AND-ADAPTATION.md) before choosing visual patterns. A skill does not override the product scope or current implementation.
