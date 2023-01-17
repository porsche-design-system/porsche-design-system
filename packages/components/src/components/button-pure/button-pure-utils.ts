import type { ButtonAriaAttributes } from '../../utils';
import type { AriaAttributes, LinkButtonIconName, SelectedAriaAttributes } from '../../types';
import { getButtonBaseAriaAttributes, getTagName, hasVisibleIcon, parseAndGetAriaAttributes } from '../../utils';

export const warnIfIsLoadingAndIconIsNone = (
  host: HTMLElement,
  loading: boolean,
  iconName: LinkButtonIconName,
  iconSource: string
): void => {
  if (loading && !hasVisibleIcon(iconName, iconSource)) {
    console.warn(
      `The combination of properties "icon='${iconName}'" and loading='${loading} within ${getTagName(
        host
      )} is not supported.`
    );
  }
};

export const getButtonPureAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean,
  aria: SelectedAriaAttributes<ButtonAriaAttributes>
): AriaAttributes => {
  return {
    ...parseAndGetAriaAttributes(aria),
    ...getButtonBaseAriaAttributes(isDisabled, isLoading),
  };
};
