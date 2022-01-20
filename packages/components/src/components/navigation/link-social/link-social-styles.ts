import type { Theme } from '../../../types';
import type { SocialIconName } from './link-social-utils';
import type { BreakpointCustomizable } from '../../../utils';
import { buildResponsiveStyles, getCss, isThemeDark } from '../../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  getFocusStyles,
  getTransition,
  pxToRemWithUnit,
} from '../../../styles/common';
import { color } from '@porsche-design-system/utilities';
import { getIconStyles, getLabelStyles, getRootStyles, getSlottedLinkStyles } from '../../../styles/link-button-styles';
import { getThemedColorsDarken } from '../../../styles/colors';

const getColors = (
  icon: SocialIconName,
  theme: Theme
): { baseColor: string; baseColorHover: string; textColor: string; textColorHover: string } => {
  const isDarkTheme = isThemeDark(theme);
  const { darkTheme } = color;
  const { contrastHighColorDarken, baseColorDarken } = getThemedColorsDarken(theme);
  const externalBrandColor = color.external[icon?.split('-')[1]];

  return {
    baseColor: isDarkTheme ? darkTheme.default : color.neutralContrast.high,
    baseColorHover: externalBrandColor || (isDarkTheme ? baseColorDarken : contrastHighColorDarken),
    textColor: isDarkTheme ? color.default : darkTheme.default,
    textColorHover: icon === 'logo-kakaotalk' ? color.default : externalBrandColor ? darkTheme.default : undefined,
  };
};

export const getComponentCss = (
  icon: SocialIconName,
  hideLabel: BreakpointCustomizable<boolean>,
  hasHref: boolean,
  theme: Theme
): string => {
  const { baseColor, baseColorHover, textColor, textColorHover } = getColors(icon, theme);

  return getCss({
    ':host': {
      display: 'inline-flex',
      verticalAlign: 'top',
      outline: addImportantToRule(0),
    },
    root: {
      display: 'flex',
      width: '100%',
      minWidth: pxToRemWithUnit(48),
      minHeight: pxToRemWithUnit(48),
      position: 'relative',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      outline: 'transparent none',
      appearance: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      textAlign: 'left',
      border: '1px solid currentColor',
      backgroundColor: 'currentColor',
      color: baseColor,
      transition:
        getTransition('background-color') + ',' + getTransition('border-color') + ',' + getTransition('color'),
      '&:hover, &:active': {
        color: baseColorHover,
        '& $label, & $icon': {
          color: textColorHover,
        },
      },
      ...(hasHref && {
        ...buildResponsiveStyles(hideLabel, getRootStyles),
        ...getFocusStyles(),
      }),
    },
    icon: {
      position: 'absolute',
      width: pxToRemWithUnit(24),
      height: pxToRemWithUnit(24),
      color: textColor,
      pointerEvents: 'none',
      ...buildResponsiveStyles(hideLabel, getIconStyles),
    },
    label: {
      display: 'block',
      boxSizing: 'border-box',
      color: textColor,
      ...buildResponsiveStyles(hideLabel, getLabelStyles),
    },
    ...(!hasHref &&
      addImportantToEachRule({
        '::slotted': {
          '&(a)': {
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            lineHeight: 'inherit',
            outline: 'transparent solid 1px',
            outlineOffset: '3px',
            ...buildResponsiveStyles(hideLabel, getSlottedLinkStyles),
          },
          '&(a::-moz-focus-inner)': {
            border: 0,
          },
          '&(a:focus)': {
            outlineColor: baseColor,
          },
          '&(a:hover:focus)': {
            outlineColor: baseColorHover,
          },
          '&(a:focus:not(:focus-visible))': {
            outlineColor: 'transparent',
          },
        },
      })),
  });
};
