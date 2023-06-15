import type { AriaAttributes, LinkButtonIconName, SelectedAriaAttributes } from '../../types';
import type { ButtonAriaAttribute } from '../../utils';
import { getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../utils';

export type ButtonIcon = LinkButtonIconName;

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
