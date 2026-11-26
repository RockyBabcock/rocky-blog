import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DEFAULT_ROUTERS } from './routes';
import {
  BUILT_IN_COVERS,
  buildSeoConfig,
  normalizeDefaultCoverList,
  normalizeDevConfig,
  normalizeI18nConfig,
  normalizeIcpConfig,
  normalizeNavigation,
  normalizeSocialConfig,
} from './site-sections';

function createWarnCollector() {
  const warnings: string[] = [];
  return { warnings, warn: (msg: string) => warnings.push(msg) };
}

describe('site-sections normalizers', () => {
  it('validates social config entries and skips malformed entries with warnings', () => {
    const { warnings, warn } = createWarnCollector();
    assert.deepEqual(normalizeSocialConfig(undefined, warn), {});
    assert.deepEqual(
      normalizeSocialConfig(
        {
          github: { url: ' https://github.com/test ', icon: ' ri:github-fill ', color: ' #000 ' },
          noColor: { url: '/rss.xml', icon: 'ri:rss-line' },
          missingUrl: { icon: 'ri:twitter-fill' },
          badShape: 'not-an-object',
        },
        warn,
      ),
      {
        github: { url: 'https://github.com/test', icon: 'ri:github-fill', color: '#000' },
        noColor: { url: '/rss.xml', icon: 'ri:rss-line', color: '' },
      },
    );
    assert.equal(warnings.length, 2);
  });

  it('normalizes ICP config from string shorthand or object', () => {
    assert.equal(normalizeIcpConfig(undefined), undefined);
    assert.equal(normalizeIcpConfig('   '), undefined);
    assert.deepEqual(normalizeIcpConfig('粤ICP备12345号'), { text: '粤ICP备12345号' });
    assert.deepEqual(normalizeIcpConfig({ text: '粤ICP备12345号', link: 'https://beian.miit.gov.cn/' }), {
      text: '粤ICP备12345号',
      link: 'https://beian.miit.gov.cn/',
    });
  });

  it('validates defaultCoverList items and falls back to 21 built-in covers when empty', () => {
    const { warnings, warn } = createWarnCollector();
    assert.equal(normalizeDefaultCoverList(undefined, warn).length, 21);
    assert.deepEqual(normalizeDefaultCoverList([], warn), [...BUILT_IN_COVERS]);
    assert.deepEqual(normalizeDefaultCoverList(['/custom.webp', '', 123], warn), ['/custom.webp']);
    assert.equal(warnings.length, 2);
  });

  it('validates navigation items recursively and skips entries lacking label or destination', () => {
    const { warnings, warn } = createWarnCollector();
    assert.deepEqual(normalizeNavigation(undefined, warn), DEFAULT_ROUTERS);
    assert.deepEqual(normalizeNavigation([], warn), DEFAULT_ROUTERS);

    const nav = normalizeNavigation(
      [
        { name: 'Home', nameKey: 'nav.home', path: '/', icon: 'ri:home-line' },
        {
          name: 'Posts',
          children: [{ name: 'Tags', path: '/tags' }, { name: 'BrokenChild' }],
        },
        { path: '/no-label' },
        { name: 'NoPathNoChildren' },
      ],
      warn,
    );

    assert.deepEqual(nav, [
      { name: 'Home', nameKey: 'nav.home', path: '/', icon: 'ri:home-line' },
      { name: 'Posts', children: [{ name: 'Tags', path: '/tags' }] },
    ]);
    assert.equal(warnings.length, 3);
  });

  it('falls back to DEFAULT_ROUTERS when all navigation items are invalid', () => {
    const { warnings, warn } = createWarnCollector();
    assert.deepEqual(normalizeNavigation([{ name: 'Broken' }], warn), DEFAULT_ROUTERS);
    assert.equal(warnings.length, 2);
  });

  it('validates devConfig editors including required {path} placeholder', () => {
    const { warnings, warn } = createWarnCollector();
    assert.deepEqual(normalizeDevConfig(undefined, warn), {
      localProjectPath: '',
      contentRelativePath: 'src/content/blog',
      editors: [],
    });
    assert.deepEqual(
      normalizeDevConfig(
        {
          localProjectPath: ' /tmp/blog ',
          editors: [
            { id: 'vscode', name: 'VS Code', icon: 'ri:code-line', urlTemplate: 'vscode://file/{path}' },
            { id: 'broken', name: 'Broken', icon: 'ri:bug-line', urlTemplate: 'broken://no-placeholder' },
          ],
        },
        warn,
      ),
      {
        localProjectPath: '/tmp/blog',
        contentRelativePath: 'src/content/blog',
        editors: [{ id: 'vscode', name: 'VS Code', icon: 'ri:code-line', urlTemplate: 'vscode://file/{path}' }],
      },
    );
    assert.equal(warnings.length, 1);
  });

  it('validates i18nConfig locales, deduplicates codes, and checks defaultLocale', () => {
    const { warnings, warn } = createWarnCollector();
    assert.deepEqual(
      normalizeI18nConfig(
        {
          defaultLocale: 'fr',
          locales: [
            { code: 'zh', label: '中文' },
            { code: 'zh', label: 'Duplicate' },
            { code: 'en', label: 'English', enabled: true },
          ],
        },
        warn,
      ),
      {
        defaultLocale: 'zh',
        locales: [
          { code: 'zh', label: '中文' },
          { code: 'en', label: 'English', enabled: true },
        ],
      },
    );
    assert.equal(warnings.length, 2);
  });

  it('builds SEO title, keywords, and url consistently', () => {
    assert.deepEqual(
      buildSeoConfig({
        title: 'Rocky Blog',
        alternate: 'rocky-blog',
        subtitle: 'Notes',
        description: 'Desc',
        keywords: ['Astro', 'Blog'],
        site: 'https://example.com',
      }),
      {
        title: 'rocky-blog = Rocky Blog = Notes',
        description: 'Desc',
        keywords: 'Astro,Blog',
        url: 'https://example.com',
      },
    );
    assert.equal(
      buildSeoConfig({ title: 'Only Title', description: undefined, keywords: undefined, site: 'https://example.com' }).title,
      'Only Title',
    );
  });
});
