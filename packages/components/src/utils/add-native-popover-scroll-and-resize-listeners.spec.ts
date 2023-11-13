import { addNativePopoverScrollAndResizeListeners } from './add-native-popover-scroll-and-resize-listeners';

describe('addNativePopoverScrollAndResizeListeners()', () => {
  const host = document.createElement('div');
  const table = document.createElement('div');
  table.attachShadow({ mode: 'open' });
  const tableScrollArea = document.createElement('div');
  const nativePopover = document.createElement('div');
  document.body.appendChild(host);
  document.body.appendChild(table);
  document.body.appendChild(nativePopover);

  beforeEach(() => {
    jest.spyOn(table.shadowRoot, 'querySelector').mockReturnValue({
      // @ts-ignore
      shadowRoot: {
        querySelector: jest.fn(() => tableScrollArea),
      },
    });
    nativePopover.hidePopover = jest.fn();
  });

  it('should register scroll and resize listeners and remove them on scroll', () => {
    const windowAddEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const windowRemoveEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const tableAddEventListenerSpy = jest.spyOn(tableScrollArea, 'addEventListener');
    const tableRemoveEventListenerSpy = jest.spyOn(tableScrollArea, 'removeEventListener');
    addNativePopoverScrollAndResizeListeners(host, table, nativePopover);

    expect(windowAddEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(windowAddEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { once: true });
    expect(windowAddEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function), { once: true });

    expect(tableAddEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(tableAddEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { once: true });

    window.dispatchEvent(new Event('scroll'));

    expect(windowRemoveEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    expect(tableRemoveEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(tableRemoveEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
