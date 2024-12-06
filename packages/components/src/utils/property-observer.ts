// inspired by react
// https://github.com/facebook/react/blob/c88fb49d37fd01024e0a254a37b7810d107bdd1d/packages/react-dom/src/client/inputValueTracking.js#L53
export const observeProperties = <T extends HTMLElement>(node: T, props: (keyof T)[], callback: () => void): void => {
  const proto = Object.getPrototypeOf(node);
  const properties = props.reduce((result, prop) => {
    const descriptor = Object.getOwnPropertyDescriptor(proto, prop);
    if (
      // node.hasOwnProperty(prop) || // this condition breaks p-text-field-wrapper type="search" clear button functionality in react
      typeof descriptor === 'undefined' ||
      typeof descriptor.get !== 'function' ||
      typeof descriptor.set !== 'function'
    ) {
      return result;
    }
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { get, set } = descriptor;
    return {
      ...result,
      [prop]: {
        configurable: true,
        get() {
          return get.call(this);
        },
        set(val: any) {
          set.call(this, val);
          callback();
        },
      },
    };
  }, {} as PropertyDescriptorMap);
  Object.defineProperties(node, properties);
};
