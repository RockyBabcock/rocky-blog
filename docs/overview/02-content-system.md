# 02 — 内容系统

## 内容集合与 schema

`src/content.config.ts` 声明 `blog` collection。Loader 使用 glob 规则从 `src/content/blog/` 发现 Markdown / MDX 文件，frontmatter 使用 Zod schema 验证。

当前 schema 字段：

| 字段 | 规则 | 用途 |
| --- | --- | --- |
| `title` | string，必填 | 标题 |
| `date` | string 或 Date，必填 | 发布时间，按站点时区解析 |
| `description` | string，可选 | 摘要 |
| `link` | string，可选 | 自定义文章 slug |
| `updated` | 日期，可选 | 更新时间 |
| `cover` | string，可选 | 封面路径 |
| `tags` | string[]，可选 | 标签 |
| `categories` | string[] 或 string[][] | 分类，支持嵌套 |
| `subtitle` | string，可选 | 历史内容兼容字段 |
| `catalog` | boolean，默认 true | 目录开关 |
| `sticky` | boolean，可选 | 置顶 |
| `draft` | boolean，可选 | 草稿 |
| `tocNumbering` | boolean，默认 true | 目录标题编号 |
| `math` | boolean，可选 | 数学公式相关开关 |
| `password` | string，可选 | 整篇加密配置 |
| `keywords` | string[]，可选 | SEO 关键词 |
| `translationKey` | string，可选 | 翻译关联标识 |

增加 frontmatter 字段前先更新 schema、相关 TypeScript 类型、使用文档和测试。不要只在 Markdown 中使用 schema 不认识的自定义字段。

## 内容目录

```text
src/content/blog/
├── tools/
│   ├── getting-started.md
│   └── example.md
├── en/
│   └── tools/example.md
├── ja/
│   └── tools/example.md
└── fr/
    └── tools/example.md
```

根目录属于默认语言中文。其他语言目录镜像默认语言文章的相对路径。使用一致的 `link`，必要时设置相同的 `translationKey`。

移动文章文件或修改公开 slug 之前，检查站内链接、翻译映射、canonical、hreflang 和历史外链。

## 日期与时区

日期 schema 接受字符串与 Date。字符串通过站点时区工具解析；gray-matter 产生的 Date 也会重新按站点时区解释，避免构建机器的本地时区改变发布时间。

`config/site.yaml` 的 `site.timezone` 使用 IANA 时区名称。修改时区前应检查历史文章的显示是否符合预期。

## 分类和标签

- `tags` 为字符串数组。
- `categories` 支持平面数组与嵌套数组。
- `categoryMap` 将分类名称映射为 URL slug。
- `featuredCategories` 控制首页精选分类。
- `config/i18n-content.yaml` 提供分类与系列的本地化文案。

新增分类后检查分类映射、翻译、精选分类、归档索引和 Pagefind 可见文本。

## 置顶、草稿与目录

`sticky` 控制文章置顶排序。`draft` 标记草稿，开发预览和生产构建由当前内容选择逻辑决定。`catalog` 控制目录生成；`tocNumbering` 控制目录编号。

文章通过维护 Markdown / MDX 文件并重新构建发布。当前产品不提供 CMS 后台或浏览器内写作室。

## 系列 / 周刊

`config/site.yaml` 中的 `featuredSeries` 配置系列 slug、分类名、展示名称、描述、封面、启用状态与相关链接。系列页面根据配置和内容分类组织文章。系列阅读进度保存在浏览器本地。

```yaml
featuredSeries:
  - slug: weekly
    categoryName: 周刊
    label: 我的周刊
    fullName: 我的技术周刊
    description: 每期内容的主题说明
    cover: /img/weekly_header.webp
    enabled: true
    icon: ri:newspaper-line
```

系列链接仅保留当前产品实际需要的外部入口，不要添加 RSS、CMS 或内容管理服务配置。

## 图片与资源

文章图片引用 `public/` 下的静态资源路径。优先提供合适尺寸和格式，并保留响应式与懒加载能力。`pnpm generate:lqips` 是可选的低质量图片占位生成脚本。

不要将临时缓存或构建产物放入内容目录。更换封面 URL 可能影响文章卡片与社交预览。

## 内容加密

`password` 用于整篇文章加密配置；Markdown 也支持局部加密块。加密在构建阶段完成，密文和公开派生参数会随静态页面交付，因此不等于服务器鉴权。详见 [产品范围：数据与安全边界](../PRODUCT-SCOPE.md#7-数据与安全边界)。
