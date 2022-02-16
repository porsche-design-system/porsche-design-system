import * as modalUtils from './modal-utils';
import {
  documentKeydownListener,
  documentTouchListener,
  FirstAndLastFocusableElement,
  FOCUSABLE_ELEMENT_CACHE,
  getFirstAndLastFocusableElement,
  getScrollTopOnTouch,
  hostTouchListener,
  isFocusableElement,
  KEYDOWN_EVENT_HANDLER_CACHE,
  setFirstAndLastFocusableElementKeydownListener,
  setScrollLock,
  unpackChildren,
  warnIfAriaAndHeadingPropsAreUndefined,
} from './modal-utils';
import * as deviceDetectionUtils from '../../../utils/device-detection';

describe('unpackChildren()', () => {
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement('div');
  });

  describe('in light dom', () => {
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
      expect(unpackChildren(container)).toEqual([
        child1,
        nestedChild1,
        nestedNestedChild1,
        child2,
        nestedChild2,
        child3,
      ]);
    });
  });

  describe('in shadow dom', () => {
    it('should return array with single shadowed child', () => {
      const host = document.createElement('div');
      host.attachShadow({ mode: 'open' });
      const child = document.createElement('input');
      host.shadowRoot.append(child);

      container.append(host);
      expect(unpackChildren(container)).toEqual([host, child]);
    });

    it('should return array with multiple shadowed children', () => {
      const host = document.createElement('div');
      host.attachShadow({ mode: 'open' });
      const child1 = document.createElement('input');
      const child2 = document.createElement('div');
      host.shadowRoot.append(child1, child2);

      container.append(host);
      expect(unpackChildren(container)).toEqual([host, child1, child2]);
    });

    it('should return array with multiple nested shadowed children', () => {
      const host = document.createElement('div');
      host.attachShadow({ mode: 'open' });
      const child = document.createElement('h1');
      const childNested1 = document.createElement('span');
      const childNested2 = document.createElement('p');
      child.append(childNested1, childNested2);
      host.shadowRoot.append(child);

      container.append(host);
      expect(unpackChildren(container)).toEqual([host, child, childNested1, childNested2]);
    });

    it('should return array with multiple children of nested shadowRoots', () => {
      const host = document.createElement('div');
      host.attachShadow({ mode: 'open' });
      const child = document.createElement('h1');
      host.append(child);
      const childHost = document.createElement('div');
      childHost.attachShadow({ mode: 'open' });
      const childNested1 = document.createElement('span');
      const childNested2 = document.createElement('p');
      childHost.shadowRoot.append(childNested1, childNested2);
      host.shadowRoot.append(childHost);

      container.append(host);
      expect(unpackChildren(container)).toEqual([host, childHost, childNested1, childNested2, child]);
    });
  });
});

describe('isFocusableElement()', () => {
  type CreateElementOptions = {
    disabled?: boolean;
    tabIndex?: number;
    type?: string;
    href?: string;
  };
  const createElement = <K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    opts: CreateElementOptions = {}
  ): HTMLElementTagNameMap[K] => {
    const el = document.createElement(tagName);
    Object.entries(opts).forEach(([prop, value]) => {
      el[prop] = value;
    });
    return el;
  };

  describe('input', () => {
    it.each<[keyof HTMLElementTagNameMap, CreateElementOptions, boolean]>([
      ['input', { type: 'text' }, true],
      ['input', { type: 'number' }, true],
      ['input', { type: 'email' }, true],
      ['input', { type: 'tel' }, true],
      ['input', { type: 'search' }, true],
      ['input', { type: 'url' }, true],
      ['input', { type: 'date' }, true],
      ['input', { type: 'time' }, true],
      ['input', { type: 'month' }, true],
      ['input', { type: 'week' }, true],
      ['input', { type: 'password' }, true],
      ['input', { type: 'text', tabIndex: 1 }, true],
      ['input', { type: 'text', tabIndex: 0 }, true],
      ['input', { type: 'text', tabIndex: -1 }, false],
      ['input', { type: 'text', tabIndex: -5 }, false],
      ['input', { type: 'text', disabled: true }, false],
      ['input', { type: 'text', disabled: true, tabIndex: 1 }, false],
      ['input', { type: 'hidden' }, false],
      ['input', { type: 'hidden', tabIndex: 1 }, false],
      ['textarea', undefined, true],
      ['textarea', { tabIndex: 0 }, true],
      ['textarea', { tabIndex: 1 }, true],
      ['textarea', { tabIndex: -1 }, false],
      ['textarea', { tabIndex: -5 }, false],
      ['textarea', { disabled: true }, false],
      ['textarea', { disabled: true, tabIndex: 1 }, false],
      ['select', undefined, true],
      ['select', { tabIndex: 0 }, true],
      ['select', { tabIndex: 1 }, true],
      ['select', { tabIndex: -1 }, false],
      ['select', { tabIndex: -5 }, false],
      ['select', { disabled: true }, false],
      ['select', { disabled: true, tabIndex: 1 }, false],
      ['button', undefined, true],
      ['button', { tabIndex: 0 }, true],
      ['button', { tabIndex: 1 }, true],
      ['button', { tabIndex: -1 }, false],
      ['button', { tabIndex: -5 }, false],
      ['button', { disabled: true }, false],
      ['button', { disabled: true, tabIndex: 1 }, false],
      ['a', undefined, false],
      ['a', { tabIndex: 0 }, false],
      ['a', { tabIndex: 1 }, false],
      ['a', { tabIndex: -1 }, false],
      ['a', { tabIndex: -5 }, false],
      ['a', { disabled: true }, false],
      ['a', { disabled: true, tabIndex: 1 }, false],
      ['a', { href: '#' }, true],
      ['a', { href: '#', tabIndex: 0 }, true],
      ['a', { href: '#', tabIndex: 1 }, true],
      ['a', { href: '#', tabIndex: -1 }, false],
      ['a', { href: '#', tabIndex: -5 }, false],
      ['a', { href: '#', disabled: true }, false],
      ['a', { href: '#', disabled: true, tabIndex: 1 }, false],
    ])('should for tagName: %s and properties: %o return: %s', (tagName, opts, result) => {
      const el = createElement(tagName, opts);
      expect(isFocusableElement(el as HTMLInputElement)).toBe(result);
    });
  });
});

describe('getFirstAndLastFocusableElement()', () => {
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement('div');
  });

  describe('with closeButton', () => {
    const closeButton = document.createElement('button');
    closeButton.id = 'btn-close';

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

      expect(getFirstAndLastFocusableElement(container, closeButton)).toEqual([closeButton, input2]);
    });

    it('should return correct elements from within shadow dom', () => {
      const input = document.createElement('input');
      input.type = 'text';
      const host = document.createElement('div');
      host.attachShadow({ mode: 'open' });
      host.shadowRoot.append(input);

      container.append(host);

      expect(getFirstAndLastFocusableElement(container, closeButton)).toEqual([closeButton, input]);
    });

    it('should return correct elements with no children', () => {
      expect(getFirstAndLastFocusableElement(container, closeButton)).toEqual([closeButton, closeButton]);
    });
  });

  describe('without closeButton', () => {
    const closeButton = undefined;

    it('should return correct elements for single child', () => {
      const input = document.createElement('input');
      input.type = 'text';
      container.append(input);

      expect(getFirstAndLastFocusableElement(container, closeButton)).toEqual([input, input]);
    });

    it('should return correct elements for multiple children', () => {
      const input1 = document.createElement('input');
      input1.type = 'text';
      const input2 = document.createElement('input');
      input2.type = 'number';
      container.append(input1, input2);

      expect(getFirstAndLastFocusableElement(container, closeButton)).toEqual([input1, input2]);
    });

    it('should return correct elements from within shadow dom', () => {
      const input = document.createElement('input');
      input.type = 'text';
      const host = document.createElement('div');
      host.attachShadow({ mode: 'open' });
      host.shadowRoot.append(input);

      container.append(host);

      expect(getFirstAndLastFocusableElement(container, closeButton)).toEqual([input, input]);
    });

    it('should return correct elements with no children', () => {
      expect(getFirstAndLastFocusableElement(container, closeButton)).toEqual([undefined, undefined]);
    });
  });
});

describe('setScrollLock()', () => {
  const closeModal = () => {};
  const host = document.createElement('div');
  const closeBtn = document.createElement('button');
  closeBtn.id = 'btn-close';

  it('should add body style overflow: hidden', () => {
    setScrollLock(host, true, closeBtn, closeModal);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should remove body style overflow: hidden', () => {
    setScrollLock(host, true, closeBtn, closeModal);
    setScrollLock(host, false, closeBtn, closeModal);

    expect(document.body.style.overflow).toBe('');
  });

  it('should call getFirstAndLastFocusableElement() if open = true', () => {
    const spy = jest.spyOn(modalUtils, 'getFirstAndLastFocusableElement');
    setScrollLock(host, true, closeBtn, closeModal);

    expect(spy).toHaveBeenCalledWith(host, closeBtn);
  });

  it('should call setFirstAndLastFocusableElementKeydownListener()', () => {
    const focusableElements: FirstAndLastFocusableElement = [
      document.createElement('button'),
      document.createElement('button'),
    ];
    jest.spyOn(modalUtils, 'getFirstAndLastFocusableElement').mockImplementationOnce(() => focusableElements);

    const spy = jest.spyOn(modalUtils, 'setFirstAndLastFocusableElementKeydownListener');
    setScrollLock(host, true, closeBtn, closeModal);

    expect(spy).toHaveBeenCalledWith(focusableElements);
  });

  describe('add event handlers', () => {
    it('should add keydown event handler', () => {
      const documentSpy = jest.spyOn(document, 'addEventListener');
      setScrollLock(host, true, closeBtn, closeModal);

      expect(documentSpy).toBeCalledWith('keydown', documentKeydownListener);
    });

    it('should add touchmove event handlers for iOS', () => {
      jest.spyOn(deviceDetectionUtils, 'isIos').mockImplementation(() => true);
      const documentSpy = jest.spyOn(document, 'addEventListener');
      const hostSpy = jest.spyOn(host, 'addEventListener');

      setScrollLock(host, true, closeBtn, closeModal);
      expect(documentSpy).toBeCalledWith('touchmove', documentTouchListener, false);
      expect(hostSpy).toBeCalledWith('touchmove', hostTouchListener);
    });

    it('should not add touchmove event handlers if not iOS', () => {
      jest.spyOn(deviceDetectionUtils, 'isIos').mockImplementation(() => false);
      const documentSpy = jest.spyOn(document, 'addEventListener');
      const hostSpy = jest.spyOn(host, 'addEventListener');
      setScrollLock(host, true, closeBtn, closeModal);

      expect(documentSpy).toBeCalledWith('keydown', documentKeydownListener);
      expect(hostSpy).toBeCalledTimes(0);
    });
  });

  describe('remove event handlers', () => {
    it('should remove keydown event handler', () => {
      setScrollLock(host, true, closeBtn, closeModal);
      const documentAddSpy = jest.spyOn(document, 'addEventListener');
      const documentRemoveSpy = jest.spyOn(document, 'removeEventListener');
      setScrollLock(host, false, closeBtn, closeModal);

      expect(documentRemoveSpy).toBeCalledWith('keydown', documentKeydownListener);
      expect(documentAddSpy).not.toHaveBeenCalled();
    });

    it('should remove touchmove event handlers', () => {
      jest.spyOn(deviceDetectionUtils, 'isIos').mockImplementation(() => true);
      const documentSpy = jest.spyOn(document, 'removeEventListener');
      const hostSpy = jest.spyOn(host, 'removeEventListener');
      setScrollLock(host, true, closeBtn, closeModal);
      setScrollLock(host, false, closeBtn, closeModal);

      expect(documentSpy).toBeCalledWith('touchmove', documentTouchListener, false);
      expect(hostSpy).toBeCalledWith('touchmove', hostTouchListener);
    });
  });

  describe('documentKeydownListener', () => {
    it('should call closeModal() via Esc and Escape key if it exists', () => {
      const closeModalMock = jest.fn();
      setScrollLock(host, true, closeBtn, closeModalMock);

      documentKeydownListener(new KeyboardEvent('keydown', { key: 'Esc' }));
      expect(closeModalMock).toHaveBeenCalledWith();
      documentKeydownListener(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(closeModalMock).toHaveBeenCalledTimes(2);
    });

    it('should call preventDefault() via Tab when no focusableElements exist', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      const spy = jest.spyOn(event, 'preventDefault');
      setScrollLock(host, true);

      documentKeydownListener(event);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not call preventDefault() via Tab when focusableElements exist', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      const spy = jest.spyOn(event, 'preventDefault');
      setScrollLock(host, true, closeBtn);

      documentKeydownListener(event);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});

describe('setFirstAndLastFocusableElementKeydownListener()', () => {
  const el1 = document.createElement('button');
  const el2 = document.createElement('button');
  const focusableElements: FirstAndLastFocusableElement = [el1, el2];

  const otherElements: FirstAndLastFocusableElement = [document.createElement('a'), document.createElement('input')];

  beforeEach(() => {
    FOCUSABLE_ELEMENT_CACHE.length = 0;
    KEYDOWN_EVENT_HANDLER_CACHE.length = 0;
  });

  it('should add new handlers on elements and cache them', () => {
    expect(FOCUSABLE_ELEMENT_CACHE.length).toBe(0);
    expect(KEYDOWN_EVENT_HANDLER_CACHE.length).toBe(0);
    const el1Spy = jest.spyOn(el1, 'addEventListener');
    const el2Spy = jest.spyOn(el2, 'addEventListener');

    setFirstAndLastFocusableElementKeydownListener(focusableElements);

    const [handler1, handler2] = KEYDOWN_EVENT_HANDLER_CACHE;
    expect(el1Spy).toHaveBeenCalledWith('keydown', handler1);
    expect(el2Spy).toHaveBeenCalledWith('keydown', handler2);
    expect(FOCUSABLE_ELEMENT_CACHE).toEqual(focusableElements);
  });

  it('should not add new handlers if there are no focusableElements', () => {
    setFirstAndLastFocusableElementKeydownListener([] as any);
    setFirstAndLastFocusableElementKeydownListener(null);
    setFirstAndLastFocusableElementKeydownListener([undefined, undefined]);

    expect(KEYDOWN_EVENT_HANDLER_CACHE.length).toBe(0);
  });

  it('should remove previous handlers from elements and cache if there are any', () => {
    expect(KEYDOWN_EVENT_HANDLER_CACHE.length).toBe(0);
    setFirstAndLastFocusableElementKeydownListener(focusableElements);
    expect(KEYDOWN_EVENT_HANDLER_CACHE.length).toBe(2);

    const el1Spy = jest.spyOn(el1, 'removeEventListener');
    const el2Spy = jest.spyOn(el2, 'removeEventListener');
    const [handler1, handler2] = KEYDOWN_EVENT_HANDLER_CACHE;
    setFirstAndLastFocusableElementKeydownListener(otherElements);

    expect(el1Spy).toHaveBeenCalledWith('keydown', handler1);
    expect(el2Spy).toHaveBeenCalledWith('keydown', handler2);
    expect(KEYDOWN_EVENT_HANDLER_CACHE).not.toEqual([handler1, handler2]);
    expect(KEYDOWN_EVENT_HANDLER_CACHE.length).toBe(2);
  });

  describe('handlers', () => {
    it('should have only 2 handlers cached', () => {
      expect(FOCUSABLE_ELEMENT_CACHE.length).toBe(0);
      setFirstAndLastFocusableElementKeydownListener(focusableElements);

      expect(FOCUSABLE_ELEMENT_CACHE.length).toBe(2);
      const [handler1, handler2] = KEYDOWN_EVENT_HANDLER_CACHE;

      expect(KEYDOWN_EVENT_HANDLER_CACHE.length).toBe(2);
      expect(typeof handler1).toBe('function');
      expect(typeof handler2).toBe('function');

      setFirstAndLastFocusableElementKeydownListener(otherElements);
      expect(KEYDOWN_EVENT_HANDLER_CACHE.length).toBe(2);
      expect(KEYDOWN_EVENT_HANDLER_CACHE).toEqual([expect.anything(), expect.anything()]);
    });

    it('should call focus() on 2nd element when 1st handler is invoked with Tab and Shift', () => {
      setFirstAndLastFocusableElementKeydownListener(focusableElements);
      const el2Spy = jest.spyOn(el2, 'focus');
      const [handler1] = KEYDOWN_EVENT_HANDLER_CACHE;

      handler1(new KeyboardEvent('keydown', { key: 'Tab' }));
      expect(el2Spy).not.toHaveBeenCalled();

      handler1(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
      expect(el2Spy).toHaveBeenCalledWith();
    });

    it('should call focus() on 1st element when 2nd handler is invoked with Tab', () => {
      setFirstAndLastFocusableElementKeydownListener(focusableElements);
      const el1Spy = jest.spyOn(el1, 'focus');
      const [, handler2] = KEYDOWN_EVENT_HANDLER_CACHE;

      handler2(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
      expect(el1Spy).not.toHaveBeenCalled();

      handler2(new KeyboardEvent('keydown', { key: 'Tab' }));
      expect(el1Spy).toHaveBeenCalledWith();
    });
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
