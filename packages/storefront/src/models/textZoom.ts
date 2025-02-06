export const STOREFRONT_TEXT_ZOOM_TYPES = ['ltr', 'rtl', 'auto'] as const;
export type StorefrontTextZoom = (typeof STOREFRONT_TEXT_ZOOM_TYPES)[number];
