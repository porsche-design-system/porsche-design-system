import '@testing-library/jest-dom';
import { vi } from 'vitest';
import '@porsche-design-system/components-react/jsdom-polyfill';

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
