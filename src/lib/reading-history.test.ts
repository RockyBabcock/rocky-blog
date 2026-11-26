import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  calculateScrollProgress,
  getRelativeTimeToken,
  isEntryCompleted,
  parseReadingHistory,
  READING_HISTORY_MAX_ITEMS,
  READING_HISTORY_VERSION,
  removeReadingHistoryEntry,
  serializeReadingHistory,
  upsertReadingHistory,
} from './reading-history';

describe('reading-history pure logic', () => {
  it('parses valid versioned payload and gracefully recovers from corrupt JSON or wrong versions', () => {
    assert.deepEqual(parseReadingHistory(null), []);
    assert.deepEqual(parseReadingHistory('{not valid json'), []);
    assert.deepEqual(parseReadingHistory(JSON.stringify({ version: 999, entries: [] })), []);

    const valid = serializeReadingHistory([
      {
        slug: 'getting-started',
        url: '/post/getting-started',
        title: 'Welcome',
        locale: 'zh',
        progress: 42,
        scrollY: 320,
        lastReadAt: 1_700_000_000_000,
      },
    ]);
    const parsed = parseReadingHistory(valid);
    assert.equal(parsed.length, 1);
    assert.equal(parsed[0].slug, 'getting-started');
    assert.equal(parsed[0].progress, 42);
  });

  it('drops malformed or unsafe entries and deduplicates by slug', () => {
    const raw = JSON.stringify({
      version: READING_HISTORY_VERSION,
      entries: [
        { slug: 'ok', url: '/post/ok', title: 'OK', locale: 'en', progress: 20, scrollY: 100, lastReadAt: 2000 },
        { slug: 'ok', url: '/post/ok', title: 'Duplicate', locale: 'en', progress: 90, scrollY: 100, lastReadAt: 1000 },
        { slug: 'bad-url', url: 'javascript:alert(1)', title: 'Bad', locale: 'en', progress: 10, scrollY: 0, lastReadAt: 3000 },
        { slug: '', url: '/post/empty', title: 'Empty', locale: 'en', progress: 10, scrollY: 0, lastReadAt: 3000 },
      ],
    });
    const parsed = parseReadingHistory(raw);
    assert.equal(parsed.length, 1);
    assert.equal(parsed[0].slug, 'ok');
    assert.equal(parsed[0].title, 'OK');
  });

  it('upserts entries preserving highest progress, updates scrollY, and caps max length', () => {
    let list = upsertReadingHistory([], {
      slug: 'a',
      url: '/post/a',
      title: 'Post A',
      locale: 'zh',
      progress: 60,
      scrollY: 500,
      now: 1000,
    });
    list = upsertReadingHistory(list, {
      slug: 'a',
      url: '/en/post/a',
      title: 'Post A EN',
      locale: 'en',
      progress: 25, // scrolled back up; high-water mark stays 60
      scrollY: 180,
      now: 2000,
    });
    assert.equal(list.length, 1);
    assert.equal(list[0].progress, 60);
    assert.equal(list[0].scrollY, 180);
    assert.equal(list[0].url, '/en/post/a');

    for (let i = 0; i < READING_HISTORY_MAX_ITEMS + 5; i++) {
      list = upsertReadingHistory(list, {
        slug: `post-${i}`,
        url: `/post/post-${i}`,
        title: `Post ${i}`,
        locale: 'zh',
        progress: 10,
        scrollY: 50,
        now: 3000 + i,
      });
    }
    assert.equal(list.length, READING_HISTORY_MAX_ITEMS);
    assert.equal(list[0].slug, `post-${READING_HISTORY_MAX_ITEMS + 4}`);
  });

  it('removes a single entry cleanly without touching others', () => {
    const initial = upsertReadingHistory(
      upsertReadingHistory([], { slug: 'a', url: '/post/a', title: 'A', locale: 'zh', now: 1000 }),
      { slug: 'b', url: '/post/b', title: 'B', locale: 'zh', now: 2000 },
    );
    const next = removeReadingHistoryEntry(initial, 'a');
    assert.deepEqual(
      next.map((e) => e.slug),
      ['b'],
    );
  });

  it('calculates scroll progress and completion threshold accurately', () => {
    assert.equal(calculateScrollProgress(0, 2000, 800), 0);
    assert.equal(calculateScrollProgress(600, 2000, 800), 50);
    assert.equal(calculateScrollProgress(1200, 2000, 800), 100);
    assert.equal(isEntryCompleted({ progress: 0 }), false);
    assert.equal(isEntryCompleted({ progress: 84 }), false);
    assert.equal(isEntryCompleted({ progress: 85 }), true);
  });

  it('formats relative time tokens across minutes, hours, and days', () => {
    const now = 10_000_000_000;
    assert.deepEqual(getRelativeTimeToken(now - 10_000, now), { key: 'history.justNow' });
    assert.deepEqual(getRelativeTimeToken(now - 5 * 60_000, now), { key: 'history.minutesAgo', count: 5 });
    assert.deepEqual(getRelativeTimeToken(now - 3 * 3_600_000, now), { key: 'history.hoursAgo', count: 3 });
    assert.deepEqual(getRelativeTimeToken(now - 2 * 86_400_000, now), { key: 'history.daysAgo', count: 2 });
  });
});
