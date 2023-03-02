import { getHTMLElements, getScrollByX } from '../../utils';

export type ScrollerDirection = 'prev' | 'next';

/** @deprecated */
export const GRADIENT_COLORS_DEPRECATED = ['default', 'surface'] as const;
/** @deprecated */
export type ScrollerGradientColorDeprecated = typeof GRADIENT_COLORS_DEPRECATED[number];

export const GRADIENT_COLORS = ['background-base', 'background-surface'] as const;
export type ScrollerGradientColor = typeof GRADIENT_COLORS[number];

export type ScrollToPosition = { scrollPosition: number; isSmooth?: boolean } | string; // string to support attribute, gets removed via InputParser

export const SCROLL_INDICATOR_POSITIONS = ['top', 'center'] as const;
export type ScrollIndicatorPosition = typeof SCROLL_INDICATOR_POSITIONS[number];

export const getScrollPositionAfterPrevNextClick = (
  scrollAreaElement: HTMLElement,
  direction: ScrollerDirection
): number => {
  const { scrollLeft } = scrollAreaElement;
  const scrollByX = getScrollByX(scrollAreaElement);
  return direction === 'next' ? scrollLeft + scrollByX : scrollLeft - scrollByX;
};

export const getScrollerElements = (scrollerElement: HTMLElement): [HTMLElement, HTMLElement] => {
  return getHTMLElements(scrollerElement.shadowRoot, '.scroll-area,.action-prev') as [HTMLElement, HTMLElement];
};

export const isScrollable = (isPrevHidden: boolean, isNextHidden: boolean): boolean => {
  return !(isPrevHidden && isNextHidden);
};
