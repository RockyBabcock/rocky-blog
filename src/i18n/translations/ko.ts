/**
 * Korean (ko) — UI strings
 *
 * Keys not present here will fall back to the default locale (zh).
 */

export const uiStrings = {
  // Index pages
  'index.posts': '개 게시물',
  'index.years': '년',
  'index.categories': '개 카테고리',
  'index.tags': '개 태그',
  'index.mostUsed': '가장 많이 사용한 태그',
  'category.filter': '하위 카테고리',
  'tag.filter': '태그 필터',
  'tag.filterPlaceholder': '태그 이름 입력',
  'tag.noMatches': '일치하는 태그가 없습니다',
  'tag.singleTags': '한 번만 사용한 태그 {count}개 더 보기',
  'archives.jumpToYear': '{year}년으로 이동',
  'archives.legendFew': '적음',
  'archives.legendMany': '많음',
  'archives.calendar': '게시물 달력',
  'archives.monthLabel': '{year}년 {month}월 · 게시물 {count}개',

  // ── Navigation ──────────────────────────────────────────────
  'nav.home': '홈',
  'nav.posts': '게시물',
  'nav.categories': '카테고리',
  'nav.tags': '태그',
  'nav.archives': '아카이브',
  'nav.about': '소개',
  'nav.weekly': '주간지',

  // ── Common ──────────────────────────────────────────────────
  'common.search': '검색',
  'common.close': '닫기',
  'viewer.loadError': '뷰어를 불러오지 못했습니다. 페이지를 새로고침해 다시 시도해 주세요.',
  'search.loadError': '검색을 불러오지 못했습니다. 페이지를 새로고침해 다시 시도해 주세요.',
  'common.copy': '복사',
  'common.copied': '복사 완료',
  'common.copyFailed': '자동 복사 실패, 직접 복사해 주세요',
  'common.loading': '불러오는 중...',
  'common.noResults': '결과가 없어요',
  'common.backToTop': '맨 위로',
  'common.darkMode': '다크 모드',
  'common.lightMode': '라이트 모드',
  'common.toggleTheme': '테마 전환',
  'common.language': '언어',
  'common.toc': '목차',
  'common.expand': '펼치기',
  'common.collapse': '접기',
  'common.menuLabel': '{name} 메뉴',

  // ── Post ────────────────────────────────────────────────────
  'post.readMore': '더 보기',
  'post.totalPosts': '총 {count}개의 게시물',
  'post.stickyPosts': '고정된 게시물',
  'post.postList': '게시물 목록',
  'post.featuredCategories': '추천 카테고리',
  'post.yearPosts': '{count}개의 게시물',
  'post.readingTime': '{time}분 소요',
  'post.wordCount': '{count}자',
  'post.publishedAt': '게시일: {date}',
  'post.updatedAt': '수정일: {date}',
  'post.prevPost': '이전 게시물',
  'post.nextPost': '다음 게시물',
  'post.seriesNavigation': '시리즈 내비게이션',
  'post.seriesPrev': '이전 편',
  'post.seriesNext': '다음 편',
  'post.fallbackNotice': '이 게시물은 아직 {lang} 번역이 없으므로 원문으로 표시돼요',
  'post.markdown.copy': 'Markdown 복사',
  'post.markdown.copied': '복사됨',
  'post.markdown.downloadedInstead': '클립보드를 쓸 수 없어 대신 다운로드했어요',
  'post.markdown.failed': 'Markdown을 불러오지 못했어요',
  'post.markdown.more': 'Markdown 작업 더 보기',
  'post.markdown.download': '.md 다운로드',
  'post.markdown.localEditors': '로컬 편집기',
  'post.draft': '초안',
  'post.pinned': '고정됨',
  'post.noPostsFound': '게시물이 없어요',

  // ── Categories & Tags ───────────────────────────────────────
  'category.allCategories': '모든 카테고리',
  'category.postsInCategory': '{name} 카테고리의 게시물',
  'category.totalCategories': '총 {count}개의 카테고리',
  'category.categoryLabel': '카테고리',
  'tag.allTags': '모든 태그',
  'tag.postsWithTag': '「{name}」 태그가 달린 게시물',
  'tag.totalTags': '총 {count}개의 태그',
  'tag.all': '전체',
  'tag.postCount': '{count}개의 게시물',

  // ── Archives ────────────────────────────────────────────────
  'archives.title': '아카이브',
  'archives.totalPosts': '총 {count}개',

  // ── Search ──────────────────────────────────────────────────
  'search.placeholder': '검색어를 입력해 주세요',
  'search.label': '이 사이트 검색',
  'search.clear': '지우기',
  'search.loadMore': '결과 더 보기',
  'search.filters': '필터',
  'search.noResults': '결과가 없어요',
  'search.manyResults': '[COUNT]개의 결과',
  'search.oneResult': '[COUNT]개의 결과',
  'search.altSearch': '결과가 없어요. [DIFFERENT_TERM]에 대한 결과를 표시해요',
  'search.suggestion': '결과가 없어요. 다음 검색어를 시도해 보세요:',
  'search.searching': '[SEARCH_TERM] 검색 중...',
  'search.dialogTitle': '게시물 검색',
  'search.dialogClose': '닫기',
  'search.dialogSelect': '선택',
  'search.dialogOpen': '열기',

  // ── Code Block ──────────────────────────────────────────────
  'code.copy': '코드 복사',
  'code.copied': '복사 완료!',
  'code.fullscreen': '전체 화면',
  'code.exitFullscreen': '전체 화면 종료',
  'code.wrapLines': '자동 줄바꿈',
  'code.viewSource': '소스 보기',
  'code.viewRendered': '렌더링 결과 보기',
  'code.collapse': '코드 접기',
  'code.expand': '코드 펼치기',

  // ── Diagram / Infographic ───────────────────────────────────
  'diagram.fullscreen': '전체 화면',
  'diagram.exitFullscreen': '전체 화면 종료',
  'diagram.viewSource': '소스 보기',
  'diagram.zoomIn': '확대',
  'diagram.zoomOut': '축소',
  'diagram.resetZoom': '확대/축소 초기화',
  'diagram.fitToScreen': '화면에 맞춤',
  'diagram.actualSize': '실제 크기',
  'diagram.download': '이미지 다운로드',
  'diagram.resize': '다이어그램 크기 조절',
  'diagram.resizeHint': '드래그하여 크기 조절, 더블클릭하여 원래대로',
  'diagram.renderError': '다이어그램을 표시할 수 없습니다',
  'diagram.loadingSlow': '다이어그램을 불러오는 데 시간이 걸리고 있습니다',
  'diagram.errorHelp': '페이지를 새로고침하거나 도구 모음에서 다이어그램 소스를 보고 복사할 수 있습니다.',
  'diagram.errorHelpNoSource': '페이지를 새로고침하여 다시 시도해 주세요.',
  'diagram.reload': '새로고침',
  'diagram.gestureHint': '핀치/휠로 확대·축소 · 드래그로 이동 · 더블클릭으로 확대',

  // ── Image Lightbox ──────────────────────────────────────────
  'image.preview': '이미지 미리보기',
  'image.loadError': '이미지를 불러오지 못했습니다',
  'image.retry': '다시 시도',
  'image.hintMobileGallery': '좌우로 밀어 넘기기 · 두 손가락으로 확대 · 아래로 밀어 닫기',
  'image.zoomIn': '확대',
  'image.zoomOut': '축소',
  'image.resetZoom': '초기화',
  'image.resetZoomRotate': '확대 및 회전 초기화',
  'image.rotate': '90° 회전',
  'image.close': '닫기',
  'image.prev': '이전 이미지',
  'image.next': '다음 이미지',
  'image.counter': '{current} / {total}',
  'image.hintDesktop': '두 번 클릭하여 확대 · 스크롤로 확대/축소 · 빈 곳을 클릭하여 닫기',
  'image.hintMobile': '두 번 탭하거나 두 손가락으로 확대 · 아래로 밀거나 빈 곳을 탭하여 닫기',

  // ── Footer ──────────────────────────────────────────────────
  'footer.poweredBy': '{name} 기반',
  'footer.totalPosts': '{count}개의 게시물',
  'footer.totalWords': '{count}자',
  'footer.totalWordsTitle': '사이트 총 글자 수',
  'footer.readingTimeTitle': '사이트 총 읽기 시간',
  'footer.postCountTitle': '총 게시물 수',
  'footer.runningDays': '{days}일째 가동 중',
  'footer.wordUnit': '자',
  'footer.postUnit': '개',

  // ── Pagination ──────────────────────────────────────────────
  'pagination.label': '페이지 이동',
  'pagination.prev': '이전 페이지',
  'pagination.next': '다음 페이지',
  'pagination.page': '{page}페이지',
  'pagination.currentPage': '현재 {page}페이지',
  'pagination.of': '총 {total}페이지',

  // ── Breadcrumb ──────────────────────────────────────────────
  'breadcrumb.home': '홈',
  'breadcrumb.goToCategory': '{name} 카테고리로 이동',

  // ── Floating Group ──────────────────────────────────────────
  'floating.backToTop': '맨 위로',
  'floating.scrollToBottom': '맨 아래로',
  'floating.toggleTheme': '테마 전환',
  'floating.toggleToolbar': '툴바 펼치기/접기',
  'floating.settings': '설정',

  // ── Settings Panel ────────────────────────────────────────
  'settings.title': '설정',
  'settings.reader': '읽기',
  'settings.general': '일반',
  'settings.closePanel': '설정 패널 닫기',
  'settings.fontPreset': '글꼴',
  'settings.fontPreset.round': '굴림체',
  'settings.fontPreset.system': '시스템 고딕체',
  'settings.fontPreset.serif': '명조체',
  'settings.fontPreset.wenkai': 'Wenkai체',
  'settings.fontSize': '글자 크기',
  'settings.lineHeight': '줄 간격',
  'settings.measure': '줄 너비',
  'settings.auto': '자동',
  'settings.justify': '양쪽 맞춤',
  'settings.scrollProgress': '스크롤 진행 표시줄',
  'settings.motionLevel': '모션 강도',
  'settings.motionLevel.lively': '생동감',
  'settings.motionLevel.subtle': '차분하게',
  'settings.motionLevel.reduced': '줄이기',
  'settings.motionLevel.livelyHint': '등장 연출, 스크롤 표시, 벚꽃 효과 모두 사용',
  'settings.motionLevel.subtleHint': '등장과 전환만 유지하고 본문 표시 연출과 벚꽃은 끔',
  'settings.motionLevel.reducedHint': '꼭 필요한 상호작용 피드백만 표시',
  'settings.motionLevel.systemReduced': '시스템에서 동작 줄이기가 켜져 있어 항상 「줄이기」로 적용됩니다',
  'settings.wave': '커버 파도 효과',
  'settings.reset': '기본값으로 재설정',
  'settings.waveDisabledByReducedMotion': '모션 강도가 「줄이기」일 때는 사용할 수 없음',
  'settings.invalidNumber': '양수를 입력해 주세요',

  // ── Encrypted Block ─────────────────────────────────────────
  'encrypted.locked': '내용이 암호화됐어요',
  'encrypted.placeholder': '내용을 보려면 비밀번호를 입력해 주세요',
  'encrypted.submit': '잠금 해제',
  'encrypted.incorrect': '비밀번호가 틀렸어요',

  // ── Encrypted Post ─────────────────────────────────────────
  'encrypted.post.title': '이 게시물은 암호화됐어요',
  'encrypted.post.description': '게시물 내용을 보려면 비밀번호를 입력해 주세요',
  'encrypted.post.rssNotice': '이 게시물은 암호화되어 있으니, 웹 페이지에서 확인해 주세요',

  // ── 404 ─────────────────────────────────────────────────────
  'notFound.title': '페이지를 찾을 수 없어요',
  'notFound.description': '요청하신 페이지를 찾을 수 없어요',
  'notFound.backHome': '홈으로 돌아가기',
  'notFound.browseArchives': '아카이브 둘러보기',
  'notFound.message': '야옹? 페이지를 찾을 수 없어요~',

  // ── Category Stats ────────────────────────────────────────
  'category.subCategoryCount': '{count}개의 하위 카테고리',
  'category.postCount': '{count}개의 게시물',

  // ── Post Card ─────────────────────────────────────────────
  'post.readingTimeTooltip': '예상 읽기 시간: {time}',

  // ── Featured Series ─────────────────────────────────────────
  'series.latestPost': '최신 게시물',
  'series.viewAll': '모두 보기',
  'series.postCount': '{count}개',
  'series.position': '{total}편 중 {current}번째',
  'series.noPosts': '등록된 시리즈 게시물이 없어요',
  'series.rss': 'RSS 구독',
  'series.chromeExtension': 'Chrome 확장 프로그램',
  'series.docs': '문서',
  'series.issues': '호',
  'series.latestIssue': '최신호',
  'series.readIssue': '이번 호 읽기',

  // ── Home Info ───────────────────────────────────────────────
  'homeInfo.articles': '게시물',
  'homeInfo.categories': '카테고리',
  'homeInfo.tags': '태그',
  'homeInfo.greetingMorning': '좋은 아침이에요!',
  'homeInfo.greetingAfternoon': '좋은 오후예요!',
  'homeInfo.greetingEvening': '좋은 저녁이에요!',
  'homeInfo.greetingNight': '늦었어요, 푹 쉬세요',

  // ── Drawer ──────────────────────────────────────────────────
  'drawer.navMenu': '내비게이션 메뉴',
  'drawer.close': '메뉴 닫기',
  'drawer.openMenu': '메뉴 열기',

  // ── Summary Panel ───────────────────────────────────────────
  'summary.description': '수동 요약',

  // ── Latest Posts ────────────────────────────────────────────
  'post.latestPosts': '최신 글',

  // ── Tag Component ───────────────────────────────────────────
  'tag.expandAll': '모두 보기',
  'tag.viewTagPosts': '「{tag}」 태그의 게시물 {count}개 보기',

  // ── Table of Contents ───────────────────────────────────────
  'toc.title': '목차',
  'toc.sectionProgress': '현재 절 읽기 진행률',
  'toc.expand': '목차 펼치기',
  'toc.empty': '등록된 목차가 없어요',

  // ── Content ───────────────────────────────────────────────
  'content.revealSpoiler': '클릭하여 숨겨진 내용 보기',

  // ── Search Shortcut ───────────────────────────────────────
  'search.searchShortcut': '검색 ({shortcut})',

  // ── Sider Segmented ─────────────────────────────────────────
  'sider.overview': '사이트 개요',
  'sider.toc': '목차',
  'sider.series': '시리즈 게시물',

  // ── Copy Link ───────────────────────────────────────────────
  'cover.copyLink': '링크 복사',
} as const;
