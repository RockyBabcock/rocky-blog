import rawSiteYaml from '../../../config/site.yaml';
import rawI18nContentYaml from '../../../config/i18n-content.yaml';
import type {
  AnalyticsConfig,
  BangumiConfig,
  BgmConfig,
  ChristmasConfig,
  FeaturedCategoryConfig,
  FeaturedSeriesConfig,
  FriendGroup,
  FriendLink,
  FriendsIntro,
  LocaleEntry,
  SiteConfig,
  SocialLinkConfig,
} from './types';
import type { Announcement } from '@/types/announcement';
import type { Router } from '@constants/router';

// biome-ignore lint/suspicious/noExplicitAny: parsed YAML root
const raw = (rawSiteYaml ?? {}) as Record<string, any>;
// biome-ignore lint/suspicious/noExplicitAny: parsed YAML i18n content
export const i18nContentConfig = (rawI18nContentYaml ?? {}) as Record<string, any>;

export const siteConfig: SiteConfig = {
  title: raw.site?.title ?? 'astro-koharu',
  alternate: raw.site?.alternate ?? 'koharu',
  subtitle: raw.site?.subtitle ?? '',
  name: raw.site?.name ?? 'Author',
  description: raw.site?.description ?? '',
  avatar: raw.site?.avatar ?? '/img/avatar.webp',
  showLogo: Boolean(raw.site?.showLogo),
  author: raw.site?.author ?? raw.site?.name ?? 'Author',
  url: raw.site?.url ?? 'https://koharu.cosine.ren',
  defaultOgImage: raw.site?.defaultOgImage ?? '/img/avatar.webp',
  startYear: raw.site?.startYear ?? 2024,
  timezone: raw.site?.timezone ?? 'Asia/Shanghai',
  keywords: Array.isArray(raw.site?.keywords) ? raw.site.keywords : [],
  breadcrumbHome: raw.site?.breadcrumbHome,
  icp: raw.site?.icp,
  enableSlugTransliteration: Boolean(raw.site?.enableSlugTransliteration),
};

export const siteTimezone: string = siteConfig.timezone ?? 'Asia/Shanghai';

export const i18nConfig: { defaultLocale: string; locales: LocaleEntry[] } = {
  defaultLocale: raw.i18n?.defaultLocale ?? 'zh',
  locales: Array.isArray(raw.i18n?.locales)
    ? raw.i18n.locales.filter((l: LocaleEntry) => l.enabled !== false)
    : [{ code: 'zh', label: '中文' }],
};

export const categoryMap: Record<string, string> = raw.categoryMap ?? {};

export const featuredCategories: FeaturedCategoryConfig[] = Array.isArray(raw.featuredCategories)
  ? raw.featuredCategories
  : [];

export const featuredSeries: FeaturedSeriesConfig[] = Array.isArray(raw.featuredSeries)
  ? raw.featuredSeries.filter((s: FeaturedSeriesConfig) => s.enabled !== false)
  : [];

export const allFeaturedSeries: FeaturedSeriesConfig[] = Array.isArray(raw.featuredSeries) ? raw.featuredSeries : [];

export const socialConfig: Record<string, SocialLinkConfig> = raw.social ?? {};

export const friendsData: FriendLink[] = Array.isArray(raw.friends?.data) ? raw.friends.data : [];
export const friendGroups: FriendGroup[] = Array.isArray(raw.friends?.groups) ? raw.friends.groups : [];
export const friendsIntro: FriendsIntro = {
  title: raw.friends?.intro?.title ?? '友情链接',
  subtitle: raw.friends?.intro?.subtitle ?? '欢迎交换友链！',
  applyTitle: raw.friends?.intro?.applyTitle ?? '申请友链',
  applyDesc: raw.friends?.intro?.applyDesc ?? '请在本页留言，格式如下',
  exampleYaml: raw.friends?.intro?.exampleYaml ?? '',
};

export const announcementsConfig: Announcement[] = Array.isArray(raw.announcements) ? raw.announcements : [];

export const defaultCoverList: string[] = Array.isArray(raw.defaultCoverList) && raw.defaultCoverList.length > 0
  ? raw.defaultCoverList
  : Array.from({ length: 21 }, (_, i) => `/img/cover/${i + 1}.webp`);

export const navigationConfig: Router[] = Array.isArray(raw.navigation) ? raw.navigation : [];

export const bgmConfig: BgmConfig = {
  enabled: raw.bgm?.enabled !== false && Array.isArray(raw.bgm?.audio) && raw.bgm.audio.length > 0,
  metingApi: raw.bgm?.metingApi ?? 'https://163.hyc.moe/',
  audio: Array.isArray(raw.bgm?.audio) ? raw.bgm.audio : [],
};

export const christmasConfig: ChristmasConfig = {
  enabled: Boolean(raw.christmas?.enabled),
  features: {
    snowfall: Boolean(raw.christmas?.features?.snowfall),
    christmasColorScheme: Boolean(raw.christmas?.features?.christmasColorScheme),
    christmasCoverDecoration: Boolean(raw.christmas?.features?.christmasCoverDecoration),
    christmasHat: Boolean(raw.christmas?.features?.christmasHat),
    readingTimeSnow: Boolean(raw.christmas?.features?.readingTimeSnow),
  },
  snowfall: {
    speed: raw.christmas?.snowfall?.speed ?? 0.5,
    intensity: raw.christmas?.snowfall?.intensity ?? 0.7,
    mobileIntensity: raw.christmas?.snowfall?.mobileIntensity ?? 0.4,
    maxLayers: raw.christmas?.snowfall?.maxLayers ?? 6,
    maxIterations: raw.christmas?.snowfall?.maxIterations ?? 8,
    mobileMaxLayers: raw.christmas?.snowfall?.mobileMaxLayers ?? 4,
    mobileMaxIterations: raw.christmas?.snowfall?.mobileMaxIterations ?? 6,
  },
};

export const analyticsConfig: AnalyticsConfig = raw.analytics ?? {};

export const bangumiConfig: BangumiConfig | null = raw.bangumi?.userId
  ? {
      userId: String(raw.bangumi.userId),
      label: raw.bangumi.label ?? '追番',
      icon: raw.bangumi.icon ?? 'ri:bilibili-fill',
    }
  : null;

export const editorConfig = {
  enabled: raw.editor?.enabled !== false,
};

export const commentConfig = {
  provider: raw.comment?.provider ?? 'none',
  remark42: raw.comment?.remark42,
  giscus: raw.comment?.giscus,
  waline: raw.comment?.waline,
  twikoo: raw.comment?.twikoo,
};

export const motionConfig = {
  level: (raw.motion?.level ?? 'lively') as 'lively' | 'subtle' | 'reduced',
  heroPetals: raw.motion?.heroPetals !== false,
  clickBurst: raw.motion?.clickBurst !== false,
};

export const contentYamlConfig = raw.content ?? {};
