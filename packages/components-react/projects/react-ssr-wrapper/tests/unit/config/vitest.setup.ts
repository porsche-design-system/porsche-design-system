import { normalizeCssNamespace } from '@porsche-design-system/testing/normalize-css-namespace';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';

// jss caches `CSS.escape` unbound at module init, which jsdom >= 30 rejects.
normalizeCssNamespace();

// Testing Library does both by itself only when Vitest globals are on.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
afterEach(cleanup);

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
