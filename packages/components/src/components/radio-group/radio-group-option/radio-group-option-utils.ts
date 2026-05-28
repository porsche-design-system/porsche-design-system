import type { AriaAttributes } from '../../../types';
import type { RadioGroupState } from '../radio-group/radio-group-utils';

export type RadioGroupOptionInternalHTMLProps = {
  /** The option selected state. */
  selected?: boolean;
  /** The disabled state of the parent radio-group. */
  disabledParent?: boolean;
  /** The loading state of the parent radio-group. */
  loadingParent?: boolean;
  /** The name of the parent radio-group. **/
  name?: string;
  /** The state of the parent radio-group. **/
  state?: RadioGroupState;
};

export const getRadioGroupOptionAriaAttributes = (
  isSelected: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  state: RadioGroupState
): AriaAttributes => ({
  role: 'radio',
  'aria-checked': isSelected ? 'true' : 'false',
  'aria-disabled': isDisabled || isLoading ? 'true' : null,
  'aria-invalid': state === 'error' ? 'true' : null,
});
