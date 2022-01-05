import type { BreakpointCustomizable, JssStyle, Styles } from '../utils';
import {
  addImportantToEachRule,
  buildResponsiveStyles,
  getFocusStyles,
  getInset,
  GetStylesFunction,
  getThemedColors,
  getThemedColorsDarken,
  getTransition,
  isDark,
  pxToRemWithUnit,
} from '../utils';
import { color } from '@porsche-design-system/utilities';
import type { LinkButtonVariant, ThemeExtendedElectric } from '../types';

const { darkTheme } = color;

const getVariantColors = (
  variant: LinkButtonVariant,
  theme: ThemeExtendedElectric
): { primaryColor: string; primaryColorHover: string; baseColor: string } => {
  const { brandColor, baseColor, contrastHighColor } = getThemedColors(theme);
  const { hoverColorDarken, contrastHighColorDarken, baseColorDarken } = getThemedColorsDarken(theme);

  const colors: {
    [t in ThemeExtendedElectric]: {
      [v in LinkButtonVariant]: { primaryColor: string; primaryColorHover: string; baseColor: string };
    };
  } = {
    light: {
      primary: {
        primaryColor: brandColor,
        primaryColorHover: hoverColorDarken,
        baseColor: darkTheme.default,
      },
      secondary: {
        primaryColor: contrastHighColor,
        primaryColorHover: contrastHighColorDarken,
        baseColor: darkTheme.default,
      },
      tertiary: {
        primaryColor: contrastHighColor,
        primaryColorHover: contrastHighColorDarken,
        baseColor,
      },
    },
    dark: {
      primary: {
        primaryColor: brandColor,
        primaryColorHover: hoverColorDarken,
        baseColor: darkTheme.default,
      },
      secondary: {
        primaryColor: darkTheme.default,
        primaryColorHover: baseColorDarken,
        baseColor: color.default,
      },
      tertiary: {
        primaryColor: darkTheme.default,
        primaryColorHover: darkTheme.default,
        baseColor,
      },
    },
    'light-electric': {
      primary: {
        primaryColor: brandColor,
        primaryColorHover: hoverColorDarken,
        baseColor: darkTheme.default,
      },
      secondary: {
        primaryColor: contrastHighColor,
        primaryColorHover: contrastHighColorDarken,
        baseColor: darkTheme.default,
      },
      tertiary: {
        primaryColor: contrastHighColor,
        primaryColorHover: contrastHighColorDarken,
        baseColor,
      },
    },
  };

  return colors[theme][variant];
};

const linkButtonPadding = `${pxToRemWithUnit(11)} ${pxToRemWithUnit(15)} ${pxToRemWithUnit(11)} ${pxToRemWithUnit(39)}`;

export const getRootStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return {
    padding: hideLabel ? 0 : linkButtonPadding,
  };
};

export const getIconStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        left: '50%',
        top: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
      }
    : {
        left: pxToRemWithUnit(11),
        top: pxToRemWithUnit(11),
        transform: 'translate3d(0,0,0)',
      };
};

export const getLabelStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        width: 1,
        height: 1,
        margin: '0 0 0 -1px',
        overflow: 'hidden',
        textIndent: -1,
      }
    : {
        width: '100%',
        height: 'auto',
        margin: 0,
        overflow: 'visible',
        textIndent: 0,
      };
};

export const getSlottedLinkStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        position: 'absolute',
        ...getInset(),
        padding: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textIndent: '99999px',
      }
    : {
        position: 'static',
        ...getInset('auto'),
        padding: linkButtonPadding,
        overflow: 'visible',
        whiteSpace: 'normal',
        textIndent: 0,
      };
};

export const getLinkButtonStyles = (
  variant: LinkButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabledOrLoading: boolean,
  hasSlottedAnchor: boolean,
  theme: ThemeExtendedElectric
): Styles => {
  const isDarkTheme = isDark(theme);
  const isTertiary = variant === 'tertiary';
  const { primaryColor, primaryColorHover, baseColor } = getVariantColors(variant, theme);
  const { disabledColor } = getThemedColors(theme);
  const iconLabelColor = isDisabledOrLoading ? (isTertiary ? disabledColor : 'rgba(255, 255, 255, 0.55)') : baseColor;

  return {
    ':host': {
      display: 'inline-flex',
      verticalAlign: 'top',
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
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      textAlign: 'left',
      border: '1px solid currentColor',
      backgroundColor: isTertiary ? 'transparent' : 'currentColor',
      color: isDisabledOrLoading ? disabledColor : primaryColor,
      transition:
        getTransition('background-color') + ',' + getTransition('border-color') + ',' + getTransition('color'),
      ...(!hasSlottedAnchor && {
        ...buildResponsiveStyles(hideLabel, getRootStyles),
        ...getFocusStyles(),
      }),
      ...(!isDisabledOrLoading && {
        '&:hover, &:active': {
          color: primaryColorHover,
          ...(isTertiary && {
            backgroundColor: 'currentColor',
            '& $label, & $icon': {
              color: isDarkTheme ? color.default : darkTheme.default,
            },
          }),
        },
      }),
    },
    icon: {
      position: 'absolute',
      width: pxToRemWithUnit(24),
      height: pxToRemWithUnit(24),
      color: iconLabelColor,
      pointerEvents: 'none',
      ...buildResponsiveStyles(hideLabel, getIconStyles),
    },
    label: {
      display: 'block',
      boxSizing: 'border-box',
      color: iconLabelColor,
      ...buildResponsiveStyles(hideLabel, getLabelStyles),
    },
    ...(hasSlottedAnchor &&
      addImportantToEachRule({
        '::slotted(a)': {
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          lineHeight: 'inherit',
          outline: 'transparent solid 1px',
          outlineOffset: '3px',
          ...buildResponsiveStyles(hideLabel, getSlottedLinkStyles),
        },
        '::slotted(a::-moz-focus-inner)': {
          border: 0,
        },
        '::slotted(a:focus)': {
          outlineColor: primaryColor,
        },
        '::slotted(a:hover:focus)': {
          outlineColor: primaryColorHover,
        },
        '::slotted(a:focus:not(:focus-visible))': {
          outlineColor: 'transparent',
        },
      })),
  };
};
