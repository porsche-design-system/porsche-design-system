import { BreakpointCustomizable, getTagName, pxToRemWithUnit } from '../../../utils';

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

const resizeObserver = new ResizeObserver((entries) => {
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
