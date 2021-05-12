export const observeProperties = <T extends HTMLElement>(node: T, props: (keyof T)[], callback: () => void): void => {
  const proto = Object.getPrototypeOf(node);
  const createPropObject = (prop) => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { get, set } = Object.getOwnPropertyDescriptor(proto, prop);
    return {
      [prop]: {
        configurable: true,
        get() {
          return get.call(this);
        },
        set(val) {
          set.call(this, val);
          callback();
        },
      },
    };
  };

  const properties = props
    .map((prop) => createPropObject(prop))
    .reduce((target, item) => {
      const propName = Object.keys(item)[0];
      return Object.assign(target, { [propName]: item[propName] });
    });

  Object.defineProperties(node, properties);
};
