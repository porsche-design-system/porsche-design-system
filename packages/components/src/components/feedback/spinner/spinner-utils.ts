import { BreakpointCustomizable, BREAKPOINTS } from '../../../types';
import { parseJSON } from '../../../utils';

const SPINNER_SIZES = ['small', 'medium', 'large', 'inherit'] as const;
export type SpinnerSize = BreakpointCustomizable<typeof SPINNER_SIZES[number]>;

export const verifySpinnerSize = (spinnerSize: SpinnerSize): void => {
  const parsedSpinnerSize = parseJSON(spinnerSize);

  if (typeof parsedSpinnerSize === 'object') {
    Object.entries(parsedSpinnerSize).map(([key, value]) => {
      if (!BREAKPOINTS.includes(key as any)) {
        console.warn(`'${key}' in <p-spinner size='${spinnerSize}'> is invalid`);
      }
      if (!SPINNER_SIZES.includes(value as any)) {
        console.warn(`'${value}' in <p-spinner size='${spinnerSize}'> is invalid`);
      }
    });
  } else {
    if (!SPINNER_SIZES.includes(spinnerSize as any)) {
      console.warn(`'${spinnerSize}' in <p-spinner size='${spinnerSize}'> is invalid'`);
    }
  }
};
