/**
 * Configuration Types for YAML-based site configuration
 *
 * These types match the structure of config/site.yaml
 */

// =============================================================================
// Site Basic Configuration
// =============================================================================

export interface SiteBasicConfig {
  title: string;
  alternate?: string;
  subtitle?: string;
  name: string;
  description?: string;
  avatar?: string;
  showLogo?: boolean;
  author?: string;
  url: string;
  startYear?: number;
  defaultOgImage?: string;
  keywords?: string[];
  /** 面包屑导航中首页的显示名称 @default '首页' */
  breadcrumbHome?: string;
  /** 时区配置 (IANA 格式) @default 'Asia/Shanghai' */
  timezone?: string;
  /** ICP filing number. Supports plain text or { text, link } format */
  icp?: string | { text: string; link?: string };
  /** Enable slug transliteration (converts CJK characters to pinyin/romaji) @default false */
  enableSlugTransliteration?: boolean;
}

// =============================================================================
// Featured Content
// =============================================================================

export interface FeaturedCategory {
  link: string;
  image: string;
  label?: string;
  description?: string;
}

export interface FeaturedSeriesLinks {
  github?: string;
  chrome?: string;
  docs?: string;
}

/**
 * Single featured series configuration
 */
export interface FeaturedSeriesItem {
  /** URL path for this series (e.g., 'weekly' → /weekly) */
  slug: string;
  /** Category name this series is based on */
  categoryName: string;
  /** Short label for sidebar/navigation */
  label?: string;
  /** Whether this series is enabled */
  enabled?: boolean;
  /** Full name for page title */
  fullName?: string;
  /** Series description (supports markdown) */
  description?: string;
  /** Cover image path */
  cover?: string;
  /** Navigation icon (Iconify format) */
  icon?: string;
  /** Whether to highlight latest post on home page */
  highlightOnHome?: boolean;
  /** Related links */
  links?: FeaturedSeriesLinks;
}

/**
 * @deprecated Use FeaturedSeriesItem instead
 */
export type FeaturedSeries = FeaturedSeriesItem;

/**
 * Runtime site configuration: {@link SiteBasicConfig} with `url` renamed to
 * `site` and featured content normalized.
 */
export type ResolvedSiteConfig = Omit<SiteBasicConfig, 'url'> & {
  site: string;
  featuredCategories?: FeaturedCategory[];
  featuredSeries: FeaturedSeriesItem[];
};

// =============================================================================
// Social Configuration
// =============================================================================

export interface SocialPlatform {
  url: string;
  icon: string;
  color: string;
}

export type SocialConfig = Record<string, SocialPlatform>;

// =============================================================================
// Content Processing Configuration
// =============================================================================

/** Post card cover placement on list pages. */
export type PostCardImagePosition = 'alternating' | 'left' | 'right';

/**
 * Raw `content:` section of `config/site.yaml`. Every field is optional —
 * use {@link ResolvedContentConfig} for the value consumers see.
 */
export interface ContentConfig {
  addBlankTarget?: boolean;
  smoothScroll?: boolean;
  addHeadingLevel?: boolean;
  enhanceCodeBlock?: boolean;
  enableCodeCopy?: boolean;
  enableCodeFullscreen?: boolean;
  postCardImagePosition?: PostCardImagePosition;
  // Shoka compatibility features
  enableShokaContainers?: boolean;
  enableShokaAttrs?: boolean;
  enableShokaEffects?: boolean;
  enableShokaSpoiler?: boolean;
  enableShokaRuby?: boolean;
  enableMath?: boolean;
  enableCodeMeta?: boolean;
  enableEncryptedBlock?: boolean;
}

/** Content config after defaults are applied — no optional fields. */
export type ResolvedContentConfig = Required<ContentConfig>;

// =============================================================================
// Motion
// =============================================================================

/** Site-wide motion intensity; visitors can override it in the Settings Center. */
export type MotionLevel = 'lively' | 'subtle' | 'reduced';

/**
 * Raw `motion:` section of `config/site.yaml`. Every field is optional —
 * use {@link ResolvedMotionConfig} for the value consumers see.
 */
export interface MotionConfig {
  /** Default level for visitors who have not picked one. */
  level?: MotionLevel;
  /** Falling sakura petals over page covers; only runs at the `lively` level. */
  heroPetals?: boolean;
  /** Petal burst where interactive elements are clicked; only runs at the `lively` level. */
  clickBurst?: boolean;
}

/** Motion config after defaults are applied — no optional fields. */
export type ResolvedMotionConfig = Required<MotionConfig>;

// =============================================================================
// Navigation
// =============================================================================

export interface RouterItem {
  name?: string;
  /** Translation key for locale-aware name (e.g., 'nav.home'). Falls back to `name` if absent. */
  nameKey?: string;
  path?: string;
  icon?: string;
  /** Keep this link on its canonical path instead of adding a locale prefix. */
  localeIndependent?: boolean;
  children?: RouterItem[];
}

// =============================================================================
// SEO Configuration
// =============================================================================

export interface RobotsPolicyItem {
  userAgent: string;
  allow?: string | string[];
  disallow?: string | string[];
  crawlDelay?: number;
}

export interface RobotsConfig {
  policy?: RobotsPolicyItem[];
  host?: boolean;
}

export interface SeoConfig {
  robots?: RobotsConfig;
}

// =============================================================================
// Dev Tools Configuration (Dev Only - Local Editor Integration)
// =============================================================================

/**
 * Configuration for a single editor
 */
export interface EditorConfig {
  /** Unique identifier for the editor */
  id: string;
  /** Display name */
  name: string;
  /** Iconify icon identifier (e.g., 'devicon-plain:vscode') */
  icon: string;
  /** URL template with placeholder: {path} for file absolute path */
  urlTemplate: string;
}

/**
 * Development tools configuration from site.yaml
 */
export interface DevConfig {
  /** Absolute path to the local project directory */
  localProjectPath: string;
  /** Relative path from project root to content directory (default: 'src/content/blog') */
  contentRelativePath: string;
  /** List of configured editors */
  editors: EditorConfig[];
}

// =============================================================================
// i18n Configuration
// =============================================================================

export interface LocaleConfig {
  /** Locale code (BCP 47 short format, e.g., 'zh', 'en', 'ja') */
  code: string;
  /** Display label for the locale (e.g., '中文', 'English') */
  label?: string;
  /** Whether this locale is active. Defaults to true. Set false to keep content but hide locale from routing/UI. */
  enabled?: boolean;
}

export interface I18nConfig {
  /** Default locale code */
  defaultLocale: string;
  /** List of supported locales */
  locales: LocaleConfig[];
}

// =============================================================================
// Root Configuration Type
// =============================================================================

export interface SiteYamlConfig {
  site: SiteBasicConfig;
  featuredCategories?: FeaturedCategory[];
  /** Featured series configuration - supports array (multiple series) or single object (legacy) */
  featuredSeries?: FeaturedSeriesItem[] | FeaturedSeriesItem;
  social?: SocialConfig;
  defaultCoverList?: string[];
  content?: ContentConfig;
  /** Motion intensity default and decorative sakura effects. */
  motion?: MotionConfig;
  /** Markdown copy / download actions on post pages. */
  postActions?: unknown;
  navigation?: RouterItem[];
  /** SEO configuration for robots.txt and meta tags */
  seo?: SeoConfig;
  categoryMap?: Record<string, string>; // TODO: i18n, now use eg: { '随笔': 'life' }
  /** Development tools configuration (dev only) */
  dev?: DevConfig;
  /** Internationalization configuration */
  i18n?: I18nConfig;
}
