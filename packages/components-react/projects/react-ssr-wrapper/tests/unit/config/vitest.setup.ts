import { normalizeCssNamespace } from '@porsche-design-system/shared/testing';
import { beforeAll, vi } from 'vitest';

// jss caches `CSS.escape` unbound at module init, which jsdom >= 30 rejects.
normalizeCssNamespace();

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
