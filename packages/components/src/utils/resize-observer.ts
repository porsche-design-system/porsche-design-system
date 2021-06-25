export const resizeMap: Map<Node, (entry: ResizeObserverEntry) => void> = new Map();

const resizeObserver = new ResizeObserver((entries) => {
  entries
    // remove duplicates so we call forceUpdate only once per node
    .filter((resizeEntry, idx, arr) => arr.findIndex((m) => m.target === resizeEntry.target) === idx)
    .forEach((resizeEntry) => resizeMap.get(resizeEntry.target)?.(resizeEntry));
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
  resizeMap.delete(node);
};
