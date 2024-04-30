// 'left' is deprecated and will be mapped to 'start'
// 'right' is deprecated and will be mapped to 'end'
/** @deprecated */
export const FLYOUT_POSITIONS_DEPRECATED = ['left', 'right'] as const;
/** @deprecated */
export type FlyoutPositionDeprecated = (typeof FLYOUT_POSITIONS_DEPRECATED)[number];

export const FLYOUT_POSITIONS = ['start', 'end', ...FLYOUT_POSITIONS_DEPRECATED] as const;
export type FlyoutPosition = (typeof FLYOUT_POSITIONS)[number];

export const FLYOUT_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlyoutAriaAttribute = (typeof FLYOUT_ARIA_ATTRIBUTES)[number];
