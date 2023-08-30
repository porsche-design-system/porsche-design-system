import type { FormState } from '../../utils/form/form-state';
import type { Styles } from 'jss';
import { removeAttribute, setAttribute } from '../../utils';

export const PIN_CODE_TYPES = ['number', 'password'] as const;
export type PinCodeType = (typeof PIN_CODE_TYPES)[number];

export const PIN_CODE_LENGTHS = [4 as number, 6 as number] as const;
export type PinCodeLength = (typeof PIN_CODE_LENGTHS)[number];

export type PinCodeUpdateEvent = { value: string | number };

export type PinCodeState = FormState;

export const getStylesWithoutSlottedSelector = (styles: Styles): Styles => {
  return Object.fromEntries(
    Object.entries(styles).map(([key, value]) => {
      value = typeof value === 'object' ? getStylesWithoutSlottedSelector(value as Styles) : value;
      return [key.replace(/::slotted\(([^,]+)\)/g, '$1'), value];
    }, {} as Styles)
  );
};

export const inputIsSingleDigit = (input: string): boolean => /^\d$/.test(input);

export const inputConsistsOfDigits = (input: string): boolean => /^\d+$/.test(input);

export const joinInputValues = (pinCodeElements: HTMLInputElement[]): string =>
  pinCodeElements.map((el) => el.value).join('');

export const initHiddenInput = (
  host: HTMLElement,
  name: string,
  value: string,
  disabled: boolean,
  required: boolean
): HTMLInputElement => {
  const hiddenInput = document.createElement('input');
  setAttribute(hiddenInput, 'name', 'hidden-input');
  setAttribute(hiddenInput, 'aria-hidden', 'true');
  setAttribute(hiddenInput, 'slot', 'hidden-input');
  setAttribute(hiddenInput, 'tabindex', '-1');
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
  setAttribute(hiddenInput, 'name', name);
  setAttribute(hiddenInput, 'value', value);
  (disabled ? setAttribute : removeAttribute)(hiddenInput, 'disabled');
  (required ? setAttribute : removeAttribute)(hiddenInput, 'required');
};
