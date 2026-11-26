import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildCanonicalShareUrl, formatMarkdownShareLink } from './share';

describe('share link utilities', () => {
  it('strips transient resume query params and hashes while keeping canonical path', () => {
    assert.equal(
      buildCanonicalShareUrl('https://rockybabcock.github.io/en/post/getting-started?resume=1#intro'),
      'https://rockybabcock.github.io/en/post/getting-started',
    );
    assert.equal(
      buildCanonicalShareUrl('https://rockybabcock.github.io/post/demo?foo=bar&resume=1'),
      'https://rockybabcock.github.io/post/demo?foo=bar',
    );
  });

  it('formats Markdown links and escapes square brackets in titles', () => {
    assert.equal(
      formatMarkdownShareLink('[Note] Astro & React', 'https://rockybabcock.github.io/post/astro#top'),
      '[\\[Note\\] Astro & React](https://rockybabcock.github.io/post/astro)',
    );
  });
});
