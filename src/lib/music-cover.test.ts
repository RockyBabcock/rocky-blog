import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolveMusicCoverUrl } from './music-cover';

describe('resolveMusicCoverUrl', () => {
  it('returns empty string for missing or unsafe URLs', () => {
    assert.equal(resolveMusicCoverUrl(undefined), '');
    assert.equal(resolveMusicCoverUrl(''), '');
    assert.equal(resolveMusicCoverUrl('javascript:alert(1)'), '');
    assert.equal(resolveMusicCoverUrl('//evil.example/a.jpg'), '');
    assert.equal(resolveMusicCoverUrl('not a url'), '');
  });

  it('preserves relative root paths', () => {
    assert.equal(resolveMusicCoverUrl('/img/cover/1.webp'), '/img/cover/1.webp');
  });

  it('upgrades http URLs to https and appends param for NetEase CDN', () => {
    assert.equal(
      resolveMusicCoverUrl('http://p1.music.126.net/abc/123.jpg'),
      'https://p1.music.126.net/abc/123.jpg?param=300y300',
    );
    assert.equal(
      resolveMusicCoverUrl('https://p2.music.126.net/abc/123.jpg?param=200y200'),
      'https://p2.music.126.net/abc/123.jpg?param=200y200',
    );
  });

  it('leaves non-NetEase HTTPS cover URLs intact', () => {
    assert.equal(resolveMusicCoverUrl('https://cdn.example.com/cover.webp'), 'https://cdn.example.com/cover.webp');
  });
});
