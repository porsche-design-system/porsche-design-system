import type { FormState } from '../../utils/form/form-state';
import { removeAttribute, setAttribute } from '../../utils';

export const PIN_CODE_TYPES = ['number', 'password'] as const;
export type PinCodeType = (typeof PIN_CODE_TYPES)[number];

export type PinCodeUpdateEvent = { value: string | number };

export type PinCodeState = FormState;

export const isTypeNumber = (type: string): boolean => {
  return type === 'number';
};

export const inputIsSingleDigit = (input: string): boolean => input.length === 1 && /\d/.test(input);

export const joinInputValues = (pinCodeElements: HTMLInputElement[]): string =>
  pinCodeElements.map((el) => el.value).join('');

export const initHiddenInput = (
  host: HTMLElement,
  value: string,
  disabled: boolean,
  required: boolean
): HTMLInputElement => {
  const hiddenInput = document.createElement('input');
  setAttribute(hiddenInput, 'name', 'hidden-input');
  setAttribute(hiddenInput, 'aria-hidden', 'true');
  setAttribute(hiddenInput, 'slot', 'hidden-input');
  syncHiddenInput(hiddenInput, value, disabled, required);
  host.prepend(hiddenInput);
  return hiddenInput;
};

export const syncHiddenInput = (
  hiddenInput: HTMLInputElement,
  value = '',
  disabled: boolean,
  required: boolean
): void => {
  setAttribute(hiddenInput, 'value', `${value}`);
  if (disabled) {
    setAttribute(hiddenInput, 'disabled');
  } else {
    removeAttribute(hiddenInput, 'disabled');
  }
  if (required) {
    setAttribute(hiddenInput, 'required');
  } else {
    removeAttribute(hiddenInput, 'required');
  }
};
