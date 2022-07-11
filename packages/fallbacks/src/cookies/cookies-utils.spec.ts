import { hasCookiesEnabled } from './cookies-utils';

describe('hasCookiesEnabled()', () => {
  let cookieEnabledGetter: jest.SpyInstance;

  beforeEach(() => {
    cookieEnabledGetter = jest.spyOn(window.navigator, 'cookieEnabled', 'get');
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
