---
title: Astro Koharu 快速上手指南
link: getting-started
date: 2026-03-18 10:00:00
sticky: true
categories:
  - [笔记, 前端]
tags:
  - Astro
  - Koharu
  - 教程
cover: /img/cover/1.webp
description: 从目录结构、核心配置到内容写作，带你十分钟快速了解 Astro Koharu 博客主题的日常使用方式。
---

## 为什么选择 Astro Koharu

**Astro Koharu** 是一个基于 Astro 7、React 19 与 Tailwind CSS v4 构建的现代静态博客主题，灵感源自经典 Hexo Shoka 主题，兼顾轻量优雅的视觉风格与出色的阅读性能。

在默认情况下，页面以零冗余 JavaScript 输出静态 HTML，仅对导航栏、目录追踪、主题切换、搜索与写作室等交互模块按需水合。

## 项目目录一览

```text
├── config/
│   ├── site.yaml          # 站点核心配置、导航、社交与特色系列
│   └── i18n-content.yaml  # 分类与系列的多语言映射
├── public/img/            # 头像、封面与横幅图片
└── src/
    ├── components/        # Astro 与 React 组件
    ├── content/blog/      # Markdown / MDX 博客文章
    ├── layouts/           # 单栏与双栏页面布局
    └── pages/             # 文件路由与多语言镜像页
```

## 撰写第一篇文章

在 `src/content/blog/` 任意子目录中新建 `.md` 文件并添加 Frontmatter：

```yaml
---
title: 我的第一篇文章
link: my-first-post
date: 2026-03-20 12:00:00
categories:
  - 随笔
tags:
  - Astro
  - 生活
---
```

### 常用 Frontmatter 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | 文章标题 |
| `link` | string | 自定义永久链接 slug |
| `date` | date | 发布时间 |
| `sticky` | boolean | 是否置顶显示在首页推荐区 |
| `categories` | string \| array | 支持单级与多级嵌套分类 |
| `tags` | string[] | 文章标签列表 |
| `cover` | string | 自定义文章封面路径 |

> 提示：如果不填写 `cover`，主题会根据文章 slug 自动分配一张稳定的默认封面图，保证首页卡片节奏整齐美观。

## 多语言与目录导航

右上角导航栏内置多语言切换（简体中文、English、日本語、한국어）以及浅色 / 深色模式切换。进入任意文章页后，左侧边栏会自动提取标题生成多级目录，并在滚动阅读时高亮当前所在章节。
