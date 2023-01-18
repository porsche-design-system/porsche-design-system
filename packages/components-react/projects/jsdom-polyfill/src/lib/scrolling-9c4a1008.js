'use strict';

const getHTMLElements = require('./getHTMLElements-d3d6e3ec.js');
require('./validateProps-3b506a0d.js');
const hasDocument = require('./has-document-f0620e06.js');

const GRADIENT_COLOR_THEMES = ['default', 'surface'];
const SCROLL_INDICATOR_POSITIONS = ['top', 'center'];
const getScrollPositionAfterPrevNextClick = (scrollAreaElement, direction) => {
  const { scrollLeft } = scrollAreaElement;
  const scrollByX = getScrollByX(scrollAreaElement);
  return direction === 'next' ? scrollLeft + scrollByX : scrollLeft - scrollByX;
};
const getScrollerElements = (scrollerElement) => {
  return getHTMLElements.getHTMLElements(scrollerElement.shadowRoot, '.scroll-area,.action-prev');
};
const isScrollable = (isPrevHidden, isNextHidden) => {
  return !(isPrevHidden && isNextHidden);
};

let supportsScrollBehavior = hasDocument.hasDocument && 'scrollBehavior' in document.documentElement.style;
const steps = 20;
let scrollInterval;
const intervalScroll = (el, scrollStep, initialScrollLeft, endAmount) => {
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
const scrollElementTo = (el, amount) => {
  if (supportsScrollBehavior) {
    el.scrollTo({
      left: amount,
      behavior: 'smooth',
    });
  }
  else {
    // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
    // https://caniuse.com/?search=scroll-behavior
    const initialScrollLeft = el.scrollLeft;
    const scrollDistance = amount - initialScrollLeft;
    const scrollStep = scrollDistance / steps;
    intervalScroll(el, scrollStep, initialScrollLeft, amount);
  }
};
const scrollElementBy = (el, amount) => {
  if (supportsScrollBehavior) {
    el.scrollBy({ left: amount, top: 0, behavior: 'smooth' });
  }
  else {
    // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
    // https://caniuse.com/?search=scroll-behavior
    const initialScrollLeft = el.scrollLeft;
    const endScrollLeft = initialScrollLeft + amount;
    const scrollStep = amount / steps;
    intervalScroll(el, scrollStep, initialScrollLeft, endScrollLeft);
  }
};
const getScrollByX = (scrollAreaElement) => {
  return Math.round(scrollAreaElement.offsetWidth * 0.2);
};
const FOCUS_PADDING_WIDTH = 4;
const getScrollActivePosition = (elements, direction, activeElementIndex, scrollerElement) => {
  var _a;
  const { offsetLeft: activeElementOffsetLeft, offsetWidth: activeElementOffsetWidth } = elements[activeElementIndex <= 0 ? 0 : activeElementIndex] || {}; // empty object fallback for tabs without children
  // offsetLeft: is the number of pixels that the upper left corner of the current element is offset to the left within the offsetParent node
  // offsetParent: is a reference to the element which is the closest (nearest in the containment hierarchy) positioned ancestor element
  // which usually is an element with a non-static position
  // - in chrome this seems to respect shadow DOM and therefore is the div.scroll-wrapper element in p-scroller
  // - in firefox and safari this is not the case and some other parent element (up to the body element) is used
  // this obviously leads to completely wrong calculations which are being corrected
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
  const correctedActiveElementOffsetLeft = ((_a = elements[0]) === null || _a === void 0 ? void 0 : _a.offsetLeft) === 0 ? activeElementOffsetLeft : activeElementOffsetLeft - scrollerElement.offsetLeft;
  const [scrollAreaElement, prevGradientElement] = getScrollerElements(scrollerElement);
  let scrollPosition;
  if (direction === 'next') {
    if (activeElementIndex === elements.length - 1) {
      // go to last element
      scrollPosition = correctedActiveElementOffsetLeft - FOCUS_PADDING_WIDTH;
    }
    else {
      // go to next element
      scrollPosition = correctedActiveElementOffsetLeft - prevGradientElement.offsetWidth + FOCUS_PADDING_WIDTH * 2;
    }
  }
  else {
    if (activeElementIndex === 0) {
      // go to first element
      scrollPosition = 0;
    }
    else {
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

exports.GRADIENT_COLOR_THEMES = GRADIENT_COLOR_THEMES;
exports.SCROLL_INDICATOR_POSITIONS = SCROLL_INDICATOR_POSITIONS;
exports.getScrollActivePosition = getScrollActivePosition;
exports.getScrollByX = getScrollByX;
exports.getScrollPositionAfterPrevNextClick = getScrollPositionAfterPrevNextClick;
exports.isScrollable = isScrollable;
exports.scrollElementBy = scrollElementBy;
exports.scrollElementTo = scrollElementTo;
