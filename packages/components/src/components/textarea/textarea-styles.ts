import { type BreakpointCustomizable, type Theme } from '../../types';
import { type FormState } from '../../utils/form/form-state';

import { getComponentCss as getComponentCssCommon } from '../../styles/textarea-styles';

// TODO: Remove workaround for generateDSRComponents.ts
export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasCounter: boolean,
  theme: Theme
): string => {
  return getComponentCssCommon(isDisabled, hideLabel, state, hasCounter, theme);
};
