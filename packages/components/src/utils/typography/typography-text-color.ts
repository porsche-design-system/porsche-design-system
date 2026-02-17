export const TYPOGRAPHY_TEXT_COLORS = [
  'primary',
  'contrast-high',
  'contrast-medium',
  'contrast-low',
  'success',
  'warning',
  'error',
  'info',
  'inherit',
] as const;
export type TypographyTextColor = (typeof TYPOGRAPHY_TEXT_COLORS)[number];
