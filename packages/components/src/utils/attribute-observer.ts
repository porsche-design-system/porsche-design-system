import { hasWindow } from './has-window';

export const attributeMutationMap: Map<Node, () => void> = new Map();

const attributeObserver =
  hasWindow &&
  new MutationObserver((mutations) => {
    mutations
      // reduce array to only entries that have really a changed value
      .filter((mutation) => mutation.oldValue !== (mutation.target as HTMLElement).getAttribute(mutation.attributeName))
      // remove duplicates so we execute callback only once per node
      .filter((mutation, idx, arr) => arr.findIndex((m) => m.target === mutation.target) === idx)
      .forEach((mutation) => attributeMutationMap.get(mutation.target)?.());
  });

export const observeAttributes = <T extends HTMLElement, K = keyof T>(
  node: T,
  attributes: Lowercase<K extends string ? K : string>[],
  callback: () => void
): void => {
  // node might not be defined in connectedCallback
  if (node) {
    attributeMutationMap.set(node, callback);
    attributeObserver.observe(node, { attributeFilter: attributes as string[], attributeOldValue: true });
  }
};

export const unobserveAttributes = <T extends HTMLElement>(node: T): void => {
  attributeMutationMap.delete(node);
};
