import type { FormState } from '../../utils/form/form-state';
import type { Styles } from 'jss';
import { consoleWarn, getPrefixedTagNames, getTagNameWithoutPrefix, setAttributes } from '../../utils';

export const PIN_CODE_TYPES = ['number', 'password'] as const;
export type PinCodeType = (typeof PIN_CODE_TYPES)[number];

export const PIN_CODE_LENGTHS = [1, 2, 3, 4, 5, 6] as const;
export type PinCodeLength = (typeof PIN_CODE_LENGTHS)[number];

/** @deprecated */
export type PinCodeUpdateEvent = { value: string; isComplete: boolean };
export type PinCodeUpdateEventDetail = PinCodeUpdateEvent;

export type PinCodeState = FormState;

export const removeSlottedSelector = (styles: Styles): Styles =>
  Object.fromEntries(
    Object.entries(styles).map(([key, value]) => {
      value = typeof value === 'object' ? removeSlottedSelector(value as Styles) : value;
      return [key.replace(/::slotted\(([^,]+)\)/g, '$1'), value];
    })
  );

export const removeStyles = (selector: string, styles: Styles): Styles =>
  Object.fromEntries(
    Object.entries(styles)
      .filter(([key]) => key !== selector)
      .map(([key, value]) => {
        value = typeof value === 'object' ? removeStyles(selector, value as Styles) : value;
        return [key, value];
      })
  );

export const warnAboutTransformedValue = (host: HTMLElement, length?: number): void => {
  const warningPrefix = `Property value of component ${getTagNameWithoutPrefix(host)}:`;
  consoleWarn(
    warningPrefix,
    length
      ? `Provided value has too many characters and was truncated to the max length of ${length}.`
      : 'Provided value contains characters that are not of type number, the value was therefore reset.'
  );
};

export const isInputSingleDigit = (input: string): boolean => /^\d$/.test(input);

export const hasInputOnlyDigitsOrWhitespaces = (input: string): boolean => /^[\d ]+$/.test(input);

export const getConcatenatedInputValues = (pinCodeElements: HTMLInputElement[]): string =>
  pinCodeElements.map((el) => el.value || ' ').join('');

// reset value if it contains invalid characters and cut string if pasted value is longer than pin code length
export const getSanitisedValue = (host: HTMLElement, value: string, length: number): string => {
  if (value && !hasInputOnlyDigitsOrWhitespaces(value)) {
    warnAboutTransformedValue(host);
    return '';
  } else if (removeWhiteSpaces(value)?.length > length) {
    warnAboutTransformedValue(host, length);
    return value.slice(0, length);
  } else {
    return value;
  }
};

export const removeWhiteSpaces = (value): string => value.replace(/\s/g, '');

export const initHiddenInput = (
  host: HTMLElement,
  name: string,
  value: string,
  disabled: boolean,
  required: boolean
): HTMLInputElement => {
  const hiddenInput = document.createElement('input');
  setAttributes(hiddenInput, {
    'aria-hidden': 'true',
    slot: 'internal-input',
    tabindex: '-1',
  });
  syncHiddenInput(hiddenInput, name, value, disabled, required);
  host.prepend(hiddenInput);
  return hiddenInput;
};

export const syncHiddenInput = (
  hiddenInput: HTMLInputElement,
  name: string,
  value: string,
  disabled: boolean,
  required: boolean
): void => {
  setAttributes(hiddenInput, {
    ...(name && { name }),
    value: removeWhiteSpaces(value),
  });
  hiddenInput.toggleAttribute('disabled', disabled);
  hiddenInput.toggleAttribute('required', required);
};

// This reproduces native behavior where the form is only submittable under certain circumstances
export const isFormSubmittable = (host: HTMLElement, form: HTMLFormElement): boolean => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  return !!(
    form.querySelectorAll('input:not([type=submit]):not([type=hidden])').length === 1 || // other sibling form elements e.g. select, textarea do not prevent submission
    Array.from(
      form.querySelectorAll(
        `${PrefixedTagNames.pButton},${PrefixedTagNames.pButtonPure},button[type=submit],input[type=submit]`
      )
    ).some((el) => (el as HTMLButtonElement).type === 'submit')
  );
};

/**
 * Determines if the current input element corresponds to the first non-filled input
 *
 * @param {number} index - The index of the current input element.
 * @param {string} value - The input value.
 * @param {number} length - The total number of input elements.
 * @returns {boolean} - True if the current input should have a specific identifier, indicating it corresponds to the first non-filled input; otherwise, false.
 */
export const isCurrentInput = (index: number, value: string, length: number): boolean => {
  if (!value) return index === 0; // No value entered at all: set current-input id on the first input element
  const firstWhitespaceIndex = value.split('').findIndex((char) => char === ' ');
  if (firstWhitespaceIndex === -1) return index === length - 1; // No whitespace found, set current-input id on the last input element
  return index === firstWhitespaceIndex; // Some value is entered: set current-input id on the first input element which does not have a value
};
