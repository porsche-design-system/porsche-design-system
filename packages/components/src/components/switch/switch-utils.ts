import type { AlignLabel, AriaAttributes } from '../../types';
import { getButtonBaseAriaAttributes } from '../../utils';

export type SwitchAlignLabel = AlignLabel;

export type SwitchUpdateEventDetail = { checked: boolean };

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
