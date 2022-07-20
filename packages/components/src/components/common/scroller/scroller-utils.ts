import { getScrollByX, getShadowRootHTMLElement } from '../../../utils';

export type ActiveElementChange = { activeElementIndex: number };
export type Direction = 'prev' | 'next';
export const GRADIENT_COLOR_THEMES = ['default', 'surface'] as const;
export type GradientColorTheme = typeof GRADIENT_COLOR_THEMES[number];
export type ScrollToPosition = { scrollPosition: number; isSmooth?: boolean };
export type PrevNextButtonJssStyle = any; // NOTE: this is actually a JssStyle but types are missing in final package

export const getScrollPositionAfterPrevNextClick = (scrollAreaElement: HTMLElement, direction: string): number => {
  const { scrollLeft } = scrollAreaElement;
  const scrollByX = getScrollByX(scrollAreaElement);
  let scrollPosition: number;
  if (direction === 'next') {
    scrollPosition = scrollLeft + scrollByX;
  } else {
    scrollPosition = scrollLeft - scrollByX;
  }
  return scrollPosition;
};

export const getScrollerElements = (
  scrollerElement: HTMLElement
): { scrollAreaElement: HTMLElement; prevGradientElement: HTMLElement } => {
  return {
    scrollAreaElement: getShadowRootHTMLElement(scrollerElement, '.scroll-area'),
    prevGradientElement: getShadowRootHTMLElement(scrollerElement, '.gradient'),
  };
};
