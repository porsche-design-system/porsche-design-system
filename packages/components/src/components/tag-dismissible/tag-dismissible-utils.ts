/** @deprecated */
export const TAG_DISMISSIBLE_COLORS_DEPRECATED = ['background-default'] as const; // 'background-default' is deprecated (replaced with 'background-base')
/** @deprecated */
export type TagDismissibleColorDeprecated = typeof TAG_DISMISSIBLE_COLORS_DEPRECATED[number];
export const TAG_DISMISSIBLE_COLORS = [
  'background-surface',
  'background-base',
  ...TAG_DISMISSIBLE_COLORS_DEPRECATED,
] as const;
export type TagDismissibleColor = typeof TAG_DISMISSIBLE_COLORS[number];

export const TAG_DISMISSIBLE_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type TagDismissibleAriaAttribute = typeof TAG_DISMISSIBLE_ARIA_ATTRIBUTES[number];
