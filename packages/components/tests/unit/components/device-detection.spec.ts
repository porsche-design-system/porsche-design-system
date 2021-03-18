import { isIos, isTouchDevice } from '../../../src/utils';

describe('Device Detection', () => {
  let windowSpy;
  beforeEach(() => (windowSpy = jest.spyOn(window, 'window', 'get')));

  afterEach(() => windowSpy.mockRestore());
  it('should detect touch device', () => {
    windowSpy.mockImplementation(
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

  describe('should detect ios', () => {
    it('mobile', () => {
      windowSpy.mockImplementation(
        () =>
          ({
            navigator: {
              platform: 'iPhone',
            },
          } as Window & typeof globalThis)
      );

      expect(isIos()).toBe(true);
    });

    it('macIntel', () => {
      windowSpy.mockImplementation(
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
  });
});
