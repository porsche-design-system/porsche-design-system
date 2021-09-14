import {
  componentsReady,
  PIcon,
  skipPorscheDesignSystemCDNRequestsDuringTests,
} from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return <PIcon data-testid="host" />;
};

let counter: number;

beforeEach(() => {
  counter = 0;
  global.fetch = jest.fn().mockImplementation((x) => {
    console.log('GLOBAL FETCH EXECUTED ON: ', x);
    counter++;
  });
  skipPorscheDesignSystemCDNRequestsDuringTests();
});

afterEach(() => {
  jest.clearAllMocks();
});

fdescribe('CDN requests', () => {
  it('should not fetch tracking pixel', async () => {
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

fdescribe('non CDN request', () => {
  it('should fetch if non CDN request', async () => {
    expect(true).toBe(false);
  });
});
