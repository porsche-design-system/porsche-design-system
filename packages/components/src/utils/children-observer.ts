import type { AriaAttributes } from '../types';
import { hasWindow } from './has-window';

export const childrenMutationMap: Map<Node, () => void> = new Map();

const childrenObserver =
  hasWindow &&
  new MutationObserver((mutations) => {
    // there may be race conditions in jsdom-polyfill tests  where the map is already empty when a mutation happens
    if (childrenMutationMap.size) {
      const mapKeys = Array.from(childrenMutationMap.keys());
      mutations
        // remove duplicates so we execute callback only once per node
        .filter((mutation, idx, arr) => arr.findIndex((m) => m.target === mutation.target) === idx)
        // find node in map that contains the mutated element to find and invoke its callback
        .forEach((mutation) => childrenMutationMap.get(mapKeys.find((node) => node.contains(mutation.target)))?.());
    }
  });

export const observeChildren = <T extends HTMLElement, K = keyof T>(
  node: T,
  callback: () => void,
  attributes?: (Lowercase<K extends string ? K : string> | keyof AriaAttributes)[]
): void => {
  // node might not be defined in connectedCallback
  if (node) {
    childrenMutationMap.set(node, callback);
    childrenObserver.observe(node, {
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: attributes,
    });
  }
};

export const unobserveChildren = <T extends HTMLElement>(node: T): void => {
  childrenMutationMap.delete(node);
};
