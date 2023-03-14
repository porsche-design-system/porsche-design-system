import type { ButtonAriaAttribute } from '../../utils';
import type { AriaAttributes, LinkButtonIconName, SelectedAriaAttributes, TextSize } from '../../types';
import { getButtonBaseAriaAttributes, getTagName, hasVisibleIcon, parseAndGetAriaAttributes } from '../../utils';
import type { AlignLabel, ButtonType, TextWeight } from '../../types';

export type ButtonPureType = ButtonType;
export type ButtonPureIcon = LinkButtonIconName;
export type ButtonPureAriaAttribute = ButtonAriaAttribute;
export type ButtonPureAlignLabel = AlignLabel;
export type ButtonPureWeight = TextWeight;
export type ButtonPureSize = TextSize;

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
  aria: SelectedAriaAttributes<ButtonPureAriaAttribute>
): AriaAttributes => {
  return {
    ...parseAndGetAriaAttributes(aria),
    ...getButtonBaseAriaAttributes(isDisabled, isLoading),
  };
};
