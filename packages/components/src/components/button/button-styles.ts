import type { BreakpointCustomizable, ButtonVariant, Theme, LinkButtonIconName } from '../../types';
import { getCss } from '../../utils';
import { getLinkButtonStyles } from '../../styles/link-button-styles';

export const getComponentCss = (
  icon: LinkButtonIconName,
  variant: ButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabledOrLoading: boolean,
  theme: Theme
): string => {
  return getCss(getLinkButtonStyles(icon, variant, hideLabel, isDisabledOrLoading, false, theme));
};
