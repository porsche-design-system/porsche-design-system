import { removeAttribute, setAttribute } from '../dom';
import type { AriaAttributes } from '../../types';
import { parseJSONAttribute } from '../json';
import type { FormState } from '../form/form-state';
import { hasWindow } from '../has-window';

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

export const parseAndGetAriaAttributes = (rawAttributes: AriaAttributes | string): AriaAttributes => {
  if (rawAttributes) {
    return Object.fromEntries(
      Object.entries(parseJSONAttribute(rawAttributes)).map(([key, val]) => [
        key,
        typeof val === 'boolean' ? `${val}` : val,
      ])
    );
  }
};

export const isHighContrastMode = hasWindow && window.matchMedia && matchMedia('(forced-colors: active)').matches;
