import assert from 'node:assert/strict';
import test from 'node:test';
import { isBlogContentFile } from './glob';
import {
  aggregateTags,
  buildCategoryTree,
  buildCategoryUrl,
  collectCategoryLinks,
  countContentWords,
  findCategoryBySlug,
  groupPostsByYearPure,
  normalizeCategoryPath,
  pickPostCover,
  resolvePostSlug,
} from './pure';

const samplePosts = [
  {
    id: 'note/front-end/getting-started.md',
    body: 'Hello Astro Koharu 欢迎使用现代化博客系统',
    data: {
      title: '欢迎使用 astro-koharu',
      date: new Date('2026-03-15'),
      link: 'getting-started',
      tags: ['Astro', 'Koharu'],
      categories: [['笔记', '前端']],
    },
  },
  {
    id: 'life/hello-world.md',
    body: '记录真实，享受写作过程。',
    data: {
      title: 'Hello World',
      date: new Date('2025-11-20'),
      tags: ['随笔', 'Astro'],
      categories: ['随笔'],
    },
  },
];

const categoryMap = { 随笔: 'life', 笔记: 'note', 前端: 'front-end' };

test('isBlogContentFile ignores underscored files and non-markdown', () => {
  assert.equal(isBlogContentFile('note/post.md'), true);
  assert.equal(isBlogContentFile('note/post.mdx'), true);
  assert.equal(isBlogContentFile('_draft/post.md'), false);
  assert.equal(isBlogContentFile('note/image.png'), false);
});

test('resolvePostSlug prioritizes explicit link and strips locale prefixes', () => {
  assert.equal(resolvePostSlug('note/a.md', 'custom-link'), 'custom-link');
  assert.equal(resolvePostSlug('en/note/a.md'), 'note/a');
  assert.equal(resolvePostSlug('note/a/index.md'), 'note/a');
});

test('normalizeCategoryPath supports both flat and nested category arrays', () => {
  assert.deepEqual(normalizeCategoryPath(['随笔']), ['随笔']);
  assert.deepEqual(normalizeCategoryPath([['笔记', '前端']]), ['笔记', '前端']);
  assert.deepEqual(normalizeCategoryPath(undefined), []);
});

test('buildCategoryTree, collectCategoryLinks, and findCategoryBySlug work together', () => {
  const { categories, countMap } = buildCategoryTree(samplePosts);
  assert.equal(countMap['笔记'], 1);
  assert.equal(countMap['前端'], 1);
  assert.equal(countMap['随笔'], 1);

  const links = collectCategoryLinks(categories, categoryMap);
  assert.deepEqual(links, ['note', 'note/front-end', 'life']);

  const found = findCategoryBySlug(categories, 'note/front-end', categoryMap);
  assert.ok(found);
  assert.equal(found.category.name, '前端');
  assert.deepEqual(found.pathNames, ['笔记', '前端']);
  assert.equal(buildCategoryUrl(['笔记', '前端'], categoryMap), '/categories/note/front-end');
});

test('aggregateTags and groupPostsByYearPure aggregate deterministically', () => {
  const tags = aggregateTags(samplePosts);
  assert.deepEqual(tags, { Astro: 2, Koharu: 1, 随笔: 1 });

  const grouped = groupPostsByYearPure(samplePosts);
  assert.deepEqual(
    grouped.map((g) => g.year),
    [2026, 2025],
  );
  assert.equal(grouped[0].posts.length, 1);
});

test('countContentWords counts CJK and Latin tokens and pickPostCover is deterministic', () => {
  const stats = countContentWords('Hello world 欢迎来到博客');
  assert.equal(stats.words, 8);
  assert.equal(stats.minutes, 1);

  const covers = ['/img/cover/1.webp', '/img/cover/2.webp', '/img/cover/3.webp'];
  assert.equal(pickPostCover('slug-a', '/custom.webp', covers), '/custom.webp');
  assert.equal(pickPostCover('slug-a', undefined, covers), pickPostCover('slug-a', undefined, covers));
});
