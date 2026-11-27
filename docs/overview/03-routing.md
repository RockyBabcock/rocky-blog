# 03 — 路由系统

## 路由来源

Rocky Blog 使用 Astro 文件路由。页面文件位于 `src/pages/`；内容索引和文章路径由路由文件调用共享内容逻辑生成。

默认语言为中文。英语、日语和法语页面由 `[lang]` 页面目录提供。路由镜像与例外规则集中在 `src/pages/_shared/utils.ts`；修改页面时，应同步检查其他语言的镜像与路由测试。

## 主要页面类型

当前产品页面包括：

- 首页。
- 文章详情页。
- 分类索引与分类详情页。
- 标签索引与标签详情页。
- 归档页及分页。
- 配置定义的系列 / 周刊页面。
- About 页面。
- Reading Shelf：默认语言为 `/shelf`，非默认语言镜像为 `/en/shelf`、`/ja/shelf`、`/fr/shelf`。
- 搜索入口和命令面板（客户端交互层）。

实际 URL 以 `src/pages/`、内容选择逻辑和站点配置为准。不要把历史路由或已移除功能写入当前路由清单。

## 本地化路由

| Locale | URL 规则 |
| --- | --- |
| zh | 默认语言，无前缀 |
| en | `/en/` |
| ja | `/ja/` |
| fr | `/fr/` |

非默认语言页面应与默认页面保持路径镜像。语言代码来自 `config/site.yaml`，翻译页面由 Astro 路由与共享 helpers 生成。

## 文章 URL

文章可以通过 frontmatter `link` 指定稳定 slug；未指定时按内容路由规则推导。修改已有文章的 `link` 或移动文件前，检查站内引用、翻译映射、canonical、hreflang 和历史外链。

## 路由保留与冲突

系列 slug、分类路径和自定义页面不能占用系统保留路由。保留列表由 `src/lib/config/reserved-routes.ts` 等共享配置维护。新增页面或系列前先检查保留路由测试，不要假定任意 slug 都可用。

## SEO 与错误页

页面元信息在 layout / HeadMeta 层集中输出。canonical、Open Graph、Twitter metadata、hreflang 和 x-default 必须一致。Sitemap 与 robots 由构建集成生成。

## RSS 已移除

默认语言与多语言 RSS 路由、RSS XSL 路由和语言镜像例外已从当前代码中删除。不要重新增加 RSS 页面。Sitemap、robots、canonical、Open Graph、hreflang 与 Pagefind 是独立功能，继续保留。
