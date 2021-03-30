import { forceUpdate } from '@stencil/core';
import { addEventListener } from '.';
/* eslint-disable no-console */

/**
 * EVENTS
 */
export const observeChangeEvent = <T extends HTMLElement>(node: T, callback: () => void): void => {
  // addEventListener(node, 'change', callback);
  addEventListener(node, 'change', () => {
    console.log('event listener', node);
    callback();
  });
};

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
export const mutationCallbacks: { node: HTMLElement; cb: () => void }[] = [];

const mutationObserver = new MutationObserver((mutations, _observer) => {
  console.log(mutationCallbacks.length, mutations);
  mutationCallbacks
    .filter(({ node }) => node === mutations[0].target)
    .forEach((item) => {
      console.log('mutation observer', item.node);
      item.cb();
    });
});

export const observeMutations = <T extends HTMLElement>(node: T, props: (keyof T)[], callback: () => void): void => {
  console.log('observeMutations', node, props);
  mutationCallbacks.push({ node, cb: callback });
  mutationObserver.observe(node, { attributeFilter: props as string[] });
};

export const unobserveMutations = <T extends HTMLElement>(node: T): void => {
  mutationCallbacks.splice(
    mutationCallbacks.findIndex((x) => x.node === node),
    1
  );
};

/**
 * PUBLIC API
 */
export const initAttributePropChangeListener = <T extends HTMLElement>(
  host: HTMLElement,
  node: T,
  props: (keyof T)[]
): void => {
  const updateComponent = (): void => {
    console.log('cb...', host);
    forceUpdate(host);
  };

  observeChangeEvent(node, updateComponent);
  observeProperties(node, props, updateComponent);
  observeMutations(node, props, updateComponent);
};

// TODO: make this work reliably with disconnectedCallback
export const disconnectAttributePropChangeListener = <T extends HTMLElement>(node: T): void => {
  unobserveMutations(node);
};
