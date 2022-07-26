export const resizeMap: Map<Node, (entry: ResizeObserverEntry) => void> = new Map();

export const isResizeObserverDefined = (): boolean => typeof window !== 'undefined' && 'ResizeObserver' in window;

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
