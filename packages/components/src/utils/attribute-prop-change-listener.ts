import { forceUpdate } from '@stencil/core';
/* eslint-disable no-console */

export const initAttributePropChangeListener = (host: HTMLElement, node: HTMLElement, props: string[]): void => {
  const cb = (): void => {
    console.log('cb...', host);
    forceUpdate(host);
  };

  // node.addEventListener('change', () => {
  //   console.log('event listener', host);
  //   cb();
  // });

  const proto = Object.getPrototypeOf(node);
  const forEachCallback = (prop: string): void => {
    const descriptor = Object.getOwnPropertyDescriptor(proto, prop);

    Object.defineProperty(node, prop, {
      get() {
        return descriptor.get.apply(this);
      },
      set(...args) {
        console.log('set', host);
        cb();
        descriptor.set.apply(this, args);
      },
    });
  };
  props.forEach(forEachCallback);

  new MutationObserver(() => {
    console.log('mutation observer', host);
    cb();
  }).observe(node, { attributeFilter: props });
};
