/**
 * Settings Registry
 *
 * Declarative registry for the Settings Center; see docs/adr/0001.
 * Add settings here and implement their application logic in src/store/settings.ts.
 */

import type { TranslationKey } from '@/i18n/types';

export type SettingSection = 'reader' | 'general';
export type SettingType = 'segmented' | 'number' | 'switch';

export interface SettingOption {
  value: string;
  i18nKey: TranslationKey;
}

export interface SettingItem {
  /** Corresponding preference key in the settings store. */
  key: string;
  section: SettingSection;
  type: SettingType;
  i18nKey: TranslationKey;
  /** Optional Remix Icon identifier displayed beside the label. */
  icon?: string;
  /** Display unit for numeric controls; line height has no unit. */
  unit?: string;
  /** Step size for numeric controls. */
  step?: number;
  /** Options for segmented controls. */
  options?: SettingOption[];
  /** Disable this setting while the motion level is `reduced`. */
  disabledByReducedMotion?: boolean;
}

export const SETTINGS_REGISTRY: SettingItem[] = [
  // Reader preferences
  {
    key: 'fontPreset',
    section: 'reader',
    type: 'segmented',
    i18nKey: 'settings.fontPreset',
    icon: 'ri:font-family',
    options: [
      { value: 'round', i18nKey: 'settings.fontPreset.round' },
      { value: 'system', i18nKey: 'settings.fontPreset.system' },
      { value: 'serif', i18nKey: 'settings.fontPreset.serif' },
      { value: 'wenkai', i18nKey: 'settings.fontPreset.wenkai' },
    ],
  },
  {
    key: 'fontSize',
    section: 'reader',
    type: 'number',
    i18nKey: 'settings.fontSize',
    icon: 'ri:font-size',
    unit: 'px',
    step: 1,
  },
  {
    key: 'lineHeight',
    section: 'reader',
    type: 'number',
    i18nKey: 'settings.lineHeight',
    icon: 'ri:line-height',
    step: 0.1,
  },
  {
    key: 'measure',
    section: 'reader',
    type: 'number',
    i18nKey: 'settings.measure',
    icon: 'ri:text-spacing',
    unit: 'ch',
    step: 1,
  },
  {
    key: 'justify',
    section: 'reader',
    type: 'switch',
    i18nKey: 'settings.justify',
    icon: 'ri:align-justify',
  },

  // General preferences
  {
    key: 'scrollProgress',
    section: 'general',
    type: 'switch',
    i18nKey: 'settings.scrollProgress',
    icon: 'ri:donut-chart-line',
  },
  {
    key: 'motionLevel',
    section: 'general',
    type: 'segmented',
    i18nKey: 'settings.motionLevel',
    icon: 'ri:speed-up-line',
    options: [
      { value: 'lively', i18nKey: 'settings.motionLevel.lively' },
      { value: 'subtle', i18nKey: 'settings.motionLevel.subtle' },
      { value: 'reduced', i18nKey: 'settings.motionLevel.reduced' },
    ],
  },
  {
    key: 'wave',
    section: 'general',
    type: 'switch',
    i18nKey: 'settings.wave',
    icon: 'ri:water-flash-line',
    disabledByReducedMotion: true,
  },
];
