import type { ButtonAriaAttributes } from '../../../utils';
import type { AriaAttributes, LinkButtonPureIconName, SelectedAriaAttributes } from '../../../types';
import {
  getButtonDisabledBusyAriaAttributes,
  getTagName,
  hasVisibleIcon,
  parseAndGetAriaAttributes,
} from '../../../utils';
import { BUTTON_ARIA_ATTRIBUTES } from '../../../utils';

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
    ...getButtonDisabledBusyAriaAttributes(isDisabled, isLoading),
    'aria-describedby': hasSubline ? 'subline' : null,
  };
};
