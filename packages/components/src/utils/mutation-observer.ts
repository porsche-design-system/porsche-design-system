/**
 * PROPERTIES
 */
export const observeProperties = <T extends HTMLElement>(node: T, props: (keyof T)[], callback: () => void): void => {
  const proto = Object.getPrototypeOf(node);
  const forEachCallback = (prop: keyof T): void => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { get, set } = Object.getOwnPropertyDescriptor(proto, prop);
    // TODO: maybe use Object.defineProperties() instead
    Object.defineProperty(node, prop, {
      configurable: true,
      get() {
        return get.call(this);
      },
      set(val) {
        set.call(this, val);

        // full-circle moment for react
        // https://github.com/facebook/react/blob/9198a5cec0936a21a5ba194a22fcbac03eba5d1d/packages/react-dom/src/client/inputValueTracking.js#L95
        (node as any)._valueTracker?.setValue(val); // eslint-disable-line no-underscore-dangle

        callback();
      },
    });
  };
  props.forEach(forEachCallback);
};

/**
 * MUTATION OBSERVER
 */
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
