import type { SegmentedControlBackgroundColor } from '../segmented-control/segmented-control-utils';
import type { AriaAttributes, Theme } from '../../../types';
import { getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../../utils';

export type SegmentedControlItemInternalHTMLProps = {
  selected: boolean;
  backgroundColor: SegmentedControlBackgroundColor;
  theme: Theme;
};

export const getButtonAttributes = (isSelected: boolean, isDisabled: boolean): AriaAttributes => ({
  ...getButtonBaseAriaAttributes(isDisabled, false),
  ...parseAndGetAriaAttributes({ 'aria-pressed': isSelected }),
});

export const getIconColor = (isDisabled: boolean): string => {
  return !isDisabled ? 'primary' : 'contrast-medium';
};
