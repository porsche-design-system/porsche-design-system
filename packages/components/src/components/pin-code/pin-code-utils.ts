export const PIN_CODE_TYPES = ['number', 'password'] as const;
export type PinCodeType = (typeof PIN_CODE_TYPES)[number];
import type { FormState } from '../../utils/form/form-state';

export const isTypeNumber = (type: string): boolean => {
  return type === 'number';
};

export type PinCodeState = FormState;
