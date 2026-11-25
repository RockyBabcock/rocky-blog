import assert from 'node:assert/strict';
import test from 'node:test';
import { deriveTrackNameFromUrl, isDirectAudioUrl, parseAudioTracksFromJson } from './audio-tracks';

test('isDirectAudioUrl accepts direct http(s) and relative paths and rejects streaming pages or unsafe protocols', () => {
  assert.equal(isDirectAudioUrl('https://cdn.example.com/audio/theme.mp3'), true);
  assert.equal(isDirectAudioUrl('/audio/sample.ogg'), true);
  assert.equal(isDirectAudioUrl('https://music.163.com/playlist?id=8676645748'), false);
  assert.equal(isDirectAudioUrl('https://y.qq.com/n/ryqq/playlist/123'), false);
  assert.equal(isDirectAudioUrl('javascript:alert(1)'), false);
  assert.equal(isDirectAudioUrl('//evil.example/a.mp3'), false);
});

test('deriveTrackNameFromUrl strips query string and file extension', () => {
  assert.equal(deriveTrackNameFromUrl('https://cdn.example.com/music/Spring%20Rain.mp3?v=2'), 'Spring Rain');
  assert.equal(deriveTrackNameFromUrl('/audio/track-01.flac'), 'track-01');
});

test('parseAudioTracksFromJson parses grouped URL lists and rich track objects while filtering invalid entries', () => {
  const input = JSON.stringify([
    {
      title: 'Demo Set',
      list: [
        'https://cdn.example.com/a.mp3',
        'https://music.163.com/playlist?id=123',
        { name: 'B Track', artist: 'Composer', url: '/audio/b.mp3', pic: '/img/cover.webp' },
      ],
    },
    {
      name: 'Solo',
      artist: 'Author',
      url: 'https://cdn.example.com/solo.ogg',
      pic: 'javascript:alert(1)',
    },
  ]);

  const result = parseAudioTracksFromJson(input);
  assert.equal(result.tracks.length, 3);
  assert.deepEqual(result.tracks[0], {
    name: 'a',
    artist: '',
    url: 'https://cdn.example.com/a.mp3',
  });
  assert.deepEqual(result.tracks[1], {
    name: 'B Track',
    artist: 'Composer',
    url: '/audio/b.mp3',
    pic: '/img/cover.webp',
  });
  assert.deepEqual(result.tracks[2], {
    name: 'Solo',
    artist: 'Author',
    url: 'https://cdn.example.com/solo.ogg',
  });
  assert.deepEqual(result.groups, [
    { title: 'Demo Set', startIndex: 0, count: 2 },
    { title: undefined, startIndex: 2, count: 1 },
  ]);
});

test('parseAudioTracksFromJson returns empty lists on malformed input', () => {
  assert.deepEqual(parseAudioTracksFromJson('not-json'), { tracks: [], groups: [] });
  assert.deepEqual(parseAudioTracksFromJson(null), { tracks: [], groups: [] });
});
