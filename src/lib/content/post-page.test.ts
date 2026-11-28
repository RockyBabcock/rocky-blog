import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildBreadcrumbJsonLd, buildPostBreadcrumbs, buildPostJsonLd, buildPostKeywords, hasMathSyntax } from './post-page';

describe('hasMathSyntax', () => {
  it('respects global enableMath, frontmatter opt-in/opt-out, and LaTeX delimiters', () => {
    assert.equal(hasMathSyntax(false, true, '$x^2$'), false);
    assert.equal(hasMathSyntax(true, true, 'no math'), true);
    assert.equal(hasMathSyntax(true, false, '$x^2$'), false);
    assert.equal(hasMathSyntax(true, undefined, 'Inline $E=mc^2$ math'), true);
    assert.equal(hasMathSyntax(true, undefined, 'Display \\[a+b\\]'), true);
    assert.equal(hasMathSyntax(true, undefined, 'Plain text only'), false);
  });
});

describe('buildPostKeywords', () => {
  it('prefers explicit post keywords over tags/categories and deduplicates with site keywords', () => {
    assert.deepEqual(
      buildPostKeywords({
        postKeywords: ['Astro', 'Blog'],
        tags: ['Ignored'],
        siteKeywords: ['Blog', 'Tech'],
      }),
      ['Astro', 'Blog', 'Tech'],
    );
  });

  it('falls back to tags and flattened categories when postKeywords is empty', () => {
    assert.deepEqual(
      buildPostKeywords({
        tags: ['React'],
        categories: [['笔记', '前端']],
        siteKeywords: ['React', 'Site'],
      }),
      ['React', '笔记', '前端', 'Site'],
    );
  });
});

describe('buildPostBreadcrumbs', () => {
  it('builds cumulative breadcrumb hierarchy', () => {
    const items = buildPostBreadcrumbs(
      ['笔记', '前端'],
      (parts) => `/categories/${parts.join('/')}`,
      (name) => `t:${name}`,
    );
    assert.deepEqual(items, [
      { name: 't:笔记', link: '/categories/笔记' },
      { name: 't:前端', link: '/categories/笔记/前端' },
    ]);
  });
});

describe('JSON-LD builders', () => {
  it('builds BlogPosting JSON-LD with optional updated date and ogImage', () => {
    const ld = buildPostJsonLd({
      title: 'Hello',
      description: 'Desc',
      keywords: ['a'],
      authorName: 'Rocky',
      siteUrl: new URL('https://example.com'),
      datePublished: '2026-01-01',
      dateModified: '2026-01-02',
      ogImage: 'https://example.com/cover.webp',
      pageUrl: 'https://example.com/post/hello',
    });
    assert.equal(ld['@type'], 'BlogPosting');
    assert.equal(ld.dateModified, '2026-01-02');
    assert.equal(ld.image, 'https://example.com/cover.webp');
  });

  it('builds BreadcrumbList JSON-LD omitting item on last element', () => {
    const ld = buildBreadcrumbJsonLd({
      homeName: 'Home',
      homeHref: '/en/',
      breadcrumbs: [{ name: 'Notes', link: '/en/categories/note' }],
      title: 'Post Title',
      siteUrl: new URL('https://example.com'),
    });
    assert.equal(ld.itemListElement.length, 3);
    assert.equal(ld.itemListElement[0].item, 'https://example.com/en/');
    assert.equal(ld.itemListElement[1].item, 'https://example.com/en/categories/note');
    assert.equal('item' in ld.itemListElement[2], false);
  });
});
