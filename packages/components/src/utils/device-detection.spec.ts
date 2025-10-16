import { isTouchDevice } from './device-detection';

describe('isTouchDevice()', () => {
  const originalNavigator = window.navigator;
  const originalOntouchstart = (window as any).ontouchstart;

  afterEach(() => {
    Object.defineProperty(window, 'navigator', { value: originalNavigator, configurable: true });
    (window as any).ontouchstart = originalOntouchstart;
  });

  it('should return true for touch device', () => {
    Object.defineProperty(window, 'navigator', {
      value: { maxTouchPoints: 1 },
      configurable: true,
    });
    (window as any).ontouchstart = null;

    expect(isTouchDevice()).toBe(true);
  });

  it('should return false for non touch device', () => {
    Object.defineProperty(window, 'navigator', {
      value: { maxTouchPoints: 0 },
      configurable: true,
    });
    delete (window as any).ontouchstart;

    expect(isTouchDevice()).toBe(false);
  });
});
