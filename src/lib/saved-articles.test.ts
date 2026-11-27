import assert from 'node:assert/strict';
import test from 'node:test';
import type { ReadingHistoryEntry } from '@lib/reading-history';
import {
  countShelfStatuses,
  deriveSavedArticleStatus,
  enrichSavedArticles,
  filterAndSortSavedArticles,
  isArticleSaved,
  parseSavedArticles,
  removeSavedArticle,
  SAVED_ARTICLES_VERSION,
  serializeSavedArticles,
  toggleSavedArticle,
} from './saved-articles';

test('parseSavedArticles validates schema version, rejects malformed items, and deduplicates by locale+slug', () => {
  assert.deepEqual(parseSavedArticles(null), []);
  assert.deepEqual(parseSavedArticles('not-json'), []);
  assert.deepEqual(parseSavedArticles(JSON.stringify({ version: 999, entries: [] })), []);

  const raw = JSON.stringify({
    version: SAVED_ARTICLES_VERSION,
    entries: [
      { slug: 'post-a', title: 'Post A ZH', url: '/post/post-a', locale: 'zh', savedAt: 2000 },
      { slug: 'post-a', title: 'Duplicate ZH', url: '/post/post-a', locale: 'zh', savedAt: 1000 },
      { slug: 'post-a', title: 'Post A EN', url: '/en/post/post-a', locale: 'en', savedAt: 3000 },
      { slug: 'bad-url', title: 'Unsafe', url: 'https://evil.example', locale: 'en', savedAt: 4000 },
      { slug: '', title: 'Empty slug', url: '/post/x', locale: 'zh', savedAt: 5000 },
    ],
  });

  const parsed = parseSavedArticles(raw);
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].locale, 'en');
  assert.equal(parsed[1].locale, 'zh');
  assert.equal(parsed[1].title, 'Post A ZH');
});

test('toggleSavedArticle adds, deduplicates per locale, and removes cleanly', () => {
  const first = toggleSavedArticle([], {
    slug: 'astro-6',
    title: 'Astro 6 Migration',
    url: '/post/astro-6',
    locale: 'zh',
    category: '前端',
    now: 1000,
  });
  assert.equal(first.saved, true);
  assert.equal(first.entries.length, 1);
  assert.equal(isArticleSaved(first.entries, 'astro-6', 'zh'), true);
  assert.equal(isArticleSaved(first.entries, 'astro-6', 'en'), false);

  // Saving English version keeps both localized entries distinct
  const second = toggleSavedArticle(first.entries, {
    slug: 'astro-6',
    title: 'Astro 6 Migration (EN)',
    url: '/en/post/astro-6',
    locale: 'en',
    now: 2000,
  });
  assert.equal(second.saved, true);
  assert.equal(second.entries.length, 2);

  // Toggling Chinese version again removes only Chinese entry
  const third = toggleSavedArticle(second.entries, {
    slug: 'astro-6',
    title: 'Astro 6 Migration',
    url: '/post/astro-6',
    locale: 'zh',
  });
  assert.equal(third.saved, false);
  assert.equal(third.entries.length, 1);
  assert.equal(third.entries[0].locale, 'en');

  // Round-trip serialization
  const roundTrip = parseSavedArticles(serializeSavedArticles(third.entries));
  assert.deepEqual(roundTrip, third.entries);

  // Explicit removal
  assert.deepEqual(removeSavedArticle(roundTrip, 'astro-6', 'en'), []);
});

test('deriveSavedArticleStatus & enrichSavedArticles derive statuses cleanly from Reading History', () => {
  assert.equal(deriveSavedArticleStatus(undefined), 'to-read');
  assert.equal(deriveSavedArticleStatus({ progress: 0 }), 'to-read');
  assert.equal(deriveSavedArticleStatus({ progress: 42 }), 'in-progress');
  assert.equal(deriveSavedArticleStatus({ progress: 85 }), 'completed');
  assert.equal(deriveSavedArticleStatus({ progress: 100 }), 'completed');

  const saved = [
    { slug: 'a', title: 'Alpha', url: '/post/a', locale: 'en', savedAt: 3000, category: 'Notes' },
    { slug: 'b', title: 'Beta', url: '/post/b', locale: 'en', savedAt: 2000, category: 'CSS' },
    { slug: 'c', title: 'Gamma', url: '/post/c', locale: 'en', savedAt: 1000, category: 'Tools' },
  ];
  const history: ReadingHistoryEntry[] = [
    { slug: 'b', url: '/post/b', title: 'Beta', locale: 'en', progress: 40, scrollY: 420, lastReadAt: 5000 },
    { slug: 'c', url: '/post/c', title: 'Gamma', locale: 'en', progress: 92, scrollY: 1200, lastReadAt: 6000 },
  ];

  const enriched = enrichSavedArticles(saved, history);
  assert.deepEqual(countShelfStatuses(enriched), {
    all: 3,
    'to-read': 1,
    'in-progress': 1,
    completed: 1,
  });

  const inProgress = filterAndSortSavedArticles(enriched, { status: 'in-progress', query: '', sort: 'saved-desc' });
  assert.equal(inProgress.length, 1);
  assert.equal(inProgress[0].slug, 'b');
  assert.equal(inProgress[0].scrollY, 420);

  const searched = filterAndSortSavedArticles(enriched, { status: 'all', query: 'tools', sort: 'title-asc', locale: 'en' });
  assert.equal(searched.length, 1);
  assert.equal(searched[0].slug, 'c');

  const oldestFirst = filterAndSortSavedArticles(enriched, { status: 'all', query: '', sort: 'saved-asc' });
  assert.deepEqual(
    oldestFirst.map((item) => item.slug),
    ['c', 'b', 'a'],
  );
});
