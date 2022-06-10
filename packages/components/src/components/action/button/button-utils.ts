import type { SelectedAriaAttributes } from '../../../types';
import type { AriaAttributes } from '../../../aria-types';
import { isDisabledOrLoading, parseAndGetAriaAttributes } from '../../../utils';

export const BUTTON_ARIA_ATTRIBUTES = ['aria-label', 'aria-expanded', 'aria-pressed', 'aria-haspopup'] as const;
export type ButtonAriaAttributes = typeof BUTTON_ARIA_ATTRIBUTES[number];

export const getButtonAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean,
  aria: SelectedAriaAttributes<ButtonAriaAttributes>
): Pick<AriaAttributes, 'aria-disabled' | 'aria-busy'> => {
  return {
    ...parseAndGetAriaAttributes(aria, BUTTON_ARIA_ATTRIBUTES),
    'aria-disabled': isDisabledOrLoading(isDisabled, isLoading) ? 'true' : null,
    'aria-busy': isLoading ? 'true' : null,
  };
};
