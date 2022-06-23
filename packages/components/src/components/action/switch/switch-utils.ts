import type { AriaAttributes } from '../../../types';
import { getButtonBaseAriaAttributes } from '../../../utils';

export const getButtonAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean,
  isChecked: boolean
): AriaAttributes => {
  return {
    ...getButtonBaseAriaAttributes(isDisabled, isLoading),
    'aria-checked': isChecked ? 'true' : 'false',
    'aria-labelledby': 'label',
  };
};
