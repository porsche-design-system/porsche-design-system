import { getScrollByX } from '../../../utils';

export type ActiveElementChange = { activeElementIndex: number };
export type Direction = 'prev' | 'next';
export type GradientColorTheme = 'default' | 'surface';

export const FOCUS_PADDING_WIDTH = 4;

export const getScrollActivePosition = (
  elements: HTMLElement[],
  direction: Direction,
  activeElementIndex: number,
  scrollAreaOffsetWidth: number,
  gradientWidth: number
): number => {
  const { offsetLeft: activeElementOffsetLeft, offsetWidth: activeElementOffsetWidth } =
    elements[activeElementIndex] ?? {};
  const elementsCount = elements.length;
  let scrollPosition;
  if (direction === 'next') {
    if (activeElementIndex === elementsCount - 1) {
      // go to last element
      scrollPosition = activeElementOffsetLeft - FOCUS_PADDING_WIDTH;
    } else {
      // go to next element
      scrollPosition = activeElementOffsetLeft - gradientWidth + FOCUS_PADDING_WIDTH * 2;
    }
  } else {
    if (activeElementIndex === 0) {
      // go to first element
      scrollPosition = 0;
    } else {
      // go to prev element
      scrollPosition = activeElementOffsetLeft + activeElementOffsetWidth + gradientWidth - scrollAreaOffsetWidth;
    }
  }
  return scrollPosition;
};

export const getScrollPositionAfterPrevNextClick = (
  elements: HTMLElement[],
  scrollAreaElement: HTMLElement,
  direction: string
): number => {
  const { offsetLeft: lastElementOffsetLeft, offsetWidth: lastElementOffsetWidth } =
    elements[elements.length - 1] ?? {};
  const { offsetWidth: scrollAreaWidth, scrollLeft: currentScrollPosition } = scrollAreaElement ?? {};
  const scrollToStep = getScrollByX(scrollAreaElement);
  const scrollToMax = lastElementOffsetLeft + lastElementOffsetWidth - scrollAreaWidth + FOCUS_PADDING_WIDTH * 2;

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
