import { forceUpdate } from '@stencil/core';
import { addEventListener } from '.';
/* eslint-disable no-console */

export const initAttributePropChangeListener = (host: HTMLElement, node: HTMLElement, props: string[]): void => {
  const updateComponent = (): void => {
    console.log('cb...', host);
    forceUpdate(host);
  };
  addEventListener(node, 'click', () => {
    console.log('event listener', host);
    updateComponent();
  });

  const proto = Object.getPrototypeOf(node);
  const forEachCallback = (prop: string): void => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { get: superGet, set: superSet } = Object.getOwnPropertyDescriptor(proto, prop);
    Object.defineProperty(node, prop, {
      configurable: true,
      get() {
        return superGet.call(this);
      },
      set(val) {
        superSet.call(this, val);

        // full-circle moment for react
        // https://github.com/facebook/react/blob/9198a5cec0936a21a5ba194a22fcbac03eba5d1d/packages/react-dom/src/client/inputValueTracking.js#L95
        (node as any)._valueTracker?.setValue(val); // eslint-disable-line no-underscore-dangle

        updateComponent();
      },
    });
  };
  props.forEach(forEachCallback);

  new MutationObserver(() => {
    console.log('mutation observer', host);
    updateComponent();
  }).observe(node, { attributeFilter: props });
};
