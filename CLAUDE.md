# Claude Code Entry Point

Before making changes in this repository, read these canonical instructions in order:

1. [AGENTS.md](./AGENTS.md) — repository-wide implementation, visual design, architecture, quality, and Git rules.
2. [docs/PRODUCT-SCOPE.md](./docs/PRODUCT-SCOPE.md) — maintainer-approved product requirements, confirmed removals, and pending decisions.
3. [docs/PROJECT-STATUS.md](./docs/PROJECT-STATUS.md) — current implementation baseline, verified progress, blockers, and handoff protocol.

These documents are the single source of truth. Do not duplicate or independently redefine product rules in this file. When this file conflicts with a canonical document, follow the latest explicit maintainer decision and the precedence defined in `AGENTS.md`.

Then load the relevant skill from `.claude/skills/` for the requested task. A skill does not override the product scope or current implementation.
