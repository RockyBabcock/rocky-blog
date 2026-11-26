import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import yaml from 'yaml';
import { uiStrings as en } from './translations/en';
import { uiStrings as fr } from './translations/fr';
import { translations } from './translations/index';
import { uiStrings as ja } from './translations/ja';
import { uiStrings as zh } from './translations/zh';

const EXPECTED_LOCALES = ['zh', 'en', 'ja', 'fr'] as const;

describe('i18n translations parity and locale set', () => {
  it('registers exactly zh, en, ja, fr and removes ko', () => {
    assert.deepEqual(Object.keys(translations).sort(), [...EXPECTED_LOCALES].sort());
    assert.equal('ko' in translations, false);
  });

  it('maintains 100% key parity with non-empty values across zh, en, ja, fr', () => {
    const baseKeys = Object.keys(zh).sort();
    const dictionaries = { en, ja, fr };

    for (const [locale, dict] of Object.entries(dictionaries)) {
      const keys = Object.keys(dict).sort();
      const missing = baseKeys.filter((key) => !(key in dict));
      const extra = keys.filter((key) => !(key in zh));
      assert.deepEqual(missing, [], `Missing keys in ${locale}: ${missing.join(', ')}`);
      assert.deepEqual(extra, [], `Extra keys in ${locale}: ${extra.join(', ')}`);

      for (const key of baseKeys) {
        const value = dict[key as keyof typeof dict];
        assert.equal(typeof value, 'string', `${locale}.${key} should be a string`);
        assert.ok(value && value.trim().length > 0, `${locale}.${key} should not be empty`);
      }
    }
  });

  it('config/site.yaml and config/i18n-content.yaml configure zh/en/ja/fr with no ko', () => {
    const root = process.cwd();
    const siteYaml = yaml.parse(fs.readFileSync(path.join(root, 'config/site.yaml'), 'utf8')) as {
      i18n: { defaultLocale: string; locales: { code: string; label: string }[] };
    };
    const contentYaml = yaml.parse(fs.readFileSync(path.join(root, 'config/i18n-content.yaml'), 'utf8')) as Record<
      string,
      unknown
    >;

    const codes = siteYaml.i18n.locales.map((l) => l.code);
    assert.deepEqual(codes, ['zh', 'en', 'ja', 'fr']);
    assert.equal(siteYaml.i18n.defaultLocale, 'zh');
    assert.equal('ko' in contentYaml, false);
    assert.ok('fr' in contentYaml, 'config/i18n-content.yaml should include fr');
    assert.equal(fs.existsSync(path.join(root, 'src/content/blog/ko')), false);
  });
});
