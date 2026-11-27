---
title: 欢迎使用 Rocky Blog
link: getting-started
catalog: true
date: 2024-01-01 00:00:00
description: Rocky Blog 入门介绍：了解静态博客架构、编辑式视觉方向、文章写作和多语言发布。
tags:
  - 入门
  - Astro
categories:
  - 工具
sticky: true
translationKey: getting-started
---

欢迎使用 **Rocky Blog**。这是一个围绕写作、阅读和内容发现构建的静态个人博客。

## 关于这个项目

Rocky Blog 基于 Astro 7、React 19、TypeScript 和 Tailwind CSS 4。项目以静态生成作为基础，只在需要交互的部分使用客户端组件。视觉方向为 Premium Editorial × Contemporary Magazine × Sakura Botanical × Celestial Details，以清晰的编辑式排版为主体，并使用克制的樱花、植物和星象细节。

主要能力包括：

- 首页精选内容、最新文章、分类、标签、归档与系列 / 周刊。
- Pagefind 静态搜索、命令面板、本地阅读历史和继续阅读入口。
- 深浅主题、阅读设置、专注阅读模式和文章目录。
- GFM、Shiki、KaTeX、Mermaid、Infographic 与 Shoka 风格 Markdown 扩展。
- 中文、英语、日语和法语界面。
- 静态 SEO 元信息与静态部署。

本项目不提供 CMS、评论、访问统计、全站音乐播放器、RSS、AI 摘要或云端阅读历史同步。完整产品边界请查看仓库中的 Product Scope 文档。

## 个人阅读书架

你可以在文章页收藏文章，并在 `/shelf` 管理个人阅读书架。书架支持待读、阅读中和已完成状态筛选，以及搜索、排序和网格 / 列表切换。收藏与阅读历史保存在当前浏览器，不会跨设备同步。

## 快速开始

环境要求：Node.js `>=22.20.0`，pnpm `10.28.2`。

```bash
git clone https://github.com/RockyBabcock/rocky-blog.git
cd rocky-blog
pnpm install
pnpm dev
```

开发服务器默认使用 3000 端口。需要修改时设置 `BLOG_PORT`。

## 写第一篇文章

在 `src/content/blog/` 下创建 Markdown 文件：

```markdown
---
title: 我的第一篇文章
description: 简短介绍
date: 2026-11-27
link: my-first-post
tags:
  - Astro
categories:
  - 笔记
---

从这里开始记录。
```

文章字段由 `src/content.config.ts` 定义，包含 `title`、`date`、`description`、`link`、`updated`、`cover`、`tags`、`categories`、`sticky`、`draft`、`catalog`、`tocNumbering`、`math`、`password`、`keywords` 和 `translationKey` 等。

## 多语言内容

中文是默认语言。英语、日语和法语译文镜像默认文章的相对路径，分别放在 `en/`、`ja/` 和 `fr/` 目录下。请保持相同的 `link`，必要时使用相同的 `translationKey`。

界面支持四种语言，不代表每篇文章都已经有四种译文；缺少译文时按站点回退逻辑显示。

## 配置与部署

编辑 `config/site.yaml` 配置站点名称、作者、域名、时区、语言、导航、分类、系列与动效。分类和系列的多语言文案位于 `config/i18n-content.yaml`。

运行 `pnpm build` 生成 `dist/`，部署到 GitHub Pages、Vercel、Netlify、Cloudflare Pages 或其他静态托管平台即可，无需应用服务器或数据库。

## 了解更多

- 查看 [Markdown 功能演示](/post/markdown-features)
- 阅读 [Rocky Blog 完整使用指南](/post/astro-koharu-guide)
- 浏览 [文章归档](/archives)
- 访问 [GitHub 仓库](https://github.com/RockyBabcock/rocky-blog)
