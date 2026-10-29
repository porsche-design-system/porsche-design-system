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
        // convert booleans to strings so that values are properly set and not just result in attributes without a value when true in jsx;
        // convert Element / Element[] (or null) to null so Stencil does not stringify "[object HTMLElement]" as an attribute
        typeof val === 'boolean' ? `${val}` : typeof val === 'object' ? null : val,
      ])
    );
  }
  return undefined;
};

const isElement = (value: unknown): value is Element => value instanceof Element;

const toControlsElements = (value: AriaAttributes['aria-controls']): readonly Element[] | null => {
  if (isElement(value)) {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.filter(isElement);
  }
  return null;
};

type ElementAriaReflection = Element & {
  ariaControlsElements: readonly Element[] | null;
  ariaActiveDescendantElement: Element | null;
};

const haveSameElements = (a: readonly Element[] | null | undefined, b: readonly Element[] | null): boolean =>
  a === b || (!!a && !!b && a.length === b.length && a.every((el, i) => el === b[i]));

const ariaManagedElements = new WeakSet<Element>();

/**
 * Applies WAI-ARIA element reflection for `aria-controls` and `aria-activedescendant` when the `aria` prop carries an
 * element (or a list of elements, or `null`) instead of a string IDREF. String IDREFs stay on the content attribute.
 */
export const syncAriaElements = (el: Element | undefined, rawAttributes: AriaAttributes | string | undefined): void => {
  if (!el) {
    return;
  }
  if (rawAttributes === undefined) {
    if (!ariaManagedElements.has(el)) {
      return;
    }
    ariaManagedElements.delete(el);
  } else {
    ariaManagedElements.add(el);
  }

  const aria = rawAttributes ? parseJSONAttribute(rawAttributes) : undefined;
  const reflected = el as ElementAriaReflection;

  const nextControls =
    aria && 'aria-controls' in aria && typeof aria['aria-controls'] !== 'string'
      ? toControlsElements(aria['aria-controls'])
      : null;
  if (!haveSameElements(reflected.ariaControlsElements ?? null, nextControls)) {
    reflected.ariaControlsElements = nextControls;
  }

  const active = aria?.['aria-activedescendant'];
  const nextActive = isElement(active) ? active : null;
  if ((reflected.ariaActiveDescendantElement ?? null) !== nextActive) {
    reflected.ariaActiveDescendantElement = nextActive;
  }
};

/**
 * Builds a space-separated IDREF string from conditional ID entries.
 * Returns `null` when no IDs are truthy — safe for JSX attribute assignment.
 */
export const setAriaIDREF = (...ids: (string | false | null | undefined)[]): string | null => {
  const result = ids.filter(Boolean).join(' ');
  return result || null;
};
