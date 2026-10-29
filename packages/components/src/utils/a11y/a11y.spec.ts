import { vi } from 'vitest';
import type { AriaAttributes } from '../../types';
import * as jsonUtils from '../json';
import { parseAndGetAriaAttributes, setAriaAttributes, setAriaIDREF, syncAriaElements } from './a11y';

describe('setAriaAttributes()', () => {
  let node: HTMLElement;
  const label = 'Some label';
  const message = 'Some message';

  beforeEach(() => {
    node = document.createElement('div');
  });

  it('should set aria-label when only label is provided', () => {
    setAriaAttributes(node, { label });

    expect(node.getAttribute('aria-label')).toBe(label);
  });

  it('should set aria-label with message appended when both label and message are provided', () => {
    setAriaAttributes(node, { label, message });

    expect(node.getAttribute('aria-label')).toBe(`${label}. ${message}`);
  });

  it('should not set aria-label when only message is provided', () => {
    setAriaAttributes(node, { message });

    expect(node.hasAttribute('aria-label')).toBe(false);
  });

  it('should not set aria-label when neither label nor message is provided', () => {
    setAriaAttributes(node, {});

    expect(node.hasAttribute('aria-label')).toBe(false);
  });

  it('should set aria-invalid to true when state is error', () => {
    setAriaAttributes(node, { state: 'error' });

    expect(node.getAttribute('aria-invalid')).toBe('true');
  });

  it('should remove aria-invalid when state is success', () => {
    node.setAttribute('aria-invalid', 'true');

    setAriaAttributes(node, { state: 'success' });

    expect(node.hasAttribute('aria-invalid')).toBe(false);
  });

  it('should remove aria-invalid when state is none', () => {
    node.setAttribute('aria-invalid', 'true');

    setAriaAttributes(node, { state: 'none' });

    expect(node.hasAttribute('aria-invalid')).toBe(false);
  });

  it('should remove aria-invalid when no state is provided', () => {
    node.setAttribute('aria-invalid', 'true');

    setAriaAttributes(node, { label });

    expect(node.hasAttribute('aria-invalid')).toBe(false);
  });

  it('should set both aria-label and aria-invalid when label is provided with error state', () => {
    setAriaAttributes(node, { label, message, state: 'error' });

    expect(node.getAttribute('aria-label')).toBe(`${label}. ${message}`);
    expect(node.getAttribute('aria-invalid')).toBe('true');
  });
});

describe('parseAndGetAriaAttributes()', () => {
  it('should call parseJSONAttribute()', () => {
    const spy = vi.spyOn(jsonUtils, 'parseJSONAttribute');
    // prettier-ignore
    const rawAttributes = "{ 'aria-label': 'Some label' }";

    parseAndGetAriaAttributes(rawAttributes);
    expect(spy).toHaveBeenCalledWith(rawAttributes);
  });

  it.each<AriaAttributes | string>([
    { 'aria-label': 'Some label', 'aria-pressed': true },
    { 'aria-label': 'Some label', 'aria-pressed': 'true' },
    // prettier-ignore
    "{'aria-label': 'Some label', 'aria-pressed': true}",
    // prettier-ignore
    "{'aria-label': 'Some label', 'aria-pressed': 'true'}",
  ])('should return correct aria attributes with boolean converted to string for %o', (rawAttributes) => {
    expect(parseAndGetAriaAttributes(rawAttributes)).toEqual({
      'aria-label': 'Some label',
      'aria-pressed': 'true',
    });
  });

  it.each<string>([undefined, ''])('should return undefined for %o', (rawAttributes) => {
    expect(parseAndGetAriaAttributes(rawAttributes)).toEqual(undefined);
  });

  it('should keep string IDREFs and convert an element, an element list and null to null in the attribute map', () => {
    const list = document.createElement('ul');
    const option = document.createElement('li');

    expect(
      parseAndGetAriaAttributes({
        'aria-controls': 'results',
        'aria-activedescendant': 'opt',
      })
    ).toEqual({
      'aria-controls': 'results',
      'aria-activedescendant': 'opt',
    });

    expect(
      parseAndGetAriaAttributes({
        'aria-controls': list,
        'aria-activedescendant': option,
      })
    ).toEqual({
      'aria-controls': null,
      'aria-activedescendant': null,
    });

    expect(
      parseAndGetAriaAttributes({
        'aria-controls': [list, option],
        'aria-activedescendant': null,
      })
    ).toEqual({
      'aria-controls': null,
      'aria-activedescendant': null,
    });
  });
});

describe('syncAriaElements()', () => {
  const reflected = (el: Element) =>
    el as Element & {
      ariaControlsElements: readonly Element[] | null;
      ariaActiveDescendantElement: Element | null;
    };

  it('should set ariaControlsElements from one element and from a list', () => {
    const el = document.createElement('button');
    const list = document.createElement('ul');
    const other = document.createElement('div');

    syncAriaElements(el, { 'aria-controls': list, 'aria-activedescendant': other });
    expect([...(reflected(el).ariaControlsElements ?? [])]).toEqual([list]);
    expect(reflected(el).ariaActiveDescendantElement).toBe(other);

    syncAriaElements(el, { 'aria-controls': [list, other] });
    expect([...(reflected(el).ariaControlsElements ?? [])]).toEqual([list, other]);
  });

  it('should not reassign ariaControlsElements or ariaActiveDescendantElement when the elements have not changed', () => {
    const el = document.createElement('input');
    const list = document.createElement('ul');
    const option = document.createElement('li');

    syncAriaElements(el, { 'aria-controls': [list], 'aria-activedescendant': option });
    const initialControlsRef = reflected(el).ariaControlsElements;

    const activeSetter = vi.fn();
    let currentActive: Element | null = option;
    Object.defineProperty(el, 'ariaActiveDescendantElement', {
      configurable: true,
      get: () => currentActive,
      set: (val: Element | null) => {
        activeSetter(val);
        currentActive = val;
      },
    });

    syncAriaElements(el, { 'aria-controls': [list], 'aria-activedescendant': option });

    expect(reflected(el).ariaControlsElements).toBe(initialControlsRef);
    expect(activeSetter).not.toHaveBeenCalled();
  });

  it('should clear element reflection when the values are null, omitted or undefined, and not overwrite string IDREFs with null', () => {
    const el = document.createElement('input');
    const list = document.createElement('ul');
    syncAriaElements(el, { 'aria-controls': list, 'aria-activedescendant': list });
    syncAriaElements(el, { 'aria-controls': null, 'aria-activedescendant': null });
    expect(reflected(el).ariaControlsElements).toBeNull();
    expect(reflected(el).ariaActiveDescendantElement).toBeNull();

    syncAriaElements(el, { 'aria-controls': list, 'aria-activedescendant': list });
    syncAriaElements(el, { role: 'combobox' });
    expect(reflected(el).ariaControlsElements).toBeNull();
    expect(reflected(el).ariaActiveDescendantElement).toBeNull();

    syncAriaElements(el, { 'aria-controls': list, 'aria-activedescendant': list });
    syncAriaElements(el, undefined);
    expect(reflected(el).ariaControlsElements).toBeNull();
    expect(reflected(el).ariaActiveDescendantElement).toBeNull();

    // Setting ariaControlsElements/ariaActiveDescendantElement to null in a real browser removes the content attribute,
    // so string IDREFs must not assign null to the element reflection properties.
    const controlsSetter = vi.fn();
    Object.defineProperty(el, 'ariaControlsElements', {
      configurable: true,
      get: () => [],
      set: controlsSetter,
    });
    syncAriaElements(el, { 'aria-controls': 'results', 'aria-activedescendant': 'opt' });
    expect(controlsSetter).not.toHaveBeenCalled();
  });

  it('should leave element reflection untouched when aria was never set', () => {
    const el = document.createElement('input');
    const list = document.createElement('ul');
    reflected(el).ariaControlsElements = [list];
    reflected(el).ariaActiveDescendantElement = list;

    syncAriaElements(el, undefined);

    expect([...(reflected(el).ariaControlsElements ?? [])]).toEqual([list]);
    expect(reflected(el).ariaActiveDescendantElement).toBe(list);
  });
});

describe('setAriaIDREF()', () => {
  it('should return space-separated IDs when all are truthy', () => {
    expect(setAriaIDREF('loading-id', 'description-id', 'message-id')).toBe('loading-id description-id message-id');
  });

  it('should skip falsy entries and return remaining IDs', () => {
    expect(setAriaIDREF(false, 'description-id', undefined, 'message-id', null)).toBe('description-id message-id');
  });

  it('should return a single ID when only one is truthy', () => {
    expect(setAriaIDREF(false, 'message-id', undefined)).toBe('message-id');
  });

  it('should return null when all entries are falsy', () => {
    expect(setAriaIDREF(false, undefined, null, '')).toBeNull();
  });

  it('should return null when called with no arguments', () => {
    expect(setAriaIDREF()).toBeNull();
  });
});
