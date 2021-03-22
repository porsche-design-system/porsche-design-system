import { isIos, isTouchDevice } from '../../../src/utils';

describe('Device Detection', () => {
  let windowSpy;
  beforeEach(() => (windowSpy = jest.spyOn(window, 'window', 'get')));
  afterEach(() => windowSpy.mockRestore());

  describe('isTouchDevice', () => {
    it('should detect touch device ', () => {
      windowSpy.mockImplementation(() => ({
        ontouchstart: true,
        navigator: {
          maxTouchPoints: 1,
        },
      }));

      expect(isTouchDevice()).toBe(true);
    });

    it('should detect non touch device', () => {
      windowSpy.mockImplementation(() => ({
        navigator: {
          maxTouchPoints: 0,
        },
      }));

      expect(isTouchDevice()).toBe(false);
    });
  });

  describe('isIos', () => {
    it('should detect mobile', () => {
      windowSpy.mockImplementation(() => ({
        navigator: {
          platform: 'iPhone',
        },
      }));

      expect(isIos()).toBe(true);
    });

    it('should detect macIntel', () => {
      windowSpy.mockImplementation(() => ({
        navigator: {
          platform: 'MacIntel',
          maxTouchPoints: 2,
        },
      }));

      expect(isIos()).toBe(true);
    });

    it('should be false on windows desktop device', () => {
      windowSpy.mockImplementation(() => ({
        navigator: {
          platform: 'Win32',
        },
      }));

      expect(isIos()).toBe(false);
    });

    it('should be false on windows touchdevice', () => {
      windowSpy.mockImplementation(() => ({
        navigator: {
          platform: 'Win32',
          maxTouchPoints: 2,
        },
      }));

      expect(isIos()).toBe(false);
    });
  });
});
