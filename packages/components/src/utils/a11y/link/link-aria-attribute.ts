export const LINK_ARIA_ATTRIBUTES = ['aria-label', 'aria-description', 'aria-current', 'aria-haspopup'] as const;
export type LinkAriaAttribute = (typeof LINK_ARIA_ATTRIBUTES)[number];
