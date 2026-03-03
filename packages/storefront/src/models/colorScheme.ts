export const STOREFRONT_COLOR_SCHEME_TYPES = ['scheme-light', 'scheme-dark', 'scheme-light-dark'] as const;
export type StorefrontColorScheme = (typeof STOREFRONT_COLOR_SCHEME_TYPES)[number];
