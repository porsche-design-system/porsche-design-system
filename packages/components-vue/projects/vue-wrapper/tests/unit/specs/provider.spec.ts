import { render } from '@testing-library/vue';
import { PorscheDesignSystemProvider, PButton } from '../../../src/public-api';

describe('PorscheDesignSystemProvider', () => {
  it('should render unprefixed components', () => {
    const { container } = render(PorscheDesignSystemProvider, { slots: { default: PButton } });

    expect(container.firstElementChild.tagName).toBe('P-BUTTON');
  });

  it('should render prefixed components', () => {
    const { container } = render(PorscheDesignSystemProvider, { props: { prefix: 'my-prefix' }, slots: { default: PButton } });

    expect(container.firstElementChild.tagName).toBe('MY-PREFIX-P-BUTTON');
  });
  it('should throw error if not provided', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

    expect(() => render(PButton)).toThrowErrorMatchingInlineSnapshot(
      '"It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it."'
    );

    spy.mockRestore();
  });
});
