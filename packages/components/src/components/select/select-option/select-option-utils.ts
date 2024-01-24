import type { Theme } from '../../../types';

export type SelectOptionInternalHTMLProps = {
  /** Highlights options when navigating with keyboard **/
  highlighted?: boolean;
  /** Option theme (synchronized from p-select) **/
  theme?: Theme;
};
