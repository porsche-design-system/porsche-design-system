import * as componentsJs from '@porsche-design-system/components-js';
import { flushPromises } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { App, createApp } from 'vue';
import {
  createPorscheDesignSystem,
  porscheDesignSystemSymbol,
  usePorscheDesignSystemPlugin,
} from '../../../src/plugin';
import { prefixInjectionKey } from '../../../src/utils';

vi.mock('@porsche-design-system/components-js', () => ({
  load: vi.fn(),
  componentsReady: () => Promise.resolve(), // instant resolve
}));

describe('createPorscheDesignSystem()', () => {
  const getApp = (): App<Element> =>
    createApp({
      use: vi.fn(),
      provide: vi.fn(),
    });

  test('should create a Porsche Design System plugin', () => {
    const plugin = createPorscheDesignSystem();
    expect(plugin).toBeDefined();
  });

  test('should call plugin.install() with correct parameters', () => {
    const plugin = createPorscheDesignSystem();
    const spy = vi.spyOn(plugin, 'install');
    const app = getApp();

    app.use(plugin);
    expect(spy).toHaveBeenCalledWith(app);
  });

  test('should call porscheDesignSystem.load() without prefix', async () => {
    const plugin = createPorscheDesignSystem();
    const spy = vi.spyOn(componentsJs, 'load');
    const app = getApp();

    app.use(plugin);
    await flushPromises();
    expect(spy).toHaveBeenCalledWith({ prefix: '' });
  });

  test('should call porscheDesignSystem.load() with prefix', async () => {
    const plugin = createPorscheDesignSystem({ prefix: 'prefix' });
    const spy = vi.spyOn(componentsJs, 'load');
    const app = getApp();

    app.use(plugin);
    await flushPromises();
    expect(spy).toHaveBeenCalledWith({ prefix: 'prefix' });
  });

  test('should provide prefix via prefixInjectionKey and plugin via porscheDesignSystemSymbol', async () => {
    const plugin = createPorscheDesignSystem({ prefix: 'prefix' });
    const app = getApp();
    const spy = vi.spyOn(app, 'provide');

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

  test('should isPorscheDesignSystemLoaded be true when installed', async () => {
    const plugin = createPorscheDesignSystem();
    const app = getApp();

    app.use(plugin);
    await flushPromises();
    expect(plugin.isPorscheDesignSystemLoaded.value).toBe(true);
  });
});

describe('usePorscheDesignSystemPlugin()', () => {
  test('should throw an error when no plugin is provided', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {}); // suppress vue warning

    expect(() => {
      usePorscheDesignSystemPlugin();
    }).toThrowError(
      '[Porsche Design System Vue] No plugin was provided. Make sure to create one via `createPorscheDesignSystem()`.'
    );
  });

  test('should return the plugin created via createPorscheDesignSystem()', async () => {
    const plugin = createPorscheDesignSystem();
    const app = createApp({
      use: vi.fn(),
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
