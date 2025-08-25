export const BUTTON_ARIA_ATTRIBUTES = [
  'aria-label',
  'aria-description',
  'aria-expanded',
  'aria-pressed',
  'aria-haspopup',
] as const;
export type ButtonAriaAttribute = (typeof BUTTON_ARIA_ATTRIBUTES)[number];
