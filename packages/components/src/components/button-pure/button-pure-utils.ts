import type { AlignLabel, AriaAttributes, ButtonType, LinkButtonIconName, SelectedAriaAttributes } from '../../types';
import {
  type ButtonAriaAttribute,
  consoleWarn,
  getButtonBaseAriaAttributes,
  getTagNameWithoutPrefix,
  hasVisibleIcon,
  parseAndGetAriaAttributes,
} from '../../utils';

export type ButtonPureType = ButtonType;
export type ButtonPureIcon = LinkButtonIconName;
export type ButtonPureAriaAttribute = ButtonAriaAttribute;
export type ButtonPureAlignLabel = AlignLabel;

/** @deprecated */
export const BUTTON_PURE_SIZES_DEPRECATED = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large'] as const;
export const BUTTON_PURE_SIZES = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  'inherit',
  ...BUTTON_PURE_SIZES_DEPRECATED,
] as const;
export type ButtonPureSize = (typeof BUTTON_PURE_SIZES)[number];

export const BUTTON_PURE_COLORS = [
  'primary',
  'contrast-higher',
  'contrast-high',
  'contrast-medium',
  'inherit',
] as const;
export type ButtonPureColor = (typeof BUTTON_PURE_COLORS)[number];

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
