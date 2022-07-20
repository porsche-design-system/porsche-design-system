import type { ButtonAriaAttributes } from '../../../utils';
import type { AriaAttributes, LinkButtonPureIconName, SelectedAriaAttributes } from '../../../types';
import { getButtonBaseAriaAttributes, getTagName, hasVisibleIcon, parseAndGetAriaAttributes } from '../../../utils';

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
    ...parseAndGetAriaAttributes(aria),
    ...getButtonBaseAriaAttributes(isDisabled, isLoading),
    'aria-describedby': hasSubline ? 'subline' : null,
  };
};
