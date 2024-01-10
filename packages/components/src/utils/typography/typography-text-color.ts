/** @deprecated */
export const TYPOGRAPHY_TEXT_COLORS_DEPRECATED = [
  'brand', // deprecated
  'default', // deprecated
  'neutral-contrast-low', // deprecated
  'neutral-contrast-medium', // deprecated
  'neutral-contrast-high', // deprecated
  'notification-neutral', // deprecated
] as const;
/** @deprecated */
export type TypographyTextColorDeprecated = (typeof TYPOGRAPHY_TEXT_COLORS_DEPRECATED)[number];
export const TYPOGRAPHY_TEXT_COLORS = [
  'primary',
  'contrast-low',
  'contrast-medium',
  'contrast-high',
  'notification-success',
  'notification-warning',
  'notification-error',
  'notification-info',
  'inherit',
  ...TYPOGRAPHY_TEXT_COLORS_DEPRECATED,
] as const;
export type TypographyTextColor = (typeof TYPOGRAPHY_TEXT_COLORS)[number];
