import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DEFAULT_ROUTERS } from './routes';
import {
  BUILT_IN_COVERS,
  buildSeoConfig,
  normalizeDefaultCoverList,
  normalizeDevConfig,
  normalizeIcpConfig,
  normalizeNavigation,
  normalizeSocialConfig,
} from './site-sections';

describe('site-sections normalizers', () => {
  it('normalizes social config with empty object fallback', () => {
    assert.deepEqual(normalizeSocialConfig(undefined), {});
    const social = { github: { url: 'https://github.com/test', icon: 'ri:github-fill', color: '#000' } };
    assert.deepEqual(normalizeSocialConfig(social), social);
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

  it('falls back to 21 built-in covers when defaultCoverList is empty or missing', () => {
    assert.equal(normalizeDefaultCoverList(undefined).length, 21);
    assert.deepEqual(normalizeDefaultCoverList([]), [...BUILT_IN_COVERS]);
    assert.deepEqual(normalizeDefaultCoverList(['/custom.webp']), ['/custom.webp']);
  });

  it('falls back to DEFAULT_ROUTERS when navigation is missing or empty', () => {
    assert.deepEqual(normalizeNavigation(undefined), DEFAULT_ROUTERS);
    assert.deepEqual(normalizeNavigation([]), DEFAULT_ROUTERS);
    const nav = [{ name: 'Home', path: '/' }];
    assert.deepEqual(normalizeNavigation(nav), nav);
  });

  it('normalizes devConfig defaults', () => {
    assert.deepEqual(normalizeDevConfig(undefined), {
      localProjectPath: '',
      contentRelativePath: 'src/content/blog',
      editors: [],
    });
    assert.deepEqual(
      normalizeDevConfig({
        localProjectPath: '/tmp/blog',
        editors: [{ id: 'vscode', name: 'VS Code', icon: 'ri:code-line', urlTemplate: 'vscode://file/{path}' }],
      }),
      {
        localProjectPath: '/tmp/blog',
        contentRelativePath: 'src/content/blog',
        editors: [{ id: 'vscode', name: 'VS Code', icon: 'ri:code-line', urlTemplate: 'vscode://file/{path}' }],
      },
    );
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
