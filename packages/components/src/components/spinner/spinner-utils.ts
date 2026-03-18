export const SPINNER_COLORS = ['primary', 'inherit'] as const;
export type SpinnerColor = (typeof SPINNER_COLORS)[number];

/** @deprecated */
export const SPINNER_SIZES_DEPRECATED = ['small', 'medium', 'large'] as const;
export const SPINNER_SIZES = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  'inherit',
  ...SPINNER_SIZES_DEPRECATED,
] as const;
export type SpinnerSize = (typeof SPINNER_SIZES)[number];

export const SPINNER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type SpinnerAriaAttribute = (typeof SPINNER_ARIA_ATTRIBUTES)[number];
