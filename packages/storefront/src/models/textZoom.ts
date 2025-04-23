export const STOREFRONT_TEXT_ZOOM_TYPES = ['100%', '130%', '150%', '200%'] as const;
export type StorefrontTextZoom = (typeof STOREFRONT_TEXT_ZOOM_TYPES)[number];
