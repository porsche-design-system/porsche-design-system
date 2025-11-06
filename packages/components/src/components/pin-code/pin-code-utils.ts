import type { Styles } from 'jss';
import { consoleWarn, getPrefixedTagNames, getTagNameWithoutPrefix } from '../../utils';
import type { FormState } from '../../utils/form/form-state';

export const PIN_CODE_TYPES = ['number', 'password'] as const;
export type PinCodeType = (typeof PIN_CODE_TYPES)[number];

export const PIN_CODE_LENGTHS = [1, 2, 3, 4, 5, 6] as const;
export type PinCodeLength = (typeof PIN_CODE_LENGTHS)[number];

export type PinCodeChangeEventDetail = { value: string; isComplete: boolean };

export type PinCodeState = FormState;

export type HTMLInputElementEventTarget = {
  target: HTMLInputElement & { previousElementSibling: HTMLInputElement; nextElementSibling: HTMLInputElement };
};

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

export const internalPin = {
  warnAboutTransformedValue,
};

export const isInputOnlyDigits = (input: string): boolean => /^[0-9]*$/.test(input);

export const hasInputOnlyDigitsOrWhitespaces = (input: string): boolean => /^[\d ]+$/.test(input);

export const getConcatenatedInputValues = (pinCodeElements: HTMLInputElement[]): string =>
  pinCodeElements.map((el) => el.value || ' ').join('');

// reset value if it contains invalid characters and cut string if pasted value is longer than pin code length
export const getSanitisedValue = (host: HTMLElement, value: string, length: number): string => {
  if (value && !hasInputOnlyDigitsOrWhitespaces(value)) {
    internalPin.warnAboutTransformedValue(host);
    return '';
  }
  if (removeWhiteSpaces(value)?.length > length) {
    internalPin.warnAboutTransformedValue(host, length);
    return value.slice(0, length);
  }
  return value;
};

export const removeWhiteSpaces = (value: string): string => value.replace(/\s/g, '');

// This reproduces native behavior where the form is only submittable under certain circumstances
export const isFormSubmittable = (host: HTMLElement, form: HTMLFormElement): boolean => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  return !!(
    form.querySelectorAll('input:not([type=submit]):not([type=hidden])').length === 0 || // other sibling form elements e.g. select, textarea do not prevent submission
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
  if (!value) {
    return index === 0; // No value entered at all: set current-input id on the first input element
  }
  const firstWhitespaceIndex = value.indexOf(' ');
  if (firstWhitespaceIndex === -1) {
    return index === length - 1; // All inputs have a value: set current-input id on the last input element
  }
  return index === firstWhitespaceIndex; // Some value is entered: set current-input id on the first input element which does not have a value
};
