import { getCss } from '../../../utils';
import { getLinkButtonStyles } from '../../../styles/link-button-styles';
import type { BreakpointCustomizable } from '../../../utils';
import type { ButtonVariant, ThemeExtendedElectric } from '../../../types';

export const getComponentCss = (
  variant: ButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabledOrLoading: boolean,
  theme: ThemeExtendedElectric
): string => {
  return getCss(getLinkButtonStyles(variant, hideLabel, isDisabledOrLoading, false, theme));
};
