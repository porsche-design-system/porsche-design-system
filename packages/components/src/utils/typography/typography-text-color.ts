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
] as const;
export type TypographyTextColor = (typeof TYPOGRAPHY_TEXT_COLORS)[number];
