export const initAttributePropChangeListener = (node: HTMLElement, props: string[], cb: () => void): void => {
  node.addEventListener('change', cb);

  props.forEach((prop) => {
    const { set, get } = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(node), prop);

    Object.defineProperty(node, prop, {
      get() {
        return get.apply(this, arguments);
      },
      set() {
        cb();
        return set.apply(this, arguments);
      },
    });
  });

  new MutationObserver(cb).observe(node, { attributeFilter: props });
};
