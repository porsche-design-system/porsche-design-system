import type { Theme } from '../../../types';
import type { RadioGroupState } from '../radio-group/radio-group-utils';

export type RadioGroupOptionInternalHTMLProps = {
  /** The option selected state. */
  selected?: boolean;
  /** The disabled state of the parent radio-group. */
  disabledParent?: boolean;
  /** The loading state of the parent radio-group. */
  loadingParent?: boolean;
  /** Option theme (synchronized from p-radio-group) **/
  theme?: Theme;
  /** The name of the parent radio-group. **/
  name?: string;
  /** The state of the parent radio-group. **/
  state?: RadioGroupState;
};
