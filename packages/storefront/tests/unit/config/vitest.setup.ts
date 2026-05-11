import { beforeAll, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import '@porsche-design-system/components-react/jsdom-polyfill';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

beforeAll(() => {
  // Mock for the Element Internals API
  HTMLElement.prototype.attachInternals = vi.fn(
    () =>
      ({
        setFormValue: vi.fn(),
        setValidity: vi.fn(),
      }) as unknown as ElementInternals
  );
});

// TODO: Get rid once jsdom polyfill is fixed
// Fix for flaky jsdom polyfill error
process.on('unhandledRejection', (reason) => {
  if (String(reason).includes('dispatchEvent is not a function')) {
    return;
  }
  throw reason;
});
