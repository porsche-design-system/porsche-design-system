import type { FormState } from '../../utils/form/form-state';
import type { Styles } from 'jss';
import { consoleWarn, getPrefixedTagNames, getTagNameWithoutPrefix, setAttributes } from '../../utils';

export const PIN_CODE_TYPES = ['number', 'password'] as const;
export type PinCodeType = (typeof PIN_CODE_TYPES)[number];

export const PIN_CODE_LENGTHS = [4, 6] as const;
export type PinCodeLength = (typeof PIN_CODE_LENGTHS)[number];

export type PinCodeUpdateEvent = { value: string; isComplete: boolean };

export type PinCodeState = FormState;

export const hiddenInputSlotName = 'hidden-input';

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
    slot: hiddenInputSlotName,
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
    name,
    value: removeWhiteSpaces(value),
  });
  hiddenInput.toggleAttribute('disabled', disabled);
  hiddenInput.toggleAttribute('required', required);
};

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
