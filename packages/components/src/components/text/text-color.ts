// TODO: should be a shared type in shared types folder
/** @deprecated */
export const TEXT_COLORS_DEPRECATED = [
  'brand', // deprecated
  'default', // deprecated
  'neutral-contrast-low', // deprecated
  'neutral-contrast-medium', // deprecated
  'neutral-contrast-high', // deprecated
  'notification-neutral', // deprecated
] as const;
/** @deprecated */
export type TextColorDeprecated = (typeof TEXT_COLORS_DEPRECATED)[number];
export const TEXT_COLORS = [
  'primary',
  'contrast-low',
  'contrast-medium',
  'contrast-high',
  'notification-success',
  'notification-warning',
  'notification-error',
  'notification-info',
  'inherit',
  ...TEXT_COLORS_DEPRECATED,
] as const;
export type TextColor = (typeof TEXT_COLORS)[number];
