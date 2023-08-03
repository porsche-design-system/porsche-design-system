import { render } from '@testing-library/vue';
import { PorscheDesignSystemProvider, PButton } from '../../../src/public-api';
import { h } from 'vue';
import * as fromComponentsJs from '@porsche-design-system/components-js';

// not sure why we have to mock it but otherwise we can't spy
jest.mock('@porsche-design-system/components-js');

it('should render default components', () => {
  const { container } = render(PorscheDesignSystemProvider, { slots: { default: PButton } });

  expect(container.firstElementChild!.tagName).toBe('P-BUTTON');
});

it('should render prefixed components', () => {
  const { container } = render(PorscheDesignSystemProvider, {
    props: { prefix: 'my-prefix' },
    slots: { default: PButton },
  });

  expect(container.firstElementChild!.tagName).toBe('MY-PREFIX-P-BUTTON');
});

it('should render components wrapped with nested provider and prefix', () => {
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

it('should throw error if PorscheDesignSystemProvider is missing ', () => {
  jest.spyOn(global.console, 'warn').mockImplementation(); // suppress vue warning

  expect(() => render(PButton)).toThrowErrorMatchingInlineSnapshot(
    '"It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it."'
  );
});

it('should call load() with default parameters once', () => {
  const spy = jest.spyOn(fromComponentsJs, 'load');
  const { rerender } = render(PorscheDesignSystemProvider);
  expect(spy).toBeCalledWith({ prefix: '' });

  rerender({ prefix: 'new-prefix' });
  expect(spy).toBeCalledTimes(1);
});

it('should call load() with custom parameters once', () => {
  const spy = jest.spyOn(fromComponentsJs, 'load');
  const { rerender } = render(PorscheDesignSystemProvider, { props: { prefix: 'my-prefix', cdn: 'cn' } });
  expect(spy).toBeCalledWith({ prefix: 'my-prefix', cdn: 'cn' });

  rerender({ prefix: 'new-prefix', cdn: 'cn' });
  expect(spy).toBeCalledTimes(1);
});
