export const PIN_CODE_TYPES = ['alphanumeric', 'number'] as const;
export type PinCodeType = (typeof PIN_CODE_TYPES)[number];

export const isTypeNumber = (type: string): boolean => {
  return type === 'number';
};
