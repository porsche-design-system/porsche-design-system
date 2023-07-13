import { buildResponsiveStyles, getCss, isHighContrastMode, mergeDeep } from '../../utils';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, LinkButtonIconName, LinkVariant, Theme } from '../../types';
import {
  addImportantToEachRule,
  getHighContrastColors,
  getInsetJssStyle,
  getResetInitialStylesForSlottedAnchor,
  getThemedColors,
} from '../../styles';
import { borderRadiusMedium, borderWidthBase } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasSlottedAnchor: boolean,
  theme: Theme
): string => {
  const { linkColor } = getHighContrastColors();

  return getCss(
    mergeDeep(
      getLinkButtonStyles(icon, iconSource, variant, hideLabel, false, hasSlottedAnchor, theme),
      hasSlottedAnchor && {
        ...(isHighContrastMode && {
          root: {
            borderColor: linkColor,
          },
        }),
        '@global': addImportantToEachRule({
          '::slotted': {
            '&(a)': {
              ...getResetInitialStylesForSlottedAnchor,
              textDecoration: 'none',
              font: 'inherit',
              color: 'inherit',
            },
            // The clickable area for Safari < ~15 (<= release date: 2021-10-28) is reduced to the slotted anchor itself,
            // since Safari prior to this major release does not support pseudo-elements in the slotted context
            // (https://bugs.webkit.org/show_bug.cgi?id=178237)
            '&(a)::before': {
              content: '""',
              position: 'fixed',
              borderRadius: borderRadiusMedium,
              ...getInsetJssStyle(-6),
            },
            // TODO: combine link-social-styles with link-button-styles and tabs-bar-styles
            '&(a::-moz-focus-inner)': {
              border: 0,
            },
            '&(a:focus)::before': {
              ...buildResponsiveStyles(theme, (theme: Theme) => ({
                border: `${borderWidthBase} solid ${getThemedColors(theme).focusColor}`,
              })),
            },
            '&(a:focus:not(:focus-visible))::before': {
              border: 0,
            },
          },
        }),
      }
    )
  );
};
