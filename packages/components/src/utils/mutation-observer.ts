export const mutationMap: Map<Node, () => void> = new Map();

const mutationObserver = new MutationObserver((mutations) => {
  mutations
    // reduce array to only entries that have really a changed value
    .filter((mutation) => mutation.oldValue !== (mutation.target as HTMLElement).getAttribute(mutation.attributeName))
    // remove duplicates so we call forceUpdate only once per node
    .filter((mutation, idx, arr) => arr.findIndex((m) => m.target === mutation.target) === idx)
    .forEach((mutation) => mutationMap.get(mutation.target)?.());
});

export const observeMutations = <T extends HTMLElement>(
  node: T,
  attributes: (keyof T)[],
  callback: () => void
): void => {
  // node might not be defined in connectedCallback
  if (node) {
    mutationMap.set(node, callback);
    mutationObserver.observe(node, { attributeFilter: attributes as string[], attributeOldValue: true });
  }
};

export const unobserveMutations = <T extends HTMLElement>(node: T): void => {
  mutationMap.delete(node);
};
