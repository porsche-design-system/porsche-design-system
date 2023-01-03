import type { BreakpointKey, BreakpointCustomizable } from '../../types';
import { BREAKPOINTS, parseJSON } from '../../utils';

export const SPINNER_SIZES = ['small', 'medium', 'large', 'inherit'] as const;
export type SpinnerSize = typeof SPINNER_SIZES[number];

export const verifySpinnerSize = (spinnerSize: BreakpointCustomizable<SpinnerSize>): void => {
  const parsedSpinnerSize = parseJSON(spinnerSize);
  const errorMessage = `Property 'size="${spinnerSize}"' of p-spinner should be of: ${SPINNER_SIZES.join(', ')}`;

  if (typeof parsedSpinnerSize === 'object') {
    for (const [key, value] of Object.entries(parsedSpinnerSize)) {
      if (
        (!BREAKPOINTS.includes(key as BreakpointKey) && key !== undefined) ||
        (!SPINNER_SIZES.includes(value as SpinnerSize) && value !== undefined)
      ) {
        console.warn(errorMessage);
        break;
      }
    }
  } else if (spinnerSize !== undefined && !SPINNER_SIZES.includes(parsedSpinnerSize as SpinnerSize)) {
    console.warn(errorMessage);
  }
};

export const SPINNER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type SpinnerAriaAttributes = typeof SPINNER_ARIA_ATTRIBUTES[number];
