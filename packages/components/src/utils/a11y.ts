import { removeAttribute, setAttribute } from './dom';
import type { FormState, AriaAttributes } from '../types';
import { parseJSONAttribute } from './json';

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

export const throwIfAriaAttributesAreInvalid = (
  attributeKeys: (keyof AriaAttributes)[],
  allowedAttributes: readonly (keyof AriaAttributes)[]
): void => {
  const invalidAttributes = allowedAttributes ? attributeKeys.filter((x) => !allowedAttributes.includes(x)) : [];
  if (invalidAttributes.length) {
    throw new TypeError(
      `${invalidAttributes.join(', ')} is not a valid aria attribute. Valid ones are: ${allowedAttributes.join(', ')}`
    );
  }
};

export const parseAndGetAriaAttributes = (
  rawAttributes: AriaAttributes | string,
  allowedAttributes?: readonly (keyof AriaAttributes)[]
): AriaAttributes => {
  if (rawAttributes) {
    const attributes = parseJSONAttribute(rawAttributes);
    const attributeKeys = Object.keys(attributes);

    throwIfAriaAttributesAreInvalid(attributeKeys as (keyof AriaAttributes)[], allowedAttributes);

    // convert booleans to strings so that values are properly set and not just result in attributes without a value when true in jsx
    for (const key of attributeKeys) {
      if (typeof attributes[key] === 'boolean') {
        attributes[key] = `${attributes[key]}`;
      }
    }

    return attributes;
  }
};
