import {
  getHTMLElementAndThrowIfUndefined,
  getTagName,
  hasNamedSlot,
  isRequired,
  throwIfParentIsNotOfKind,
  addEventListener,
  removeEventListener,
} from '../../../src/utils';
import { expectFiles } from '@stencil/core/testing/testing-utils';

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
      expect(spy1).toBeCalledWith('change', expect.any(Function), false);
    });
  });

  describe('removeEventListener', () => {
    it('should call removeEventListener', () => {
      const element = document.createElement('div');
      const spy1 = jest.spyOn(element, 'removeEventListener');

      addEventListener(element, 'change', listener, false);
      removeEventListener(element, 'change', listener, false);

      expect(spy1).toBeCalledTimes(1);
      expect(spy1).toBeCalledWith('change', expect.any(Function), false);
    });
  });
});
