# 贡献指南

感谢你为 Rocky Blog 提交修复、文档或改进。贡献内容应符合 [产品范围](./docs/PRODUCT-SCOPE.md)，并以当前代码为准；不要从过期教程中恢复已决定移除的功能。

## 开始之前

1. 阅读 [README](./README.md)、[快速开始](./GETTING-STARTED.md)、[AGENTS.md](./AGENTS.md)、[产品范围](./docs/PRODUCT-SCOPE.md) 和 [项目状态](./docs/PROJECT-STATUS.md)。
2. 检查现有 issue / PR，避免重复工作。
3. 确认提案属于保留范围；改变明确非目标需要维护者重新决策。

默认分支是 `main`。常规贡献请从最新 `main` 创建短期分支，并以 `main` 为 PR base。未经维护者明确要求，不要直接推送到 `main`。

## 变更原则

- **静态优先：** 默认在构建阶段完成工作，不引入不必要的后端、数据库、账号或云服务。
- **保持边界：** Astro 负责路由与静态内容；React 只用于确实需要客户端交互的 islands。
- **保留既有模块：** 优化或扩展时，不要无故删除内容模块或降低信息量。
- **一致的国际化：** UI 文案同步维护中文、英语、日语、法语；不要新增韩语。
- **视觉系统统一：** 复用 tokens、排版和间距体系；避免动漫 / kawaii 风格、无目的玻璃拟态和随机色值。
- **前端设计任务：** 开始 UI / 视觉修改前阅读 [前端设计实施 Prompt](./docs/FRONTEND-DESIGN-PROMPT.md)，保留全部模块，并按其中要求提交桌面 / 移动端视觉证据。
- **可访问性：** 支持键盘、焦点、合适语义结构、减少动态效果和移动端触控。
- **安全边界：** 不把构建期加密称作服务器鉴权；不把 localStorage 称作云同步。

## 本地检查

按改动范围执行检查。运行时代码变更应尽可能运行：

```bash
pnpm lint
pnpm check
pnpm test
pnpm build
```

涉及依赖或入口时可补充运行 `pnpm knip`。浏览器专项测试包括 `pnpm test:motion:browser`、`pnpm test:diagram:browser`、`pnpm test:search:browser`，这些测试需要相应 Playwright 浏览器环境。

文档-only 改动至少检查 Markdown 结构、相对链接、命令、文件路径和功能描述。修改文章时还要检查 frontmatter schema 和内容 lint。不要声称执行过未运行的检查；在 PR 描述中列出实际命令和结果。

## 提交与 PR

建议使用 Conventional Commit 风格：

- `docs: align product documentation`
- `fix: preserve reading history on route change`
- `feat: refine article reading controls`

PR 应说明变更目的、用户可见影响、修改范围、实际检查结果、未覆盖的验证和潜在风险。涉及 UI 时附桌面与移动端截图。不要提交密钥、个人访问令牌、私有内容或无关构建产物。

## 文档维护

产品决策改变时，先更新产品范围，再同步 README、配置说明、用户指南、各语言文档和测试。实际实现、阻塞或验证状态发生变化时，再更新 [项目状态与 Agent 交接](./docs/PROJECT-STATUS.md)，并附上 commit、CI 或 deployment 证据。不要填入未经批准的路线图、虚构进度百分比或未经验证的完成状态。带日期的性能报告属于历史记录；保留原始数据与日期，不要把历史路由当作当前功能清单。

`CHANGELOG.md` 当前是继承自上游 `cosZone/astro-koharu` 的历史记录，不是 Rocky Blog 的当前功能清单。在 git-cliff 配置与发布流程重新核实前，不要运行可能重写该文件的 `pnpm change`，也不要把其中列出的上游功能当作当前功能。Rocky Blog 的实际改动以本仓库 Git 历史为准。

## 产品清理边界

RSS 已从当前代码中完整移除。不要重新引入订阅路由、RSS 依赖、RSS metadata 或配置项。canonical、Open Graph、hreflang、sitemap、robots 与 Pagefind 属于独立能力，必须保持正常。
