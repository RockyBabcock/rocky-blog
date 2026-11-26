/**
 * Configuration consistency tests for `config/site.yaml`.
 *
 * Ensures the live YAML file stays valid and consistent between `astro.config.mjs`
 * (which reads `config/site.yaml` via Node `fs` + `yaml` at startup) and
 * `src/lib/config/site.ts` (which normalizes all runtime sections).
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import YAML from 'yaml';
import { isValidTimezone } from '../timezone';
import { normalizeContentConfig } from './content';
import { normalizeFeaturedSeries } from './featured-series';
import { normalizeMotionConfig } from './motion';
import { normalizePostActionsConfig } from './post-actions';
import { RESERVED_ROUTES } from './reserved-routes';
import {
  normalizeDefaultCoverList,
  normalizeDevConfig,
  normalizeI18nConfig,
  normalizeIcpConfig,
  normalizeNavigation,
  normalizeSocialConfig,
} from './site-sections';
import type { RouterItem, SiteYamlConfig } from './types';

const siteYamlPath = path.resolve(process.cwd(), 'config/site.yaml');
const rawYaml = YAML.parse(fs.readFileSync(siteYamlPath, 'utf8')) as SiteYamlConfig;

function collectNavPaths(items: readonly RouterItem[]): string[] {
  const paths: string[] = [];
  for (const item of items) {
    if (item.path) paths.push(item.path);
    if (item.children?.length) paths.push(...collectNavPaths(item.children));
  }
  return paths;
}

describe('config/site.yaml consistency', () => {
  it('defines a valid site URL, title, name, and IANA timezone', () => {
    assert.equal(typeof rawYaml.site?.title, 'string');
    assert.ok(rawYaml.site.title.trim().length > 0);
    assert.equal(typeof rawYaml.site?.name, 'string');
    assert.ok(rawYaml.site.name.trim().length > 0);

    const parsedUrl = new URL(rawYaml.site.url);
    assert.ok(parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:', 'site.url must use http or https');

    if (rawYaml.site.timezone) {
      assert.equal(isValidTimezone(rawYaml.site.timezone), true, `Invalid timezone: ${rawYaml.site.timezone}`);
    }
  });

  it('keeps i18n configuration aligned between astro.config.mjs and site.ts', () => {
    const warnings: string[] = [];
    const normalized = normalizeI18nConfig(rawYaml.i18n, (msg) => warnings.push(msg));
    assert.deepEqual(warnings, [], `Unexpected i18n warnings: ${warnings.join('; ')}`);

    // Match astro.config.mjs extraction logic
    const astroDefaultLocale = rawYaml.i18n?.defaultLocale ?? 'zh';
    const astroLocales = (rawYaml.i18n?.locales ?? [{ code: 'zh' }]).map((l) => l.code);

    assert.equal(normalized.defaultLocale, astroDefaultLocale);
    assert.deepEqual(
      normalized.locales.map((l) => l.code),
      astroLocales,
    );
    assert.ok(astroLocales.includes(astroDefaultLocale), 'defaultLocale must be included in i18n.locales');
  });

  it('validates all sections cleanly with zero warnings', () => {
    const warnings: string[] = [];
    const warn = (msg: string) => warnings.push(msg);

    const content = normalizeContentConfig(rawYaml.content);
    assert.equal(typeof content.enableMath, 'boolean');
    assert.equal(typeof content.enableEncryptedBlock, 'boolean');

    const motion = normalizeMotionConfig(rawYaml.motion);
    assert.ok(['lively', 'subtle', 'reduced'].includes(motion.level));

    const postActions = normalizePostActionsConfig(rawYaml.postActions);
    assert.equal(typeof postActions.copyMarkdown, 'boolean');

    const social = normalizeSocialConfig(rawYaml.social, warn);
    assert.ok(Object.keys(social).length > 0);

    const navigation = normalizeNavigation(rawYaml.navigation, warn);
    assert.ok(navigation.length > 0);
    const navPaths = collectNavPaths(navigation);
    assert.equal(new Set(navPaths).size, navPaths.length, `Duplicate navigation paths found: ${navPaths.join(', ')}`);

    normalizeDefaultCoverList(rawYaml.defaultCoverList, warn);
    normalizeDevConfig(rawYaml.dev, warn);
    normalizeIcpConfig(rawYaml.site.icp);

    const series = normalizeFeaturedSeries(rawYaml.featuredSeries, {
      categoryMap: rawYaml.categoryMap,
      reservedRoutes: RESERVED_ROUTES,
    });

    for (const item of series) {
      if (item.enabled !== false && rawYaml.categoryMap) {
        assert.ok(
          item.categoryName in rawYaml.categoryMap,
          `Featured series "${item.slug}" references unmapped categoryName "${item.categoryName}"`,
        );
      }
    }

    assert.deepEqual(warnings, [], `Unexpected config warnings: ${warnings.join('; ')}`);
  });

  it('maps every featuredCategories link segment to a known categoryMap slug', () => {
    const mappedSlugs = new Set(Object.values(rawYaml.categoryMap ?? {}));
    for (const category of rawYaml.featuredCategories ?? []) {
      const segments = category.link.split('/').filter(Boolean);
      assert.ok(segments.length > 0, `Empty featuredCategories link for "${category.label ?? ''}"`);
      for (const segment of segments) {
        assert.ok(
          mappedSlugs.has(segment),
          `featuredCategories link "${category.link}" contains segment "${segment}" missing from categoryMap`,
        );
      }
    }
  });
});
