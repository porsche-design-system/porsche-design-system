import type { BreakpointKey, BreakpointCustomizable } from '../../../types';
import { BREAKPOINTS, parseJSON } from '../../../utils';

const SPINNER_SIZES = ['small', 'medium', 'large', 'inherit'] as const;
export type SpinnerSizeType = typeof SPINNER_SIZES[number];

export type SpinnerSize = BreakpointCustomizable<SpinnerSizeType>;

export const verifySpinnerSize = (spinnerSize: SpinnerSize): void => {
  const parsedSpinnerSize = parseJSON(spinnerSize);
  const errorMessage = `Property 'size="${spinnerSize}"' of p-spinner should be of: ${SPINNER_SIZES.join(', ')}`;

  if (typeof parsedSpinnerSize === 'object') {
    for (const [key, value] of Object.entries(parsedSpinnerSize)) {
      if (
        (!BREAKPOINTS.includes(key as BreakpointKey) && key !== undefined) ||
        (!SPINNER_SIZES.includes(value as SpinnerSizeType) && value !== undefined)
      ) {
        console.warn(errorMessage);
        break;
      }
    }
  } else if (spinnerSize !== undefined && !SPINNER_SIZES.includes(parsedSpinnerSize as SpinnerSizeType)) {
    console.warn(errorMessage);
  }
};

export const SPINNER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type SpinnerAriaAttributes = typeof SPINNER_ARIA_ATTRIBUTES[number];
