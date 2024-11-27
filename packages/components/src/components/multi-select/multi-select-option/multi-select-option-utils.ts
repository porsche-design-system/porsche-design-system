import type { Theme } from '../../../types';

export type MultiSelectOptionInternalHTMLProps = {
  /** The option selected state. */
  selected?: boolean;
  /** The disabled state of the parent optgroup. */
  disabledParent?: boolean;
  /** Highlights options when navigating with keyboard **/
  highlighted?: boolean;
  /** Option theme (synchronized from p-multi-select) **/
  theme?: Theme;
};
