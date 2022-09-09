import type { Direction } from '../components/common/scroller/scroller-utils';
import { getScrollerElements } from '../components/common/scroller/scroller-utils';

let supportsScrollBehavior = 'scrollBehavior' in document?.documentElement.style;

// for unit tests
export const overrideSupportsScrollBehavior = (override: boolean): void => {
  supportsScrollBehavior = override;
};

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
  if (supportsScrollBehavior) {
    el.scrollTo({
      left: amount,
      behavior: 'smooth',
    });
  } else {
    // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
    // https://caniuse.com/?search=scroll-behavior
    const initialScrollLeft = el.scrollLeft;
    const scrollDistance = amount - initialScrollLeft;
    const scrollStep = scrollDistance / steps;

    intervalScroll(el, scrollStep, initialScrollLeft, amount);
  }
};

export const scrollElementBy = (el: HTMLElement, amount: number): void => {
  if (supportsScrollBehavior) {
    el.scrollBy({ left: amount, top: 0, behavior: 'smooth' });
  } else {
    // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
    // https://caniuse.com/?search=scroll-behavior
    const initialScrollLeft = el.scrollLeft;
    const endScrollLeft = initialScrollLeft + amount;
    const scrollStep = amount / steps;

    intervalScroll(el, scrollStep, initialScrollLeft, endScrollLeft);
  }
};

export const getScrollByX = (scrollAreaElement: HTMLElement): number => {
  return Math.round(scrollAreaElement.offsetWidth * 0.2);
};

export const FOCUS_PADDING_WIDTH = 4;

export const getScrollActivePosition = (
  elements: HTMLElement[],
  direction: Direction,
  activeElementIndex: number,
  scrollerElement: HTMLPScrollerElement
): number => {
  const { offsetLeft: activeElementOffsetLeft, offsetWidth: activeElementOffsetWidth } =
    elements[activeElementIndex] || {};
  const [scrollAreaElement, prevGradientElement] = getScrollerElements(scrollerElement);

  let scrollPosition: number;
  if (direction === 'next') {
    if (activeElementIndex === elements.length - 1) {
      // go to last element
      scrollPosition = activeElementOffsetLeft - FOCUS_PADDING_WIDTH;
    } else {
      // go to next element
      scrollPosition = activeElementOffsetLeft - prevGradientElement.offsetWidth + FOCUS_PADDING_WIDTH * 2;
    }
  } else {
    if (activeElementIndex === 0) {
      // go to first element
      scrollPosition = 0;
    } else {
      // go to prev element
      scrollPosition =
        activeElementOffsetLeft +
        activeElementOffsetWidth +
        prevGradientElement.offsetWidth -
        scrollAreaElement.offsetWidth;
    }
  }
  return scrollPosition;
};
