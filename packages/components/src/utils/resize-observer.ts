import { observeChildren, unobserveChildren } from './children-observer';

export const resizeMap: Map<Node, (entry: ResizeObserverEntry) => void> = new Map();

export const isResizeObserverDefined = (): boolean => 'ResizeObserver' in window;

export let useResizeObserverFallback = !isResizeObserverDefined();

export const useResizeObserverFallbackOverride = (overrideValue: boolean): boolean =>
  (useResizeObserverFallback = overrideValue);

const resizeObserver =
  isResizeObserverDefined() &&
  new ResizeObserver((entries) => {
    entries.forEach((resizeEntry) => resizeMap.get(resizeEntry.target)?.(resizeEntry));
  });

// TODO: move fallback logic here
export const observeResize = <T extends HTMLElement>(
  node: T,
  callback: (entry: ResizeObserverEntry) => void,
  options?: ResizeObserverOptions
): void => {
  if (!useResizeObserverFallback) {
    // node might not be defined in connectedCallback
    if (node) {
      resizeMap.set(node, callback);
      resizeObserver.observe(node, options);
    }
  } else {
    // TODO: add fallback
  }
};

export const unobserveResize = <T extends HTMLElement>(node: T): void => {
  if (!useResizeObserverFallback) {
    // node might not be defined in disconnectedCallback
    if (node) {
      resizeMap.delete(node);
      resizeObserver.unobserve(node);
    }
  } else {
    // TODO: add fallback
  }
};

export const registeredHosts: Map<HTMLElement, () => void> = new Map();

export const onWindowResize = (): void => {
  registeredHosts.forEach((callback) => {
    callback();
  });
};

export const observeWindowResize = (host: HTMLElement, callback: () => void): void => {
  if (!registeredHosts.has(host)) {
    registeredHosts.set(host, callback);
    window.addEventListener('resize', onWindowResize);
  }
};

export const unobserveWindowResize = (host: HTMLElement): void => {
  if (registeredHosts.has(host)) {
    registeredHosts.delete(host);
  }
  if (registeredHosts.size === 0) {
    window.removeEventListener('resize', onWindowResize);
  }
};

// TODO: accordion resize observer fallback
// TODO: remove observe children
export const resizeObserverFallback = (
  host: HTMLElement,
  callback: () => void,
  shouldObserveChildren?: boolean
): void => {
  observeWindowResize(host, callback);
  if (shouldObserveChildren) {
    observeChildren(host, callback);
  }
};

export const removeResizeObserverFallback = (host: HTMLElement, shouldObserveChildren?: boolean): void => {
  unobserveWindowResize(host);
  if (shouldObserveChildren) {
    unobserveChildren(host);
  }
};
