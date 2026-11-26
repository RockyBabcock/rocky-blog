/**
 * English (en) — UI strings
 *
 * Keys not present here will fall back to the default locale (zh).
 */

import type { UIStrings } from '../types';

export const uiStrings: UIStrings = {
  // Index pages
  'index.posts': 'posts',
  'index.years': 'years',
  'index.categories': 'categories',
  'index.tags': 'tags',
  'index.mostUsed': 'most used',
  'category.filter': 'Subcategories',
  'tag.filter': 'Filter tags',
  'tag.filterPlaceholder': 'Enter a tag name',
  'tag.noMatches': 'No matching tags',
  'tag.singleTags': '{count} more tags used only once',
  'archives.jumpToYear': 'Jump to {year}',
  'archives.legendFew': 'Less',
  'archives.legendMany': 'More',
  'archives.calendar': 'Writing calendar',
  'archives.monthLabel': '{year}, month {month} · {count} posts',

  // ── Navigation ──────────────────────────────────────────────
  'nav.home': 'Home',
  'nav.posts': 'Posts',
  'nav.categories': 'Categories',
  'nav.tags': 'Tags',
  'nav.archives': 'Archives',
  'nav.about': 'About',
  'nav.weekly': 'Weekly',

  // ── Common ──────────────────────────────────────────────────
  'common.search': 'Search',
  'common.close': 'Close',
  'viewer.loadError': 'The viewer could not load. Refresh the page to try again.',
  'search.loadError': 'Search could not load. Refresh the page to try again.',
  'common.copy': 'Copy',
  'common.copied': 'Copied',
  'common.copyFailed': 'Automatic copy failed. Copy the link manually.',
  'common.loading': 'Loading...',
  'common.noResults': 'No results found',
  'common.backToTop': 'Back to top',
  'common.darkMode': 'Dark mode',
  'common.lightMode': 'Light mode',
  'common.toggleTheme': 'Toggle theme',
  'common.language': 'Language',
  'common.toc': 'Table of Contents',
  'common.expand': 'Expand',
  'common.collapse': 'Collapse',
  'common.menuLabel': '{name} menu',

  // ── Post ────────────────────────────────────────────────────
  'post.readMore': 'Read more',
  'post.totalPosts': '{count} posts',
  'post.stickyPosts': 'Pinned Posts',
  'post.postList': 'Posts',
  'post.featuredCategories': 'Featured Categories',
  'post.yearPosts': '{count} posts',
  'post.readingTime': '{time} min read',
  'post.wordCount': '{count} words',
  'post.publishedAt': 'Published {date}',
  'post.updatedAt': 'Updated {date}',
  'post.prevPost': 'Previous',
  'post.nextPost': 'Next',
  'post.seriesNavigation': 'Series Navigation',
  'post.seriesPrev': 'Previous',
  'post.seriesNext': 'Next',
  'post.fallbackNotice': 'This post is not yet available in {lang}. Showing the original.',
  'post.markdown.copy': 'Copy Markdown',
  'post.markdown.copied': 'Copied',
  'post.markdown.downloadedInstead': 'Clipboard unavailable, downloaded instead',
  'post.markdown.failed': 'Couldn’t load the Markdown',
  'post.markdown.more': 'More Markdown actions',
  'post.markdown.download': 'Download .md',
  'post.markdown.localEditors': 'Local editors',
  'post.draft': 'Draft',
  'post.pinned': 'Pinned',
  'post.noPostsFound': 'No posts found',

  // ── Categories & Tags ───────────────────────────────────────
  'category.allCategories': 'All Categories',
  'category.postsInCategory': 'Posts in {name}',
  'category.totalCategories': '{count} categories',
  'category.categoryLabel': 'Category',
  'tag.allTags': 'All Tags',
  'tag.postsWithTag': 'Posts tagged "{name}"',
  'tag.totalTags': '{count} tags',
  'tag.all': 'All',
  'tag.postCount': '{count} posts',

  // ── Archives ────────────────────────────────────────────────
  'archives.title': 'Archives',
  'archives.totalPosts': '{count} posts',

  // ── Search ──────────────────────────────────────────────────
  'search.placeholder': 'Search by keyword',
  'search.label': 'Search this site',
  'search.clear': 'Clear',
  'search.loadMore': 'Load more results',
  'search.filters': 'Filters',
  'search.noResults': 'No results found',
  'search.manyResults': '[COUNT] results',
  'search.oneResult': '[COUNT] result',
  'search.altSearch': 'No results found. Showing results for [DIFFERENT_TERM]',
  'search.suggestion': 'No results found. Try searching for:',
  'search.searching': 'Searching [SEARCH_TERM]...',
  'search.dialogTitle': 'Search Posts',
  'search.dialogClose': 'Close',
  'search.dialogSelect': 'Select',
  'search.dialogOpen': 'Open',

  // ── Code Block ──────────────────────────────────────────────
  'code.copy': 'Copy code',
  'code.copied': 'Copied!',
  'code.fullscreen': 'Full screen',
  'code.exitFullscreen': 'Exit full screen',
  'code.wrapLines': 'Word wrap',
  'code.viewSource': 'View source',
  'code.viewRendered': 'View rendered',
  'code.collapse': 'Collapse code',
  'code.expand': 'Expand code',

  // ── Diagram / Infographic ───────────────────────────────────
  'diagram.fullscreen': 'Full screen',
  'diagram.exitFullscreen': 'Exit full screen',
  'diagram.viewSource': 'View source',
  'diagram.zoomIn': 'Zoom in',
  'diagram.zoomOut': 'Zoom out',
  'diagram.resetZoom': 'Reset zoom',
  'diagram.fitToScreen': 'Fit to screen',
  'diagram.actualSize': 'Actual size',
  'diagram.download': 'Download image',
  'diagram.resize': 'Resize diagram',
  'diagram.resizeHint': 'Drag to resize, double-click to reset',
  'diagram.renderError': 'This diagram could not be displayed',
  'diagram.loadingSlow': 'This diagram is taking longer to load',
  'diagram.errorHelp': 'Reload to try again, or use the toolbar to view and copy the diagram source.',
  'diagram.errorHelpNoSource': 'Reload the page to try again.',
  'diagram.reload': 'Reload',
  'diagram.gestureHint': 'Pinch or scroll wheel to zoom · Drag to pan · Double-click to zoom in',

  // ── Image Lightbox ──────────────────────────────────────────
  'image.preview': 'Image preview',
  'image.loadError': 'This image could not be loaded',
  'image.retry': 'Retry',
  'image.hintMobileGallery': 'Swipe to browse · Pinch to zoom · Swipe down to close',
  'image.zoomIn': 'Zoom in',
  'image.zoomOut': 'Zoom out',
  'image.resetZoom': 'Reset',
  'image.resetZoomRotate': 'Reset zoom and rotation',
  'image.rotate': 'Rotate 90°',
  'image.close': 'Close',
  'image.prev': 'Previous',
  'image.next': 'Next',
  'image.counter': '{current} / {total}',
  'image.hintDesktop': 'Double-click to zoom · Scroll to scale · Click outside to close',
  'image.hintMobile': 'Double-tap or pinch to zoom · Swipe down or tap outside to close',

  // ── Footer ──────────────────────────────────────────────────
  'footer.poweredBy': 'Powered by {name}',
  'footer.totalPosts': '{count} posts',
  'footer.totalWords': '{count} words',
  'footer.totalWordsTitle': 'Total words',
  'footer.readingTimeTitle': 'Total reading time',
  'footer.postCountTitle': 'Total posts',
  'footer.runningDays': 'Running for {days} days',
  'footer.wordUnit': 'words',
  'footer.postUnit': 'posts',

  // ── Pagination ──────────────────────────────────────────────
  'pagination.label': 'Pagination',
  'pagination.prev': 'Previous',
  'pagination.next': 'Next',
  'pagination.page': 'Page {page}',
  'pagination.currentPage': 'Page {page}, current page',
  'pagination.of': 'of {total}',

  // ── Breadcrumb ──────────────────────────────────────────────
  'breadcrumb.home': 'Home',
  'breadcrumb.goToCategory': 'Go to {name} category',

  // ── Floating Group ──────────────────────────────────────────
  'floating.backToTop': 'Back Top',
  'floating.scrollToBottom': 'Scroll Bottom',
  'floating.toggleTheme': 'Toggle theme',
  'floating.toggleToolbar': 'Toggle toolbar',
  'floating.settings': 'Settings',

  // ── Settings Panel ────────────────────────────────────────
  'settings.title': 'Settings',
  'settings.reader': 'Reading',
  'settings.general': 'General',
  'settings.closePanel': 'Close settings panel',
  'settings.fontPreset': 'Font',
  'settings.fontPreset.round': 'Rounded',
  'settings.fontPreset.system': 'System',
  'settings.fontPreset.serif': 'Serif',
  'settings.fontPreset.wenkai': 'WenKai',
  'settings.fontSize': 'Font size',
  'settings.lineHeight': 'Line height',
  'settings.measure': 'Measure',
  'settings.auto': 'Auto',
  'settings.justify': 'Justify',
  'settings.scrollProgress': 'Scroll progress bar',
  'settings.motionLevel': 'Motion',
  'settings.motionLevel.lively': 'Lively',
  'settings.motionLevel.subtle': 'Subtle',
  'settings.motionLevel.reduced': 'Reduced',
  'settings.motionLevel.livelyHint': 'Entrances, scroll reveals and sakura effects',
  'settings.motionLevel.subtleHint': 'Entrances and transitions only, no reveals or petals',
  'settings.motionLevel.reducedHint': 'Only essential interaction feedback',
  'settings.motionLevel.systemReduced': 'Your system asks for reduced motion, so motion stays reduced',
  'settings.wave': 'Cover waves',
  'settings.reset': 'Reset to default',
  'settings.waveDisabledByReducedMotion': 'Unavailable while motion is set to "Reduced"',
  'settings.invalidNumber': 'Enter a positive number',

  // ── Encrypted Block ─────────────────────────────────────────
  'encrypted.locked': 'Encrypted content',
  'encrypted.placeholder': 'Enter password to unlock',
  'encrypted.submit': 'Unlock',
  'encrypted.incorrect': 'Wrong password',

  // ── Encrypted Post ─────────────────────────────────────────
  'encrypted.post.title': 'This post is encrypted',
  'encrypted.post.description': 'Please enter the password to view the content',
  'encrypted.post.rssNotice': 'This post is encrypted. Please view it on the website.',

  // ── 404 ─────────────────────────────────────────────────────
  'notFound.title': 'Page Not Found',
  'notFound.description': 'The page you are looking for does not exist',
  'notFound.backHome': 'Back to Home',
  'notFound.browseArchives': 'Browse Archives',
  'notFound.message': 'Meow? The page was eaten~',

  // ── Category Stats ────────────────────────────────────────
  'category.subCategoryCount': '{count} subcategories',
  'category.postCount': '{count} posts',

  // ── Post Card ─────────────────────────────────────────────
  'post.readingTimeTooltip': 'Estimated reading time: {time}',

  // ── Featured Series ─────────────────────────────────────────
  'series.latestPost': 'Latest',
  'series.viewAll': 'View all',
  'series.postCount': '{count} posts',
  'series.position': '{current} of {total}',
  'series.noPosts': 'No posts in this series',
  'series.rss': 'RSS Feed',
  'series.chromeExtension': 'Chrome Extension',
  'series.docs': 'Documentation',
  'series.issues': 'issues',
  'series.latestIssue': 'Latest issue',
  'series.readIssue': 'Read this issue',

  // ── Home Info ───────────────────────────────────────────────
  'homeInfo.articles': 'Articles',
  'homeInfo.categories': 'Categories',
  'homeInfo.tags': 'Tags',
  'homeInfo.greetingMorning': 'Good morning!',
  'homeInfo.greetingAfternoon': 'Good afternoon!',
  'homeInfo.greetingEvening': 'Good evening!',
  'homeInfo.greetingNight': 'Up late? Rest well',

  // ── Drawer ──────────────────────────────────────────────────
  'drawer.navMenu': 'Navigation menu',
  'drawer.close': 'Close menu',
  'drawer.openMenu': 'Open menu',

  // ── Summary Panel ───────────────────────────────────────────
  'summary.description': 'Summary',

  // ── Latest Posts ────────────────────────────────────────────
  'post.latestPosts': 'Latest Posts',

  // ── Tag Component ───────────────────────────────────────────
  'tag.expandAll': 'Show all',
  'tag.viewTagPosts': 'View {count} posts tagged "{tag}"',

  // ── Table of Contents ───────────────────────────────────────
  'toc.title': 'Table of Contents',
  'toc.sectionProgress': 'Section reading progress',
  'toc.expand': 'Expand table of contents',
  'toc.empty': 'No headings',

  // ── Content ───────────────────────────────────────────────
  'content.revealSpoiler': 'Reveal spoiler',

  // ── Search Shortcut ───────────────────────────────────────
  'search.searchShortcut': 'Search ({shortcut})',

  // ── Sider Segmented ─────────────────────────────────────────
  'sider.overview': 'Overview',
  'sider.toc': 'Contents',
  'sider.series': 'Series',

  // ── Copy Link ───────────────────────────────────────────────
  'cover.copyLink': 'Copy link',

  // ── Cross-Language & Fallback ──────────────────────────────
  'post.viewOriginal': 'View original ({lang})',
  'post.originalLocale': 'Original: {lang}',
  'language.nativeAvailable': 'Translated',
  'language.fallbackLabel': 'Original fallback',

  // ── Search Upgrade ─────────────────────────────────────────
  'search.filterCategory': 'Category',
  'search.filterTag': 'Tag',
  'search.filterLanguage': 'Language',
  'search.clearFilters': 'Clear filters',
  'search.all': 'All',
  'search.resultCount': '{count} matching posts',
  'search.emptyPrompt': 'Type a keyword to search posts, or pick a filter below',
  'search.retry': 'Retry',
  'search.openCommands': 'Open Command Palette',
  'search.shortcutHint': 'Commands',

  // ── Reading History ────────────────────────────────────────
  'history.title': 'Recently Read',
  'history.continueReading': 'Continue',
  'history.empty': 'No local reading history yet',
  'history.clearAll': 'Clear all',
  'history.cleared': 'Reading history cleared',
  'history.removeItem': 'Remove entry',
  'history.progress': '{percent}% read',
  'history.completed': 'Completed',
  'history.justNow': 'Just now',
  'history.minutesAgo': '{count}m ago',
  'history.hoursAgo': '{count}h ago',
  'history.daysAgo': '{count}d ago',

  // ── Command Palette ────────────────────────────────────────
  'command.title': 'Command Palette',
  'command.placeholder': 'Type a command or jump to a page...',
  'command.empty': 'No matching commands',
  'command.groupNav': 'Navigation',
  'command.groupActions': 'Actions',
  'command.groupRecent': 'Recently Read',
  'command.searchPosts': 'Search Posts',
  'command.searchForQuery': 'Search posts for "{query}"',
  'command.openSettings': 'Open Reading Settings',
  'command.toggleFocus': 'Toggle Focus Reading Mode',
  'command.toggleTheme': 'Toggle Light / Dark Theme',
  'command.trigger': 'Commands',
  'command.navigateHint': 'Navigate',
  'command.executeHint': 'Run',

  // ── Article Share ──────────────────────────────────────────
  'share.title': 'Share',
  'share.copyLink': 'Copy article link',
  'share.copyMarkdown': 'Copy Markdown link',
  'share.nativeShare': 'System share',
  'share.linkCopied': 'Article link copied',
  'share.markdownCopied': 'Markdown link copied',
  'share.shared': 'Opened share sheet',
  'share.failed': 'Copy failed. Please copy the URL from the address bar.',

  // ── Focus Reading Mode ─────────────────────────────────────
  'focus.enter': 'Focus mode',
  'focus.exit': 'Exit focus',
  'focus.active': 'Focus Reading Mode',
  'focus.shortcutHint': 'Press Esc to exit focus mode',

  // ── Series Reading Route ───────────────────────────────────
  'series.progressTitle': 'Series Progress',
  'series.completedCount': '{read} / {total} completed',
  'series.continueReading': 'Continue reading',
  'series.startReading': 'Start reading',
  'series.statusRead': 'Read',
  'series.statusInProgress': '{percent}% read',
  'series.backToSeries': 'All in series',
  'series.partOfSeries': 'Series',

  // ── Archives Timeline ──────────────────────────────────────
  'archives.timelineTitle': 'Article Timeline',
  'archives.allYears': 'All years',
  'archives.quickJump': 'Quick jump',
};
