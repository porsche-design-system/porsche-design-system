export const SPINNER_SIZES = ['small', 'medium', 'large', 'inherit'] as const;
export type SpinnerSize = typeof SPINNER_SIZES[number];

export const SPINNER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type SpinnerAriaAttribute = typeof SPINNER_ARIA_ATTRIBUTES[number];
