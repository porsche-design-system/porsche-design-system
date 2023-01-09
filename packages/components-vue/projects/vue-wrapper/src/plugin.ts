// plugin
import { App, ref, inject } from 'vue';

import { load, componentsReady } from '@porsche-design-system/components-js';
import { prefixInjectionKey } from './utils';

import * as utilities from '@porsche-design-system/utilities';

export interface PDSOptions {
  prefix?: string;
  extends?: Record<string, unknown>;
}

export interface PDSPlugin {
  [key: string]: any;
  install: (app: App, options?: PDSOptions) => void;
}

export const pdsSymbol = Symbol();

export function usePDS() {
  const pds = inject(pdsSymbol);
  if (!pds) throw new Error('No PDS provided!!!');

  return pds;
}

export function createPDS(options = { prefix: '' }) {
  const isPDSLoaded = ref(false);

  async function initializeComponentAfterPds() {
    try {
      await componentsReady();
      isPDSLoaded.value = true;
      console.info('[DwaaS] PDS components ready!');
    } catch (error) {
      console.error('[DwaaS] - There was an error loading PDS components');
    }
  }

  const $pds: PDSPlugin = {
    options,
    isPDSLoaded,
    utilities,
    componentsReady,
    install(app) {
      load();

      initializeComponentAfterPds();
      app.provide(prefixInjectionKey, options.prefix);
      app.provide(pdsSymbol, $pds);
    },
  };

  return $pds;
}
