# 内容目录、分类与多语言路径

## 1. 根目录和语言目录

中文是默认语言，文章直接放在 `src/content/blog/`。其他语言必须镜像中文文章的相对路径：

```text
src/content/blog/
├── note/
│   └── front-end/
│       └── example.md
├── tools/
│   └── example.md
├── life/
│   └── example.md
├── weekly/
│   └── weekly-example-01.md
├── en/
│   ├── note/front-end/example.md
│   ├── tools/example.md
│   ├── life/example.md
│   └── weekly/weekly-example-01.md
├── ja/
│   └── ...（镜像中文相对路径）
└── fr/
    └── ...（镜像中文相对路径）
```

路径结构以当前仓库文章和分类映射为准。不要新建 `ko/`、`zh/` 或额外的 locale 目录；默认中文没有语言前缀。

## 2. 当前分类映射

当前 `config/site.yaml` 的 `categoryMap` 为：

| 分类层级 | Markdown `categories` 显示值 | URL / 目录 slug |
| --- | --- | --- |
| 一级 | 随笔 | `life` |
| 一级 | 笔记 | `note` |
| 一级 | 工具 | `tools` |
| 一级 | 周刊 | `weekly` |
| 笔记下级 | 前端 | `front-end` |
| 前端下级 | CSS | `css` |
| 随笔下级 | 番剧 | `anime` |

建议的存放位置：

| 内容类型 | 推荐路径 | Frontmatter 分类 |
| --- | --- | --- |
| 技术笔记 / 学习记录 | `note/<slug>.md` | `笔记` |
| 前端开发 | `note/front-end/<slug>.md` | `[笔记, 前端]` |
| CSS 专题 | `note/front-end/css/<slug>.md` | `[笔记, 前端, CSS]` |
| 工具 / 使用指南 | `tools/<slug>.md` | `工具` |
| 生活 / 个人随笔 | `life/<slug>.md` | `随笔` |
| 番剧 / 动画主题随笔 | `life/anime/<slug>.md` | `[随笔, 番剧]` |
| 周刊 / 定期系列 | `weekly/<slug>.md` | `周刊` |

新增分类不是 Muse 的权限。若现有分类无法准确容纳文章，Muse 应提出建议并等待维护者确认，不得自行修改 `categoryMap` 或 `config/i18n-content.yaml`。

## 3. 文件名与公开 URL

- 文件名使用简短、稳定的小写 ASCII kebab-case，例如 `astro-content-collections.md`。
- `link` 建议与文件名（不含扩展名）一致；同一文章的译文使用完全相同的 `link`。
- `translationKey` 建议与稳定 slug 相同，并在所有语言版本中保持一致。
- 已发布文章的 `link` 不应随意修改；它会影响公开文章 URL、外部链接和搜索索引。
- 不要仅因为文章标题翻译不同，就给每种语言生成不同 slug。

## 4. 多语言文章镜像规则

例如中文主文章：

`src/content/blog/tools/astro-content-collections.md`

对应的译文路径是：

```text
src/content/blog/en/tools/astro-content-collections.md
src/content/blog/ja/tools/astro-content-collections.md
src/content/blog/fr/tools/astro-content-collections.md
```

示例 frontmatter（语言文件各自翻译标题和摘要，其余关联信息保持一致）：

```yaml
---
title: Astro Content Collections
description: A practical guide to validating structured Markdown content.
date: 2026-11-27 09:30:00
link: astro-content-collections
tags:
  - Astro
  - 内容管理
categories:
  - 工具
translationKey: astro-content-collections
---
```

已有文章的译文保留站点使用的原始分类名和标签标识（目前不少译文仍使用中文分类 / 标签值），不要把它们翻译成新的分类项。文章内容应按目标语言自然表达。

UI 字典在 `src/i18n/`；分类和系列的显示翻译在 `config/i18n-content.yaml`。不要将文章译文、UI 字典和分类翻译混为同一项工作。

## 5. 封面和图片资源

- 现有图片位于 `public/`，在 Markdown 中以站点绝对路径引用，例如 `/img/cover/4.webp`。
- 仅在确认资源确实存在时，才把该路径写入 `cover` 或正文图片链接。
- 如果 Muse 生成或收到文章专属图片文件，建议把实际文件放在 `public/img/posts/<article-slug>/`，正文用 `/img/posts/<article-slug>/<filename>` 引用。
- 输出中必须同时列出图片的仓库相对路径。只有 Markdown 而没有图片文件时，不得声称图片已经上传。
- 不使用外链图片作为默认封面；若必须使用外部资源，应先确认许可、稳定性和访问可用性。

## 6. 系列 / 周刊

周刊当前属于已存在的内容分类和系列页面，配置以 `config/site.yaml` 的 `featuredSeries` 为准。Muse 可以在维护者要求时撰写新一期内容，但不得自行：

- 创建新的系列 slug；
- 修改 `featuredSeries` 配置；
- 将普通文章归入周刊以获取首页置顶效果；
- 更改既有周刊文章的 slug 或目录。

添加新系列前先向维护者请求确认。