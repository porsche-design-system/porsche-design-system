import { Breakpoint, BreakpointCustomizable, BREAKPOINTS } from '../../../types';
import { parseJSON } from '../../../utils';

const SPINNER_SIZES = ['small', 'medium', 'large', 'inherit'] as const;
type SpinnerSizes = typeof SPINNER_SIZES[number];

export type SpinnerSize = BreakpointCustomizable<SpinnerSizes>;

export const verifySpinnerSize = (spinnerSize: SpinnerSize): void => {
  const parsedSpinnerSize = parseJSON(spinnerSize);
  const errorMessage = `Property 'size="${spinnerSize}"' of p-spinner is invalid`;

  if (typeof parsedSpinnerSize === 'object') {
    for (const [key, value] of Object.entries(parsedSpinnerSize)) {
      if (!BREAKPOINTS.includes(key as Breakpoint)) {
        console.warn(errorMessage);
      }
      if (!SPINNER_SIZES.includes(value as SpinnerSizes)) {
        console.warn(errorMessage);
      }
    }
  } else {
    if (!SPINNER_SIZES.includes(spinnerSize as SpinnerSizes)) {
      console.warn(errorMessage);
    }
  }
};
