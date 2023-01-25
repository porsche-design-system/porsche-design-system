import { createApp, inject } from 'vue';
import { flushPromises } from '@vue/test-utils';
// @ts-ignore
import * as PDS from '@porsche-design-system/components-js';
jest.mock('@porsche-design-system/components-js', () => ({
  __esModule: true,
  ...jest.requireActual('@porsche-design-system/components-js'),
  load: jest.fn(),
}));

import { createPorscheDesignSystem } from '../../../src/public-api';
import { porscheDesignSystemSymbol, usePorscheDesignSystemPlugin } from '../../../src/plugin';
import { prefixInjectionKey } from '../../../src/utils';

describe('createPorscheDesignSystem', () => {
  it('should create a porsche design system plugin', () => {
    const plugin = createPorscheDesignSystem();
    expect(plugin).toBeDefined();
  });
  it('should install the plugin', () => {
    const plugin = createPorscheDesignSystem();
    const app = createApp({
      use: jest.fn(),
      setup() {},
    });
    const spy = jest.spyOn(plugin, 'install');
    app.use(plugin);
    expect(spy).toHaveBeenCalled();
  });

  it('should load the porsche design system', async () => {
    const plugin = createPorscheDesignSystem();
    const app = createApp({
      use: jest.fn(),
      setup() {},
    });
    const spy = jest.spyOn(PDS, 'load');
    app.use(plugin);
    await flushPromises();
    expect(spy).toHaveBeenCalledWith({ prefix: '' });
  });

  it('should load the porsche design system with options', async () => {
    const plugin = createPorscheDesignSystem({ prefix: 'prefix' });
    const app = createApp({
      use: jest.fn(),
      setup() {},
    });
    const spy = jest.spyOn(PDS, 'load');
    app.use(plugin);
    await flushPromises();
    expect(spy).toHaveBeenCalledWith({ prefix: 'prefix' });
  });

  it('should provide the plugin', async () => {
    const plugin = createPorscheDesignSystem({ prefix: 'prefix' });
    const app = createApp({
      use: jest.fn(),
      setup() {},
      provide: jest.fn(),
    });
    const spy = jest.spyOn(app, 'provide');
    app.use(plugin);
    await flushPromises();
    expect(spy).toHaveBeenNthCalledWith(1, prefixInjectionKey, 'prefix');
  });

  it('should isPorscheDesignSystemLoaded be true when installed', async () => {
    const plugin = createPorscheDesignSystem();
    const app = createApp({
      use: jest.fn(),
      setup() {},
    });
    app.use(plugin);
    await flushPromises();
    expect(plugin.isPorscheDesignSystemLoaded.value).toBe(true);
  });
});

describe('usePorscheDesignSystemPlugin', () => {
  it('should throw an error when no plugin is provided', () => {
    expect(() => {
      usePorscheDesignSystemPlugin();
    }).toThrowError('No PorscheDesignSystem provided!!!');
  });
  it('should return the plugin', async () => {
    const plugin = createPorscheDesignSystem();
    const app = createApp({
      use: jest.fn(),
      setup() {
        const porscheDesignSystem = usePorscheDesignSystemPlugin();
        expect(porscheDesignSystem).toBe(plugin);
      },
      provide: {
        porscheDesignSystemSymbol: plugin,
      },
    });

    app.use(plugin);


  });
});
