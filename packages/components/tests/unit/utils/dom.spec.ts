import {
  getHTMLElementAndThrowIfUndefined,
  getTagName,
  hasNamedSlot,
  isRequired,
  throwIfParentIsNotOfKind,
  addEventListener,
  removeEventListener,
  getAttribute,
  setAttribute,
  removeAttribute,
  isLabelVisible,
  isMessageVisible,
  isDescriptionVisible,
} from '../../../src/utils';
import type { FormState } from '../../../src/types';

describe('isRequired()', () => {
  it('should return true if required property is true on element', () => {
    const el = document.createElement('input');
    el.required = true;
    expect(isRequired(el)).toBe(true);
  });

  it('should return true if required attribute is empty string on element', () => {
    const el = document.createElement('input');
    el.setAttribute('required', '');
    expect(isRequired(el)).toBe(true);
  });

  it('should return true if required attribute is any string on element', () => {
    const el = document.createElement('input');
    el.setAttribute('required', 'false');
    expect(isRequired(el)).toBe(true);
  });

  it('should return false if required attribute or property is missing on element', () => {
    const el = document.createElement('input');
    expect(isRequired(el)).toBe(false);
  });

  it('should return false if required property is false on element', () => {
    const el = document.createElement('input');
    el.required = false;
    expect(isRequired(el)).toBe(false);
  });
});

describe('hasNamedSlot()', () => {
  it('should return false if element has no slotted child', () => {
    const el = document.createElement('div');
    expect(hasNamedSlot(el, 'title')).toBe(false);
  });

  it('should return false if element has slotted child with wrong name', () => {
    const el = document.createElement('div');
    const slottedChild = document.createElement('span');
    slottedChild.setAttribute('slot', 'label');
    el.appendChild(slottedChild);
    expect(hasNamedSlot(el, 'title')).toBe(false);
  });

  it('should return true if element has slotted child with correct name', () => {
    const el = document.createElement('div');
    const slottedChild = document.createElement('span');
    slottedChild.setAttribute('slot', 'title');
    el.appendChild(slottedChild);
    expect(hasNamedSlot(el, 'title')).toBe(true);
  });
});

describe('getHTMLElementAndThrowIfUndefined()', () => {
  const selector = 'someSelector';

  it('should throw error if selector is not found', () => {
    let error;
    try {
      getHTMLElementAndThrowIfUndefined(document.body, `.${selector}`);
    } catch (e) {
      error = e.message;
    }
    expect(error).toBe(`Child HTMLElement .${selector} is missing.`);
  });

  it('should not throw error if HMTLElement is defined', () => {
    const el = document.createElement('div');
    el.classList.add(selector);
    document.body.append(el);

    let error = undefined;
    try {
      getHTMLElementAndThrowIfUndefined(document.body, `.${selector}`);
    } catch (e) {
      error = e.message;
    }
    expect(error).toBe(undefined);
  });
});

describe('throwIfParentIsNotOfKind()', () => {
  it('should throw error if parent tag does not match', () => {
    const parent = document.createElement('div');
    const child = document.createElement('p-grid-item');
    parent.appendChild(child);

    let error = undefined;
    try {
      throwIfParentIsNotOfKind(child, `pGrid`);
    } catch (e) {
      error = e.message;
    }
    expect(error).not.toBe(undefined);
  });

  it('should not throw error if parent tag does match', () => {
    const parent = document.createElement('p-grid');
    const child = document.createElement('p-grid-item');
    parent.appendChild(child);

    let error = undefined;
    try {
      throwIfParentIsNotOfKind(child, 'pGrid');
    } catch (e) {
      error = e.message;
    }
    expect(error).toBe(undefined);
  });

  it('should not throw error if prefixed parent tag does match', () => {
    const parent = document.createElement('my-prefix-p-grid');
    const child = document.createElement('my-prefix-p-grid-item');
    parent.appendChild(child);

    let error = undefined;
    try {
      throwIfParentIsNotOfKind(child, 'pGrid');
    } catch (e) {
      error = e.message;
    }
    expect(error).toBe(undefined);
  });
});

describe('getTagName()', () => {
  it.each([
    ['div', 'div'],
    ['p-button', 'p-button'],
    ['SPAN', 'span'],
  ])('should be called with %s and return %s', (tag, result) => {
    const el = document.createElement(tag);
    expect(getTagName(el)).toBe(result);
  });
});

describe('Event Listener', () => {
  const listener = () => {};

  describe('addEventListener()', () => {
    it('should call addEventListener', () => {
      const element = document.createElement('div');
      const spy1 = jest.spyOn(element, 'addEventListener');

      addEventListener(element, 'change', listener, false);

      expect(spy1).toBeCalledTimes(1);
      expect(spy1).toBeCalledWith('change', listener, false);
    });
  });

  describe('removeEventListener', () => {
    it('should call removeEventListener', () => {
      const element = document.createElement('div');
      const spy1 = jest.spyOn(element, 'removeEventListener');

      addEventListener(element, 'change', listener, false);
      removeEventListener(element, 'change', listener, false);

      expect(spy1).toBeCalledTimes(1);
      expect(spy1).toBeCalledWith('change', listener, false);
    });
  });
});

describe('getAttribute()', () => {
  it('should return attribute value', () => {
    const element = document.createElement('div');
    element.setAttribute('title', 'Some title');

    expect(getAttribute(element, 'title')).toBe('Some title');
  });
});

describe('setAttribute()', () => {
  it('should set attribute value', () => {
    const element = document.createElement('div');
    setAttribute(element, 'title', 'Some title');

    expect(element.getAttribute('title')).toBe('Some title');
  });
});

describe('removeAttribute()', () => {
  it('should remove attribute', () => {
    const element = document.createElement('div');
    element.setAttribute('title', 'Some Title');

    removeAttribute(element, 'title');
    expect(element.getAttribute('title')).toBe(null);
  });
});

describe('isLabelVisible()', () => {
  it.each<[boolean, boolean, boolean]>([
    [true, false, true],
    [false, true, true],
    [false, false, false],
    [true, true, true],
  ])('should be called with label:%s & slotted:%p and return:%p', (label, slotted, result) => {
    const labelText = label ? 'Some label' : '';
    const el = document.createElement('div');
    el.setAttribute('label', labelText);
    if (slotted) {
      const slot = document.createElement('span');
      slot.slot = 'label';
      el.appendChild(slot);
    }

    expect(isLabelVisible(el, labelText)).toBe(result);
  });
});

describe('isDescriptionVisible()', () => {
  it.each<[boolean, boolean, boolean]>([
    [true, false, true],
    [false, true, true],
    [false, false, false],
    [true, true, true],
  ])('should be called with description:%p, slotted:%p and return:%p', (description, slotted, result) => {
    const descriptionText = description ? 'Some description' : '';
    const el = document.createElement('div');
    el.setAttribute('description', descriptionText);
    if (slotted) {
      const slot = document.createElement('span');
      slot.slot = 'description';
      el.appendChild(slot);
    }

    expect(isDescriptionVisible(el, descriptionText)).toBe(result);
  });
});

describe('isMessageVisible()', () => {
  it.each<[boolean, boolean, FormState, boolean]>([
    [true, false, 'error', true],
    [false, true, 'error', true],
    [false, false, 'error', false],
    [true, false, 'none', false],
    [false, true, 'none', false],
    [true, false, 'success', true],
    [false, true, 'success', true],
    [false, false, 'success', false],
    [true, false, 'none', false],
    [false, true, 'none', false],
  ])('should be called with message:%p, slotted:%p, state:%s and return:%p', (message, slotted, state, result) => {
    const messageText = message ? 'Some Message' : '';
    const el = document.createElement('div');
    el.setAttribute('message', messageText);
    if (slotted) {
      const slot = document.createElement('span');
      slot.slot = 'message';
      el.appendChild(slot);
    }

    expect(isMessageVisible(el, messageText, state)).toBe(result);
  });
});
