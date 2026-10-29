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

type ReflectedAriaState = {
  controls?: boolean;
  activeDescendant?: boolean;
};

const reflectedAriaElements = new WeakMap<Element, ReflectedAriaState>();

/**
 * Applies WAI-ARIA element reflection for `aria-controls` and `aria-activedescendant` when the `aria` prop carries an
 * element (or a list of elements, or `null`) instead of a string IDREF. String IDREFs stay on the content attribute
 * (setting `ariaControlsElements = null` or `ariaActiveDescendantElement = null` in browsers removes the content
 * attribute, and `setAttribute` already resets element reflection natively).
 */
export const syncAriaElements = (el: Element | undefined, rawAttributes: AriaAttributes | string | undefined): void => {
  if (!el) {
    return;
  }

  const aria = rawAttributes ? parseJSONAttribute(rawAttributes) : undefined;
  const state = reflectedAriaElements.get(el);
  if (!aria && !state) {
    return;
  }

  const reflected = el as ElementAriaReflection;
  const nextState: ReflectedAriaState = { ...state };

  const controls = aria?.['aria-controls'];
  if (typeof controls === 'string') {
    nextState.controls = false;
  } else {
    const nextControls = toControlsElements(controls);
    if (nextControls) {
      if (!haveSameElements(reflected.ariaControlsElements, nextControls)) {
        reflected.ariaControlsElements = nextControls;
      }
      nextState.controls = true;
    } else if (state?.controls || (aria && 'aria-controls' in aria)) {
      reflected.ariaControlsElements = null;
      nextState.controls = false;
    }
  }

  const active = aria?.['aria-activedescendant'];
  if (typeof active === 'string') {
    nextState.activeDescendant = false;
  } else if (isElement(active)) {
    if (reflected.ariaActiveDescendantElement !== active) {
      reflected.ariaActiveDescendantElement = active;
    }
    nextState.activeDescendant = true;
  } else if (state?.activeDescendant || (aria && 'aria-activedescendant' in aria)) {
    reflected.ariaActiveDescendantElement = null;
    nextState.activeDescendant = false;
  }

  if (nextState.controls || nextState.activeDescendant) {
    reflectedAriaElements.set(el, nextState);
  } else {
    reflectedAriaElements.delete(el);
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
