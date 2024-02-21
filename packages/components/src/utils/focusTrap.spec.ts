import {
  FirstAndLastFocusableElement,
  FOCUSABLE_ELEMENT_CACHE,
  getFirstAndLastFocusableElement,
  isFocusableElement,
  KEYDOWN_EVENT_HANDLER_CACHE,
  setFirstAndLastFocusableElementKeydownListener,
  unpackChildren,
  setFocusTrap,
  documentKeydownListener,
} from './focusTrap';
import * as focusTrapUtils from './focusTrap';

describe('setFocusTrap()', () => {
  const closeFn = () => {};
  const host = document.createElement('div');
  const firstElementChild = host.firstElementChild as HTMLElement;
  host.attachShadow({ mode: 'open' });
  const closeBtn = document.createElement('button');
  closeBtn.id = 'btn-close';

  it('should call getFirstAndLastFocusableElement() if open = true', () => {
    const spy = jest.spyOn(focusTrapUtils, 'getFirstAndLastFocusableElement');
    setFocusTrap(host, true, firstElementChild, closeBtn, closeFn);

    expect(spy).toBeCalledWith(host, closeBtn);
  });

  it('should call setFirstAndLastFocusableElementKeydownListener()', () => {
    const focusableElements: FirstAndLastFocusableElement = [
      document.createElement('button'),
      document.createElement('button'),
    ];
    jest.spyOn(focusTrapUtils, 'getFirstAndLastFocusableElement').mockImplementationOnce(() => focusableElements);

    const spy = jest.spyOn(focusTrapUtils, 'setFirstAndLastFocusableElementKeydownListener');
    setFocusTrap(host, true, firstElementChild, closeBtn, closeFn);

    expect(spy).toBeCalledWith(focusableElements);
  });

  describe('add event handlers', () => {
    it('should add keydown event handler', () => {
      const documentSpy = jest.spyOn(document, 'addEventListener');
      setFocusTrap(host, true, firstElementChild, closeBtn, closeFn);

      expect(documentSpy).toBeCalledWith('keydown', documentKeydownListener);
    });
  });

  describe('remove event handlers', () => {
    it('should remove keydown event handler', () => {
      setFocusTrap(host, true, firstElementChild, closeBtn, closeFn);
      const documentAddSpy = jest.spyOn(document, 'addEventListener');
      const documentRemoveSpy = jest.spyOn(document, 'removeEventListener');
      setFocusTrap(host, false, firstElementChild, closeBtn, closeFn);

      expect(documentRemoveSpy).toBeCalledWith('keydown', documentKeydownListener);
      expect(documentAddSpy).not.toBeCalled();
    });
  });

  describe('documentKeydownListener', () => {
    it('should call closeFn() via Escape key if it exists', () => {
      const closeModalMock = jest.fn();
      setFocusTrap(host, true, firstElementChild, closeBtn, closeModalMock);

      documentKeydownListener(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(closeModalMock).toBeCalledWith();
    });

    it('should call preventDefault() via Tab when no focusableElements exist', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      const spy = jest.spyOn(event, 'preventDefault');
      setFocusTrap(host, true, firstElementChild);

      documentKeydownListener(event);
      expect(spy).toBeCalledTimes(1);
    });

    it('should not call preventDefault() via Tab when focusableElements exist', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      const spy = jest.spyOn(event, 'preventDefault');
      setFocusTrap(host, true, firstElementChild, closeBtn);

      documentKeydownListener(event);
      expect(spy).not.toBeCalled();
    });
  });
});

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
    expect(el1Spy).toBeCalledWith('keydown', handler1);
    expect(el2Spy).toBeCalledWith('keydown', handler2);
    expect(FOCUSABLE_ELEMENT_CACHE).toEqual(focusableElements);
  });

  it('should not add new handlers if there are no focusableElements', () => {
    setFirstAndLastFocusableElementKeydownListener([] as any);
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

    expect(el1Spy).toBeCalledWith('keydown', handler1);
    expect(el2Spy).toBeCalledWith('keydown', handler2);
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
      expect(el2Spy).not.toBeCalled();

      handler1(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
      expect(el2Spy).toBeCalledWith();
    });

    it('should call focus() on 1st element when 2nd handler is invoked with Tab', () => {
      setFirstAndLastFocusableElementKeydownListener(focusableElements);
      const el1Spy = jest.spyOn(el1, 'focus');
      const [, handler2] = KEYDOWN_EVENT_HANDLER_CACHE;

      handler2(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
      expect(el1Spy).not.toBeCalled();

      handler2(new KeyboardEvent('keydown', { key: 'Tab' }));
      expect(el1Spy).toBeCalledWith();
    });
  });
});
