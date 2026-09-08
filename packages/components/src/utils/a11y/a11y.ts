import type { AriaAttributes } from '../../types';
import { removeAttribute, setAttribute } from '../dom';
import type { FormState } from '../form/form-state';
import { parseJSONAttribute } from '../json';

export type SetAriaAttributesOptions = {
  label?: string;
  message?: string;
  state?: FormState;
};

export const setAriaAttributes = (el: HTMLElement, opts: SetAriaAttributesOptions): void => {
  const { label, message, state } = opts;
  if (label) {
    setAttribute(el, 'aria-label', `${label}${message ? `. ${message}` : ''}`);
  }

  if (state === 'error') {
    setAttribute(el, 'aria-invalid', 'true');
  } else {
    removeAttribute(el, 'aria-invalid');
  }
};

export const parseAndGetAriaAttributes = (rawAttributes: AriaAttributes | string): AriaAttributes | undefined => {
  if (rawAttributes) {
    return Object.fromEntries(
      Object.entries(parseJSONAttribute(rawAttributes)).map(([key, val]) => [
        key,
        // convert booleans to strings so that values are properly set and not just result in attributes without a value when true in jsx
        typeof val === 'boolean' ? `${val}` : val,
      ])
    );
  }
  return undefined;
};

/**
 * Builds a space-separated IDREF string from conditional ID entries.
 * Returns `null` when no IDs are truthy — safe for JSX attribute assignment.
 */
export const setAriaIDREF = (...ids: (string | false | null | undefined)[]): string | null => {
  const result = ids.filter(Boolean).join(' ');
  return result || null;
};
