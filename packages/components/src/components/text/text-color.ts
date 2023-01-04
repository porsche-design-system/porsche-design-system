export const TEXT_COLORS = [
  'primary',
  'neutral-contrast-high',
  'neutral-contrast-medium',
  'neutral-contrast-low',
  'notification-success',
  'notification-warning',
  'notification-error',
  'notification-info',
  'inherit',
] as const;
export type TextColor = typeof TEXT_COLORS[number];
