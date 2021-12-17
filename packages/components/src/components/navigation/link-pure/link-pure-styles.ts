import type { BreakpointCustomizable } from '../../../utils';
import { buildSlottedStyles, getCss, getFocusSlottedPseudoStyles } from '../../../utils';
import type { AlignLabel, LinkButtonPureIconName, TextSize, ThemeExtendedElectric } from '../../../types';
import { getLinkButtonPureStyles } from '../../../styles/link-button-pure-styles';

export const getComponentCss = (
  icon: LinkButtonPureIconName,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: AlignLabel,
  hasSubline: boolean,
  hasSlottedAnchor: boolean,
  theme: ThemeExtendedElectric
): string => {
  return getCss({
    ...getLinkButtonPureStyles(
      icon,
      active,
      false,
      stretch,
      size,
      hideLabel,
      alignLabel,
      hasSubline,
      hasSlottedAnchor,
      theme
    ),
    '::slotted(p)': {
      margin: 0,
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getFocusSlottedPseudoStyles({ offset: 1 })));
};
