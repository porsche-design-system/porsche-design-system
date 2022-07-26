import { TabsBar } from '../components/navigation/tabs-bar/tabs-bar';
import { Accordion } from '../components/content/accordion/accordion';
import { observeChildren, unobserveChildren } from './children-observer';

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
type Component = TabsBar | Accordion;
export const registeredComponents: Map<Component, () => void> = new Map();

export const onWindowResize = (): void => {
  registeredComponents.forEach((callback) => {
    callback();
  });
};

export const observeWindowResize = (component: Component, callback: () => void): void => {
  if (!registeredComponents.has(component)) {
    registeredComponents.set(component, callback);
    window.addEventListener('resize', onWindowResize);
  }
};

export const unobserveWindowResize = (component: Component): void => {
  if (registeredComponents.has(component)) {
    registeredComponents.delete(component);
  }
  if (registeredComponents.size === 0) {
    window.removeEventListener('resize', onWindowResize);
  }
};

export const mutationObserverFallback = (component: Component, callback: () => void): void => {
  observeWindowResize(component, callback);
  observeChildren(component.host, callback);
};

export const removeMutationObserverFallback = (component: Component): void => {
  unobserveWindowResize(component);
  unobserveChildren(component.host);
};
