import { contentYamlConfig } from '@lib/config/site';

export interface ContentConfig {
  addBlankTarget: boolean;
  smoothScroll: boolean;
  addHeadingLevel: boolean;
  enhanceCodeBlock: boolean;
  enableCodeCopy: boolean;
  enableCodeFullscreen: boolean;
  enableLinkEmbed: boolean;
  enableCodePenEmbed: boolean;
  enableTweetEmbed: boolean;
  enableOGPreview: boolean;
  previewCacheTime: number;
  lazyLoadEmbeds: boolean;
  postCardImagePosition: 'alternating' | 'left' | 'right';
}

export const defaultContentConfig: ContentConfig = {
  addBlankTarget: contentYamlConfig.addBlankTarget !== false,
  smoothScroll: contentYamlConfig.smoothScroll !== false,
  addHeadingLevel: contentYamlConfig.addHeadingLevel !== false,
  enhanceCodeBlock: contentYamlConfig.enhanceCodeBlock !== false,
  enableCodeCopy: contentYamlConfig.enableCodeCopy !== false,
  enableCodeFullscreen: contentYamlConfig.enableCodeFullscreen !== false,
  enableLinkEmbed: contentYamlConfig.enableLinkEmbed !== false,
  enableCodePenEmbed: contentYamlConfig.enableCodePenEmbed !== false,
  enableTweetEmbed: contentYamlConfig.enableTweetEmbed !== false,
  enableOGPreview: contentYamlConfig.enableOGPreview !== false,
  previewCacheTime: Number(contentYamlConfig.previewCacheTime ?? 30),
  lazyLoadEmbeds: contentYamlConfig.lazyLoadEmbeds !== false,
  postCardImagePosition: contentYamlConfig.postCardImagePosition ?? 'alternating',
};
