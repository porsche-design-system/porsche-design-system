import {
  componentsReady,
  PIcon,
  PMarque,
  PText,
  skipPorscheDesignSystemCDNRequestsDuringTests,
} from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

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

// CDN requests can only be tested on a prod build, since skipPorscheDesignSystemCDNRequestsDuringTests intercepts CDN requests

describe('CDN requests', () => {
  it('should not fetch tracking pixel', async () => {
    render(<PIcon />);
    await componentsReady();

    expect(counter).toBe(0);
  });

  it('should not fetch font-face definitions', async () => {
    render(<PText>ASD</PText>);
    const link = document.querySelector('head').querySelector('link[rel="stylesheet"]');
    console.log(link);
    expect(counter).toBe(0);
  });

  it('should not fetch marque', () => {
    render(<PMarque />);
    expect(counter).toBe(0);
  });

  it('should not fetch icon', async () => {
    render(<PIcon />);
    await componentsReady();

    expect(counter).toBe(0);
  });
});

describe('non CDN request', () => {
  it('should fetch if non CDN request', async () => {
    render(<PIcon source="https://upload.wikimedia.org/wikipedia/commons/7/78/Multiple_icon_selection.png" />);
    expect(counter).toBe(1);
  });
});
