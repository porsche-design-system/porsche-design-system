import {
  getFirstAndLastElement,
  getScrollTopOnTouch,
  getFocusableElements,
  setScrollLock,
} from '../../../src/components/content/modal/modal-utils';
import * as deviceDetectionUtils from '../../../src/utils/device-detection';

describe('setScrollLock()', () => {
  const listener = () => {};
  const host = document.createElement('div');

  it('should add body style overflow hidden', () => {
    setScrollLock(host, true, listener);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should remove body style overflow hidden', () => {
    setScrollLock(host, true, listener);
    setScrollLock(host, false, listener);

    expect(document.body.style.overflow).toBe('');
  });

  describe('add/removeEventListener', () => {
    it('should add touchmove eventListener', () => {
      jest.spyOn(deviceDetectionUtils, 'isIos').mockImplementation(() => true);
      const documentSpy = jest.spyOn(document, 'addEventListener');
      const hostSpy = jest.spyOn(host, 'addEventListener');

      setScrollLock(host, true, listener);
      expect(documentSpy).toBeCalledWith('touchmove', expect.anything(), false);
      expect(hostSpy).toBeCalledWith('touchmove', listener);
    });

    it('should remove touchmove eventListener', () => {
      jest.spyOn(deviceDetectionUtils, 'isIos').mockImplementation(() => true);
      const documentSpy = jest.spyOn(document, 'removeEventListener');
      const hostSpy = jest.spyOn(host, 'removeEventListener');

      setScrollLock(host, true, listener);
      setScrollLock(host, false, listener);

      expect(documentSpy).toBeCalledWith('touchmove', expect.anything(), false);
      expect(hostSpy).toBeCalledWith('touchmove', listener);
    });

    it('should not add eventListener if not iOS', () => {
      jest.spyOn(deviceDetectionUtils, 'isIos').mockImplementation(() => false);
      const documentSpy = jest.spyOn(document, 'addEventListener');
      const hostSpy = jest.spyOn(host, 'addEventListener');

      setScrollLock(host, true, listener);

      expect(documentSpy).toBeCalledTimes(0);
      expect(hostSpy).toBeCalledTimes(0);
    });
  });
});

describe('getFocusableElements()', () => {
  it('should return focusable elements', () => {
    const host = document.createElement('div');
    const closeButton = document.createElement('button');

    const anchor = document.createElement('a');
    anchor.href = 'abc';

    const input = document.createElement('input');

    const textarea = document.createElement('textarea');
    textarea.disabled = true;

    host.appendChild(anchor);
    host.appendChild(input);
    host.appendChild(textarea);

    expect(getFocusableElements(host, closeButton)).toEqual([closeButton, anchor, input]);
  });
});

describe('handleHostTouchMove()', () => {
  it.each([
    [{ scrollTop: 0, scrollHeight: 1, offsetHeight: 2 }, 1],
    [{ scrollTop: 1, scrollHeight: 2, offsetHeight: 1 }, 0],
    [{ scrollTop: 1, scrollHeight: 3, offsetHeight: 1 }, 1],
  ])('should be called with %s and return %s', (hostElement: HTMLElement, expected) => {
    const result = getScrollTopOnTouch(hostElement, undefined);
    expect(result).toEqual(expected);
  });

  it('should prevent default', () => {
    const event = { preventDefault: () => {} } as TouchEvent;
    jest.spyOn(event, 'preventDefault');

    getScrollTopOnTouch({ scrollTop: 0, scrollHeight: 1, offsetHeight: 1 } as HTMLElement, event);
    expect(event.preventDefault).toBeCalledTimes(1);
  });
});

describe('getFirstAndLastElement()', () => {
  it.each([
    [
      [{ id: 'first' }, { id: 'middle' }, { id: 'last' }],
      [{ id: 'first' }, { id: 'last' }],
    ],
    [
      [{ id: 'first' }, { id: 'last' }],
      [{ id: 'first' }, { id: 'last' }],
    ],
    [
      [{ id: 'first' }, { id: 'middle' }, { id: 'middle' }, { id: 'last' }],
      [{ id: 'first' }, { id: 'last' }],
    ],
    [[{ id: 'first' }], [{ id: 'first' }, { id: 'first' }]],
    [[], [undefined, undefined]],
    [
      [1, 2, 3],
      [1, 3],
    ],
    [
      ['first', 'middle', 'last'],
      ['first', 'last'],
    ],
  ])('should be called with %j and return %j', (initArray: any, resultArray) => {
    expect(getFirstAndLastElement(initArray)).toEqual(resultArray);
  });
});
