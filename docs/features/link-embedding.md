# 链接预览卡片功能

自动将文章中独行的网页链接转换为静态 OG (Open Graph) 预览卡片，同时保持段落内的行内链接样式不变。

## 功能特性

### 1. 通用 OG 链接预览卡片

为独行的普通链接在构建期抓取 OG 元数据并生成完全静态的预览卡片：

- 构建时获取 OG 元数据（标题、描述、预览图）
- 完全静态化，零客户端运行时 JavaScript 开销
- 自动显示网站图标（favicon）和域名
- 响应式布局，适配桌面端与移动端
- 优雅的错误处理与降级（抓取失败时保留普通链接）
- 使用 Tailwind 主题变量自动适配深色 / 浅色模式
- SEO 友好，搜索引擎可直接索引卡片内容

**示例：**

```markdown
这是一个独行的链接，构建时会自动转换为静态 OG 预览卡片：

https://astro.build/
```

### 2. 行内链接保持不变

段落中的链接不会被转换为卡片，保持原有行内样式：

```markdown
这段话中的链接 [Astro](https://astro.build/) 不会被转换。
```

## 工作原理

1. **Remark 插件解析**：`remark-link-embed` 在 Markdown 编译时识别段落中唯一的独行 HTTP/HTTPS 链接。
2. **构建期抓取**：使用 **metascraper** 抓取目标页面的 OG 元数据，并缓存到 `.cache/og-data.json`。
3. **静态 HTML 生成**：通过 `link-card-template.ts` 生成纯静态 HTML 卡片，无需客户端水合或第三方脚本。

```plain
Markdown 文件
    ↓
remark-link-embed 插件（识别独行链接）
    ↓
metascraper 构建期获取 OG 数据（命中 .cache/og-data.json 缓存）
    ↓
生成纯静态 HTML 链接卡片
```

## 配置选项

在 `config/site.yaml` 的 `content:` 段中配置：

```yaml
content:
  enableLinkEmbed: true # 链接预览卡片总开关
  enableOGPreview: true # 是否启用 OG 预览卡片
  previewCacheTime: 30 # 预览缓存时间（天）
```

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `enableLinkEmbed` | `true` | 是否启用独行链接预览总开关 |
| `enableOGPreview` | `true` | 是否启用 OG 元数据预览卡片 |
| `previewCacheTime` | `30` | `.cache/og-data.json` 缓存有效期（天） |

默认值与校验逻辑由 `src/lib/config/content.ts` 中的 `normalizeContentConfig()` 统一维护。修改 `config/site.yaml` 后需重启 dev server 或重新构建。

## 文件结构

```plain
src/
├── lib/
│   └── markdown/
│       ├── remark-link-embed.ts   # Remark 插件（使用 metascraper + 磁盘缓存）
│       ├── link-utils.ts          # 独行链接检测工具
│       └── link-card-template.ts  # 静态 OG 卡片 HTML 模板
└── styles/
    └── components/
        └── embed.css              # 链接预览卡片样式
```

## 故障排除

1. 检查目标网站是否提供 Open Graph (`og:title`, `og:description`, `og:image`) 或标准 HTML meta 标签。
2. 查看构建日志，确认抓取是否超时或被目标站点限制访问。
3. 如需关闭链接预览，在 `config/site.yaml` 中设置 `content.enableLinkEmbed: false` 或 `content.enableOGPreview: false`。
