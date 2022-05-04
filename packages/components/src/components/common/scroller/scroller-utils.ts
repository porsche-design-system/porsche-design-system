import { getScrollByX } from '../../../utils';

export type ActiveElementChange = { activeElementIndex: number };
export type Direction = 'prev' | 'next';
export type GradientColorTheme = 'default' | 'surface';
export type ScrollToPosition = { scrollPosition: number; skipAnimation?: boolean };

export const FOCUS_PADDING_WIDTH = 4;

// TODO: move back to tabs bar utils
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
