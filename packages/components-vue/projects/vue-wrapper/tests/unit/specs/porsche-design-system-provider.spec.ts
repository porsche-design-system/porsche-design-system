import * as fromComponentsJs from '@porsche-design-system/components-js';
import { render } from '@testing-library/vue';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { defineComponent, h, inject, nextTick, type Ref } from 'vue';
import { PButton, PorscheDesignSystemProvider, type Theme, themeInjectionKey } from '../../../src/public-api';
import { mount } from '@vue/test-utils';
import { load } from '@porsche-design-system/components-js';

vi.mock('@porsche-design-system/components-js', () => ({
  load: vi.fn(),
}));

describe('PorscheDesignSystemProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render default components', () => {
    const { container } = render(PorscheDesignSystemProvider, { slots: { default: PButton } });
    expect(container.firstElementChild!.tagName).toBe('P-BUTTON');
  });

  test('should render prefixed components', () => {
    const { container } = render(PorscheDesignSystemProvider, {
      props: { prefix: 'my-prefix' },
      slots: { default: PButton },
    });

    expect(container.firstElementChild!.tagName).toBe('MY-PREFIX-P-BUTTON');
  });

  test('should render components wrapped with nested provider and prefix', () => {
    const { container } = render(
      h(PorscheDesignSystemProvider, { prefix: 'my-prefix' }, () => [
        h(PButton, () => 'Some label'),
        h(PorscheDesignSystemProvider, { prefix: 'another-prefix' }, () => [
          h(PButton, () => 'Some label'),
          h(PorscheDesignSystemProvider, () => h(PButton, () => 'Some label')),
        ]),
      ])
    );

    expect(container).toMatchSnapshot();
  });

  test('should throw error if PorscheDesignSystemProvider is missing ', () => {
    vi.spyOn(global.console, 'warn').mockImplementation(() => {}); // suppress vue warning

    expect(() => render(PButton)).toThrowError(
      'It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it.'
    );
  });

  test('should call load() with default parameters once', () => {
    const spy = vi.spyOn(fromComponentsJs, 'load');
    const { rerender } = render(PorscheDesignSystemProvider);
    expect(spy).toHaveBeenCalledWith({ prefix: '', theme: 'light' });

    rerender({ prefix: 'new-prefix' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should call load() with custom parameters once', () => {
    const spy = vi.spyOn(fromComponentsJs, 'load');
    const { rerender } = render(PorscheDesignSystemProvider, { props: { prefix: 'my-prefix', cdn: 'cn' } });
    expect(spy).toHaveBeenCalledWith({ prefix: 'my-prefix', cdn: 'cn', theme: 'light' });

    rerender({ prefix: 'new-prefix', cdn: 'cn' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should call load() with props on mount', () => {
    mount(PorscheDesignSystemProvider, {
      props: {
        theme: 'dark',
        prefix: 'pds',
        cdn: 'auto',
      },
    });

    expect(load).toHaveBeenCalledWith({
      theme: 'dark',
      prefix: 'pds',
      cdn: 'auto',
    });
  });

  test('should reactively update themeRef when props.theme changes', async () => {
    let injectedThemeRef: Ref<Theme>;

    const Consumer = defineComponent({
      setup() {
        injectedThemeRef = inject(themeInjectionKey);
        return () => h('div');
      },
    });

    const wrapper = mount(PorscheDesignSystemProvider, {
      props: {
        theme: 'light',
      },
      slots: {
        default: () => h(Consumer),
      },
    });

    expect(injectedThemeRef.value).toBe('light');

    await wrapper.setProps({ theme: 'auto' });
    await nextTick();

    expect(injectedThemeRef.value).toBe('auto');
  });

  test('does not call load again when theme changes', async () => {
    const wrapper = mount(PorscheDesignSystemProvider, {
      props: {
        theme: 'light',
      },
    });

    expect(load).toHaveBeenCalledTimes(1);

    await wrapper.setProps({ theme: 'dark' });
    await nextTick();

    expect(load).toHaveBeenCalledTimes(1);
  });
});

describe('theme injection via themeInjectionKey', () => {
  const ThemeConsumer = defineComponent({
    setup() {
      const themeRef = inject(themeInjectionKey)! as Ref<Theme>;
      return () => h('div', { 'data-test': 'theme' }, themeRef.value);
    },
  });

  test.each(['light', 'dark', 'auto'])('provider(theme="%s") injects correct theme', async (theme) => {
    const wrapper = mount(
      defineComponent({
        components: { PorscheDesignSystemProvider, ThemeConsumer, PButton },
        template: `
            <PorscheDesignSystemProvider theme="${theme}">
              <ThemeConsumer />
              <PButton />
            </PorscheDesignSystemProvider>
          `,
      })
    );

    const text = wrapper.find('[data-test="theme"]').text();
    const button = wrapper.find('p-button');
    expect(button.element['theme']).toBe(theme);
    expect(text).toBe(theme);
  });

  test('nested providers override parent theme', () => {
    const wrapper = mount(
      defineComponent({
        components: { PorscheDesignSystemProvider, ThemeConsumer },
        template: `
          <PorscheDesignSystemProvider cdn="auto" theme="light">
            <PorscheDesignSystemProvider cdn="auto" theme="dark">
              <ThemeConsumer />
            </PorscheDesignSystemProvider>
          </PorscheDesignSystemProvider>
        `,
      })
    );

    expect(wrapper.find('[data-test="theme"]').text()).toBe('dark');
  });
});
