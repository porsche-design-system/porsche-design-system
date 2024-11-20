import type { AriaAttributes } from '../types';
import { hasWindow } from './has-window';

/**
 * Map of observed nodes and their corresponding callback functions.
 */
export const observedNodesMap: Map<Node, () => void> = new Map();

/**
 * Mutation observer for observing changes in the children of observed nodes.
 */
const childrenObserver =
  hasWindow &&
  new MutationObserver((mutations) => {
    // there may be race conditions in jsdom-polyfill tests  where the map is already empty when a mutation happens
    if (observedNodesMap.size) {
      const observedNodes = Array.from(observedNodesMap.keys());

      // remove duplicates so we execute callback only once per node
      for (const mutation of mutations.filter(
        (mutation, idx, arr) => arr.findIndex((m) => m.target === mutation.target) === idx
      )) {
        for (const node of observedNodes.filter((node) => node.contains(mutation.target))) {
          observedNodesMap.get(node)?.();
        }
      }
    }
  });

/**
 * Observes the children of a given node and invokes a callback when changes occur.
 * @template T - The type of the node.
 * @template K - The type of the node's attributes.
 * @param {T} node - The node to observe.
 * @param {() => void} callback - The callback function to invoke when changes occur.
 * @param {(Lowercase<K extends string ? K : string> | keyof AriaAttributes)[]} [attributes] - Optional attribute names to be monitored.
 * @param {MutationObserverInit} options - An object providing options that describe which DOM mutations should be reported to
 * @returns {void}
 */
export const observeChildren = <T extends HTMLElement, K = keyof T>(
  node: T,
  callback: () => void,
  // TODO: Remove attributes parameter and always use options
  attributes?: (Lowercase<K extends string ? K : string> | keyof AriaAttributes)[],
  options: MutationObserverInit = {
    childList: true,
    subtree: true,
    characterData: true,
  }
): void => {
  // node might not be defined in connectedCallback
  if (node) {
    observedNodesMap.set(node, callback);
    childrenObserver.observe(node, {
      attributeFilter: attributes,
      ...options,
    });
  }
};

/**
 * Stops observing the children of a given node.
 * @template T - The type of the node.
 * @param {T} node - The node to unobserve.
 * @returns {void}
 */
export const unobserveChildren = <T extends HTMLElement>(node: T): void => {
  observedNodesMap.delete(node);
};
