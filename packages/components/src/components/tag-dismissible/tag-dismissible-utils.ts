export const TAG_DISMISSIBLE_COLORS = ['background-surface', 'background-default', 'background-base'] as const; // 'background-default' is deprecated (replaced with 'background-base')
export type TagDismissibleColor = typeof TAG_DISMISSIBLE_COLORS[number];

export const TAG_DISMISSIBLE_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type TagDismissibleAriaAttribute = typeof TAG_DISMISSIBLE_ARIA_ATTRIBUTES[number];
