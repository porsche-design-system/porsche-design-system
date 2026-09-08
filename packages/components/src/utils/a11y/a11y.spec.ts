import { vi } from 'vitest';
import type { AriaAttributes } from '../../types';
import * as jsonUtils from '../json';
import { parseAndGetAriaAttributes, setAriaAttributes, setAriaIDREF } from './a11y';

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
