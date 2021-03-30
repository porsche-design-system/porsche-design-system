import { forceUpdate } from '@stencil/core';
import { addEventListener } from '.';
/* eslint-disable no-console */

const observeProperties = <T extends HTMLElement>(node: T, props: (keyof T)[], callback: () => void): void => {
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

export const initAttributePropChangeListener = <T extends HTMLElement>(
  host: HTMLElement,
  node: T,
  props: (keyof T)[]
): void => {
  const updateComponent = (): void => {
    console.log('cb...', host);
    forceUpdate(host);
  };

  addEventListener(node, 'click', () => {
    console.log('event listener', host);
    updateComponent();
  });

  observeProperties(node, props, updateComponent);

  new MutationObserver(() => {
    console.log('mutation observer', host);
    updateComponent();
  }).observe(node, { attributeFilter: props });
};
