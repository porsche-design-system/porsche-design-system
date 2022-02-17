import { isIos, isTouchDevice } from './device-detection';

describe('isTouchDevice()', () => {
  it('should return true for touch device', () => {
    jest.spyOn(window, 'window', 'get').mockImplementation(
      () =>
        ({
          ontouchstart: null,
          navigator: {
            maxTouchPoints: 1,
          },
        } as any)
    );

    expect(isTouchDevice()).toBe(true);
  });

  it('should return false for non touch device', () => {
    jest.spyOn(window, 'navigator', 'get').mockImplementation(
      () =>
        ({
          maxTouchPoints: 0,
        } as any)
    );

    expect(isTouchDevice()).toBe(false);
  });
});

describe('isIos()', () => {
  it.each([
    [{ platform: 'iPhone' }, true],
    [{ platform: 'iPad' }, true],
    [{ platform: 'iPod' }, true],
    [{ platform: 'MacIntel', maxTouchPoints: 2 }, true],
    [{ platform: 'Win32' }, false],
    [{ platform: 'Win32', maxTouchPoints: 2 }, false],
  ])('should for navigator %o return %s', (navigator: Navigator, result) => {
    jest.spyOn(window, 'navigator', 'get').mockImplementation(() => navigator);
    expect(isIos()).toBe(result);
  });
});
