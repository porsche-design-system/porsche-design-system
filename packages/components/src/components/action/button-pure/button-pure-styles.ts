import type { BreakpointCustomizable } from '../../../utils';
import { getCss } from '../../../utils';
import type { AlignLabel, LinkButtonPureIconName, TextSize, ThemeExtendedElectric } from '../../../types';
import { getLinkButtonPureStyles } from '../../../styles/link-button-pure-styles';

export const getComponentCss = (
  icon: LinkButtonPureIconName,
  active: boolean,
  isDisabledOrLoading: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: AlignLabel,
  hasSubline: boolean,
  theme: ThemeExtendedElectric
): string => {
  return getCss(
    getLinkButtonPureStyles(
      icon,
      active,
      isDisabledOrLoading,
      stretch,
      size,
      hideLabel,
      alignLabel,
      hasSubline,
      false,
      theme
    )
  );
};
