import fs from 'node:fs';
import path from 'node:path';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import svgr from 'vite-plugin-svgr';
import YAML from 'yaml';
import { BUNDLED_ICON_SETS } from './src/lib/config/icon-sets.ts';

function loadConfigForAstro() {
  const configPath = path.join(process.cwd(), 'config', 'site.yaml');
  const content = fs.readFileSync(configPath, 'utf8');
  return YAML.parse(content);
}

const yamlConfig = loadConfigForAstro();
const robotsConfig = yamlConfig.seo?.robots;

const i18nYaml = yamlConfig.i18n;
const i18nDefaultLocale = i18nYaml?.defaultLocale ?? 'zh';
const i18nLocales = (i18nYaml?.locales ?? [{ code: 'zh' }])
  .filter((l) => l.enabled !== false)
  .map((l) => l.code);
const hasMultipleLocales = i18nLocales.length > 1;

function conditionalSnowfall() {
  const VIRTUAL_ID = 'virtual:snowfall-canvas';
  const RESOLVED_ID = `\0${VIRTUAL_ID}`;
  const christmas = yamlConfig.christmas || { enabled: false, features: {} };
  const isEnabled = christmas.enabled && christmas.features?.snowfall;

  return {
    name: 'conditional-snowfall',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      if (!isEnabled && id === '@components/christmas/SnowfallCanvas') {
        return RESOLVED_ID;
      }
    },
    load(id) {
      if (id === RESOLVED_ID) {
        return 'export function SnowfallCanvas() { return null; }';
      }
    },
  };
}

export default defineConfig({
  site: yamlConfig.site?.url || 'https://koharu.cosine.ren',
  output: 'static',
  compressHTML: true,
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['anchor-link'],
            ariaLabel: 'Link to this section',
          },
        },
      ],
      rehypeKatex,
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  integrations: [
    react(),
    sitemap(),
    icon({
      include: Object.fromEntries(BUNDLED_ICON_SETS.map((set) => [set, ['*']])),
    }),
    robotsTxt(robotsConfig || {}),
  ],
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [yaml(), conditionalSnowfall(), svgr(), tailwindcss()],
    resolve: {
      noExternal: ['react-tweet'],
    },
  },
  ...(hasMultipleLocales && {
    i18n: {
      defaultLocale: i18nDefaultLocale,
      locales: i18nLocales,
      routing: {
        prefixDefaultLocale: false,
      },
    },
  }),
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  trailingSlash: 'ignore',
});
