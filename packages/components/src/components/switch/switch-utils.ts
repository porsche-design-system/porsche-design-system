import type { AlignLabel, AlignLabelDeprecated, AriaAttributes } from '../../types';
import { getButtonBaseAriaAttributes } from '../../utils';

/** @deprecated */
export type SwitchAlignLabelDeprecated = AlignLabelDeprecated;
export type SwitchAlignLabel = AlignLabel;

/** @deprecated */
export type SwitchUpdateEvent = { checked: boolean };
export type SwitchUpdateEventDetail = SwitchUpdateEvent;

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
