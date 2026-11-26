import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  filterPostsByLocaleCore,
  getAvailablePostLocalesCore,
  getPostLocaleCore,
  getPostSlugCore,
  getPostTranslationKeyCore,
  getSlugLocaleInfoCore,
  type LocalePostLike,
  type LocaleRuntimeOptions,
} from './locale-core';

const runtimeOptions: LocaleRuntimeOptions = {
  defaultLocale: 'zh',
  knownLocales: new Set(['zh', 'en', 'ja', 'fr']),
};

function makePost(id: string, overrides: Partial<LocalePostLike['data']> = {}): LocalePostLike {
  return {
    id,
    data: {
      date: new Date('2025-01-01T00:00:00Z'),
      ...overrides,
    },
  };
}

describe('content locale mapping and fallback', () => {
  it('detects zh/en/ja/fr locales and treats removed ko prefix as default-locale path', () => {
    assert.deepEqual(getSlugLocaleInfoCore('tools/getting-started', 'zh', runtimeOptions.knownLocales), {
      locale: 'zh',
      localeFreeSlug: 'tools/getting-started',
    });
    assert.deepEqual(getSlugLocaleInfoCore('en/tools/getting-started', 'zh', runtimeOptions.knownLocales), {
      locale: 'en',
      localeFreeSlug: 'tools/getting-started',
    });
    assert.deepEqual(getSlugLocaleInfoCore('fr/tools/getting-started', 'zh', runtimeOptions.knownLocales), {
      locale: 'fr',
      localeFreeSlug: 'tools/getting-started',
    });
    assert.deepEqual(getSlugLocaleInfoCore('ja/tools/getting-started', 'zh', runtimeOptions.knownLocales), {
      locale: 'ja',
      localeFreeSlug: 'tools/getting-started',
    });
    assert.deepEqual(getSlugLocaleInfoCore('ko/tools/getting-started', 'zh', runtimeOptions.knownLocales), {
      locale: 'zh',
      localeFreeSlug: 'ko/tools/getting-started',
    });
  });

  it('computes real available locales via slug or explicit translationKey without faking missing locales', () => {
    const zhPost = makePost('tools/getting-started', { link: 'getting-started' });
    const enPost = makePost('en/tools/getting-started', { link: 'getting-started' });
    const frPost = makePost('fr/tools/getting-started', { link: 'getting-started' });
    const zhOnly = makePost('life/hello-world', { link: 'hello-world' });
    const explicitZh = makePost('note/guide-zh', { translationKey: 'guide-key' });
    const explicitFr = makePost('fr/note/guide-fr', { translationKey: 'guide-key' });

    const all = [zhPost, enPost, frPost, zhOnly, explicitZh, explicitFr];
    const enabled = ['zh', 'en', 'ja', 'fr'];

    assert.deepEqual(getAvailablePostLocalesCore(zhPost, all, enabled, runtimeOptions), ['zh', 'en', 'fr']);
    assert.deepEqual(getAvailablePostLocalesCore(zhOnly, all, enabled, runtimeOptions), ['zh']);
    assert.deepEqual(getAvailablePostLocalesCore(explicitZh, all, enabled, runtimeOptions), ['zh', 'fr']);
    assert.equal(getPostTranslationKeyCore(explicitFr, runtimeOptions), 'guide-key');
    assert.equal(getPostSlugCore(enPost, runtimeOptions), 'getting-started');
    assert.equal(getPostLocaleCore(frPost, runtimeOptions), 'fr');
  });

  it('falls back to default locale for untranslated posts while avoiding duplicates when translated', () => {
    const zhTranslated = makePost('tools/getting-started', { link: 'getting-started' });
    const frTranslated = makePost('fr/tools/getting-started', { link: 'getting-started' });
    const zhFallback = makePost('life/hello-world', { link: 'hello-world' });

    const frList = filterPostsByLocaleCore([zhTranslated, frTranslated, zhFallback], 'fr', runtimeOptions);
    assert.deepEqual(
      frList.map((p) => p.id),
      ['fr/tools/getting-started', 'life/hello-world'],
    );
  });
});
