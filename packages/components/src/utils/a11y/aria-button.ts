import type { AriaAttributes } from '../../types';
import { isDisabledOrLoading } from '../dom';

export const BUTTON_ARIA_ATTRIBUTES = ['aria-label', 'aria-expanded', 'aria-pressed', 'aria-haspopup'] as const;
export type ButtonAriaAttributes = typeof BUTTON_ARIA_ATTRIBUTES[number];

export const getButtonDisabledBusyAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean
): Pick<AriaAttributes, 'aria-disabled' | 'aria-busy'> => {
  return {
    'aria-disabled': isDisabledOrLoading(isDisabled, isLoading) ? 'true' : null,
    'aria-busy': isLoading ? 'true' : null,
  };
};
