import type { Theme } from '../../../types';

export type SelectOptionInternalHTMLProps = {
  /** The option selected state. */
  selected?: boolean;
  /** Highlights options when navigating with keyboard **/
  highlighted?: boolean;
  /** Option theme (synchronized from p-select) **/
  theme?: Theme;
};
