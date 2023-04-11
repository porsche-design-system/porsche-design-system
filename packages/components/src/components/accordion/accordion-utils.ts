import type { HeadingTag } from '../heading/heading-tag';
import { hasWindow, observeChildren, unobserveChildren } from '../../utils';

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

export const isResizeObserverDefined = (): boolean => hasWindow && 'ResizeObserver' in window;

export let useResizeObserverFallback = !isResizeObserverDefined();

export const useResizeObserverFallbackOverride = (overrideValue: boolean): boolean =>
  (useResizeObserverFallback = overrideValue);

const resizeObserver =
  isResizeObserverDefined() &&
  new ResizeObserver((entries) => {
    entries.forEach((resizeEntry) => resizeMap.get(resizeEntry.target)?.(resizeEntry));
  });

// TODO: Move fallback logic here, to simplify usage in components
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

export const registeredElements: Map<HTMLElement, () => void> = new Map();

export const onWindowResize = (): void => {
  registeredElements.forEach((callback) => {
    callback();
  });
};

export const observeWindowResize = (htmlElement: HTMLElement, callback: () => void): void => {
  if (!registeredElements.has(htmlElement)) {
    registeredElements.set(htmlElement, callback);
    window.addEventListener('resize', onWindowResize);
  }
};

export const unobserveWindowResize = (htmlElement: HTMLElement): void => {
  registeredElements.delete(htmlElement);
  if (registeredElements.size === 0) {
    window.removeEventListener('resize', onWindowResize);
  }
};

export const resizeObserverFallback = (
  htmlElement: HTMLElement,
  callback: () => void,
  shouldObserveChildren?: boolean
): void => {
  observeWindowResize(htmlElement, callback);
  if (shouldObserveChildren) {
    observeChildren(htmlElement, callback);
  }
};

export const removeResizeObserverFallback = (htmlElement: HTMLElement, shouldUnobserveChildren?: boolean): void => {
  unobserveWindowResize(htmlElement);
  if (shouldUnobserveChildren) {
    unobserveChildren(htmlElement);
  }
};
