import { removeAttribute, setAttribute } from './dom';
import type { FormState, AriaAttributes } from '../types';

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

export const parseAriaAttributes = (rawAttributes: AriaAttributes | string): AriaAttributes => {
  return typeof rawAttributes === 'string'
    ? // input is potentially JSON parsable string, e.g. "{ aria-label: 'Some label' }"
      JSON.parse(
        rawAttributes
          .replace(/'/g, '"') // convert single quotes to double quotes
          .replace(/[\s"]?([\w-]+)[\s"]?:/g, '"$1":') // wrap keys in double quotes
      )
    : // input is object, e.g. { aria-label: 'Some label' }
      rawAttributes;
};

export const throwIfAriaAttributesAreInvalid = (
  attributeKeys: (keyof AriaAttributes)[],
  allowedAttributes: readonly (keyof AriaAttributes)[]
): void => {
  const invalidAttributes = allowedAttributes ? attributeKeys.filter((x) => !allowedAttributes.includes(x)) : [];
  if (invalidAttributes.length) {
    throw new TypeError(
      `${invalidAttributes.join(', ')} is not a valid accessibility attribute. Valid ones are: ${allowedAttributes.join(
        ', '
      )}`
    );
  }
};

export const parseAndGetAriaAttributes = (
  rawAttributes: AriaAttributes | string,
  allowedAttributes?: readonly (keyof AriaAttributes)[]
): AriaAttributes => {
  if (rawAttributes) {
    const attributes = parseAriaAttributes(rawAttributes);
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
