import {
  type ButtonAriaAttribute,
  consoleWarn,
  getButtonBaseAriaAttributes,
  getTagNameWithoutPrefix,
  hasVisibleIcon,
  parseAndGetAriaAttributes,
} from '../../utils';
import type {
  AriaAttributes,
  LinkButtonIconName,
  SelectedAriaAttributes,
  TextSize,
  AlignLabel,
  AlignLabelDeprecated,
  ButtonType,
  TypographyTextWeight,
} from '../../types';

export type ButtonPureType = ButtonType;
export type ButtonPureIcon = LinkButtonIconName;
export type ButtonPureAriaAttribute = ButtonAriaAttribute;
/** @deprecated */
export type ButtonPureAlignLabelDeprecated = AlignLabelDeprecated;
export type ButtonPureAlignLabel = AlignLabel;
export type ButtonPureWeight = TypographyTextWeight;
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
      )} is not supported.`,
      host
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
