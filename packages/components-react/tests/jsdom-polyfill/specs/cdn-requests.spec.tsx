import {
  componentsReady,
  PIcon,
  PMarque,
  skipPorscheDesignSystemCDNRequestsDuringTests,
} from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

let fetchCount: number;

beforeEach(() => {
  fetchCount = 0;
  global.fetch = jest.fn().mockImplementation((x) => {
    fetchCount++;
  });
  skipPorscheDesignSystemCDNRequestsDuringTests();
});

afterEach(() => {
  (window as any).PDS_SKIP_FETCH = false;
});

describe('CDN requests with skipPorscheDesignSystemCDNRequestsDuringTests()', () => {
  it('should not fetch tracking pixel', async () => {
    jest.spyOn(console, 'error').mockImplementationOnce((error: string) => {
      if (!error.includes('Could not parse CSS stylesheet')) {
        console.error(error);
      }
    });

    require('../../../dist/components-wrapper/jsdom-polyfill/index.js').defineCustomElements();

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
});
