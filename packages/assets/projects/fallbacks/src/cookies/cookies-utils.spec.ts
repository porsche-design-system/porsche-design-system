import { hasCookiesEnabled } from './cookies-utils';
import { vi, MockInstance } from 'vitest';

describe('hasCookiesEnabled()', () => {
  let cookieEnabledGetter: MockInstance;

  beforeEach(() => {
    cookieEnabledGetter = vi.spyOn(window.navigator, 'cookieEnabled', 'get');
  });

  it('should be true', () => {
    cookieEnabledGetter.mockReturnValue(true);
    expect(hasCookiesEnabled()).toBe(true);
  });

  it('should be false', () => {
    cookieEnabledGetter.mockReturnValue(false);
    expect(hasCookiesEnabled()).toBe(false);
  });
});
