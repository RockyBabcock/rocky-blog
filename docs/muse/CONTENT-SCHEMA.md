# 内容 Frontmatter Schema

本文与当前 `src/content.config.ts` 对齐。字段定义发生变化时，必须先更新代码 schema，再同步本文和 Muse Prompt。Muse 不得自行发明 frontmatter 字段。

## 字段定义

| 字段 | 类型 / 规则 | 说明 |
| --- | --- | --- |
| `title` | string，必填 | 文章标题，使用当前文件语言 |
| `date` | 日期字符串或 Date，必填 | 发布时间；字符串按 `config/site.yaml` 的 `site.timezone` 解析 |
| `description` | string，可选 | 文章简介；会作为文章摘要使用，应准确概括正文 |
| `link` | string，可选 | 自定义公开 slug；建议使用稳定、简洁的小写 ASCII slug |
| `updated` | 日期字符串或 Date，可选 | 内容发生实质修改时更新 |
| `cover` | string，可选 | 现有 `public/` 图片资源的站点绝对路径，例如 `/img/cover/4.webp` |
| `tags` | string[]，可选 | 标签数组；保持站点已有标签命名方式 |
| `subtitle` | string，可选 | 为兼容历史文章保留；新文章默认不使用 |
| `catalog` | boolean，可选，默认 true | 是否启用文章目录 |
| `categories` | string[] 或 string[][]，可选 | 分类；嵌套分类使用二维数组 |
| `sticky` | boolean，可选 | 是否置顶；仅在维护者明确要求时设为 true |
| `draft` | boolean，可选 | 草稿标记；生产构建不发布草稿 |
| `tocNumbering` | boolean，可选，默认 true | 是否为目录标题编号 |
| `math` | boolean，可选 | 当前全局启用 KaTeX；文章含数学公式时可设为 true |
| `password` | string，可选 | 整篇文章静态加密口令；没有明确要求时绝不生成 |
| `keywords` | string[]，可选 | 少量准确的 SEO 关键词，不堆砌 |
| `translationKey` | string，可选 | 关联同一文章的不同语言版本；建议使用稳定 slug |

日期建议使用无时区后缀的站点本地时间，例如 `2026-11-27 09:30:00`。不要从操作系统时间猜测发布时间；应使用维护者提供的日期。不要输出 schema 未列出的 `author`、`locale`、`lang`、`summary`、`series`、`readingTime`、`coverAlt`、`translations` 等字段。

## 推荐模板

普通文章推荐从最小 frontmatter 开始，只有确实需要时才添加可选字段：

```yaml
---
title: 文章标题
description: 用一到两句话准确概括文章内容。
date: 2026-11-27 09:30:00
link: stable-ascii-slug
cover: /img/cover/4.webp
tags:
  - Astro
  - 工程实践
categories:
  - [笔记, 前端]
catalog: true
draft: false
tocNumbering: true
translationKey: stable-ascii-slug
---
```

若不使用数学公式，可以省略 `math`；若没有真实封面，省略 `cover`，不要伪造资源路径。普通文章不需要设置 `sticky`、`password` 或 `subtitle`。

## 字段注意事项

### 分类

`categories` 的名称必须与 `config/site.yaml` 的分类映射一致。嵌套分类示例：

```yaml
categories:
  - [笔记, 前端]
```

不要把 URL slug（例如 `front-end`）误写成显示分类名称；分类名称和目录映射见 [目录与分类](./CONTENT-STRUCTURE.md)。

### 草稿

`draft: true` 用于未准备发布的文章。草稿可能在开发环境预览，但不会进入生产发布。正式发布前必须由维护者确认是否移除 `draft: true` 或改为 `false`。

### 数学与加密

- 使用 KaTeX 时，正文必须包含合法公式，并按需设置 `math: true`。
- `password` 仅用于维护者明确要求的整篇文章静态加密。它不是私密服务器存储、DRM 或访问控制；不要用它保存密码、密钥或个人敏感信息。
- 局部加密块语法见 [Markdown 能力](./MARKDOWN-SPEC.md)，同样不得默认启用。

## 多语言字段一致性

同一篇文章的语言版本应保持相同的：

- `link`
- `translationKey`
- `date`（除非维护者明确要求译文单独发布日期）

`title` 和 `description` 应翻译；`categories` 与 `tags` 沿用站点规范中的分类 / 标签标识，不要为了语言切换擅自改变分类路由。