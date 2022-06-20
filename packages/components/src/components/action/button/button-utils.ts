import type { SelectedAriaAttributes } from '../../../types';
import type { AriaAttributes } from '../../../aria-types';
import type { ButtonAriaAttributes } from '../../../utils';
import { BUTTON_ARIA_ATTRIBUTES, getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../../utils';

export const getButtonAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean,
  aria: SelectedAriaAttributes<ButtonAriaAttributes>
): AriaAttributes => {
  return {
    ...parseAndGetAriaAttributes(aria, BUTTON_ARIA_ATTRIBUTES),
    ...getButtonBaseAriaAttributes(isDisabled, isLoading),
  };
};
