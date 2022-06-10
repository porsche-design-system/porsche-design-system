import { getTagName, hasVisibleIcon, isDisabledOrLoading, parseAndGetAriaAttributes } from '../../../utils';
import type { AriaAttributes, LinkButtonPureIconName, SelectedAriaAttributes } from '../../../types';
import type { ButtonAriaAttributes } from '../button/button-utils';
import { BUTTON_ARIA_ATTRIBUTES } from '../button/button-utils';

export const warnIfIsLoadingAndIconIsNone = (
  host: HTMLElement,
  loading: boolean,
  iconName: LinkButtonPureIconName
): void => {
  if (loading && !hasVisibleIcon(iconName)) {
    console.warn(
      `The combination of properties "icon='${iconName}'" and loading='${loading} within ${getTagName(
        host
      )} is not supported.`
    );
  }
};

export const getButtonAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean,
  hasSubline: boolean,
  aria: SelectedAriaAttributes<ButtonAriaAttributes>
): AriaAttributes => {
  return {
    ...parseAndGetAriaAttributes(aria, BUTTON_ARIA_ATTRIBUTES),
    'aria-disabled': isDisabledOrLoading(isDisabled, isLoading) ? 'true' : null,
    'aria-busy': isLoading ? 'true' : null,
    'aria-describedby': hasSubline ? 'subline' : null,
  };
};
