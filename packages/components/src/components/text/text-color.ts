export const TEXT_COLORS = [
  'primary',
  'brand', // deprecated
  'default', // deprecated
  'contrast-low',
  'neutral-contrast-low', // deprecated
  'contrast-medium',
  'neutral-contrast-medium', // deprecated
  'contrast-high',
  'neutral-contrast-high', // deprecated
  'notification-success',
  'notification-warning',
  'notification-error',
  'notification-info',
  'notification-neutral', // deprecated
  'inherit',
] as const;
export type TextColor = typeof TEXT_COLORS[number];
