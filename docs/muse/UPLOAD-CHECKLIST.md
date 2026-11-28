# MuseAI 内容上传前检查清单

## A. 文件和路径

- [ ] 中文主稿位于 `src/content/blog/<category-path>/<slug>.md`。
- [ ] 语言目录仅使用 `en/`、`ja/`、`fr/`，且相对路径与中文主稿镜像。
- [ ] 文件名采用稳定的小写 ASCII kebab-case。
- [ ] 已确认没有同路径文件或重复的 `link` / `translationKey`。
- [ ] 图片等资源文件真实存在，并已和 Markdown 一起上传到 `public/` 对应目录。

## B. Frontmatter

- [ ] `title` 和 `date` 已填写。
- [ ] 日期由维护者提供或确认，格式符合站点时区约定。
- [ ] 只使用 `src/content.config.ts` 已声明的字段。
- [ ] `link` 和 `translationKey` 在各语言文件之间一致。
- [ ] `categories` 与 `config/site.yaml` 中的分类映射一致。
- [ ] `tags` 使用现有标签体系，不擅自扩充分类配置。
- [ ] `cover` 和正文图片路径确实存在。
- [ ] `draft` 状态已明确；正式发布不得遗留 `draft: true`。
- [ ] 没有未经授权的 `password`、置顶设置或额外 frontmatter 字段。

## C. 正文与语言

- [ ] 文章与标题、摘要一致，没有无关扩写或关键词堆砌。
- [ ] 事实、数据、代码、引用和外部链接可核验。
- [ ] 没有伪造亲身经历、测试结果或统计数据。
- [ ] 代码围栏、Mermaid、Infographic、KaTeX 和 Shoka 容器均正确闭合。
- [ ] 翻译语义完整、术语统一，不声称未生成的语言版本已完成。
- [ ] 文章没有调用不存在的 CMS、评论、分析、推荐或媒体组件。

## D. 仓库验证

从仓库根目录运行：

```bash
pnpm lint-md
pnpm check
pnpm build
```

如改动涉及代码、配置或共享测试，再运行：

```bash
pnpm lint
pnpm test
pnpm knip
```

构建后检查实际生成的文章路由、语言切换、页面摘要、目录、图片、代码高亮和图表。只有实际执行的检查才能标记为通过。若 Muse 所在环境无法访问仓库或执行命令，应输出“未执行”，并给出维护者可复制运行的命令。

## E. 上传报告模板

```text
中文主稿：
译文：
图片 / 附件：
分类：
slug / translationKey：
Frontmatter：
Markdown 语法：
链接与来源：
执行的检查：
未完成项：
```