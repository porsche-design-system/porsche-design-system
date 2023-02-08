import type { SelectedAriaAttributes } from '../../types';
import type { AriaAttributes } from '../../aria-types';
import type { ButtonAriaAttribute } from '../../utils';
import { getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../utils';

export const getButtonAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean,
  aria: SelectedAriaAttributes<ButtonAriaAttribute>
): AriaAttributes => {
  return {
    ...parseAndGetAriaAttributes(aria),
    ...getButtonBaseAriaAttributes(isDisabled, isLoading),
  };
};
