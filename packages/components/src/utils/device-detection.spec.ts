import { isTouchDevice } from './device-detection';

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
