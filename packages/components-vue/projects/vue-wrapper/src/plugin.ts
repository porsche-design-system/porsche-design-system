import type { App, InjectionKey } from 'vue';
import { ref, inject } from 'vue';
import { load, componentsReady } from '@porsche-design-system/components-js';
import { prefixInjectionKey } from './utils';

export type PorscheDesignSystemPluginOptions = {
  prefix?: string;
  extends?: Record<string, unknown>;
};

export type PorscheDesignSystemPlugin = {
  [key: string]: any;
  install: (app: App, options?: PorscheDesignSystemPluginOptions) => void;
};

export const porscheDesignSystemSymbol: InjectionKey<PorscheDesignSystemPlugin> = Symbol();

export function usePorscheDesignSystemPlugin() {
  const porscheDesignSystem = inject(porscheDesignSystemSymbol);
  if (!porscheDesignSystem) {
    throw new Error(
      '[Porsche Design System Vue] No plugin was provided. Make sure to create one via `createPorscheDesignSystem()`.'
    );
  }

  return porscheDesignSystem;
}

export function createPorscheDesignSystem(options = { prefix: '' }) {
  const isPorscheDesignSystemLoaded = ref(false);

  const $porscheDesignSystem: PorscheDesignSystemPlugin = {
    options,
    isPorscheDesignSystemLoaded,
    componentsReady,
    async install(app: App) {
      if (!isPorscheDesignSystemLoaded.value) {
        load({ prefix: options.prefix });
        await componentsReady();
        isPorscheDesignSystemLoaded.value = true;
      }

      app.provide(prefixInjectionKey, options.prefix);
      app.provide(porscheDesignSystemSymbol, $porscheDesignSystem);
    },
  };

  return $porscheDesignSystem;
}
