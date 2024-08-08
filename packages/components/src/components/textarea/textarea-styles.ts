import { type BreakpointCustomizable, type Theme } from '../../types';
import { type FormState } from '../../utils/form/form-state';

import { getTextareaStyles } from '../../styles/textarea-styles';
import { getCss } from '../../utils';

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasCounter: boolean,
  theme: Theme
): string => {
  return getCss(getTextareaStyles(isDisabled, hideLabel, state, hasCounter, theme));
};
