export type ScrollerDirection = 'prev' | 'next';

export const SCROLLER_INDICATOR_POSITIONS = ['top', 'center'] as const;
export type ScrollerIndicatorPosition = (typeof SCROLLER_INDICATOR_POSITIONS)[number];
/** @deprecated */
export type ScrollerAlignScrollIndicator = ScrollerIndicatorPosition;

export const SCROLLER_ARIA_ATTRIBUTES = ['role'] as const;
export type ScrollerAriaAttribute = (typeof SCROLLER_ARIA_ATTRIBUTES)[number];

/** @deprecated */
export type ScrollerScrollToPosition = { scrollPosition: number; isSmooth?: boolean } | string; // string to support attribute, gets removed via InputParser

export const isScrollable = (isPrevHidden: boolean, isNextHidden: boolean): boolean => {
  return !(isPrevHidden && isNextHidden);
};
