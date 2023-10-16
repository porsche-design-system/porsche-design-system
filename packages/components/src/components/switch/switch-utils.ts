import type { AlignLabel, AlignLabelDeprecated, AriaAttributes } from '../../types';
import { getButtonBaseAriaAttributes } from '../../utils';

export type SwitchAlignLabelDeprecated = AlignLabelDeprecated;
export type SwitchAlignLabel = AlignLabel;
export type SwitchUpdateEvent = { checked: boolean };

export const getSwitchButtonAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean,
  isChecked: boolean
): AriaAttributes => {
  return {
    ...getButtonBaseAriaAttributes(isDisabled, isLoading),
    'aria-checked': isChecked ? 'true' : 'false',
  };
};
