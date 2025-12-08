import type { AriaAttributes, LinkButtonIconName, SelectedAriaAttributes } from '../../../types';
import { getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../../utils';
import type { IconColor } from '../../icon/icon-utils';
import type { SegmentedControlState } from '../segmented-control/segmented-control-utils';

export type SegmentedControlItemInternalHTMLProps = {
  selected: boolean;
  state: SegmentedControlState;
  message: string;
  compact: boolean;
  disabledParent: boolean;
};

export type SegmentedControlItemIcon = LinkButtonIconName;

// ARIA for `aria` prop
export const SEGMENTED_CONTROL_ITEM_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type SegmentedControlItemAriaAttribute = (typeof SEGMENTED_CONTROL_ITEM_ARIA_ATTRIBUTES)[number];

export const getSegmentedControlItemAriaAttributes = (
  isSelected: boolean,
  isDisabled: boolean,
  state: SegmentedControlState,
  message: string,
  ariaProp?: SelectedAriaAttributes<SegmentedControlItemAriaAttribute>
): AriaAttributes => ({
  ...getButtonBaseAriaAttributes(isDisabled, false),
  ...(state !== 'none' && parseAndGetAriaAttributes({ 'aria-description': message })),
  ...parseAndGetAriaAttributes({ 'aria-pressed': isSelected }),
  ...parseAndGetAriaAttributes(ariaProp),
});

export const getIconColor = (isDisabled: boolean): IconColor => {
  return isDisabled ? 'contrast-medium' : 'primary';
};
