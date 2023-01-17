import type { BreakpointCustomizable, ButtonVariant, Theme, LinkButtonIconName } from '../../types';
import { getCss } from '../../utils';
import { getLinkButtonStyles } from '../../styles/link-button-styles';

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: ButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabledOrLoading: boolean,
  theme: Theme
): string => {
  return getCss(getLinkButtonStyles(icon, iconSource, variant, hideLabel, isDisabledOrLoading, false, theme));
};
