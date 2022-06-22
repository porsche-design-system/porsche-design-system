import { Direction } from '../components/common/scroller/scroller-utils';

export const supportsScrollBehavior = (): boolean => 'scrollBehavior' in document?.documentElement?.style;

const steps = 20;

let scrollInterval: NodeJS.Timeout;
const intervalScroll = (el: HTMLElement, scrollStep: number, initialScrollLeft: number, endAmount: number): void => {
  let i = 0;
  clearInterval(scrollInterval);
  scrollInterval = setInterval(() => {
    el.scrollLeft = Math.round(initialScrollLeft + i * scrollStep);
    if (++i >= steps) {
      el.scrollLeft = endAmount;
      clearInterval(scrollInterval);
    }
  }, 10);
};

export const scrollElementTo = (el: HTMLElement, amount: number): void => {
  if (supportsScrollBehavior()) {
    el.scrollTo({
      left: amount,
      behavior: 'smooth',
    });
  } else {
    // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
    const initialScrollLeft = el.scrollLeft;
    const scrollDistance = amount - initialScrollLeft;
    const scrollStep = scrollDistance / steps;

    intervalScroll(el, scrollStep, initialScrollLeft, amount);
  }
};

export const scrollElementBy = (el: HTMLElement, amount: number): void => {
  if (supportsScrollBehavior()) {
    el.scrollBy({ left: amount, top: 0, behavior: 'smooth' });
  } else {
    // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
    const initialScrollLeft = el.scrollLeft;
    const endScrollLeft = initialScrollLeft + amount;
    const scrollStep = amount / steps;

    intervalScroll(el, scrollStep, initialScrollLeft, endScrollLeft);
  }
};

export const getScrollByX = (scrollAreaElement: HTMLElement): number => {
  const { offsetWidth } = scrollAreaElement;
  return Math.round(offsetWidth * 0.2);
};

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

  let scrollPosition: number;
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
