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
  mergeDeep,
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

// TODO: can be optimized by reducing getVisibilityStyle + getSlottedLinkStyles depending on hasHref prop
export const getVisibilityStyle = (visible: boolean): JssStyle => {
  return visible
    ? {
        width: '100%',
        height: 'auto',
        margin: 0,
        overflow: 'visible',
        textIndent: 0,
      }
    : {
        width: 1,
        height: 1,
        margin: '0 0 0 -1px',
        overflow: 'hidden',
        textIndent: -1,
      };
};

const linkPadding = `${pxToRemWithUnit(11)} ${pxToRemWithUnit(15)} ${pxToRemWithUnit(11)} ${pxToRemWithUnit(39)}`;

export const getRootStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => ({
  root: {
    padding: hideLabel ? 0 : linkPadding,
  },
});

export const getIconLabelStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        icon: {
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
        },
        label: getVisibilityStyle(!hideLabel),
      }
    : {
        icon: {
          left: pxToRemWithUnit(11),
          top: pxToRemWithUnit(11),
          transform: 'translate3d(0,0,0)',
        },
        label: getVisibilityStyle(!hideLabel),
      };
};

export const getSlottedLinkStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return addImportantToEachRule({
    '::slotted(a)': hideLabel
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
          padding: linkPadding,
          overflow: 'visible',
          whiteSpace: 'normal',
          textIndent: 0,
        },
  });
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

  return mergeDeep<Styles>(
    {
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
        appearance: 'none',
        textDecoration: 'none',
        textAlign: 'left',
        border: '1px solid currentColor',
        backgroundColor: isTertiary ? 'transparent' : 'currentColor',
        cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
        color: isDisabledOrLoading ? disabledColor : primaryColor,
        transition:
          getTransition('background-color') + ',' + getTransition('border-color') + ',' + getTransition('color'),
        ...(!hasSlottedAnchor && getFocusStyles()),
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
      },
      label: {
        display: 'block',
        boxSizing: 'border-box',
        color: iconLabelColor,
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
    },
    // TODO: would be better to handle one responsive style prop by one style function
    buildResponsiveStyles(hideLabel, getIconLabelStyles),
    !hasSlottedAnchor
      ? buildResponsiveStyles(hideLabel, getRootStyles)
      : buildResponsiveStyles(hideLabel, getSlottedLinkStyles)
  );
};
