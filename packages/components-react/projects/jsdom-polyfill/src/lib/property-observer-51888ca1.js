'use strict';

// inspired by react
// https://github.com/facebook/react/blob/c88fb49d37fd01024e0a254a37b7810d107bdd1d/packages/react-dom/src/client/inputValueTracking.js#L53
const observeProperties = (node, props, callback) => {
  const proto = Object.getPrototypeOf(node);
  const properties = props.reduce((result, prop) => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { get, set } = Object.getOwnPropertyDescriptor(proto, prop);
    return Object.assign(Object.assign({}, result), { [prop]: {
        configurable: true,
        get() {
          return get.call(this);
        },
        set(val) {
          set.call(this, val);
          callback();
        },
      } });
  }, {});
  Object.defineProperties(node, properties);
};

exports.observeProperties = observeProperties;
