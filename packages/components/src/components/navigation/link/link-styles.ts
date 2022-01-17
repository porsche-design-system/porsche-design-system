import { getCss } from '../../../utils';
import { getLinkButtonStyles } from '../../../styles/link-button-styles';
import type { BreakpointCustomizable } from '../../../utils';
import type { LinkVariant, ThemeExtendedElectric } from '../../../types';

export const getComponentCss = (
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasSlottedAnchor: boolean,
  theme: ThemeExtendedElectric
): string => {
  return getCss(getLinkButtonStyles(variant, hideLabel, false, hasSlottedAnchor, theme));
};
