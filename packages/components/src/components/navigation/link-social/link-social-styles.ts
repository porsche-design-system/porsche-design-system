import {
  addImportantToEachRule,
  BreakpointCustomizable,
  buildResponsiveStyles,
  getCss,
  getFocusStyles,
  getThemedColorsDarken,
  getTransition,
  isDark,
  mergeDeep,
  pxToRemWithUnit,
  Styles,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import type { Theme } from '../../../types';
import type { SocialIconName } from './link-social-utils';
import { getIconLabelStyles, getRootStyles, getSlottedLinkStyles } from '../../../styles/link-button-styles';

const getColors = (
  icon: SocialIconName,
  theme: Theme
): { baseColor: string; baseColorHover: string; textColor: string; textColorHover: string } => {
  const isDarkTheme = isDark(theme);
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

  return getCss(
    mergeDeep<Styles>(
      {
        ':host': {
          display: 'inline-flex',
          verticalAlign: 'top',
          cursor: 'pointer',
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
          appearance: 'none',
          textDecoration: 'none',
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
          ...(hasHref && getFocusStyles()),
        },
        icon: {
          position: 'absolute',
          width: pxToRemWithUnit(24),
          height: pxToRemWithUnit(24),
          color: textColor,
          pointerEvents: 'none',
        },
        label: {
          display: 'block',
          boxSizing: 'border-box',
          color: textColor,
        },
        ...(!hasHref &&
          addImportantToEachRule({
            '::slotted(a)': {
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              lineHeight: 'inherit',
              outline: 'transparent solid 1px',
              outlineOffset: '3px',
            },
            '::slotted(a::-moz-focus-inner)': {
              border: 0,
            },
            '::slotted(a:focus)': {
              outlineColor: baseColor,
            },
            '::slotted(a:hover:focus)': {
              outlineColor: baseColorHover,
            },
            '::slotted(a:focus:not(:focus-visible))': {
              outlineColor: 'transparent',
            },
          })),
      },
      // TODO: would be better to handle one responsive style prop by one style function
      buildResponsiveStyles(hideLabel, getIconLabelStyles),
      hasHref ? buildResponsiveStyles(hideLabel, getRootStyles) : buildResponsiveStyles(hideLabel, getSlottedLinkStyles)
    )
  );
};
