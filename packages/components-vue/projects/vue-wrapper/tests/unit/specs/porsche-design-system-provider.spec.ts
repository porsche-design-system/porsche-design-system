import * as fromComponentsJs from '@porsche-design-system/components-js';
import { render } from '@testing-library/vue';
import { expect, test, vi } from 'vitest';
import { h } from 'vue';
import { PButton, PorscheDesignSystemProvider } from '../../../src/public-api';

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
