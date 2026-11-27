# 11 — 国际化与 SEO

## 支持语言

当前支持四种语言：

| Locale | 语言 | 是否默认 | URL |
| --- | --- | --- | --- |
| `zh` | 中文 | 是 | 无前缀 |
| `en` | English | 否 | `/en/` |
| `ja` | 日本語 | 否 | `/ja/` |
| `fr` | Français | 否 | `/fr/` |

配置入口为 `config/site.yaml` 的 `i18n`。不要添加韩语或其他语言，除非产品范围经过维护者明确更新。

## 三类翻译内容

### UI 字典

导航、按钮、提示、空状态、设置和通用界面文案由 `src/i18n/` 管理。改动用户可见文案时检查四种 locale 的字典是否完整，避免某一种语言暴露 key、空白或意外混用。

### 内容标签翻译

分类、系列等内容实体的本地化映射位于 `config/i18n-content.yaml`。新增分类或系列时，应同步维护对应语言标签。

### 文章翻译

默认中文文章放在 `src/content/blog/`。其他语言译文放在相同相对路径的 `en/`、`ja/`、`fr/` 子目录。建议使用相同 `link` 和一致 `translationKey`。

UI 支持四种语言不代表每篇文章都有四份译文。译文缺失时按当前内容回退逻辑展示，不得伪装为完整翻译。

## 路由生成

默认语言没有 URL 前缀，非默认语言按语言代码加前缀。页面文件应遵循现有 root / `[lang]` 镜像方式。镜像校验和例外集中在 `src/pages/_shared/utils.ts`。新增路由或修改路由结构时运行 i18n 测试。

## SEO 元信息

HeadMeta / 页面布局集中处理：

- canonical：当前页面规范 URL。
- Open Graph：分享卡片的标题、描述和图片。
- Twitter metadata：社交平台分享 metadata。
- hreflang：不同语言版本之间的关联。
- x-default：默认语言回退目标。

多语言页面的 canonical 不应全部指向默认语言。hreflang 只应声明真实存在或由路由实际生成的有效语言版本，避免虚构缺失译文。

## Sitemap 与 robots

Astro sitemap 和 robots.txt 集成负责静态站点索引与爬虫策略。更新域名、语言路由和页面生成规则时，检查 sitemap 与 robots 输出。

RSS 与 sitemap 是不同功能。RSS 已列为产品非目标，并已从当前代码中完整移除；sitemap、robots、canonical、Open Graph、hreflang 与 Twitter metadata 是独立能力，必须继续保留。

## Pagefind

Pagefind 在构建阶段生成静态搜索索引。验证多语言搜索时，确认语言标签、索引内容和页面 URL 一致。不要把 Pagefind 描述成后端搜索 API。

## 验证清单

- [ ] 四种 UI 语言均有完整字典。
- [ ] 默认语言 URL 无前缀，其他语言有正确前缀。
- [ ] 翻译文章路径镜像正确。
- [ ] 缺失译文有明确回退行为。
- [ ] canonical、Open Graph、hreflang、x-default 合理。
- [ ] sitemap 仅包含预期页面。
- [ ] robots 输出符合部署策略。
- [ ] Pagefind 索引和搜索语言正确。
