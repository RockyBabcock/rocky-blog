import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildPagefindFilters,
  countActiveFilters,
  parseHighlightedExcerpt,
  parseMetaList,
  sortFacetEntries,
} from './search-helpers';

describe('search-helpers pure logic', () => {
  it('builds Pagefind filter payloads only for active selections', () => {
    assert.equal(buildPagefindFilters({ category: null, tag: null, language: null }), undefined);
    assert.equal(countActiveFilters({ category: null, tag: null, language: null }), 0);

    const active = { category: '工具', tag: 'Astro', language: 'fr' };
    assert.deepEqual(buildPagefindFilters(active), {
      category: ['工具'],
      tag: ['Astro'],
      language: ['fr'],
    });
    assert.equal(countActiveFilters(active), 3);
  });

  it('parses Pagefind <mark> excerpts safely while stripping arbitrary tags', () => {
    const segments = parseHighlightedExcerpt(
      'Welcome to <mark>Astro</mark> &amp; <script>alert(1)</script><mark>React</mark>!',
    );
    assert.deepEqual(segments, [
      { text: 'Welcome to ', highlighted: false },
      { text: 'Astro', highlighted: true },
      { text: ' & alert(1)', highlighted: false },
      { text: 'React', highlighted: true },
      { text: '!', highlighted: false },
    ]);
  });

  it('parses metadata lists and sorts facets by count descending', () => {
    assert.deepEqual(parseMetaList('Astro, React, Astro, '), ['Astro', 'React']);
    assert.deepEqual(sortFacetEntries({ CSS: 2, Astro: 5, Tools: 5, Empty: 0 }), [
      ['Astro', 5],
      ['Tools', 5],
      ['CSS', 2],
    ]);
  });
});
