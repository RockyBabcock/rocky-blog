import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import {
  buildMetingApiUrl,
  clearMetingCache,
  deriveTrackName,
  isDirectAudioUrl,
  parseMetingUrl,
  resolveAudioPlaylist,
} from './meting';

describe('meting URL parsing and playlist resolution', () => {
  beforeEach(() => {
    clearMetingCache();
  });

  it('parses NetEase and QQ Music URLs into Meting references', () => {
    assert.deepEqual(parseMetingUrl('https://music.163.com/#/song?id=3339210292'), {
      server: 'netease',
      type: 'song',
      id: '3339210292',
    });
    assert.deepEqual(parseMetingUrl('https://music.163.com/#/playlist?id=8676645748'), {
      server: 'netease',
      type: 'playlist',
      id: '8676645748',
    });
    assert.deepEqual(parseMetingUrl('https://y.qq.com/n/ryqq/playlist/123456'), {
      server: 'tencent',
      type: 'playlist',
      id: '123456',
    });
    assert.equal(parseMetingUrl('https://cdn.example.com/audio/demo.mp3'), null);
  });

  it('identifies direct HTML5 audio URLs and derives readable names', () => {
    assert.equal(isDirectAudioUrl('https://cdn.example.com/music/Spring%20Theme.mp3'), true);
    assert.equal(isDirectAudioUrl('/audio/sample.ogg'), true);
    assert.equal(isDirectAudioUrl('https://music.163.com/#/song?id=123'), false);
    assert.equal(isDirectAudioUrl('javascript:alert(1)'), false);
    assert.equal(deriveTrackName('https://cdn.example.com/music/Spring%20Theme.mp3'), 'Spring Theme');
  });

  it('builds Meting API URLs from templates', () => {
    assert.equal(
      buildMetingApiUrl('https://api.example.com/?server=:server&type=:type&id=:id', {
        server: 'netease',
        type: 'playlist',
        id: '42',
      }),
      'https://api.example.com/?server=netease&type=playlist&id=42',
    );
  });

  it('resolves grouped Meting playlists and direct audio tracks with fallback', async () => {
    let calls = 0;
    const mockFetch: typeof fetch = async (input) => {
      calls += 1;
      const url = String(input);
      if (url.startsWith('https://primary.invalid')) {
        return new Response('error', { status: 500 });
      }
      return new Response(
        JSON.stringify([
          {
            name: '山山',
            artist: '诗岸',
            url: 'https://cdn.example.com/shanshan.mp3',
            pic: 'http://p1.music.126.net/a/b.jpg',
            lrc: '[00:00.00]测试歌词',
          },
        ]),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    };

    const payload = JSON.stringify([
      {
        title: '诗岸歌单',
        list: ['https://music.163.com/#/playlist?id=8676645748'],
      },
      {
        title: '本地直链',
        list: [{ name: '直链示例', artist: 'Author', url: 'https://cdn.example.com/demo.mp3' }],
      },
    ]);

    const result = await resolveAudioPlaylist(payload, {
      apis: [
        'https://primary.invalid/?server=:server&type=:type&id=:id',
        'https://fallback.example/?server=:server&type=:type&id=:id',
      ],
      fetchImpl: mockFetch,
    });

    assert.equal(calls, 2);
    assert.equal(result.songs.length, 2);
    assert.equal(result.songs[0].name, '山山');
    assert.equal(result.songs[1].name, '直链示例');
    assert.deepEqual(result.groups, [
      { title: '诗岸歌单', startIndex: 0, count: 1 },
      { title: '本地直链', startIndex: 1, count: 1 },
    ]);
  });

  it('returns empty playlist on malformed JSON', async () => {
    const result = await resolveAudioPlaylist('{invalid');
    assert.deepEqual(result, { songs: [], groups: [] });
  });
});
