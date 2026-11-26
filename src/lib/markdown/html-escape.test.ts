import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { escapeHtml } from './html-escape';

describe('escapeHtml', () => {
  it('escapes all five HTML-significant characters', () => {
    assert.equal(
      escapeHtml(`<script attr="a&b">'test'</script>`),
      '&lt;script attr=&quot;a&amp;b&quot;&gt;&#39;test&#39;&lt;/script&gt;',
    );
  });

  it('returns plain strings unchanged', () => {
    assert.equal(escapeHtml('Hello 世界 123'), 'Hello 世界 123');
    assert.equal(escapeHtml(''), '');
  });
});
