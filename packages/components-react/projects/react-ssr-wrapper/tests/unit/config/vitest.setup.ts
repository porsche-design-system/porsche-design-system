import '@testing-library/jest-dom';
import { vi } from 'vitest';

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
