export const TEXT_COLORS = [
  'brand',
  'default',
  'neutral-contrast-high',
  'neutral-contrast-medium',
  'neutral-contrast-low',
  'notification-success',
  'notification-warning',
  'notification-error',
  'notification-neutral',
  'inherit',
] as const;
export type TextColor = typeof TEXT_COLORS[number];
