import type { AriaAttributes, LinkButtonIconName, SelectedAriaAttributes } from '../../types';
import { type ButtonAriaAttribute, getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../utils';

export type ButtonIcon = LinkButtonIconName;

export const BUTTON_VARIANTS = ['primary', 'secondary', 'destructive'] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

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
