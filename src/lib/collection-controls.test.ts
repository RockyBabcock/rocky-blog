import assert from 'node:assert/strict';
import test from 'node:test';
import { compareCollectionKeys, matchesCollectionFilter } from './collection-controls';

test('matchesCollectionFilter handles category branch, multi-token search, and empty queries', () => {
  const row = { filterKey: '前端', searchText: 'Astro 6 Migration Guide #Astro #Vite' };
  assert.equal(matchesCollectionFilter(row, '', ''), true);
  assert.equal(matchesCollectionFilter(row, '前端', ''), true);
  assert.equal(matchesCollectionFilter(row, 'CSS', ''), false);
  assert.equal(matchesCollectionFilter(row, '前端', 'astro vite'), true);
  assert.equal(matchesCollectionFilter(row, '前端', 'astro rust'), false);
  assert.equal(matchesCollectionFilter(row, '', 'MIGRATION'), true);
});

test('compareCollectionKeys sorts year and ISO date strings newest-first and oldest-first', () => {
  const years = ['2024', '2026', '2025'];
  assert.deepEqual(
    [...years].sort((a, b) => compareCollectionKeys(a, b, 'newest')),
    ['2026', '2025', '2024'],
  );
  assert.deepEqual(
    [...years].sort((a, b) => compareCollectionKeys(a, b, 'oldest')),
    ['2024', '2025', '2026'],
  );
});
