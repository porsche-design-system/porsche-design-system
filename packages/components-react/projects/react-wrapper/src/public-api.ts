// TODO: verify tree shaking
// @ts-ignore
if (!document.browser) {
  // @ts-ignore
  global.MutationObserver = class MutationObserverMock {
    // @ts-ignore
    constructor(callback: any) {}
    disconnect() {}
    // @ts-ignore
    observe(element, initObject) {}
  };
}

export { componentsReady } from '@porsche-design-system/components-js';
export * from './lib/components';
export * from './lib/types';
export { PorscheDesignSystemProvider } from './provider';
export { skipCheckForPorscheDesignSystemProviderDuringTests, useToastManager } from './hooks';
export { skipPorscheDesignSystemCDNRequestsDuringTests } from './utils';
