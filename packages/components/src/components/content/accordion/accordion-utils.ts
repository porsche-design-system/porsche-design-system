import {
  BreakpointCustomizable,
  getTagName,
  observeChildren,
  pxToRemWithUnit,
  unobserveChildren,
} from '../../../utils';
import { Accordion } from './accordion';

const ACCORDION_SIZE = ['small', 'medium'] as const;
export type AccordionSize = typeof ACCORDION_SIZE[number];
export type AccordionChangeEvent = { open: boolean };

export const setCollapsibleElementHeight = (
  collapsibleElement: HTMLDivElement,
  isOpen: boolean,
  contentWrapperHeight: string
): void => {
  if (collapsibleElement) {
    collapsibleElement.style.height = isOpen ? contentWrapperHeight : '0';
  }
};

export const getContentHeight = ({ height }: DOMRectReadOnly, isCompact: boolean): string => {
  const CONTENT_PADDING_TOP = isCompact ? 0 : 8;
  return pxToRemWithUnit(height + CONTENT_PADDING_TOP);
};

export const warnIfCompactAndSizeIsSet = (
  host: HTMLElement,
  compact: boolean,
  size: BreakpointCustomizable<AccordionSize>
): void => {
  if (compact && size !== 'small') {
    console.warn(`Property "size" of ${getTagName(host)} is ignored when property "compact" is set to "true".`);
  }
};

export const resizeMap: Map<Node, (entry: ResizeObserverEntry) => void> = new Map();

export const isResizeObserverDefined = (): boolean => 'ResizeObserver' in window;

export let useMutationObserverFallback = !isResizeObserverDefined();

export const useMutationObserverFallbackOverride = (overrideValue: boolean): boolean =>
  (useMutationObserverFallback = overrideValue);

const resizeObserver =
  isResizeObserverDefined() &&
  new ResizeObserver((entries) => {
    entries.forEach((resizeEntry) => resizeMap.get(resizeEntry.target)?.(resizeEntry));
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

export const registeredAccordions: Accordion[] = [];

export const onWindowResize = (): void => {
  registeredAccordions.forEach((accordion) => {
    accordion.setContentHeight();
  });
};

export const observeWindowResize = (accordion: Accordion): void => {
  if (!registeredAccordions.includes(accordion)) {
    registeredAccordions.push(accordion);
    window.addEventListener('resize', onWindowResize);
  }
};

export const unobserveWindowResize = (accordion: Accordion): void => {
  const index = registeredAccordions.indexOf(accordion);
  if (index > -1) {
    registeredAccordions.splice(index, 1);
  }
  if (registeredAccordions.length === 0) {
    window.removeEventListener('resize', onWindowResize);
  }
};

export const mutationObserverFallback = (accordion: Accordion): void => {
  observeWindowResize(accordion);
  observeChildren(accordion.host, accordion.setContentHeight);
};

export const removeMutationObserverFallback = (accordion: Accordion): void => {
  unobserveWindowResize(accordion);
  unobserveChildren(accordion.host);
};
