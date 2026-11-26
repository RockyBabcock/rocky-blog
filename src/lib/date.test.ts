import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  formatLocalizedDate,
  formatLocalizedDateTime,
  formatLocalizedMonthDay,
  formatLocalizedMonthYear,
  getIntlLocale,
} from './date-localized';

describe('Intl localized date formatting', () => {
  const sampleDate = new Date('2025-03-14T08:30:00Z'); // 2025-03-14 16:30 Asia/Shanghai

  it('maps site locales to full Intl BCP 47 tags', () => {
    assert.equal(getIntlLocale('zh'), 'zh-CN');
    assert.equal(getIntlLocale('en'), 'en-US');
    assert.equal(getIntlLocale('ja'), 'ja-JP');
    assert.equal(getIntlLocale('fr'), 'fr-FR');
  });

  it('formats dates cleanly across zh, en, ja, fr with explicit timezone', () => {
    const zh = formatLocalizedDate(sampleDate, 'zh', 'Asia/Shanghai');
    const en = formatLocalizedDate(sampleDate, 'en', 'Asia/Shanghai');
    const ja = formatLocalizedDate(sampleDate, 'ja', 'Asia/Shanghai');
    const fr = formatLocalizedDate(sampleDate, 'fr', 'Asia/Shanghai');

    assert.match(zh, /2025.*3.*14/);
    assert.match(en, /Mar\s+14,\s+2025/);
    assert.match(ja, /2025.*3.*14/);
    assert.match(fr, /14.*2025/);
  });

  it('formats datetime with explicit timezone', () => {
    const en = formatLocalizedDateTime(sampleDate, 'en', 'Asia/Shanghai');
    assert.match(en, /16:30/);
  });

  it('formats month/day and month/year without boundary rollover', () => {
    const md = formatLocalizedMonthDay(sampleDate, 'fr', 'Asia/Shanghai');
    assert.match(md, /14/);
    const my = formatLocalizedMonthYear(2025, 1, 'fr', 'Asia/Shanghai');
    assert.match(my.toLowerCase(), /janvier/);
    assert.match(my, /2025/);
  });
});
