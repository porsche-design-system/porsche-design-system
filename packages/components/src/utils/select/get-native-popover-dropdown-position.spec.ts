import { getNativePopoverDropdownPosition } from './';

describe('getNativePopoverDropdownPosition()', () => {
  const nativePopover = document.createElement('div');
  const host = document.createElement('div');

  const setViewport = () => {
    // clientWidth/Height mockBoundingClientRect is always 0 in JSDOM so we mock it
    Object.defineProperties(document.documentElement, {
      clientWidth: {
        value: 1000,
        configurable: true,
      },
      clientHeight: {
        value: 1000,
        configurable: true,
      },
    });
  };
  beforeAll(() => {
    setViewport();
  });

  beforeEach(() => {
    jest.spyOn(host, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          height: 30,
          width: 100,
          left: 10,
          top: 20,
          bottom: 50,
          right: 110,
        }) as DOMRect
    );
  });

  it('should call getBoundingClientRect() on button', () => {
    const spy = jest.spyOn(host, 'getBoundingClientRect');
    getNativePopoverDropdownPosition(host, 6, nativePopover, 'up');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set the correct styles for the native popover when direction is up', () => {
    global.window.scrollX = 20;
    global.window.scrollY = 30;
    getNativePopoverDropdownPosition(host, 6, nativePopover, 'up');
    expect(nativePopover.style.left).toBe('30px');
    expect(nativePopover.style.top).toBe('50px');
    expect(nativePopover.style.width).toBe('100px');
  });

  it('should set the correct styles for the native popover when direction is down', () => {
    global.window.scrollX = 20;
    global.window.scrollY = 30;
    getNativePopoverDropdownPosition(host, 6, nativePopover, 'down');
    expect(nativePopover.style.left).toBe('30px');
    expect(nativePopover.style.top).toBe('80px');
    expect(nativePopover.style.width).toBe('100px');
  });
});
