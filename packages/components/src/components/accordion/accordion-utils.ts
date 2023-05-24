import type { HeadingTag } from '../heading/heading-tag';
import { hasWindow } from '../../utils';

export const ACCORDION_SIZES = ['small', 'medium'] as const;
export type AccordionSize = (typeof ACCORDION_SIZES)[number];
export type AccordionUpdateEvent = { open: boolean };

export type AccordionTag = HeadingTag;

export const setCollapsibleElementHeight = (
  collapsibleElement: HTMLDivElement,
  isOpen: boolean,
  contentWrapperHeight: string
): void => {
  if (collapsibleElement) {
    collapsibleElement.style.height = isOpen ? contentWrapperHeight : '0';
  }
};

export const getContentHeight = ({ height }: DOMRectReadOnly): string => `${height}px`;

export const resizeMap: Map<Node, (entry: ResizeObserverEntry) => void> = new Map();

const resizeObserver =
  hasWindow &&
  'ResizeObserver' in window && // for jsdom and ssr
  new ResizeObserver((entries) => {
    entries.forEach((entry) => resizeMap.get(entry.target)?.(entry));
  });

export const observeResize = <T extends HTMLElement>(
  node: T,
  callback: (entry: ResizeObserverEntry) => void,
  options?: ResizeObserverOptions
): void => {
  // node might not be defined in connectedCallback
  if (node) {
    resizeMap.set(node, callback);
    resizeObserver.observe(node, options);
  }
};

export const unobserveResize = <T extends HTMLElement>(node: T): void => {
  // node might not be defined in disconnectedCallback
  if (node) {
    resizeMap.delete(node);
    resizeObserver.unobserve(node);
  }
};
