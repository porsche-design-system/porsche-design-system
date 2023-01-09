import type {
  AlignLabel,
  BreakpointCustomizable,
  LinkButtonPureIconName,
  TextSize,
  TextWeight,
  ThemeExtendedElectricDark,
} from '../../types';
import { getCss, mergeDeep } from '../../utils';
import { getInsetJssStyle, addImportantToEachRule } from '../../styles';
import { getLinkButtonPureStyles } from '../../styles/link-button-pure-styles';

export const getComponentCss = (
  icon: LinkButtonPureIconName,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  hasSubline: boolean,
  hasSlottedAnchor: boolean,
  theme: ThemeExtendedElectricDark
): string => {
  return getCss(
    mergeDeep(
      getLinkButtonPureStyles(
        icon,
        active,
        false,
        stretch,
        size,
        weight,
        hideLabel,
        alignLabel,
        hasSubline,
        hasSlottedAnchor,
        theme
      ),
      {
        '@global': {
          '::slotted': {
            '&(a)': addImportantToEachRule({
              display: 'block',
              position: 'static',
              textDecoration: 'none',
              font: 'inherit',
              color: 'inherit',
              outline: 0,
            }),
            // The clickable area for Safari < ~15 (<= release date: 2021-10-28) is reduced to the slotted anchor itself,
            // since Safari prior to this major release does not support pseudo-elements in the slotted context
            // (https://bugs.webkit.org/show_bug.cgi?id=178237)
            '&(a)::before': {
              content: '""',
              position: 'absolute',
              ...getInsetJssStyle(),
              outline: '1px solid transparent',
              outlineOffset: '1px',
            },
            // The focusable area for Safari < ~15 (<= release date: 2021-10-28) is reduced to the slotted anchor itself
            // and uses the browser's default style, since Safari prior to this major version does not support
            // pseudo-elements in the slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237)
            '&(a:focus)::before': {
              outlineColor: 'currentColor',
            },
            '&(a:focus:not(:focus-visible))::before': {
              outlineColor: 'transparent',
            },
          },
          'slot[name=subline]::slotted(*)': {
            margin: 0,
          },
        },
      }
    )
  );
};
