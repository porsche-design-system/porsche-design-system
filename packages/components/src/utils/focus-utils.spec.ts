import { hasFocusableElements, isFocusableElement, unpackChildren } from './focus-utils';
import * as focusUtils from './focus-utils';

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
      ['span', { tabIndex: 0 }, true],
      ['span', { tabIndex: 1 }, true],
      ['span', { tabIndex: -1 }, false],
    ])('should for tagName: %s and properties: %o return: %s', (tagName, opts, result) => {
      const el = createElement(tagName, opts);
      expect(isFocusableElement(el as HTMLInputElement)).toBe(result);
    });
  });
});

describe('hasFocusableElements()', () => {
  const host = document.createElement('div');

  it('should call unpackChildren() with correct parameters', () => {
    const spy = jest.spyOn(focusUtils, 'unpackChildren');

    hasFocusableElements(host);

    expect(spy).toBeCalledWith(host);
  });

  it('should call some() with correct parameters', () => {
    const spy = jest.spyOn(Array.prototype, 'some');
    hasFocusableElements(host);

    expect(spy).toBeCalledWith(isFocusableElement);
  });

  it('should call isFocusableElement() with correct parameters', () => {
    const div = document.createElement('div');
    const unpackChildrenMockReturn = [div];
    jest.spyOn(focusUtils, 'unpackChildren').mockReturnValue(unpackChildrenMockReturn);
    const spy = jest.spyOn(focusUtils, 'isFocusableElement');

    hasFocusableElements(host);

    expect(spy).toBeCalledWith(div, 0, unpackChildrenMockReturn);
  });

  it('should return true if some() returns true', () => {
    jest.spyOn(Array.prototype, 'some').mockReturnValue(true);

    expect(hasFocusableElements(host)).toBe(true);
  });
  it('should return false if some() returns false', () => {
    jest.spyOn(Array.prototype, 'some').mockReturnValue(false);

    expect(hasFocusableElements(host)).toBe(false);
  });
});
