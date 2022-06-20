export type Lang =
  | 'de'
  | 'ru'
  | 'fr'
  | 'en'
  | 'it'
  | 'pt'
  | 'es'
  | 'ja'
  | 'ko'
  | 'zh'
  | 'nl'
  | 'pl'
  | 'cs'
  | 'da'
  | 'et'
  | 'fi'
  | 'lt'
  | 'lv'
  | 'no'
  | 'sl'
  | 'sv'
  | 'tr'
  | 'uk';

export type Locales = { [key in Lang]: { title: string; content: string } };

// TODO: add staging concept
export const CDN_PATH = 'https://cdn.ui.porsche.com/browser-notification';

export const OVERLAY_TYPES = ['cookie', 'browser'] as const;
export type OverlayType = typeof OVERLAY_TYPES[number];
