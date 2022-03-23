import type { Styles } from 'jss';
import type { BreakpointCustomizable } from '../../../utils';
import type { AlignLabel, LinkButtonPureIconName, TextSize, ThemeExtendedElectricDark } from '../../../types';
import { buildSlottedStyles, getCss, mergeDeep } from '../../../utils';
import { getInset, getThemedColors, getTransition } from '../../../styles';
import { getLinkButtonPureStyles } from '../../../styles/link-button-pure-styles';

export type GetFocusSlottedPseudoStylesOptions = {
  color?: string;
  offset?: number;
};

/**
 * this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-(
 */
export const getFocusSlottedPseudoStyles = (opts?: GetFocusSlottedPseudoStylesOptions): Styles<'& a'> => {
  const { offset: outlineOffset, color: outlineColor }: GetFocusSlottedPseudoStylesOptions = {
    color: 'currentColor',
    offset: 2,
    ...opts,
  };

  return {
    '& a': {
      display: 'block',
      position: 'static',
      textDecoration: 'none',
      font: 'inherit',
      // color: 'inherit', // TODO: chrome hover bug. Use when fixed.
      transition: getTransition('color'), // TODO: chrome hover bug. Remove when fixed.
      outline: 'transparent none',
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        ...getInset(),
        outline: '1px solid transparent',
        outlineOffset: `${outlineOffset}px`,
      },
      '&:focus::before': {
        outlineColor,
      },
      '&:focus:not(:focus-visible)::before': {
        outlineColor: 'transparent',
      },
    },
  };
};

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
  return getCss(buildSlottedStyles(host, getFocusSlottedPseudoStyles({ offset: 1 })));
};
