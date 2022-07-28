import { getCss } from '../../../utils';
import { getLinkButtonStyles } from '../../../styles/link-button-styles';
import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../utils';
import type { LinkVariant } from '../../../types';

export const getComponentCss = (
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasSlottedAnchor: boolean,
  theme: ThemeExtendedElectric
): string => {
  return getCss(getLinkButtonStyles(variant, hideLabel, false, hasSlottedAnchor, theme));
};
