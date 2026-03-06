export type ScrollerDirection = 'prev' | 'next';

/** @deprecated */
export const SCROLLER_ALIGN_SCROLL_INDICATORS = ['top', 'center'] as const;
/** @deprecated */
export type ScrollerAlignScrollIndicator = (typeof SCROLLER_ALIGN_SCROLL_INDICATORS)[number];

export const SCROLLER_ARIA_ATTRIBUTES = ['role'] as const;
export type ScrollerAriaAttribute = (typeof SCROLLER_ARIA_ATTRIBUTES)[number];

/** @deprecated */
export type ScrollerScrollToPosition = { scrollPosition: number; isSmooth?: boolean } | string; // string to support attribute, gets removed via InputParser

export const isScrollable = (isPrevHidden: boolean, isNextHidden: boolean): boolean => {
  return !(isPrevHidden && isNextHidden);
};
