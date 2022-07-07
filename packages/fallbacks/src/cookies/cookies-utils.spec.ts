import { hasCookiesEnabled } from './cookies-utils';

describe('hasCookiesEnabled()', () => {
  let cookieEnabledGetter: any;

  beforeEach(() => {
    cookieEnabledGetter = jest.spyOn(window.navigator, 'cookieEnabled', 'get');
  });

  it('should be truthy', () => {
    cookieEnabledGetter.mockReturnValue(true);
    expect(hasCookiesEnabled()).toBe(true);
  });

  it('should be falsy', () => {
    cookieEnabledGetter.mockReturnValue(false);
    expect(hasCookiesEnabled()).toBe(false);
  });
});
