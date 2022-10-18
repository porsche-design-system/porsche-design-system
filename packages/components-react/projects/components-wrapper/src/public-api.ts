// TODO: verify tree shaking
import '@porsche-design-system/components/scripts/mockMutationObserver';

export { componentsReady } from '@porsche-design-system/components-js';
export * from './lib/components';
export * from './lib/types';
export { PorscheDesignSystemProvider } from './provider';
export { skipCheckForPorscheDesignSystemProviderDuringTests, useToastManager } from './hooks';
export { skipPorscheDesignSystemCDNRequestsDuringTests } from './utils';
