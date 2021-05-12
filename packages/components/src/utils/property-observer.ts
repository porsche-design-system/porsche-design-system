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
        callback();
      },
    });
  };
  props.forEach(forEachCallback);
};
