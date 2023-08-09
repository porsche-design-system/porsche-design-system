import type { Theme } from '../../../types';

export type MultiSelectOptionInternalHTMLProps = {
  /** Option theme (synchronized from p-multi-select) **/
  theme?: Theme;
  /** Highlights options when navigating with keyboard **/
  highlighted?: boolean;
  /** Hides options which are not matching the searchString **/
  hidden?: boolean;
};
