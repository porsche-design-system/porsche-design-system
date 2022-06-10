import type { AriaAttributes } from '../../../types';
import { isDisabledOrLoading } from '../../../utils';

export const getButtonAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean,
  isChecked: boolean
): AriaAttributes => {
  return {
    'aria-disabled': isDisabledOrLoading(isDisabled, isLoading) ? 'true' : null,
    'aria-busy': isLoading ? 'true' : null,
    'aria-checked': isChecked ? 'true' : 'false',
    'aria-labelledby': 'label',
  };
};
