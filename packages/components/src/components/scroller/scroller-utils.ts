import { getHTMLElements, getScrollByX } from '../../utils';

export type Direction = 'prev' | 'next';
export const GRADIENT_COLOR_THEMES = ['default', 'surface'] as const;
export type GradientColorTheme = typeof GRADIENT_COLOR_THEMES[number];
export type ScrollToPosition = { scrollPosition: number; isSmooth?: boolean } | string; // string to support attribute, gets removed via InputParser
export const SCROLL_INDICATOR_POSITIONS = ['top', 'center'] as const;
export type ScrollIndicatorPosition = typeof SCROLL_INDICATOR_POSITIONS[number];

export const getScrollPositionAfterPrevNextClick = (scrollAreaElement: HTMLElement, direction: Direction): number => {
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
