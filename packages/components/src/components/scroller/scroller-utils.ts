export type ScrollerDirection = 'prev' | 'next';

export const SCROLLER_INDICATOR_POSITIONS = ['top', 'center'] as const;
export type ScrollerIndicatorPosition = (typeof SCROLLER_INDICATOR_POSITIONS)[number];

export const SCROLLER_ARIA_ATTRIBUTES = ['role'] as const;
export type ScrollerAriaAttribute = (typeof SCROLLER_ARIA_ATTRIBUTES)[number];
