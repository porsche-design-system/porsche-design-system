import { componentsReady, PIcon } from '@porsche-design-system/components-react';
import { render, screen } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return <PIcon data-testid="host" />;
};

let counter: number;

beforeEach(() => {
  process.env.PDS_NO_CDN_REQUESTS = '1';
  counter = 0;

  global.fetch = jest.fn().mockImplementation((x) => {
    console.log(x);
    counter++;
  });
});

afterEach(() => {
  process.env.PDS_NO_CDN_REQUESTS = '0';
  jest.clearAllMocks();
});

describe('CDN requests', () => {
  it('should not fetch tracking pixel', async () => {
    /*    require('../../../projects/jsdom-polyfill/src/lib/loader.cjs').defineCustomElements(window);*/
    render(<Sample />);
    await componentsReady();

    expect(counter).toBe(0);
  });

  it('should not load font-face definitions', async () => {
    const link = document.querySelector('head').querySelector('link[rel="stylesheet"]');
    console.log(link);
    expect(link).toBeNull();
  });

  it('should not fetch icon', async () => {
    render(<Sample />);
    await componentsReady();

    expect(counter).toBe(0);
  });
});
