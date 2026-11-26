import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { ReadingHistoryEntry } from './reading-history';
import { computeSeriesProgress, type SeriesRouteItem } from './series-progress';

const SERIES_ITEMS: SeriesRouteItem[] = [
  { slug: 'weekly/issue-1', title: 'Issue 1', href: '/post/weekly/issue-1' },
  { slug: 'weekly/issue-2', title: 'Issue 2', href: '/post/weekly/issue-2' },
  { slug: 'weekly/issue-3', title: 'Issue 3', href: '/post/weekly/issue-3' },
];

describe('series-progress computation', () => {
  it('returns clean initial state before any issue is read', () => {
    const summary = computeSeriesProgress(SERIES_ITEMS, []);
    assert.equal(summary.total, 3);
    assert.equal(summary.completedCount, 0);
    assert.equal(summary.percent, 0);
    assert.equal(summary.hasStarted, false);
    assert.equal(summary.recommendedItem?.slug, 'weekly/issue-1');
  });

  it('does not count a 0% visit as completed and recommends the active in-progress issue', () => {
    const history: ReadingHistoryEntry[] = [
      {
        slug: 'weekly/issue-1',
        url: '/post/weekly/issue-1',
        title: 'Issue 1',
        locale: 'zh',
        progress: 92,
        scrollY: 1200,
        lastReadAt: 1000,
      },
      {
        slug: 'weekly/issue-2',
        url: '/post/weekly/issue-2',
        title: 'Issue 2',
        locale: 'zh',
        progress: 40,
        scrollY: 400,
        lastReadAt: 2000,
      },
      {
        slug: 'weekly/issue-3',
        url: '/post/weekly/issue-3',
        title: 'Issue 3',
        locale: 'zh',
        progress: 0,
        scrollY: 0,
        lastReadAt: 3000,
      },
    ];
    const summary = computeSeriesProgress(SERIES_ITEMS, history);
    assert.equal(summary.completedCount, 1);
    assert.equal(summary.inProgressCount, 1);
    assert.equal(summary.percent, 33);
    assert.equal(summary.hasStarted, true);
    assert.deepEqual(summary.completedSlugs, ['weekly/issue-1']);
    assert.equal(summary.recommendedItem?.slug, 'weekly/issue-2');
  });

  it('recommends the next unread issue once earlier issues are completed', () => {
    const history: ReadingHistoryEntry[] = [
      {
        slug: 'weekly/issue-1',
        url: '/post/weekly/issue-1',
        title: 'Issue 1',
        locale: 'zh',
        progress: 100,
        scrollY: 1500,
        lastReadAt: 2000,
      },
    ];
    const summary = computeSeriesProgress(SERIES_ITEMS, history);
    assert.equal(summary.completedCount, 1);
    assert.equal(summary.recommendedItem?.slug, 'weekly/issue-2');
  });
});
