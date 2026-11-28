# GitHub Copilot Repository Instructions

Before changing this repository, read:

- [AGENTS.md](../AGENTS.md) — canonical repository-wide coding and agent rules.
- [docs/PRODUCT-SCOPE.md](../docs/PRODUCT-SCOPE.md) — approved requirements, confirmed removals, and pending product decisions.
- [docs/PROJECT-STATUS.md](../docs/PROJECT-STATUS.md) — implementation status, verification evidence, and handoff protocol.

Treat these files as the single source of truth. Do not infer current features from historical screenshots, upstream changelog entries, or removed code. Preserve existing modules and behavior unless the maintainer explicitly approves a change. Distinguish confirmed removals from pending decisions; never implement a pending item or remove an existing capability without approval.

For UI work, follow the visual requirements in `AGENTS.md`: preserve modules, improve purposeful editorial composition and detail, and validate responsive layouts, both themes, keyboard access, and reduced-motion behavior. For any frontend / homepage / visual-design task, also read and follow [`docs/FRONTEND-DESIGN-PROMPT.md`](../docs/FRONTEND-DESIGN-PROMPT.md), which defines the actual homepage modules, implementation workflow, and definition of done.
