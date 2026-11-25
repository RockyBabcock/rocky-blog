export interface SiteConfig {
  title: string;
  alternate?: string;
  subtitle?: string;
  name: string;
  description?: string;
  avatar?: string;
  showLogo?: boolean;
  author?: string;
  url: string;
  defaultOgImage?: string;
  startYear?: number;
  timezone?: string;
  keywords?: string[];
  breadcrumbHome?: string;
  icp?: {
    text: string;
    link?: string;
  };
  enableSlugTransliteration?: boolean;
}

export interface LocaleEntry {
  code: string;
  label: string;
  enabled?: boolean;
}

export interface FeaturedCategoryConfig {
  link: string;
  label: string;
  image: string;
  description?: string;
}

export interface FeaturedSeriesConfig {
  slug: string;
  categoryName: string;
  label?: string;
  fullName?: string;
  description?: string;
  cover?: string;
  enabled?: boolean;
  icon?: string;
  highlightOnHome?: boolean;
  links?: {
    github?: string;
    rss?: string;
    chrome?: string;
    docs?: string;
  };
}

export interface SocialLinkConfig {
  url: string;
  icon: string;
  color?: string;
}

export interface FriendGroup {
  id: string;
  title: string;
  description?: string;
}

export interface FriendLink {
  site: string;
  url: string;
  owner: string;
  desc: string;
  image: string;
  color?: string;
  group?: string;
}

export interface FriendsIntro {
  title: string;
  subtitle: string;
  applyTitle: string;
  applyDesc: string;
  exampleYaml: string;
}

export interface BgmAudioGroup {
  title: string;
  list: string[];
}

export interface BgmConfig {
  enabled: boolean;
  metingApi?: string;
  audio: BgmAudioGroup[];
}

export interface ChristmasConfig {
  enabled: boolean;
  features: {
    snowfall: boolean;
    christmasColorScheme: boolean;
    christmasCoverDecoration: boolean;
    christmasHat: boolean;
    readingTimeSnow: boolean;
  };
  snowfall: {
    speed: number;
    intensity: number;
    mobileIntensity: number;
    maxLayers: number;
    maxIterations: number;
    mobileMaxLayers: number;
    mobileMaxIterations: number;
  };
}

export interface UmamiSiteStatsConfig {
  endpoint: string;
  id: string;
  token?: string;
}

export interface AnalyticsConfig {
  umami?: {
    enabled?: boolean;
    id?: string;
    endpoint?: string;
    statistics_display?: {
      token?: string;
      article_page_views?: boolean;
      footer_site_stats?: boolean;
    };
  };
}

export interface BangumiConfig {
  userId: string;
  label?: string;
  icon?: string;
}
