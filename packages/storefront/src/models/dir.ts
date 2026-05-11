export const STOREFRONT_DIRECTION_TYPES = ['ltr', 'rtl'] as const;
export type StorefrontDirection = (typeof STOREFRONT_DIRECTION_TYPES)[number];
