import type {
  AlignLabel,
  BreakpointCustomizable,
  LinkButtonPureIconName,
  TextSize,
  TextWeight,
  ThemeExtendedElectricDark,
} from '../../../types';
import { buildSlottedStyles, getCss, mergeDeep } from '../../../utils';
import { getFocusJssStyle, getThemedColors, getTransition } from '../../../styles';
import { getLinkButtonPureStyles } from '../../../styles/link-button-pure-styles';

export const getComponentCss = (
  icon: LinkButtonPureIconName,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
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
        weight,
        hideLabel,
        alignLabel,
        hasSubline,
        hasSlottedAnchor,
        theme
      ),
      // TODO:V3 should be removed, we shouldn't support this although some CMS are rendering an <a> with a wrapped <p>. Instead CMS output shall be post processed because it's necessary to use the PDS component anyway.
      {
        '@global': {
          '::slotted': {
            '&(p)': {
              margin: 0,
            },
            '&(a)': {
              color: active ? activeColor : baseColor, // TODO: chrome hover bug. Remove when fixed.
            },
            '&(a:hover)': {
              color: hoverColor, // TODO: chrome hover bug. Remove when fixed.
            },
          },
        },
      }
    )
  );
};

// TODO:V3 ::slotted(a) should be used instead
export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      /**
       * this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-(
       */
      '& a': {
        display: 'block',
        position: 'static',
        textDecoration: 'none',
        font: 'inherit',
        // color: 'inherit', // TODO: chrome hover bug. Use when fixed.
        transition: getTransition('color'), // TODO: chrome hover bug. Remove when fixed.
        ...getFocusJssStyle({ pseudo: '::before', offset: 1 }),
      },
    })
  );
};
