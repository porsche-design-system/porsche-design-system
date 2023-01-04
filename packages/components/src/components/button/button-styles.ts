import type { BreakpointCustomizable, ButtonVariant, Theme } from '../../types';
import { getCss } from '../../utils';
import { getLinkButtonStyles } from '../../styles/link-button-styles';

export const getComponentCss = (
  variant: ButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabledOrLoading: boolean,
  theme: Theme
): string => {
  return getCss(getLinkButtonStyles(variant, hideLabel, isDisabledOrLoading, false, theme));
};
