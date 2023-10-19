import type { ButtonAriaAttribute } from '../../utils';
import type { AriaAttributes, LinkButtonIconName, SelectedAriaAttributes, TextSize } from '../../types';
import {
  consoleWarn,
  getButtonBaseAriaAttributes,
  getTagNameWithoutPrefix,
  hasVisibleIcon,
  parseAndGetAriaAttributes,
} from '../../utils';
import type { AlignLabel, AlignLabelDeprecated, ButtonType, TextWeight } from '../../types';

export type ButtonPureType = ButtonType;
export type ButtonPureIcon = LinkButtonIconName;
export type ButtonPureAriaAttribute = ButtonAriaAttribute;
/** @deprecated */
export type ButtonPureAlignLabelDeprecated = AlignLabelDeprecated;
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
    consoleWarn(
      `combination of properties icon='${iconName}' and loading='${loading}' for component ${getTagNameWithoutPrefix(
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
