export const STOREFRONT_DIRECTION_TYPES = ['ltr', 'rtl', 'auto'] as const;
export type StorefrontDirection = (typeof STOREFRONT_DIRECTION_TYPES)[number];
