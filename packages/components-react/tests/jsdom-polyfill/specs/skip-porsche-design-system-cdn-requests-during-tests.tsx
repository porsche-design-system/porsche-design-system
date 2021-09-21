import {
  componentsReady,
  PIcon,
  PMarque,
  skipPorscheDesignSystemCDNRequestsDuringTests,
} from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

describe('skipPorscheDesignSystemCDNRequestsDuringTests()', () => {
  beforeEach(() => {
    skipPorscheDesignSystemCDNRequestsDuringTests();
  });

  afterEach(() => {
    (window as any).PDS_SKIP_FETCH = false;
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
    const spy = jest.spyOn(global, 'fetch');

    render(<PIcon />);
    await componentsReady();

    expect(spy).not.toHaveBeenCalled();
  });
});
