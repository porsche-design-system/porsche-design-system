// TODO: add `brand`, `default`, `notification-neutral` as deprecated fallback
export const TEXT_COLORS = [
  'primary',
  'brand',
  'default',
  'neutral-contrast-high',
  'neutral-contrast-medium',
  'neutral-contrast-low',
  'notification-success',
  'notification-warning',
  'notification-error',
  'notification-info',
  'notification-neutral',
  'inherit',
] as const;
export type TextColor = typeof TEXT_COLORS[number];
