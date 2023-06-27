import { render } from '@testing-library/react';
import { testSnapshot } from '../helpers';
import { PButton, PorscheDesignSystemProvider } from '../../../src/public-api';

jest.mock('@porsche-design-system/components-js', () => ({
  load: jest.fn(),
}));

describe('PorscheDesignSystemProvider', () => {
  it('should render unprefixed components', () => {
    testSnapshot(
      <PorscheDesignSystemProvider>
        <PButton>Some Button</PButton>
      </PorscheDesignSystemProvider>
    );
  });

  it('should render prefixed components', () => {
    testSnapshot(
      <PorscheDesignSystemProvider prefix="my-prefix">
        <PButton>Some Button</PButton>
      </PorscheDesignSystemProvider>
    );
  });

  it('should render components wrapped with nested provider and prefix', () => {
    testSnapshot(
      <PorscheDesignSystemProvider prefix="my-prefix">
        <PButton>Some Button</PButton>
        <PorscheDesignSystemProvider prefix="another-prefix">
          <PButton>Some Button</PButton>
          <PorscheDesignSystemProvider>
            <PButton>Some Button</PButton>
          </PorscheDesignSystemProvider>
        </PorscheDesignSystemProvider>
      </PorscheDesignSystemProvider>
    );
  });

  it('should throw error if PorscheDesignSystemProvider is missing', () => {
    jest.spyOn(global.console, 'error').mockImplementation();

    expect(() => render(<PButton>Some Button</PButton>)).toThrowErrorMatchingInlineSnapshot(
      '"It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it."'
    );
  });
});
