import { hasWindow } from './has-window';

export const childrenMutationMap: Map<Node, () => void> = new Map();

const getObservedNode = (mutatedNode: Node): Node =>
  childrenMutationMap.has(mutatedNode) ? mutatedNode : getObservedNode(mutatedNode.parentNode);

const childrenObserver =
  hasWindow &&
  new MutationObserver((mutations) => {
    mutations
      // remove duplicates so we execute callback only once per node
      .filter((mutation, idx, arr) => arr.findIndex((m) => m.target === mutation.target) === idx)
      .map((mutation) => getObservedNode(mutation.target)) // recursively find root node that is initially observed
      .forEach((node) => childrenMutationMap.get(node)());
  });

export const observeChildren = <T extends HTMLElement, K = keyof T>(
  node: T,
  callback: () => void,
  attributes?: Lowercase<K extends string ? K : string>[]
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
