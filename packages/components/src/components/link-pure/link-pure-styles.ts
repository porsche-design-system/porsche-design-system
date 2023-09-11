import type { AlignLabel, BreakpointCustomizable, LinkButtonIconName, TextSize, Theme } from '../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
import {
  addImportantToEachRule,
  getThemedColors,
  getResetInitialStylesForSlottedAnchor,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { getLinkButtonPureStyles, offsetHorizontal, offsetVertical } from '../../styles/link-button-pure-styles';
import { borderRadiusSmall, borderWidthBase } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  underline: boolean,
  hasSlottedAnchor: boolean,
  theme: Theme
): string => {
  const { focusColor } = getThemedColors(theme);
  const { focusColor: focusColorDark } = getThemedColors('dark');

  return getCss(
    mergeDeep(
      getLinkButtonPureStyles(
        icon,
        iconSource,
        active,
        false,
        stretch,
        size,
        hideLabel,
        alignLabel,
        hasSlottedAnchor,
        theme
      ),
      {
        root: {
          textDecoration: underline ? 'underline' : 'none',
        },
      },
      hasSlottedAnchor && {
        '@global': addImportantToEachRule({
          '::slotted': {
            '&(a)': {
              ...getResetInitialStylesForSlottedAnchor,
              textDecoration: underline ? 'underline' : 'none',
              font: 'inherit',
              color: 'inherit',
            },
            // The clickable area for Safari < ~15 (<= release date: 2021-10-28) is reduced to the slotted anchor itself,
            // since Safari prior to this major release does not support pseudo-elements in the slotted context
            // (https://bugs.webkit.org/show_bug.cgi?id=178237)
            '&(a)::before': {
              content: '""',
              position: 'fixed',
              top: offsetVertical,
              bottom: offsetVertical,
              borderRadius: borderRadiusSmall,
              ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
                right: hideLabelValue ? offsetVertical : offsetHorizontal,
                left: hideLabelValue ? offsetVertical : offsetHorizontal,
              })),
            },
            '&(a:focus)::before': {
              border: `${borderWidthBase} solid ${focusColor}`,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                borderColor: focusColorDark,
              }),
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
