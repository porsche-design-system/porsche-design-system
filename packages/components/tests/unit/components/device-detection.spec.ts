import { isIos, isTouchDevice } from '../../../src/utils';

describe('Device Detection', () => {
  let windowSpy;
  beforeEach(() => (windowSpy = jest.spyOn(window, 'window', 'get')));

  describe('isTouchDevice', () => {
    it('should detect touch device ', () => {
      windowSpy.mockImplementationOnce(
        () =>
          (({
            ontouchstart: true,
            navigator: {
              maxTouchPoints: 1,
            },
          } as unknown) as Window & typeof globalThis)
      );

      expect(isTouchDevice()).toBe(true);
    });

    it('should detect non touch device', () => {
      windowSpy.mockImplementationOnce(
        () =>
          (({
            ontouchstart: false,
            navigator: {
              maxTouchPoints: 0,
            },
          } as unknown) as Window & typeof globalThis)
      );

      expect(isTouchDevice()).toBe(false);
    });
  });

  describe('isIos', () => {
    it('should detect mobile', () => {
      windowSpy.mockImplementationOnce(
        () =>
          ({
            navigator: {
              platform: 'iPhone',
            },
          } as Window & typeof globalThis)
      );

      expect(isIos()).toBe(true);
    });

    it('should detect macIntel', () => {
      windowSpy.mockImplementationOnce(
        () =>
          ({
            navigator: {
              platform: 'MacIntel',
              maxTouchPoints: 2,
            },
          } as Window & typeof globalThis)
      );

      expect(isIos()).toBe(true);
    });

    it('should be false on windows desktop device', () => {
      windowSpy.mockImplementationOnce(
        () =>
          ({
            navigator: {
              platform: 'Win32',
            },
          } as Window & typeof globalThis)
      );

      expect(isIos()).toBe(false);
    });

    it('should be false on windows touchdevice', () => {
      windowSpy.mockImplementationOnce(
        () =>
          ({
            navigator: {
              platform: 'Win32',
              maxTouchPoints: 2,
            },
          } as Window & typeof globalThis)
      );

      expect(isIos()).toBe(false);
    });
  });
});
