export const SPINNER_COLORS = ['primary', 'inherit'] as const;
export type SpinnerColor = (typeof SPINNER_COLORS)[number];

export const SPINNER_SIZES = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
  'inherit',
] as const;
export type SpinnerSize = (typeof SPINNER_SIZES)[number];

export const SPINNER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type SpinnerAriaAttribute = (typeof SPINNER_ARIA_ATTRIBUTES)[number];
