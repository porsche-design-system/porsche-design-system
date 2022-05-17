import { getShadowRootHTMLElement } from './getShadowRootHTMLElement';

export const getScrollerElements = (
  scrollerElement: HTMLElement
): { scrollAreaElement: HTMLElement; prevGradientElement: HTMLElement } => {
  return {
    scrollAreaElement: getShadowRootHTMLElement(scrollerElement, '.scroll-area'),
    prevGradientElement: getShadowRootHTMLElement(scrollerElement, '.gradient'),
  };
};
