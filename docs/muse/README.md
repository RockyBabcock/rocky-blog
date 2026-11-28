# MuseAI 内容生产与交付规范

> 本目录是 Rocky Blog 的文章内容生产单一规范入口。MuseAI 负责撰写、翻译和修订文章；Rocky Blog 仓库负责校验、静态构建与发布。

## 工作边界

- Rocky Blog 是 Astro 静态博客，不包含 CMS、在线写作室、浏览器编辑器、文章管理后台或 AI 写作 API。
- MuseAI 是外部内容生产者，不是网站运行时依赖。Muse 输出 Markdown / MDX 文件和确实存在的媒体资源，由维护者上传到仓库。
- 不要为内容生产恢复本地编辑器快捷入口、原始 Markdown 复制 / 下载功能或其他站内写作工具。
- Muse 只能使用当前仓库支持的 frontmatter 字段、分类和 Markdown 语法。不要通过修改 schema 或站点配置来迁就单篇文章。
- 网站目前支持的 UI locale 固定为 `zh`、`en`、`ja`、`fr`；不生成韩语目录。

## 文档导航

| 文档 | 用途 |
| --- | --- |
| [内容 Schema](./CONTENT-SCHEMA.md) | frontmatter 字段、必填规则、正确模板 |
| [目录与分类](./CONTENT-STRUCTURE.md) | 文件路径、分类路径、多语言镜像和 slug 规则 |
| [Markdown 能力](./MARKDOWN-SPEC.md) | 当前真正可用的 Markdown / Shoka / Mermaid / KaTeX / Infographic 语法 |
| [编辑标准](./EDITORIAL-STANDARDS.md) | 文章结构、语气、事实核查、引用和内容质量 |
| [上传前检查](./UPLOAD-CHECKLIST.md) | 文件交付和构建验收流程 |
| [新文章 Prompt](./prompts/NEW-ARTICLE.md) | 让 Muse 从零生成一篇 Rocky Blog 文章 |
| [翻译 Prompt](./prompts/TRANSLATE.md) | 创建英、日、法译文 |
| [审核修订 Prompt](./prompts/REVIEW-AND-FIX.md) | 审查并修复已有 Markdown |

## 固定生产流程

1. 读取本目录文档，并以 `src/content.config.ts`、`config/site.yaml` 和现有文章为实现事实来源。
2. 先确定文章主题、受众、中文分类、稳定 slug、发布时间和需要交付的语言。
3. 生成中文主文件；需要翻译时，在相同任务中生成对应语言镜像文件。
4. 对每个文件检查 YAML frontmatter、相对路径、分类、标签、链接、代码块闭合和本仓库支持的 Markdown 语法。
5. 只引用已提供或可核验的资料；不虚构测试结果、个人经历、产品功能、数据和来源。
6. 将 Markdown 文件及实际存在的图片 / 附件一起上传到指定路径。
7. 运行适用检查，至少以 `pnpm build` 验证内容集合和静态页面生成。未实际运行的命令不得标记为通过。

## Muse 输出约定

每次交付至少提供：

- 文件清单：每个文件的完整仓库相对路径。
- 每个文件完整内容：从 `---` 开始的 frontmatter 到正文结尾，不省略、不用伪代码。
- 资源清单：图片等资源的文件名、目标 `public/` 路径和是否已实际提供文件。
- 验收报告：分类、slug、语言镜像、链接和 Markdown 检查结果。
- 未完成项：缺失来源、待补图片、未翻译语言或未执行验证必须明确列出。

除非维护者明确要求，否则 Muse 不修改 `src/`、`config/`、`package.json`、Astro 配置、路由或测试代码。