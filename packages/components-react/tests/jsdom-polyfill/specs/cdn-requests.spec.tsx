import {
  componentsReady,
  PIcon,
  PMarque,
  skipPorscheDesignSystemCDNRequestsDuringTests,
} from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import '@fastly/performance-observer-polyfill/polyfill';

let fetchCount: number;

beforeEach(() => {
  fetchCount = 0;
  global.fetch = jest.fn().mockImplementation((x) => {
    fetchCount++;
  });
  skipPorscheDesignSystemCDNRequestsDuringTests();
});

afterEach(() => {
  (window as any).SKIP_FETCH = false;
  jest.clearAllMocks();
});

fdescribe('CDN requests with skipPorscheDesignSystemCDNRequestsDuringTests()', () => {
  it('should not fetch tracking pixel', async () => {
    try {
      require('../../../projects/jsdom-polyfill/src/lib/loader.cjs').defineCustomElements();
    } catch (e) {
      // do nothing
    }

    expect(fetchCount).toBe(0);
  });

  it('should not fetch font-face definitions', async () => {
    const link = document.querySelector('head').querySelector('link[rel="stylesheet"]');

    expect(link).toBeNull();
  });

  it('should not fetch marque', async () => {
    render(<PMarque />);
    await componentsReady();

    const picture = document.querySelector('p-marque').shadowRoot.querySelector('picture');

    expect(picture).toBeNull();
  });

  it('should not fetch icon', async () => {
    render(<PIcon />);
    await componentsReady();

    expect(fetchCount).toBe(0);
  });

  it('should fetch if window.SKIP_FETCH is set to false', async () => {
    (window as any).SKIP_FETCH = false;
    render(<PIcon name="highway" />);
    await componentsReady();

    expect(fetchCount).toBe(1);
  });
});
