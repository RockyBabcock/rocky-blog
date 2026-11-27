# 04 — 组件与交互模式

## Astro 与 React 的职责

组件选型由交互需求决定：

- **Astro：** 静态布局、页面结构、文章内容、SEO 元信息、导航外壳和无需客户端状态的展示。
- **React：** 需要局部状态、复杂事件、键盘交互、手势、动画编排或客户端订阅的组件。
- **原生脚本：** 简单轻量、与 React 无关的浏览器增强，但必须遵循 Astro ClientRouter 生命周期。

不要为了抽象复用把静态内容全部改成 React。客户端 JavaScript 会增加下载、执行和 hydration 成本。

## Island 边界

React island 应做到：

1. 只接收必要且可序列化的 props。
2. 将状态限制在实际交互边界内。
3. 避免重复创建全局事件监听器。
4. 明确处理挂载、路由切换和卸载。
5. 为移动端、键盘和 reduced-motion 提供可用体验。
6. 大型依赖按需加载，不要默认进入首页关键路径。

Hydration 时机应按内容重要性和交互需求选择。装饰性小组件不应无故提前 hydration。

## 页面与全局壳层

全局布局由 Layout 层组织，包含客户端导航、加载指示、工具提示、启动脚本、HeadMeta 和 AppShell。全局组件不能假设每次导航都会完整刷新 document。

页面应组合已有布局和模块。新增功能前先搜索相同职责的组件、hook 或 lib。

## 客户端路由生命周期

Astro 客户端导航可能复用 document。事件监听、MutationObserver、ResizeObserver、IntersectionObserver 和 store 订阅都应具备初始化与 cleanup。不得在每次页面切换时重复绑定，也不能只依赖首次 DOMContentLoaded。

## 内容增强

Markdown 增强由内容管线与客户端 ContentEnhancer 共同完成。渲染后的 DOM 不一定保留原始 Markdown 源码。例如 Mermaid SVG 内部包含 style 文本；需要源码时必须读取保存的原始 diagram source，不能把 SVG 的 textContent 当作源码。

图片灯箱、代码工具栏和目录交互应在不破坏文章语义与无 JS 阅读能力的前提下增强。

## 可访问性

- 使用原生 button / anchor 语义，不要用无键盘行为的 div 模拟控件。
- 图标按钮需要 accessible name。
- 弹层正确管理焦点、Esc 关闭与焦点返回。
- 拖拽 / 手势提供点击或键盘替代方式。
- 动画遵循 prefers-reduced-motion 和站点动效等级。
- 浅色 / 深色、桌面 / 移动端都要检查对比度、焦点指示和触控目标。

## 删除或重构前

先搜索导入方、动态导入、Astro hydration 入口、内容渲染注册和测试。静态扫描可能漏掉 Astro island 使用关系；不要只凭 Knip 的一条未使用报告删除组件。
