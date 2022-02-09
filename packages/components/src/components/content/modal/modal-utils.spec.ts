import {
  getFirstAndLastElement,
  getFirstAndLastFocusableElement,
  getFocusableElements,
  getScrollTopOnTouch,
  hasSlottedHeading,
  setScrollLock,
  unpackChildren,
  warnIfAriaAndHeadingPropsAreUndefined,
} from './modal-utils';
import * as deviceDetectionUtils from '../../../utils/device-detection';
import * as domUtils from '../../../utils/dom';

describe('setScrollLock()', () => {
  const keyboardEventHandler = () => {};
  const host = document.createElement('div');

  it('should add body style overflow: hidden', () => {
    setScrollLock(host, true, keyboardEventHandler);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should remove body style overflow: hidden', () => {
    setScrollLock(host, true, keyboardEventHandler);
    setScrollLock(host, false, keyboardEventHandler);

    expect(document.body.style.overflow).toBe('');
  });

  describe('add event listeners', () => {
    it('should add keydown event listener', () => {
      const documentSpy = jest.spyOn(document, 'addEventListener');
      setScrollLock(host, true, keyboardEventHandler);

      expect(documentSpy).toBeCalledWith('keydown', keyboardEventHandler);
    });

    it('should add touchmove event listeners for iOS', () => {
      jest.spyOn(deviceDetectionUtils, 'isIos').mockImplementation(() => true);
      const documentSpy = jest.spyOn(document, 'addEventListener');
      const hostSpy = jest.spyOn(host, 'addEventListener');

      setScrollLock(host, true, keyboardEventHandler);
      expect(documentSpy).toBeCalledWith('touchmove', expect.anything(), false);
      expect(hostSpy).toBeCalledWith('touchmove', expect.anything());
    });

    it('should not add touchmove event listeners if not iOS', () => {
      jest.spyOn(deviceDetectionUtils, 'isIos').mockImplementation(() => false);
      const documentSpy = jest.spyOn(document, 'addEventListener');
      const hostSpy = jest.spyOn(host, 'addEventListener');
      setScrollLock(host, true, keyboardEventHandler);

      expect(documentSpy).toBeCalledWith('keydown', keyboardEventHandler);
      expect(hostSpy).toBeCalledTimes(0);
    });
  });

  describe('remove event listeners', () => {
    it('should remove keydown event listener', () => {
      const documentSpy = jest.spyOn(document, 'removeEventListener');
      setScrollLock(host, true, keyboardEventHandler);
      setScrollLock(host, false, keyboardEventHandler);

      expect(documentSpy).toBeCalledWith('keydown', keyboardEventHandler);
    });

    it('should remove touchmove event listeners', () => {
      jest.spyOn(deviceDetectionUtils, 'isIos').mockImplementation(() => true);
      const documentSpy = jest.spyOn(document, 'removeEventListener');
      const hostSpy = jest.spyOn(host, 'removeEventListener');
      setScrollLock(host, true, keyboardEventHandler);
      setScrollLock(host, false, keyboardEventHandler);

      expect(documentSpy).toBeCalledWith('touchmove', expect.anything(), false);
      expect(hostSpy).toBeCalledWith('touchmove', expect.anything());
    });
  });
});

xdescribe('getHTMLElementsWithShadowRoot()', () => {
  // TODO
});

describe('unpackChildren()', () => {
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement('div');
  });

  it('should return array with single child', () => {
    const child = document.createElement('div');
    container.append(child);
    expect(unpackChildren(container)).toEqual([child]);
  });

  it('should return array with several children', () => {
    const child1 = document.createElement('div');
    const child2 = document.createElement('span');
    const child3 = document.createElement('p');
    container.append(child1, child2, child3);
    expect(unpackChildren(container)).toEqual([child1, child2, child3]);
  });

  it('should return array with single child and nested child', () => {
    const child = document.createElement('div');
    const nestedChild = document.createElement('span');
    child.append(nestedChild);
    container.append(child);
    expect(unpackChildren(container)).toEqual([child, nestedChild]);
  });

  it('should return array with single child and deeply nested children', () => {
    const child = document.createElement('div');
    const nestedChild = document.createElement('p');
    const nestedNestedChild = document.createElement('span');
    const nestedNestedNestedChild = document.createElement('input');
    child.append(nestedChild);
    nestedChild.append(nestedNestedChild);
    nestedNestedChild.append(nestedNestedNestedChild);
    container.append(child);
    expect(unpackChildren(container)).toEqual([child, nestedChild, nestedNestedChild, nestedNestedNestedChild]);
  });

  it('should return array with several children and nested children', () => {
    const child1 = document.createElement('div');
    const nestedChild1 = document.createElement('span');
    const nestedNestedChild1 = document.createElement('input');
    const child2 = document.createElement('p');
    const nestedChild2 = document.createElement('span');
    const child3 = document.createElement('h1');
    nestedChild1.append(nestedNestedChild1);
    child1.append(nestedChild1);
    child2.append(nestedChild2);
    container.append(child1, child2, child3);
    expect(unpackChildren(container)).toEqual([child1, nestedChild1, nestedNestedChild1, child2, nestedChild2, child3]);
  });
});

describe('getFirstAndLastFocusableElement()', () => {
  describe('with closeButton', () => {
    let container: HTMLElement;
    const closeButton = document.createElement('button');
    closeButton.id = ' btn-close';

    beforeEach(() => {
      container = document.createElement('div');
    });

    it('should return correct elements for single child', () => {
      const input = document.createElement('input');
      input.type = 'text';
      container.append(input);

      expect(getFirstAndLastFocusableElement(container, closeButton)).toEqual([closeButton, input]);
    });

    it('should return correct elements for multiple children', () => {
      const input1 = document.createElement('input');
      input1.type = 'text';
      const input2 = document.createElement('input');
      input2.type = 'number';
      container.append(input1, input2);

      expect(getFirstAndLastFocusableElement(container, closeButton)).toEqual([closeButton, input1]);
    });

    it('should return correct elements for within shadow dom', () => {
      const input = document.createElement('input');
      input.type = 'text';
      const host = document.createElement('div');
      host.attachShadow({ mode: 'open' });
      host.shadowRoot.append(input);

      container.append(host);

      expect(getFirstAndLastFocusableElement(container, closeButton)).toEqual([closeButton, input]);
    });
  });

  describe('without closeButton', () => {
    it('should return correct elements', () => {});
  });
});

xdescribe('getFocusableElements()', () => {
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

  it('should call getHTMLElements() with correct parameters', () => {
    const host = document.createElement('p-modal');
    const closeButton = document.createElement('button');

    const spy = jest.spyOn(domUtils, 'getHTMLElements');
    getFocusableElements(host, closeButton);

    expect(spy).toHaveBeenCalledWith(
      host,
      'p-accordion,p-banner,p-button,p-button-pure,p-inline-notification,p-link,p-link-pure,p-link-social,p-marque,p-modal,p-pagination,p-popover,p-select-wrapper,p-select-wrapper-dropdown,p-switch,p-table,p-table-head-cell,p-tabs,p-tabs-bar,p-text-field-wrapper,p-toast,p-toast-item,[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex]:not([tabindex="-1"]'
    );
  });

  it('should call getHTMLElements() with correct parameters for prefixed modal', () => {
    const host = document.createElement('prefixed-p-modal');
    const closeButton = document.createElement('button');

    const spy = jest.spyOn(domUtils, 'getHTMLElements');
    getFocusableElements(host, closeButton);

    expect(spy).toHaveBeenCalledWith(
      host,
      'prefixed-p-accordion,prefixed-p-banner,prefixed-p-button,prefixed-p-button-pure,prefixed-p-inline-notification,prefixed-p-link,prefixed-p-link-pure,prefixed-p-link-social,prefixed-p-marque,prefixed-p-modal,prefixed-p-pagination,prefixed-p-popover,prefixed-p-select-wrapper,prefixed-p-select-wrapper-dropdown,prefixed-p-switch,prefixed-p-table,prefixed-p-table-head-cell,prefixed-p-tabs,prefixed-p-tabs-bar,prefixed-p-text-field-wrapper,prefixed-p-toast,prefixed-p-toast-item,[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex]:not([tabindex="-1"]'
    );
  });
});

describe('getScrollTopOnTouch()', () => {
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

describe('warnIfAriaAndHeadingPropsAreUndefined()', () => {
  it('should print warning when aria and heading props are undefined', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const host = document.createElement('p-modal');

    warnIfAriaAndHeadingPropsAreUndefined(host, 'Heading', undefined);
    warnIfAriaAndHeadingPropsAreUndefined(host, undefined, "{'aria-label': 'OtherHeading'}");
    warnIfAriaAndHeadingPropsAreUndefined(host, 'Heading', "{'aria-label': 'OtherHeading'}");

    expect(spy).toBeCalledTimes(0);

    warnIfAriaAndHeadingPropsAreUndefined(host, undefined, undefined);
    warnIfAriaAndHeadingPropsAreUndefined(host, null, null);

    expect(spy).toBeCalledTimes(2);
  });
});

describe('hasSlottedHeading()', () => {
  it('should return true with slotted heading', () => {
    const host = document.createElement('p-modal');
    const header = document.createElement('header');
    header.slot = 'heading';
    host.appendChild(header);

    expect(hasSlottedHeading(host)).toBe(true);
  });

  it('should return false without heading', () => {
    const host = document.createElement('p-modal');
    expect(hasSlottedHeading(host)).toBe(false);
  });
});
