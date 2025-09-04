import type { AriaAttributes, LinkButtonIconName, SelectedAriaAttributes, Theme } from '../../../types';
import { getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../../utils';
import type { IconColor } from '../../icon/icon-utils';

export type SegmentedControlItemInternalHTMLProps = {
  selected: boolean;
  compact: boolean;
  disabledParent: boolean;
  theme: Theme;
};

export type SegmentedControlItemIcon = LinkButtonIconName;

// ARIA for `aria` prop
export const SEGMENTED_CONTROL_ITEM_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type SegmentedControlItemAriaAttribute = (typeof SEGMENTED_CONTROL_ITEM_ARIA_ATTRIBUTES)[number];

export const getSegmentedControlItemAriaAttributes = (
  isSelected: boolean,
  isDisabled: boolean,
  ariaProp?: SelectedAriaAttributes<SegmentedControlItemAriaAttribute>
): AriaAttributes => ({
  ...getButtonBaseAriaAttributes(isDisabled, false),
  ...parseAndGetAriaAttributes({ 'aria-pressed': isSelected }),
  ...parseAndGetAriaAttributes(ariaProp),
});

export const getIconColor = (isDisabled: boolean): IconColor => {
  return isDisabled ? 'contrast-medium' : 'primary';
};
