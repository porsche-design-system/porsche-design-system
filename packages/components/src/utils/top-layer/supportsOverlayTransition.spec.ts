import { vi } from 'vitest';
import { supportsOverlayTransition } from './supportsOverlayTransition';

// Mocks CSS.supports per query so we can simulate Chromium (both true), Firefox (allow-discrete only) and Safari (none).
const mockOverlaySupport = (support: { overlay?: boolean; allowDiscrete?: boolean }): void => {
  vi.stubGlobal('CSS', {
    supports: vi.fn((query: string) => {
      if (query === 'overlay: auto') {
        return support.overlay ?? false;
      }
      if (query === 'transition-behavior: allow-discrete') {
        return support.allowDiscrete ?? false;
      }
      return false;
    }),
  });
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('supportsOverlayTransition()', () => {
  it('should return true when both `overlay` and `transition-behavior: allow-discrete` are supported (Chromium)', () => {
    mockOverlaySupport({ overlay: true, allowDiscrete: true });
    expect(supportsOverlayTransition()).toBe(true);
  });

  it('should return false when `overlay` is unsupported but `allow-discrete` is supported (Firefox)', () => {
    mockOverlaySupport({ overlay: false, allowDiscrete: true });
    expect(supportsOverlayTransition()).toBe(false);
  });

  it('should return false when neither `overlay` nor `allow-discrete` are supported (Safari)', () => {
    mockOverlaySupport({ overlay: false, allowDiscrete: false });
    expect(supportsOverlayTransition()).toBe(false);
  });

  it('should return false when `overlay` is supported but `allow-discrete` is not', () => {
    mockOverlaySupport({ overlay: true, allowDiscrete: false });
    expect(supportsOverlayTransition()).toBe(false);
  });
});
