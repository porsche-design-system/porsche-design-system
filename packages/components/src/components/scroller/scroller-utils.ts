import { getHTMLElements, getScrollByX, scrollAreaClass } from '../../utils';

export type ScrollerDirection = 'prev' | 'next';

export const SCROLLER_ARIA_ATTRIBUTES = ['role'] as const;
export type ScrollerAriaAttribute = (typeof SCROLLER_ARIA_ATTRIBUTES)[number];

export type ScrollerScrollToPosition = { scrollPosition: number; isSmooth?: boolean } | string; // string to support attribute, gets removed via InputParser

export const SCROLL_INDICATOR_POSITIONS = ['top', 'center'] as const;
export type ScrollerAlignScrollIndicator = (typeof SCROLL_INDICATOR_POSITIONS)[number];

export const getScrollPositionAfterPrevNextClick = (
  scrollAreaElement: HTMLElement,
  direction: ScrollerDirection
): number => {
  const { scrollLeft } = scrollAreaElement;
  const scrollByX = getScrollByX(scrollAreaElement);
  return direction === 'next' ? scrollLeft + scrollByX : scrollLeft - scrollByX;
};

export const getScrollerElements = (scrollerElement: HTMLElement): [HTMLElement, HTMLElement] => {
  return getHTMLElements(scrollerElement.shadowRoot, `.${scrollAreaClass},.action-prev`) as [HTMLElement, HTMLElement];
};

export const isScrollable = (isPrevHidden: boolean, isNextHidden: boolean): boolean => {
  return !(isPrevHidden && isNextHidden);
};
