/**
 * Chinese (zh) — Default locale UI strings
 *
 * This is the source-of-truth dictionary. All translation keys are defined here.
 * Other locale files only need to provide translations for keys they override.
 */

export const uiStrings = {
  // Index pages
  'index.posts': '篇文章',
  'index.years': '年',
  'index.categories': '个分类',
  'index.tags': '个标签',
  'index.mostUsed': '最常用',
  'category.filter': '子分类',
  'tag.filter': '过滤标签',
  'tag.filterPlaceholder': '输入标签名称',
  'tag.noMatches': '没有匹配的标签',
  'tag.singleTags': '还有 {count} 个只出现过一次的标签',
  'archives.jumpToYear': '跳到 {year} 年',
  'archives.legendFew': '少',
  'archives.legendMany': '多',
  'archives.calendar': '写作日历',
  'archives.monthLabel': '{year} 年 {month} 月 · {count} 篇',

  // ── Navigation ──────────────────────────────────────────────
  'nav.home': '首页',
  'nav.posts': '文章',
  'nav.categories': '分类',
  'nav.tags': '标签',
  'nav.archives': '归档',
  'nav.about': '关于',
  'nav.weekly': '周刊',

  // ── Common ──────────────────────────────────────────────────
  'common.search': '搜索',
  'common.close': '关闭',
  'viewer.loadError': '查看器加载失败，请刷新页面重试。',
  'search.loadError': '搜索加载失败，请刷新页面重试。',
  'common.copy': '复制',
  'common.copied': '已复制',
  'common.copyFailed': '自动复制失败，请手动复制',
  'common.loading': '加载中...',
  'common.noResults': '没有找到结果',
  'common.backToTop': '回到顶部',
  'common.darkMode': '深色模式',
  'common.lightMode': '浅色模式',
  'common.toggleTheme': '切换主题',
  'common.language': '语言',
  'common.toc': '目录',
  'common.expand': '展开',
  'common.collapse': '收起',
  'common.menuLabel': '{name}菜单',

  // ── Post ────────────────────────────────────────────────────
  'post.readMore': '阅读全文',
  'post.totalPosts': '共 {count} 篇文章',
  'post.stickyPosts': '置顶文章',
  'post.postList': '文章列表',
  'post.featuredCategories': '精选分类',
  'post.yearPosts': '{count} 篇文章',
  'post.readingTime': '{time} 分钟阅读',
  'post.wordCount': '{count} 字',
  'post.publishedAt': '发布于 {date}',
  'post.updatedAt': '更新于 {date}',
  'post.prevPost': '上一篇',
  'post.nextPost': '下一篇',
  'post.seriesNavigation': '系列导航',
  'post.seriesPrev': '上一篇',
  'post.seriesNext': '下一篇',
  'post.fallbackNotice': '本文暂无{lang}翻译，显示原文内容',
  'post.markdown.copy': '复制 Markdown',
  'post.markdown.copied': '已复制',
  'post.markdown.downloadedInstead': '无法写入剪贴板，已改为下载',
  'post.markdown.failed': '获取 Markdown 失败',
  'post.markdown.more': '更多 Markdown 操作',
  'post.markdown.download': '下载 .md',
  'post.markdown.localEditors': '本地编辑器',
  'post.draft': '草稿',
  'post.pinned': '置顶',
  'post.noPostsFound': '暂无文章',

  // ── Categories & Tags ───────────────────────────────────────
  'category.allCategories': '所有分类',
  'category.postsInCategory': '{name} 分类下的文章',
  'category.totalCategories': '共 {count} 个分类',
  'category.categoryLabel': '分类',
  'tag.allTags': '所有标签',
  'tag.postsWithTag': '标签「{name}」下的文章',
  'tag.totalTags': '共 {count} 个标签',
  'tag.all': '全部',
  'tag.postCount': '{count} 篇文章',

  // ── Archives ────────────────────────────────────────────────
  'archives.title': '归档',
  'archives.totalPosts': '共 {count} 篇',

  // ── Search ──────────────────────────────────────────────────
  'search.placeholder': '请输入关键词搜索',
  'search.label': '搜索本站',
  'search.clear': '清空',
  'search.loadMore': '加载更多结果',
  'search.filters': '过滤器',
  'search.noResults': '没有找到结果',
  'search.manyResults': '[COUNT] 个结果',
  'search.oneResult': '[COUNT] 个结果',
  'search.altSearch': '没有找到结果。显示 [DIFFERENT_TERM] 的结果',
  'search.suggestion': '没有找到结果。尝试以下搜索：',
  'search.searching': '搜索 [SEARCH_TERM]...',
  'search.dialogTitle': '搜索文章',
  'search.dialogClose': '关闭',
  'search.dialogSelect': '选择',
  'search.dialogOpen': '打开',

  // ── Code Block ──────────────────────────────────────────────
  'code.copy': '复制代码',
  'code.copied': '已复制！',
  'code.fullscreen': '全屏查看',
  'code.exitFullscreen': '退出全屏',
  'code.wrapLines': '自动换行',
  'code.viewSource': '查看源码',
  'code.viewRendered': '查看渲染结果',
  'code.collapse': '收起代码',
  'code.expand': '展开代码',

  // ── Diagram / Infographic ───────────────────────────────────
  'diagram.fullscreen': '全屏查看',
  'diagram.exitFullscreen': '退出全屏',
  'diagram.viewSource': '查看源码',
  'diagram.zoomIn': '放大',
  'diagram.zoomOut': '缩小',
  'diagram.resetZoom': '重置缩放',
  'diagram.fitToScreen': '适应屏幕',
  'diagram.actualSize': '实际大小',
  'diagram.download': '下载图片',
  'diagram.resize': '调整图表大小',
  'diagram.resizeHint': '拖动调整大小，双击还原',
  'diagram.renderError': '图表暂时无法显示',
  'diagram.loadingSlow': '图表加载时间较长',
  'diagram.errorHelp': '可以刷新页面重试，或通过工具栏查看和复制图表源码。',
  'diagram.errorHelpNoSource': '请刷新页面重试。',
  'diagram.reload': '刷新重试',
  'diagram.gestureHint': '双指捏合或滚轮缩放 · 拖动平移 · 双击放大',

  // ── Image Lightbox ──────────────────────────────────────────
  'image.preview': '图片预览',
  'image.loadError': '图片加载失败',
  'image.retry': '重试',
  'image.hintMobileGallery': '左右滑动切图 · 双指缩放 · 下滑关闭',
  'image.zoomIn': '放大',
  'image.zoomOut': '缩小',
  'image.resetZoom': '重置',
  'image.resetZoomRotate': '重置缩放和旋转',
  'image.rotate': '旋转 90°',
  'image.close': '关闭',
  'image.prev': '上一张',
  'image.next': '下一张',
  'image.counter': '{current} / {total}',
  'image.hintDesktop': '双击放大 · 滚轮缩放 · 点击空白关闭',
  'image.hintMobile': '双击或双指缩放 · 下滑或轻点空白关闭',

  // ── Footer ──────────────────────────────────────────────────
  'footer.poweredBy': '由 {name} 驱动',
  'footer.totalPosts': '{count} 篇文章',
  'footer.totalWords': '{count} 字',
  'footer.totalWordsTitle': '站点总字数',
  'footer.readingTimeTitle': '站点阅读时长',
  'footer.postCountTitle': '文章总数',
  'footer.runningDays': '已运行 {days} 天',
  'footer.wordUnit': '字',
  'footer.postUnit': '篇',

  // ── Pagination ──────────────────────────────────────────────
  'pagination.label': '分页',
  'pagination.prev': '上一页',
  'pagination.next': '下一页',
  'pagination.page': '第 {page} 页',
  'pagination.currentPage': '第 {page} 页，当前页',
  'pagination.of': '共 {total} 页',

  // ── Breadcrumb ──────────────────────────────────────────────
  'breadcrumb.home': '首页',
  'breadcrumb.goToCategory': '前往{name}分类',

  // ── Floating Group ──────────────────────────────────────────
  'floating.backToTop': '回到顶部',
  'floating.scrollToBottom': '滚到底部',
  'floating.toggleTheme': '切换主题',
  'floating.toggleToolbar': '展开/收起工具栏',
  'floating.settings': '设置',

  // ── Settings Panel ────────────────────────────────────────
  'settings.title': '设置',
  'settings.reader': '阅读',
  'settings.general': '通用',
  'settings.closePanel': '关闭设置面板',
  'settings.fontPreset': '字体',
  'settings.fontPreset.round': '圆体',
  'settings.fontPreset.system': '系统黑体',
  'settings.fontPreset.serif': '衬线',
  'settings.fontPreset.wenkai': '文楷',
  'settings.fontSize': '字号',
  'settings.lineHeight': '行距',
  'settings.measure': '行宽',
  'settings.auto': '自动',
  'settings.justify': '两端对齐',
  'settings.scrollProgress': '滚动进度条',
  'settings.motionLevel': '动效强度',
  'settings.motionLevel.lively': '灵动',
  'settings.motionLevel.subtle': '克制',
  'settings.motionLevel.reduced': '减弱',
  'settings.motionLevel.livelyHint': '入场编排、封面落樱、滚动浮现与页面过渡全开',
  'settings.motionLevel.subtleHint': '保留入场与页面过渡，关闭封面落樱与正文滚动浮现',
  'settings.motionLevel.reducedHint': '只保留必要的交互反馈',
  'settings.motionLevel.systemReduced': '系统已开启「减少动态效果」，将始终按「减弱」处理',
  'settings.wave': '封面海浪',
  'settings.reset': '重置为默认',
  'settings.waveDisabledByReducedMotion': '动效强度为「减弱」时不可用',
  'settings.invalidNumber': '请输入正数',

  // ── Encrypted Block ─────────────────────────────────────────
  'encrypted.locked': '内容已加密',
  'encrypted.placeholder': '请输入密码查看内容',
  'encrypted.submit': '解锁',
  'encrypted.incorrect': '密码错误',

  // ── Encrypted Post ─────────────────────────────────────────
  'encrypted.post.title': '此文章已加密',
  'encrypted.post.description': '请输入密码以查看文章内容',
  'encrypted.post.rssNotice': '此文章已加密，请在网页中查看',

  // ── 404 ─────────────────────────────────────────────────────
  'notFound.title': '页面未找到',
  'notFound.description': '你访问的页面不存在',
  'notFound.backHome': '返回首页',
  'notFound.browseArchives': '浏览归档',
  'notFound.message': '抱歉，你访问的页面不存在或已被移动。',

  // ── Category Stats ────────────────────────────────────────
  'category.subCategoryCount': '{count} 个子分类',
  'category.postCount': '{count} 篇文章',

  // ── Post Card ─────────────────────────────────────────────
  'post.readingTimeTooltip': '预计阅读时长: {time}',

  // ── Featured Series ─────────────────────────────────────────
  'series.latestPost': '最新文章',
  'series.viewAll': '查看全部',
  'series.postCount': '{count} 篇',
  'series.position': '第 {current} / {total} 篇',
  'series.noPosts': '暂无系列文章',
  'series.rss': 'RSS 订阅',
  'series.chromeExtension': 'Chrome 插件',
  'series.docs': '文档',
  'series.issues': '期',
  'series.latestIssue': '最新一期',
  'series.readIssue': '阅读本期',

  // ── Home Info ───────────────────────────────────────────────
  'homeInfo.articles': '文章',
  'homeInfo.categories': '分类',
  'homeInfo.tags': '标签',
  'homeInfo.greetingMorning': '早上好呀',
  'homeInfo.greetingAfternoon': '下午好呀',
  'homeInfo.greetingEvening': '晚上好呀',
  'homeInfo.greetingNight': '夜深了，早点休息',

  // ── Drawer ──────────────────────────────────────────────────
  'drawer.navMenu': '导航菜单',
  'drawer.close': '关闭菜单',
  'drawer.openMenu': '打开菜单',

  // ── Summary Panel ───────────────────────────────────────────
  'summary.description': '人工摘要',

  // ── Latest Posts ────────────────────────────────────────────
  'post.latestPosts': '最新文章',

  // ── Tag Component ───────────────────────────────────────────
  'tag.expandAll': '展开全部',
  'tag.viewTagPosts': '查看标签「{tag}」的 {count} 篇文章',

  // ── Table of Contents ───────────────────────────────────────
  'toc.title': '文章目录',
  'toc.sectionProgress': '本节阅读进度',
  'toc.expand': '展开目录',
  'toc.empty': '暂无目录',

  // ── Content ───────────────────────────────────────────────
  'content.revealSpoiler': '点击显示隐藏内容',

  // ── Search Shortcut ───────────────────────────────────────
  'search.searchShortcut': '搜索 ({shortcut})',

  // ── Sider Segmented ─────────────────────────────────────────
  'sider.overview': '站点概览',
  'sider.toc': '文章目录',
  'sider.series': '系列文章',

  // ── Copy Link ───────────────────────────────────────────────
  'cover.copyLink': '复制链接',

  // ── Cross-Language & Fallback ──────────────────────────────
  'post.viewOriginal': '查看{lang}原文',
  'post.originalLocale': '原文：{lang}',
  'language.nativeAvailable': '已有翻译',
  'language.fallbackLabel': '原文回退',

  // ── Search Upgrade ─────────────────────────────────────────
  'search.filterCategory': '分类',
  'search.filterTag': '标签',
  'search.filterLanguage': '语言',
  'search.clearFilters': '清空筛选',
  'search.all': '全部',
  'search.resultCount': '找到 {count} 篇相关文章',
  'search.emptyPrompt': '输入关键词搜索全文，或直接选择下方筛选条件',
  'search.retry': '重试',
  'search.openCommands': '打开命令面板',
  'search.shortcutHint': '命令面板',

  // ── Reading History ────────────────────────────────────────
  'history.title': '最近阅读',
  'history.continueReading': '继续阅读',
  'history.empty': '暂无本地阅读记录',
  'history.clearAll': '清空记录',
  'history.cleared': '已清空本地阅读记录',
  'history.removeItem': '移除记录',
  'history.progress': '已读 {percent}%',
  'history.completed': '已读完',
  'history.justNow': '刚刚',
  'history.minutesAgo': '{count} 分钟前',
  'history.hoursAgo': '{count} 小时前',
  'history.daysAgo': '{count} 天前',

  // ── Command Palette ────────────────────────────────────────
  'command.title': '快捷命令面板',
  'command.placeholder': '输入命令或搜索站内页面...',
  'command.empty': '没有匹配的命令',
  'command.groupNav': '快速导航',
  'command.groupActions': '快捷操作',
  'command.groupRecent': '最近阅读',
  'command.searchPosts': '搜索文章',
  'command.searchForQuery': '在文章中搜索「{query}」',
  'command.openSettings': '打开阅读设置',
  'command.toggleFocus': '切换专注阅读模式',
  'command.toggleTheme': '切换浅色 / 深色主题',
  'command.trigger': '快捷命令',
  'command.navigateHint': '选择',
  'command.executeHint': '执行',

  // ── Article Share ──────────────────────────────────────────
  'share.title': '分享',
  'share.copyLink': '复制文章链接',
  'share.copyMarkdown': '复制 Markdown 链接',
  'share.nativeShare': '系统分享',
  'share.linkCopied': '已复制文章链接',
  'share.markdownCopied': '已复制 Markdown 链接',
  'share.shared': '已调起系统分享',
  'share.failed': '复制失败，请手动复制地址栏链接',

  // ── Focus Reading Mode ─────────────────────────────────────
  'focus.enter': '专注阅读',
  'focus.exit': '退出专注',
  'focus.active': '专注阅读模式',
  'focus.shortcutHint': '按 Esc 退出专注阅读',

  // ── Series Reading Route ───────────────────────────────────
  'series.progressTitle': '系列阅读进度',
  'series.completedCount': '已读 {read} / {total} 篇',
  'series.continueReading': '继续阅读',
  'series.startReading': '从头开始',
  'series.statusRead': '已读',
  'series.statusInProgress': '已读 {percent}%',
  'series.backToSeries': '返回系列目录',
  'series.partOfSeries': '所属系列',

  // ── Archives Timeline ──────────────────────────────────────
  'archives.timelineTitle': '文章时间线',
  'archives.allYears': '全部年份',
  'archives.quickJump': '快速跳转',

  // ── Home Editorial Dashboard ───────────────────────────────
  'home.heroExplore': '探索文章',
  'home.heroSearch': '搜索文章',
  'home.featuredSection': '精选内容',
  'home.featuredSubtitle': '置顶推荐与系列亮点',
  'home.latestSubtitle': '按时间整理的最新文章与随笔',
  'home.seriesSection': '系列与周刊',
  'home.seriesSubtitle': '按主题持续更新的专题阅读路线',
  'home.exploreTopics': '内容探索',
  'home.exploreSubtitle': '按分类与热门标签发现更多主题',
  'home.popularTags': '热门标签',
  'home.allTags': '全部标签',
  'home.allCategories': '全部分类',
  'home.timelineSection': '写作时间线',
  'home.timelineSubtitle': '近期更新与年度创作脉络',
  'home.viewFullArchives': '查看完整归档',
  'home.railSearchHint': '搜索文章、标签或分类...',
  'home.railHistoryEmptyHint': '阅读文章后会自动在本地记录进度，方便随时回来续读。',
  'home.railStartExplore': '从精选开始阅读',
  'home.railArchiveSummary': '年度归档',
  'home.railTopicsSummary': '常用分类',
  'home.viewAllPosts': '查看全部文章',
} as const;
