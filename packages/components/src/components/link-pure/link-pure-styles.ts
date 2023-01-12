import type { AlignLabel, BreakpointCustomizable, LinkButtonPureIconName, TextSize, Theme } from '../../types';
import { getCss, mergeDeep } from '../../utils';
import { addImportantToEachRule, getThemedColors } from '../../styles';
import { getLinkButtonPureStyles, offsetHorizontal, offsetVertical } from '../../styles/link-button-pure-styles';
import { borderRadiusSmall, borderWidthBase } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  icon: LinkButtonPureIconName,
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

  return getCss(
    mergeDeep(
      getLinkButtonPureStyles(icon, active, false, stretch, size, hideLabel, alignLabel, hasSlottedAnchor, theme),
      {
        ...(hasSlottedAnchor && {
          '@global': addImportantToEachRule({
            '::slotted': {
              '&(a)': {
                outline: 0,
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
                right: offsetHorizontal,
                bottom: offsetVertical,
                left: offsetHorizontal,
                borderRadius: borderRadiusSmall,
              },
              '&(a:focus)::before': {
                border: `${borderWidthBase} solid ${focusColor}`,
              },
              '&(a:focus:not(:focus-visible))::before': {
                border: 0,
              },
            },
          }),
        }),
        root: {
          textDecoration: underline ? 'underline' : 'none',
        },
      }
    )
  );
};
