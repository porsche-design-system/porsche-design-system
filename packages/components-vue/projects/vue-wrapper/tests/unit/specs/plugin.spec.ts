import { App, createApp } from 'vue';
import { flushPromises } from '@vue/test-utils';
import * as componentsJs from '@porsche-design-system/components-js';
import {
  createPorscheDesignSystem,
  porscheDesignSystemSymbol,
  usePorscheDesignSystemPlugin,
} from '../../../src/plugin';
import { prefixInjectionKey } from '../../../src/utils';

jest.mock('@porsche-design-system/components-js', () => ({
  load: jest.fn(),
  componentsReady: () => Promise.resolve(), // instant resolve
}));

describe('createPorscheDesignSystem()', () => {
  const getApp = (): App<Element> =>
    createApp({
      use: jest.fn(),
      provide: jest.fn(),
    });

  it('should create a Porsche Design System plugin', () => {
    const plugin = createPorscheDesignSystem();
    expect(plugin).toBeDefined();
  });

  it('should call plugin.install() with correct parameters', () => {
    const plugin = createPorscheDesignSystem();
    const spy = jest.spyOn(plugin, 'install');
    const app = getApp();

    app.use(plugin);
    expect(spy).toBeCalledWith(app);
  });

  it('should call porscheDesignSystem.load() without prefix', async () => {
    const plugin = createPorscheDesignSystem();
    const spy = jest.spyOn(componentsJs, 'load');
    const app = getApp();

    app.use(plugin);
    await flushPromises();
    expect(spy).toBeCalledWith({ prefix: '' });
  });

  it('should call porscheDesignSystem.load() with prefix', async () => {
    const plugin = createPorscheDesignSystem({ prefix: 'prefix' });
    const spy = jest.spyOn(componentsJs, 'load');
    const app = getApp();

    app.use(plugin);
    await flushPromises();
    expect(spy).toBeCalledWith({ prefix: 'prefix' });
  });

  it('should provide prefix via prefixInjectionKey and plugin via porscheDesignSystemSymbol', async () => {
    const plugin = createPorscheDesignSystem({ prefix: 'prefix' });
    const app = getApp();
    const spy = jest.spyOn(app, 'provide');

    app.use(plugin);
    await flushPromises();
    expect(spy).toHaveBeenNthCalledWith(1, prefixInjectionKey, 'prefix');
    expect(spy).toHaveBeenNthCalledWith(
      2,
      porscheDesignSystemSymbol,
      expect.objectContaining({
        options: { prefix: 'prefix' },
        isPorscheDesignSystemLoaded: expect.objectContaining({ _value: true }),
        componentsReady: componentsJs.componentsReady,
        install: expect.any(Function),
      })
    );
  });

  it('should isPorscheDesignSystemLoaded be true when installed', async () => {
    const plugin = createPorscheDesignSystem();
    const app = getApp();

    app.use(plugin);
    await flushPromises();
    expect(plugin.isPorscheDesignSystemLoaded.value).toBe(true);
  });
});

describe('usePorscheDesignSystemPlugin()', () => {
  it('should throw an error when no plugin is provided', () => {
    jest.spyOn(console, 'warn').mockImplementation(); // suppress vue warning

    expect(() => {
      usePorscheDesignSystemPlugin();
    }).toThrowError(
      '[Porsche Design System Vue] No plugin was provided. Make sure to create one via `createPorscheDesignSystem()`.'
    );
  });

  it('should return the plugin created via createPorscheDesignSystem()', async () => {
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
