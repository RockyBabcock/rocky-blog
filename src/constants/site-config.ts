/**
 * Site configuration compatibility layer.
 *
 * Re-exports normalized configuration values from `@lib/config/site`.
 * `config/site.yaml` is parsed and normalized exclusively in `src/lib/config/`.
 * Nothing under `src/lib/**` may import this module — depend on `@lib/config/*` instead.
 */

export {
  configuredSeriesSlugs,
  contentConfig,
  defaultCoverList,
  enabledSeriesSlugs,
  i18nConfig,
  icpConfig,
  motionConfig,
  routers,
  seoConfig,
  siteConfig,
  socialConfig,
} from '@lib/config/site';
