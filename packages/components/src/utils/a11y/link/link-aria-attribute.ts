export const LINK_ARIA_ATTRIBUTES = ['aria-label', 'aria-current'] as const;
export type LinkAriaAttribute = (typeof LINK_ARIA_ATTRIBUTES)[number];
