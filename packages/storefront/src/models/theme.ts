export const PLAYGROUND_THEME_TYPES = ['light', 'dark', 'auto'] as const;
export type PlaygroundTheme = (typeof PLAYGROUND_THEME_TYPES)[number];

export const STOREFRONT_THEME_TYPES = ['light', 'dark', 'auto'] as const;
export type StorefrontTheme = (typeof STOREFRONT_THEME_TYPES)[number];
