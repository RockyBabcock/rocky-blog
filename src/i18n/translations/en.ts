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
  'settings.motionLevel.livelyHint': 'Entrances, gentle hero petals, scroll reveals and page transitions',
  'settings.motionLevel.subtleHint': 'Entrances and transitions only, no petals or scroll reveals',
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

  // ── 404 ─────────────────────────────────────────────────────
  'notFound.title': 'Page Not Found',
  'notFound.description': 'The page you are looking for does not exist',
  'notFound.backHome': 'Back to Home',
  'notFound.browseArchives': 'Browse Archives',
  'notFound.message': 'The page you are looking for does not exist or has been moved.',

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

  // ── Home Editorial Dashboard ───────────────────────────────
  'home.heroExplore': 'Explore Posts',
  'home.heroSearch': 'Search',
  'home.featuredSection': 'Featured',
  'home.featuredSubtitle': 'Pinned highlights & latest series',
  'home.latestSubtitle': 'Recent engineering notes & essays',
  'home.seriesSection': 'Series & Weekly',
  'home.seriesSubtitle': 'Curated multi-part reading routes',
  'home.exploreTopics': 'Explore Topics',
  'home.exploreSubtitle': 'Browse by category and popular tags',
  'home.popularTags': 'Popular Tags',
  'home.allTags': 'All tags',
  'home.allCategories': 'All categories',
  'home.timelineSection': 'Writing Timeline',
  'home.timelineSubtitle': 'Recent publishing rhythm by year',
  'home.viewFullArchives': 'View full archives',
  'home.railSearchHint': 'Search posts, tags, topics...',
  'home.railHistoryEmptyHint': 'Articles you open are saved locally so you can pick up right where you left off.',
  'home.railStartExplore': 'Start with featured',
  'home.railArchiveSummary': 'Archive Overview',
  'home.railTopicsSummary': 'Top Categories',
  'home.viewAllPosts': 'All posts',

  // ── Reading Shelf & Bookmarks ──────────────────────────────
  'nav.shelf': 'Reading Shelf',
  'bookmark.save': 'Save',
  'bookmark.saved': 'Saved',
  'bookmark.saveArticle': 'Save to Reading Shelf',
  'bookmark.removeArticle': 'Remove from Reading Shelf',
  'bookmark.toastSaved': 'Saved to Reading Shelf',
  'bookmark.toastRemoved': 'Removed from Reading Shelf',
  'bookmark.storageUnavailable': 'Local browser storage is unavailable; saved items cannot be persisted here.',
  'shelf.kicker': 'YOUR LIBRARY',
  'shelf.title': 'Reading Shelf',
  'shelf.subtitle': 'Bookmark articles to build your personal reading list. Everything stays private in this browser.',
  'shelf.countLabel': '{count} saved',
  'shelf.filterAll': 'All Saved',
  'shelf.filterToRead': 'To Read',
  'shelf.filterInProgress': 'In Progress',
  'shelf.filterCompleted': 'Completed',
  'shelf.searchPlaceholder': 'Filter saved articles...',
  'shelf.sortNewest': 'Saved: Newest',
  'shelf.sortOldest': 'Saved: Oldest',
  'shelf.sortTitle': 'Title: A–Z',
  'shelf.layoutGrid': 'Grid view',
  'shelf.layoutList': 'List view',
  'shelf.savedOn': 'Saved {date}',
  'shelf.openArticle': 'Read article',
  'shelf.continueReading': 'Continue reading',
  'shelf.readAgain': 'Read again',
  'shelf.remove': 'Remove',
  'shelf.clearAll': 'Clear shelf',
  'shelf.clearConfirmTitle': 'Clear all saved articles from this browser?',
  'shelf.clearConfirmAction': 'Clear all',
  'shelf.clearCancel': 'Cancel',
  'shelf.cleared': 'Reading Shelf cleared',
  'shelf.loading': 'Loading your Reading Shelf...',
  'shelf.emptyTitle': 'Your Reading Shelf is empty',
  'shelf.emptyHint': 'Click the bookmark icon on any article card or reading toolbar to keep pieces you want to revisit.',
  'shelf.emptyExploreLatest': 'Explore latest writing',
  'shelf.emptyBrowseArchives': 'Browse archives',
  'shelf.noFilterMatches': 'No saved articles in this reading state yet',
  'shelf.noSearchResults': 'No saved articles match your search',
  'shelf.resetFilters': 'Show all saved',
  'shelf.railTitle': 'Reading Shelf',
  'shelf.railEmpty': 'Bookmark any article to keep a quick local reading queue here.',
  'shelf.railOpenShelf': 'Open shelf',
  'shelf.commandSave': 'Save current article to Reading Shelf',
  'shelf.commandRemove': 'Remove current article from Reading Shelf',

  // ── Collection Browsing Controls ───────────────────────────
  'browse.filterPlaceholder': 'Filter this list by title or tag...',
  'browse.sortNewest': 'Newest',
  'browse.sortOldest': 'Oldest',
  'browse.noMatches': 'No articles match the current filter',
  'browse.resetFilter': 'Reset filter',
  'browse.showingCount': 'Showing {visible} of {total}',
};
