import type { FormState } from '../../utils/form/form-state';
import { removeAttribute, setAttribute } from '../../utils';

export const PIN_CODE_TYPES = ['number', 'password'] as const;
export type PinCodeType = (typeof PIN_CODE_TYPES)[number];

export type PinCodeUpdateEvent = { value: string | number };

export type PinCodeState = FormState;

export const isTypeNumber = (type: string): boolean => {
  return type === 'number';
};

export const inputIsSingleDigit = (input: string): boolean => {
  return input.length === 1 && /\d/.test(input);
};

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
  disabled ? setAttribute(hiddenInput, 'disabled') : removeAttribute(hiddenInput, 'disabled');
  required ? setAttribute(hiddenInput, 'required') : removeAttribute(hiddenInput, 'required');
};
