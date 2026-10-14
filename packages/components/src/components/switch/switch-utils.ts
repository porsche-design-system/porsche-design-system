import type { AlignLabel, AriaAttributes, FormFieldAriaAttribute, SelectedAriaAttributes } from '../../types';
import { getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../utils';

export type SwitchAlignLabel = AlignLabel;
export type SwitchAriaAttribute = FormFieldAriaAttribute;
export type SwitchUpdateEventDetail = { checked: boolean };

export const getSwitchButtonAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean,
  isChecked: boolean,
  aria?: SelectedAriaAttributes<SwitchAriaAttribute>
): AriaAttributes => {
  return {
    ...parseAndGetAriaAttributes(aria),
    ...getButtonBaseAriaAttributes(isDisabled, isLoading),
    'aria-checked': isChecked ? 'true' : 'false',
  };
};
