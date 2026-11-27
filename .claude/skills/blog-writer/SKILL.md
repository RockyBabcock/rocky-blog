---
name: blog-writer
description: 按 Rocky Blog 当前内容规范创建或规划 Markdown / MDX 文章，生成正确的 frontmatter、分类路径、语言目录和内容结构。适用于写博文、创建文章、写博客、new post、create blog post 等请求。
---

# Rocky Blog — Blog Writer Skill

按照仓库当前实现为 Rocky Blog 创建 Markdown / MDX 内容。不要将旧 astro-koharu 教程、旧 Hexo 配置或历史 CMS 工作流当作当前项目规范。

开始前阅读：
- `docs/PRODUCT-SCOPE.md`
- `GETTING-STARTED.md`
- `src/content.config.ts`
- `config/site.yaml`
- 如果涉及翻译，再阅读 `docs/overview/11-i18n-and-seo.md`

## 1. 创建文章前确认的信息

根据用户需求确认：

- 文章主题与目标读者。
- 文章标题和摘要。
- 文章所属分类。
- 文章标签。
- 文章日期与必要的更新日期。
- 是否需要封面、数学公式或加密。
- 是否需要英文、日文或法文译文。

如果用户已经提供这些信息，不要重复提问。缺少非关键项时，使用合理默认值并清楚标注。

## 2. 当前 Frontmatter schema

文章 schema 位于 `src/content.config.ts`。常用字段：

```yaml
---
title: 文章标题
description: 一段简明摘要
date: 2026-11-27 10:00:00
link: stable-english-slug
updated: 2026-11-27 12:00:00
cover: /img/covers/example.webp
tags:
  - Astro
  - 工程实践
categories:
  - [笔记, 前端]
sticky: false
draft: false
catalog: true
tocNumbering: true
math: false
keywords:
  - Rocky Blog
translationKey: stable-english-slug
---
```

字段说明：

| 字段 | 规则 |
| --- | --- |
| `title` | 必填，文章标题 |
| `date` | 必填，发布时间；按 `site.timezone` 解析 |
| `description` | 可选，文章摘要 |
| `link` | 可选，建议使用稳定英文 slug |
| `updated` | 可选，文章更新时间 |
| `cover` | 可选，封面资源路径 |
| `tags` | 可选，字符串数组 |
| `categories` | 可选，字符串数组或嵌套字符串数组 |
| `subtitle` | 可选，兼容现有内容的字段 |
| `sticky` | 可选，是否置顶 |
| `draft` | 可选，是否草稿 |
| `catalog` | 可选，默认启用文章目录 |
| `tocNumbering` | 可选，默认启用目录编号 |
| `math` | 可选，数学公式相关开关 |
| `password` | 可选，整篇文章加密配置 |
| `keywords` | 可选，SEO 关键词数组 |
| `translationKey` | 可选，用于关联翻译版本 |

只使用 schema 已定义的字段。不要为了写作方便臆造 frontmatter 属性。

## 3. 分类与路径

当前常用一级分类：

- 笔记：技术笔记与开发实践。
- 工具：工具介绍、使用指南与工作流。
- 随笔：生活、观察、个人思考与年度总结。
- 周刊：周期性整理与每周分享。

分类名称及 URL slug 映射以 `config/site.yaml` 的 `categoryMap` 为准；分类和系列的本地化显示文案见 `config/i18n-content.yaml`。不要使用已废弃的 `_config.yml`、`category_map` 或旧 CMS 配置。

分类示例：

```yaml
# 单层分类
categories:
  - 随笔

# 嵌套分类
categories:
  - [笔记, 前端]
```

建议的文件组织：

```text
src/content/blog/
├── note/
│   └── front-end/
│       └── example.md
├── tools/
│   └── example.md
├── life/
│   └── example.md
└── weekly/
    └── example.md
```

目录组织与路由 slug 的最终映射以当前内容索引实现为准。新增分类前，先查看 `categoryMap` 和现有文章目录；只有确实需要新增分类时，才修改配置和翻译映射。

## 4. 多语言与翻译

当前支持的 UI 语言固定为：

| Locale | 语言 | 内容目录 |
| --- | --- | --- |
| `zh` | 中文（默认） | `src/content/blog/` |
| `en` | English | `src/content/blog/en/` |
| `ja` | 日本語 | `src/content/blog/ja/` |
| `fr` | Français | `src/content/blog/fr/` |

不支持韩语，不要生成 `ko/` 内容目录。

译文应镜像默认文章的相对路径，并保持相同的 `link`；必要时使用相同的 `translationKey`。示例：

```text
src/content/blog/tools/example.md
src/content/blog/en/tools/example.md
src/content/blog/ja/tools/example.md
src/content/blog/fr/tools/example.md
```

UI 字典由 `src/i18n/` 管理，分类与系列显示文案在 `config/i18n-content.yaml`。不要把文章翻译与 UI 字典混为一谈。没有译文时，站点按现有回退逻辑处理；不得声称文章已完成所有语言的翻译。

## 5. 写作质量与内容结构

优先提供真实、有用、结构清晰的内容。不要生成空泛的 SEO 关键词堆砌、伪造测试结果、虚构项目经验或没有来源的统计数据。

### 技术文章

```markdown
## 背景与问题

说明使用场景、约束和实际问题。

## 方案与实现

介绍技术选择、关键步骤和代码。

## 验证与结果

仅报告实际运行并核实的结果。

## 权衡与局限

说明边界、失败情况和适用条件。

## 总结

提炼可复用的结论。
```

### 工具 / 使用指南

```markdown
## 简介

说明工具解决什么问题。

## 环境与准备

列出经过核对的版本和前置条件。

## 基本使用

提供可执行步骤。

## 配置与进阶用法

说明关键设置和常见场景。

## 限制与排障

解释已知边界和解决方法。

## 参考资料

链接官方文档和一手资料。
```

### 随笔

以自然段落和清晰的小节展开个人观察。避免强行使用技术文章模板。

## 6. Markdown 能力

根据文章需要使用当前仓库支持的 Markdown 功能：

- GFM 表格、任务列表和引用。
- Shiki 代码高亮。
- KaTeX 数学公式。
- Mermaid 图表。
- Infographic 信息图。
- Shoka 风格容器、标签页、折叠、文本效果、隐藏文字和 Ruby 注音。

不要为了展示效果过度堆叠组件。只有文章启用对应功能且当前配置支持时才使用。

加密文章或局部加密块仅用于适合静态密码保护的内容。密文与公开派生参数会随页面交付，用户可以离线猜测密码；这不是服务器鉴权，也不适合保存密钥或高敏感信息。

## 7. 产品边界

不得在新文章、示例或配置说明中把以下功能描述为当前产品功能：

- CMS / 浏览器内写作室 / 文章管理后台。
- 评论、友链、Moments、追番。
- 全站音乐播放器、文章音视频播放器、LRC 歌词和播放列表。
- Umami 或其他访问分析。
- RSS 订阅（已从当前代码中移除，不得重新引入）。
- AI 摘要、embedding / 语义相似推荐、随机推荐。
- Quiz 测验、Tweet / X、CodePen 嵌入、外链 OG 预览。
- Docker 部署或 Koharu CLI。

阅读历史、读者设置、系列进度和 Reading Shelf 收藏是浏览器本地功能，不提供账号、云数据库或跨设备同步。

## 8. 最后检查

创建文章后：

1. 确认文件位于正确的 `src/content/blog/` 子目录。
2. 检查必填字段和 `src/content.config.ts` schema。
3. 确认分类已映射，新增分类时同步内容本地化映射。
4. 检查稳定 slug 与翻译文件的 `link` / `translationKey`。
5. 检查代码示例、命令、链接和数据是否真实。
6. 运行相关内容检查；必要时运行 `pnpm lint`、`pnpm check` 和 `pnpm build`。
7. 不要声称运行过未执行的验证。
8. 如需信息图，使用仓库的 infographic skills；不要为了插图而编造统计数据。

保持文章本身可读、准确和有用。视觉组件是辅助，不应取代内容质量。
