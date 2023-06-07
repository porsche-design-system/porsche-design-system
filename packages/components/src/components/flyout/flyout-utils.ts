export const FLYOUT_POSITIONS = ['left', 'right'] as const;
export type FlyoutPosition = (typeof FLYOUT_POSITIONS)[number];

export const FLYOUT_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlyoutAriaAttribute = (typeof FLYOUT_ARIA_ATTRIBUTES)[number];

// Threshold value to determine the scroll offset at which the shadow should be visible in the flyout
export const FLYOUT_SCROLL_SHADOW_THRESHOLD = 10;
