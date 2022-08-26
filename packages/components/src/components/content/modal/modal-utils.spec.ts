import * as modalUtils from './modal-utils';
import {
  documentKeydownListener,
  FirstAndLastFocusableElement,
  FOCUSABLE_ELEMENT_CACHE,
  getFirstAndLastFocusableElement,
  KEYDOWN_EVENT_HANDLER_CACHE,
  setFirstAndLastFocusableElementKeydownListener,
  setScrollLock,
  warnIfAriaAndHeadingPropsAreUndefined,
} from './modal-utils';

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

    expect(spy).toBeCalledWith(host, closeBtn);
  });

  it('should call setFirstAndLastFocusableElementKeydownListener()', () => {
    const focusableElements: FirstAndLastFocusableElement = [
      document.createElement('button'),
      document.createElement('button'),
    ];
    jest.spyOn(modalUtils, 'getFirstAndLastFocusableElement').mockImplementationOnce(() => focusableElements);

    const spy = jest.spyOn(modalUtils, 'setFirstAndLastFocusableElementKeydownListener');
    setScrollLock(host, true, closeBtn, closeModal);

    expect(spy).toBeCalledWith(focusableElements);
  });

  describe('add event handlers', () => {
    it('should add keydown event handler', () => {
      const documentSpy = jest.spyOn(document, 'addEventListener');
      setScrollLock(host, true, closeBtn, closeModal);

      expect(documentSpy).toBeCalledWith('keydown', documentKeydownListener);
    });
  });

  describe('remove event handlers', () => {
    it('should remove keydown event handler', () => {
      setScrollLock(host, true, closeBtn, closeModal);
      const documentAddSpy = jest.spyOn(document, 'addEventListener');
      const documentRemoveSpy = jest.spyOn(document, 'removeEventListener');
      setScrollLock(host, false, closeBtn, closeModal);

      expect(documentRemoveSpy).toBeCalledWith('keydown', documentKeydownListener);
      expect(documentAddSpy).not.toBeCalled();
    });
  });

  describe('documentKeydownListener', () => {
    it('should call closeModal() via Escape key if it exists', () => {
      const closeModalMock = jest.fn();
      setScrollLock(host, true, closeBtn, closeModalMock);

      documentKeydownListener(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(closeModalMock).toBeCalledWith();
    });

    it('should call preventDefault() via Tab when no focusableElements exist', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      const spy = jest.spyOn(event, 'preventDefault');
      setScrollLock(host, true);

      documentKeydownListener(event);
      expect(spy).toBeCalledTimes(1);
    });

    it('should not call preventDefault() via Tab when focusableElements exist', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      const spy = jest.spyOn(event, 'preventDefault');
      setScrollLock(host, true, closeBtn);

      documentKeydownListener(event);
      expect(spy).not.toBeCalled();
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

describe('warnIfAriaAndHeadingPropsAreUndefined()', () => {
  it('should print warning when aria and heading props are undefined', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const host = document.createElement('p-modal');

    warnIfAriaAndHeadingPropsAreUndefined(host, 'Heading', undefined);
    warnIfAriaAndHeadingPropsAreUndefined(host, undefined, "{'aria-label': 'OtherHeading'}");
    warnIfAriaAndHeadingPropsAreUndefined(host, 'Heading', "{'aria-label': 'OtherHeading'}");

    expect(spy).not.toBeCalled();

    warnIfAriaAndHeadingPropsAreUndefined(host, undefined, undefined);
    warnIfAriaAndHeadingPropsAreUndefined(host, null, null);

    expect(spy).toBeCalledTimes(2);
  });
});
