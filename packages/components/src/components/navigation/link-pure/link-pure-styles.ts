import type { BreakpointCustomizable } from '../../../utils';
import type { AlignLabel, LinkButtonPureIconName, TextSize, ThemeExtendedElectricDark } from '../../../types';
import { buildSlottedStyles, getCss, mergeDeep } from '../../../utils';
import { getFocusSlottedPseudoStyles, getThemedColors } from '../../../styles';
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
  theme: ThemeExtendedElectricDark
): string => {
  const { baseColor, hoverColor, activeColor } = getThemedColors(theme);

  return getCss(
    mergeDeep(
      getLinkButtonPureStyles(
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
      // TODO:V3 should be removed, we shouldn't support this although some CMS are rendering an <a> with a wrapped <p>. Instead CMS output shall be post processed because it's necessary to use the PDS component anyway.
      {
        '@global': {
          '::slotted(p)': {
            margin: 0,
          },
          // TODO: Workaround for Chrome hover bug. Remove when fixed.
          '::slotted(a)': {
            color: active ? activeColor : baseColor,
          },
          '::slotted(a:hover)': {
            color: hoverColor,
          },
        },
      }
    )
  );
};

// TODO:V3 ::slotted(a) should be used instead
export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getFocusSlottedPseudoStyles({ offset: 1 })));
};
