---
title: Example Weekly Vol.2 | Getting Comfortable With Everyday Tools
link: weekly-example-2
catalog: true
date: 2025-03-14 20:30:00
description: The second example issue covers static search, formatting, and blog backups, the unglamorous tools used every day, and shows the previous and next issue navigation of a series.
cover: /img/cover/6.webp
tags:
  - 周刊
  - 工具
categories:
  - 周刊
---

No big news this issue. Instead, a few tools I use every day but rarely write about. One note before we start: the series page treats whatever follows `Vol.N` in a title as the issue headline, so a title like "Example Weekly Vol.2 | Getting Comfortable With Everyday Tools" is all you need.

## Picks

### This blog theme

First, a project link — standalone URLs render as standard clickable links:

https://github.com/cosZone/astro-koharu

### React ecosystem reference

https://github.com/vercel/react-tweet

A lightweight library for rendering tweets in React applications.

## Tools

### Static search

[Pagefind](https://pagefind.app/) scans the generated HTML after the build and writes a chunked index. Visitors download only the chunks a search needs, and no server is involved. For a blog with a few hundred posts, it needs almost no maintenance.

### Formatting and linting

The repository uses [Biome](https://biomejs.dev/) for both formatting and linting. Run it once before committing:

```bash command:("$":1)
pnpm lint:fix
```

### Backups

Back up your content and config before upgrading the theme:

```bash command:("$":1-2)
pnpm koharu backup
pnpm koharu list
```

## One line

> A tool fits your hand when you forget it is there.

Next issue: the writing setup itself.
