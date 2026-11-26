import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { findAdjacentBySlug, isPostInCategory, partitionHomePosts } from './post-helpers';

describe('isPostInCategory', () => {
  it('matches nested category array segments', () => {
    const post = { data: { categories: [['笔记', '前端', 'React']] } };
    assert.equal(isPostInCategory(post, '笔记'), true);
    assert.equal(isPostInCategory(post, 'React'), true);
    assert.equal(isPostInCategory(post, '算法'), false);
  });

  it('matches flat string category', () => {
    const post = { data: { categories: ['工具'] } };
    assert.equal(isPostInCategory(post, '工具'), true);
    assert.equal(isPostInCategory(post, '生活'), false);
  });

  it('returns false when categories are missing or empty', () => {
    assert.equal(isPostInCategory({ data: {} }, '工具'), false);
    assert.equal(isPostInCategory({ data: { categories: [] } }, '工具'), false);
  });
});

describe('findAdjacentBySlug', () => {
  const posts = [{ slug: 'newest' }, { slug: 'middle' }, { slug: 'oldest' }];
  const getSlug = (p: { slug: string }) => p.slug;

  it('returns prev (newer) and next (older) for middle post', () => {
    const result = findAdjacentBySlug(posts, 'middle', getSlug);
    assert.equal(result.prevPost?.slug, 'newest');
    assert.equal(result.nextPost?.slug, 'oldest');
  });

  it('returns null prev for newest and null next for oldest', () => {
    assert.deepEqual(findAdjacentBySlug(posts, 'newest', getSlug), {
      prevPost: null,
      nextPost: { slug: 'middle' },
    });
    assert.deepEqual(findAdjacentBySlug(posts, 'oldest', getSlug), {
      prevPost: { slug: 'middle' },
      nextPost: null,
    });
  });

  it('returns nulls when list is empty or slug not found', () => {
    assert.deepEqual(findAdjacentBySlug([], 'middle', getSlug), { prevPost: null, nextPost: null });
    assert.deepEqual(findAdjacentBySlug(posts, 'missing', getSlug), { prevPost: null, nextPost: null });
  });
});

describe('partitionHomePosts', () => {
  const posts = [
    { id: 'w2', data: { categories: ['周刊'] } },
    { id: 's1', data: { categories: ['笔记'], sticky: true } },
    { id: 'w1', data: { categories: ['周刊'] } },
    { id: 'h1', data: { categories: ['合集'] } },
    { id: 'r1', data: { categories: ['工具'] } },
    { id: 'r2', data: {} },
  ];

  it('partitions featured highlights, sticky posts, and regular posts in one pass', () => {
    const result = partitionHomePosts(posts, [
      { categoryName: '合集', highlightOnHome: false },
      { categoryName: '周刊', highlightOnHome: true },
    ]);

    assert.deepEqual(
      result.highlightedPosts.map((p) => p.id),
      ['w2'],
    );
    assert.deepEqual(
      result.stickyPosts.map((p) => p.id),
      ['s1'],
    );
    assert.deepEqual(
      result.regularPosts.map((p) => p.id),
      ['r1', 'r2'],
    );
  });

  it('preserves configured series order for highlighted posts', () => {
    const result = partitionHomePosts(posts, [
      { categoryName: '合集', highlightOnHome: true },
      { categoryName: '周刊', highlightOnHome: true },
    ]);
    assert.deepEqual(
      result.highlightedPosts.map((p) => p.id),
      ['h1', 'w2'],
    );
  });
});
