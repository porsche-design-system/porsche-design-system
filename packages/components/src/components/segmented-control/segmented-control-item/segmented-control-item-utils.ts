import type { AriaAttributes, LinkButtonIconName, Theme } from '../../../types';
import { getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../../utils';
import type { IconColor } from '../../icon/icon-utils';

export type SegmentedControlItemInternalHTMLProps = {
  selected: boolean;
  theme: Theme;
};

export type SegmentedControlItemIcon = LinkButtonIconName;

export const getButtonAttributes = (isSelected: boolean, isDisabled: boolean): AriaAttributes => ({
  ...getButtonBaseAriaAttributes(isDisabled, false),
  ...parseAndGetAriaAttributes({ 'aria-pressed': isSelected }),
});

export const getIconColor = (isDisabled: boolean): IconColor => {
  return !isDisabled ? 'primary' : 'contrast-medium';
};
