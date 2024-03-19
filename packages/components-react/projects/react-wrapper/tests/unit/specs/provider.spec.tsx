import { render } from '@testing-library/react';
import { testSnapshot } from '../helpers';
import { PButton, PorscheDesignSystemProvider } from '../../../src/public-api';
import * as fromComponentsJs from '@porsche-design-system/components-js';
import { useDefaultProps } from '../../../src/hooks';

jest.mock('@porsche-design-system/components-js', () => ({
  load: jest.fn(),
}));

declare global {
  var PORSCHE_DESIGN_SYSTEM_CDN_URL: string;
}

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

  it('should call load() with default parameters once', () => {
    const spy = jest.spyOn(fromComponentsJs, 'load');
    const { rerender } = render(<PorscheDesignSystemProvider />);
    expect(spy).toBeCalledWith({ prefix: '' });

    rerender(<PorscheDesignSystemProvider prefix="new-prefix" />);
    expect(spy).toBeCalledTimes(1);
  });

  it('should call load() with custom parameters once', () => {
    const spy = jest.spyOn(fromComponentsJs, 'load');
    const { rerender } = render(<PorscheDesignSystemProvider prefix="my-prefix" cdn="cn" />);
    expect(spy).toBeCalledWith({ prefix: 'my-prefix', cdn: 'cn' });

    rerender(<PorscheDesignSystemProvider prefix="new-prefix" cdn="cn" />);
    expect(spy).toBeCalledTimes(1);
  });

  // TODO: tests for theme prop are missing

  describe('components prop', () => {
    it('should correctly pass wordings to context', () => {
      const DemoComponent = (): JSX.Element => {
        const defaultProps = useDefaultProps('PInlineNotification');
        return <>{JSON.stringify(defaultProps)}</>;
      };

      const { container } = render(
        <PorscheDesignSystemProvider
          components={{ PInlineNotification: { wordings: { dismiss: 'Avvisa meddelande' } } }}
        >
          <DemoComponent />
        </PorscheDesignSystemProvider>
      );

      expect(container.innerHTML).toBe('{"wordings":{"dismiss":"Avvisa meddelande"}}');
    });
  });

  describe('on server', () => {
    // @ts-ignore
    beforeAll(() => delete global.PORSCHE_DESIGN_SYSTEM_CDN_URL); // from previous tests
    // @ts-ignore
    beforeEach(() => (process.browser = false));
    // @ts-ignore
    afterEach(() => delete global.PORSCHE_DESIGN_SYSTEM_CDN_URL && delete process.browser);

    it('should set global.PORSCHE_DESIGN_SYSTEM_CDN_URL without cdn prop', () => {
      expect(global.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBeUndefined();
      render(<PorscheDesignSystemProvider />);
      expect(global.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBe('https://cdn.ui.porsche.com');
    });

    it('should set global.PORSCHE_DESIGN_SYSTEM_CDN_URL for cdn="auto"', () => {
      expect(global.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBeUndefined();
      render(<PorscheDesignSystemProvider cdn="auto" />);
      expect(global.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBe('https://cdn.ui.porsche.com');
    });

    it('should set global.PORSCHE_DESIGN_SYSTEM_CDN_URL for cdn="cn"', () => {
      expect(global.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBeUndefined();
      render(<PorscheDesignSystemProvider cdn="cn" />);
      expect(global.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBe('https://cdn.ui.porsche.cn');
    });
  });

  describe('on client', () => {
    // @ts-ignore
    beforeEach(() => (process.browser = true));
    // @ts-ignore
    afterEach(() => delete process.browser);

    it('should not set global.PORSCHE_DESIGN_SYSTEM_CDN_URL', () => {
      expect(global.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBeUndefined();
      render(<PorscheDesignSystemProvider />);
      expect(global.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBeUndefined();
    });
  });
});
