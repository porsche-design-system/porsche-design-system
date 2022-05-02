import { getScrollByX } from '../../../utils';

export type ActiveElementChange = { activeElementIndex: number };
export type Direction = 'prev' | 'next';
export type GradientColorTheme = 'default' | 'surface';

export const FOCUS_PADDING_WIDTH = 4;

//TODO: rename Tab consts to element/button?
export const getScrollActivePosition = (
  elements: HTMLElement[],
  direction: Direction,
  activeTabIndex: number,
  scrollAreaOffsetWidth: number,
  gradientWidth: number
): number => {
  const { offsetLeft: activeTabOffsetLeft, offsetWidth: activeTabOffsetWidth } = elements[activeTabIndex] ?? {};
  const elementsCount = elements.length;
  let scrollPosition;
  if (direction === 'next') {
    if (activeTabIndex === elementsCount - 1) {
      // go to last tab
      scrollPosition = activeTabOffsetLeft - FOCUS_PADDING_WIDTH;
    } else {
      // go to next tab
      scrollPosition = activeTabOffsetLeft - gradientWidth + FOCUS_PADDING_WIDTH * 2;
    }
  } else {
    if (activeTabIndex === 0) {
      // go to first tab
      scrollPosition = 0;
    } else {
      // go to prev tab
      scrollPosition = activeTabOffsetLeft + activeTabOffsetWidth + gradientWidth - scrollAreaOffsetWidth;
    }
  }
  return scrollPosition;
};

export const getScrollPositionAfterPrevNextClick = (
  elements: HTMLElement[],
  scrollAreaElement: HTMLElement,
  direction: string
): number => {
  const { offsetLeft: lastTabOffsetLeft, offsetWidth: lastTabOffsetWidth } = elements[elements.length - 1] ?? {};
  const { offsetWidth: scrollAreaWidth, scrollLeft: currentScrollPosition } = scrollAreaElement ?? {};
  const scrollToStep = getScrollByX(scrollAreaElement);
  const scrollToMax = lastTabOffsetLeft + lastTabOffsetWidth - scrollAreaWidth + FOCUS_PADDING_WIDTH * 2;

  let scrollPosition: number;
  if (direction === 'next') {
    // Go to end of scroll-area when close to edge
    if (currentScrollPosition + scrollToStep * 2 > scrollToMax) {
      scrollPosition = scrollToMax;
    } else {
      scrollPosition = currentScrollPosition + scrollToStep;
    }
  } else {
    const scrollToMin = 0;
    // Go to start of scroll-area when close to edge
    if (currentScrollPosition - scrollToStep * 2 < scrollToMin) {
      scrollPosition = scrollToMin;
    } else {
      scrollPosition = currentScrollPosition - scrollToStep;
    }
  }
  return scrollPosition;
};
