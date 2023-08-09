import type { ScrollerDirection } from '../components/scroller/scroller-utils';
import { getScrollerElements } from '../components/scroller/scroller-utils';

export const scrollElementTo = (el: HTMLElement, amount: number): void => {
  el.scrollTo({
    left: amount,
    behavior: 'smooth', // TODO: make conditional so we don't need to wait in e2e or vrt tests
  });
};

export const scrollElementBy = (el: HTMLElement, amount: number): void => {
  el.scrollBy({ left: amount, top: 0, behavior: 'smooth' }); // TODO: make conditional so we don't need to wait in e2e or vrt tests
};

export const getScrollByX = (scrollAreaElement: HTMLElement): number => {
  return Math.round(scrollAreaElement.offsetWidth * 0.2);
};

export const FOCUS_PADDING_WIDTH = 4;

export const getScrollActivePosition = (
  elements: HTMLElement[],
  direction: ScrollerDirection,
  activeElementIndex: number,
  scrollerElement: HTMLPScrollerElement
): number => {
  const { offsetLeft: activeElementOffsetLeft, offsetWidth: activeElementOffsetWidth } =
    elements[activeElementIndex <= 0 ? 0 : activeElementIndex] || {}; // empty object fallback for tabs without children
  // offsetLeft: is the number of pixels that the upper left corner of the current element is offset to the left within the offsetParent node
  // offsetParent: is a reference to the element which is the closest (nearest in the containment hierarchy) positioned ancestor element
  // which usually is an element with a non-static position
  // - in chrome this seems to respect shadow DOM and therefore is the div.scroll-wrapper element in p-scroller
  // - in firefox and safari this is not the case and some other parent element (up to the body element) is used
  // this obviously leads to completely wrong calculations which are being corrected
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
  const correctedActiveElementOffsetLeft =
    elements[0]?.offsetLeft === 0 ? activeElementOffsetLeft : activeElementOffsetLeft - scrollerElement.offsetLeft;

  const [scrollAreaElement, prevGradientElement] = getScrollerElements(scrollerElement);

  let scrollPosition: number;
  if (direction === 'next') {
    if (activeElementIndex === elements.length - 1) {
      // go to last element
      scrollPosition = correctedActiveElementOffsetLeft - FOCUS_PADDING_WIDTH;
    } else {
      // go to next element
      scrollPosition = correctedActiveElementOffsetLeft - prevGradientElement.offsetWidth + FOCUS_PADDING_WIDTH * 2;
    }
  } else {
    if (activeElementIndex === 0) {
      // go to first element
      scrollPosition = 0;
    } else {
      // go to prev element
      scrollPosition =
        correctedActiveElementOffsetLeft +
        activeElementOffsetWidth +
        prevGradientElement.offsetWidth -
        scrollAreaElement.offsetWidth;
    }
  }
  return scrollPosition;
};
