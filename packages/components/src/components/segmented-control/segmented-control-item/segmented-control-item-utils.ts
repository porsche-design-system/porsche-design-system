import type { SegmentedControlBackgroundColor } from '../segmented-control/segmented-control-utils';
import type { Theme } from '../../../types';
import type { AriaAttributes } from '../../../types';
import { getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../../utils';

export type SegmentedControlItemInternalHTMLProps = {
  selected: boolean;
  backgroundColor: SegmentedControlBackgroundColor;
  theme: Theme;
};

export const getButtonAttributes = (
  isSelected: boolean,
  isDisabled: boolean
): Pick<HTMLButtonElement, 'tabIndex'> & { role: string } & AriaAttributes => ({
  role: 'tab',
  tabIndex: isSelected ? 0 : -1,
  ...getButtonBaseAriaAttributes(isDisabled, false),
  ...parseAndGetAriaAttributes({ 'aria-selected': isSelected }),
});
