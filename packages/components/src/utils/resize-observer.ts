export const resizeMap: Map<Node, (entry: ResizeObserverEntry) => void> = new Map();

let resizeObserver: ResizeObserver;
if (window.ResizeObserver) {
  resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((resizeEntry) => resizeMap.get(resizeEntry.target)?.(resizeEntry));
  });
} else {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resizeObserver = { observe: () => {}, unobserve: () => {}, disconnect: () => {} } as ResizeObserver;
}

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
