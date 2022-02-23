import type { Theme } from '../../../types';
import type { SocialIconName } from './link-social-utils';
import type { BreakpointCustomizable } from '../../../utils';
import { buildResponsiveStyle, getCss, isThemeDark } from '../../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  getFocusStyle,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
  getThemedColorsDarken,
} from '../../../styles';
import { colorExternal } from '@porsche-design-system/utilities-v2';
import { getIconStyle, getLabelStyle, getRootStyle, getSlottedLinkStyle } from '../../../styles/link-button-styles';

const { contrastHighColor: themeLightContrastHighColor, baseColor: themeLightBaseColor } = getThemedColors('light');
const { baseColor: themeDarkBaseColor } = getThemedColors('dark');

const getColors = (
  icon: SocialIconName,
  theme: Theme
): { baseColor: string; baseColorHover: string; textColor: string; textColorHover: string } => {
  const isDarkTheme = isThemeDark(theme);
  const { contrastHighColorDarken, baseColorDarken } = getThemedColorsDarken(theme);
  const externalBrandColor = colorExternal[icon?.split('-')[1]];

  return {
    baseColor: isDarkTheme ? themeDarkBaseColor : themeLightContrastHighColor,
    baseColorHover: externalBrandColor || (isDarkTheme ? baseColorDarken : contrastHighColorDarken),
    textColor: isDarkTheme ? themeLightBaseColor : themeDarkBaseColor,
    textColorHover:
      icon === 'logo-kakaotalk' ? themeLightBaseColor : externalBrandColor ? themeDarkBaseColor : undefined,
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
        ...buildResponsiveStyle(hideLabel, getRootStyle),
        ...getFocusStyle(),
      }),
    },
    icon: {
      position: 'absolute',
      width: pxToRemWithUnit(24),
      height: pxToRemWithUnit(24),
      color: textColor,
      pointerEvents: 'none',
      ...buildResponsiveStyle(hideLabel, getIconStyle),
    },
    label: {
      display: 'block',
      boxSizing: 'border-box',
      color: textColor,
      ...buildResponsiveStyle(hideLabel, getLabelStyle),
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
            ...buildResponsiveStyle(hideLabel, getSlottedLinkStyle),
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
