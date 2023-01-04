import { getCss } from '../../utils';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, LinkVariant, Theme } from '../../types';

export const getComponentCss = (
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasSlottedAnchor: boolean,
  theme: Theme
): string => {
  return getCss(getLinkButtonStyles(variant, hideLabel, false, hasSlottedAnchor, theme));
};
