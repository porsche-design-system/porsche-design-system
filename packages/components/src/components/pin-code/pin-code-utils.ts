import type { FormState } from '../../utils/form/form-state';

export const PIN_CODE_TYPES = ['number', 'password'] as const;
export type PinCodeType = (typeof PIN_CODE_TYPES)[number];

export type PinCodeUpdateEvent = { value: string | number };

export const isTypeNumber = (type: string): boolean => {
  return type === 'number';
};

export const inputIsSingleDigit = (input: string): boolean => {
  return input.length === 1 && /\d/.test(input);
};

export type PinCodeState = FormState;
