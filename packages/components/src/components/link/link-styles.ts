import { getCss, isHighContrastMode, mergeDeep } from '../../utils';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, LinkButtonIconName, LinkVariant, Theme } from '../../types';
import {
  addImportantToEachRule,
  addImportantToRule,
  getFocusJssStyle,
  getHighContrastColors,
  getInsetJssStyle,
  getResetInitialStylesForSlottedAnchor,
} from '../../styles';
import { borderRadiusSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasSlottedAnchor: boolean,
  theme: Theme
): string => {
  const { linkColor } = getHighContrastColors();
  const isPrimary = variant === 'primary';

  return getCss(
    mergeDeep(
      getLinkButtonStyles(icon, iconSource, variant, hideLabel, false, hasSlottedAnchor, theme),
      {
        label: {
          clip: addImportantToRule('unset'), // to overrule breakpoint customizable hide-label style
        },
        icon: {
          ...(isPrimary &&
            !isHighContrastMode && {
              filter: 'invert(1)',
            }),
        },
      },
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
              ...getInsetJssStyle(-2),
              borderRadius: borderRadiusSmall,
            },
            ...getFocusJssStyle(theme, { slotted: true, pseudo: true }),
          },
        }),
      }
    )
  );
};
