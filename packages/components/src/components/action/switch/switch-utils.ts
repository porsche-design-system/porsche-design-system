import type { AriaAttributes } from '../../../types';
import { getButtonDisabledBusyAriaAttributes } from '../../../utils';

export const getButtonAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean,
  isChecked: boolean
): AriaAttributes => {
  return {
    ...getButtonDisabledBusyAriaAttributes(isDisabled, isLoading),
    'aria-checked': isChecked ? 'true' : 'false',
    'aria-labelledby': 'label',
  };
};
