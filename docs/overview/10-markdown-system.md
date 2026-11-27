# 10 — Markdown 内容系统

## 内容处理

文章以 Markdown / MDX 形式保存在 `src/content/blog/`，由 Astro Content Collection 读取并通过 schema 验证。Markdown 管线将源文本转换为静态 HTML，并为特定语法输出客户端增强所需的标记。

Frontmatter 字段见 [02 — 内容系统](./02-content-system.md)。

## 基础能力

- **GFM：** 表格、任务列表、删除线等 GitHub 风格 Markdown。
- **Shiki：** 代码语法高亮。
- **KaTeX：** 数学公式。
- **Mermaid：** 流程图、时序图和其他图表。
- **Infographic：** 信息图语法与渲染。
- **标题与目录：** 标题锚点、目录生成和编号控制。

## Shoka 风格扩展

当前项目保留的扩展包括：
- 容器 / 提示块。
- 标签页。
- 折叠内容块。
- 文本装饰效果。
- 隐藏文字 / spoiler。
- Ruby 注音。

具体启用项位于 `config/site.yaml` 的 `content` 区域。写作语法以当前处理插件和 [使用指南](../../src/content/blog/tools/astro-koharu-guide.md) 为准。

## 代码块

代码块增强支持当前实现中的复制、全屏、折叠等交互。显示哪些操作取决于站点配置与组件行为。不要把旧教程中的 CMS、嵌入预览或播放器能力写进代码块说明。

## 图片

文章图片应提供可访问的 alt 文本和合适尺寸。现有图片体验包含响应式资源、懒加载、LQIP 占位与灯箱 / 缩放。新增图片增强时应避免重复绑定事件，兼容 Astro 客户端路由。

## Mermaid 源码与错误状态

Mermaid 渲染后的 SVG 可能包含 style 节点。SVG 的 textContent 不是 Mermaid 原始源码。源码视图、复制和刷新功能必须使用原始 diagram source 标记，不能将 SVG / CSS 文本当作图表定义。加载、成功和失败状态应清晰区分。

排查案例见 [Mermaid Firefox diagnosis](../mermaid-firefox-diagnosis.md)。

## 加密内容

整篇加密通过 frontmatter `password` 配置，局部内容可使用 `:::encrypted` 语法。项目使用 AES-256-GCM 构建期加密。

**安全限制：** 密文和公开派生参数会交付给浏览器，读者可下载后离线猜测密码。这不等同于服务器鉴权、DRM 或真正的私密内容托管。不要用来保护高敏感数据。

## 已不在范围内的内容能力

不要重新添加 Quiz、AI 摘要、语义相似推荐、外链 OG 预览、文章自定义音视频播放器、LRC 歌词或文章媒体播放列表。也不要在 Markdown 文档中描述评论、追番或社交统计组件。
