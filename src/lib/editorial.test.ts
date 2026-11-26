import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildTimelinePreview, computeTagTiers, splitLatestPosts } from './editorial';

describe('computeTagTiers', () => {
  it('sorts by frequency descending, breaks ties alphabetically, and assigns normalized tiers', () => {
    const result = computeTagTiers({
      css: 1,
      astro: 8,
      react: 5,
      vite: 1,
      typescript: 5,
    });

    assert.deepEqual(
      result.map((t) => [t.name, t.count, t.tier]),
      [
        ['astro', 8, 3],
        ['react', 5, 2],
        ['typescript', 5, 2],
        ['css', 1, 1],
        ['vite', 1, 1],
      ],
    );
  });

  it('respects limit and ignores non-positive counts', () => {
    const result = computeTagTiers({ a: 0, b: -2, c: 4, d: 3, e: 2 }, 2);
    assert.deepEqual(
      result.map((t) => t.name),
      ['c', 'd'],
    );
  });

  it('handles uniform counts gracefully without NaN', () => {
    const single = computeTagTiers({ solo: 1, other: 1 });
    assert.deepEqual(
      single.map((t) => t.tier),
      [1, 1],
    );
    const multi = computeTagTiers({ a: 3, b: 3 });
    assert.deepEqual(
      multi.map((t) => t.tier),
      [2, 2],
    );
  });
});

describe('splitLatestPosts', () => {
  it('splits posts into visual cards and compact editorial rows cleanly', () => {
    const { featuredCards, compactRows } = splitLatestPosts([1, 2, 3, 4, 5], 3);
    assert.deepEqual(featuredCards, [1, 2, 3]);
    assert.deepEqual(compactRows, [4, 5]);
  });

  it('returns empty compact rows when fewer posts than visualCardCount', () => {
    const { featuredCards, compactRows } = splitLatestPosts(['a', 'b'], 3);
    assert.deepEqual(featuredCards, ['a', 'b']);
    assert.deepEqual(compactRows, []);
  });
});

describe('buildTimelinePreview', () => {
  it('slices across years up to maxItems while preserving real yearly totals', () => {
    const preview = buildTimelinePreview(
      [
        { year: 2026, posts: ['p1', 'p2', 'p3'] },
        { year: 2025, posts: ['p4', 'p5', 'p6', 'p7'] },
        { year: 2024, posts: ['p8'] },
      ],
      5,
    );

    assert.deepEqual(preview, [
      { year: 2026, totalInYear: 3, posts: ['p1', 'p2', 'p3'] },
      { year: 2025, totalInYear: 4, posts: ['p4', 'p5'] },
    ]);
  });

  it('skips empty year groups and handles zero limit', () => {
    assert.deepEqual(
      buildTimelinePreview(
        [
          { year: 2026, posts: [] },
          { year: 2025, posts: ['x'] },
        ],
        3,
      ),
      [{ year: 2025, totalInYear: 1, posts: ['x'] }],
    );
    assert.deepEqual(buildTimelinePreview([{ year: 2026, posts: ['x'] }], 0), []);
  });
});
