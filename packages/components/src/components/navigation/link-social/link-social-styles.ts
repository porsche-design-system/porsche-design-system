import type { Theme } from '../../../types';
import type { SocialIconName } from './link-social-utils';
import type { BreakpointCustomizable } from '../../../utils';
import { buildResponsiveStyles, getCss, isThemeDark } from '../../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  getFocusJssStyle,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
} from '../../../styles';
import { colorExternal, textSmall } from '@porsche-design-system/utilities-v2';
import {
  getIconJssStyle,
  getLabelJssStyle,
  getRootJssStyle,
  getSlottedLinkJssStyle,
} from '../../../styles/link-button-styles';
import { hoverMediaQuery } from '../../../styles/hover-media-query';

const { contrastHighColor: themeLightContrastHighColor, baseColor: themeLightBaseColor } = getThemedColors('light');
const { baseColor: themeDarkBaseColor } = getThemedColors('dark');

const getColors = (
  icon: SocialIconName,
  theme: Theme
): { baseColor: string; baseColorHover: string; textColor: string; textColorHover: string } => {
  const isDarkTheme = isThemeDark(theme);
  const { contrastHighColorDarken, baseColorDarken } = getThemedColors(theme);
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
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        outline: addImportantToRule(0),
      },
      ...(!hasHref && {
        '::slotted': addImportantToEachRule({
          '&(a)': {
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            lineHeight: 'inherit',
            outline: 'transparent solid 1px',
            outlineOffset: '3px',
            ...buildResponsiveStyles(hideLabel, getSlottedLinkJssStyle),
          },
          // TODO: combine link-social-styles with link-button-styles and tabs-bar-styles
          '&(a::-moz-focus-inner)': {
            border: 0,
          },
          '&(a:focus)': {
            outlineColor: baseColor,
          },
          ...hoverMediaQuery({
            '&(a:hover:focus)': {
              outlineColor: baseColorHover,
            },
          }),
          '&(a:focus:not(:focus-visible))': {
            outlineColor: 'transparent',
          },
        }),
      }),
      span: {
        display: 'block',
        color: textColor,
        ...textSmall,
        ...buildResponsiveStyles(hideLabel, getLabelJssStyle),
      },
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
      ...hoverMediaQuery({
        '&:hover, &:active': {
          color: baseColorHover,
          '& span, & $icon': {
            color: textColorHover,
          },
        },
      }),
      ...(hasHref && {
        ...buildResponsiveStyles(hideLabel, getRootJssStyle),
        ...getFocusJssStyle(),
      }),
    },
    icon: {
      position: 'absolute',
      width: pxToRemWithUnit(24),
      height: pxToRemWithUnit(24),
      color: textColor,
      pointerEvents: 'none',
      ...buildResponsiveStyles(hideLabel, getIconJssStyle),
    },
  });
};
