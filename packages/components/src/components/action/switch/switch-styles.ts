import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, GetStylesFunction } from '../../../utils';
import type { AlignLabel, AlignLabelType, ThemeExtendedElectric } from '../../../types';
import { buildResponsiveStyles, getCss, isThemeLightElectric, mergeDeep } from '../../../utils';
import {
  addImportantToEachRule,
  getTextHiddenJssStyle,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
  getThemedColorsDarken,
} from '../../../styles';
import { spacing } from '@porsche-design-system/utilities-v2';

const getColors = (
  checked: boolean,
  isDisabledOrLoading: boolean,
  theme: ThemeExtendedElectric
): {
  backgroundColor: string;
  buttonBorderColor: string;
  buttonBorderColorHover: string;
  buttonBackgroundColor: string;
  buttonBackgroundColorHover: string;
  toggleBackgroundColor: string;
  toggleBackgroundColorHover: string;
  textColor: string;
} => {
  const { backgroundColor, baseColor, contrastHighColor, successColor, disabledColor, brandColor } =
    getThemedColors(theme);
  const { backgroundColor: lightThemeBackgroundColor } = getThemedColors('light');
  const { successColorDarken, hoverColorDarken } = getThemedColorsDarken(theme);
  const isLightElectricTheme = isThemeLightElectric(theme);
  const checkedColor = isLightElectricTheme ? brandColor : successColor;
  const disabledOrLoadingColor = isDisabledOrLoading && disabledColor;

  return {
    backgroundColor,
    buttonBorderColor: disabledOrLoadingColor || (checked ? checkedColor : contrastHighColor),
    buttonBorderColorHover: checked ? (isLightElectricTheme ? hoverColorDarken : successColorDarken) : baseColor,
    buttonBackgroundColor: checked ? disabledOrLoadingColor || checkedColor : 'transparent',
    buttonBackgroundColorHover: checked
      ? isLightElectricTheme
        ? hoverColorDarken
        : successColorDarken
      : 'transparent',
    toggleBackgroundColor:
      (!checked && disabledOrLoadingColor) || (checked ? lightThemeBackgroundColor : contrastHighColor),
    toggleBackgroundColorHover: checked ? lightThemeBackgroundColor : baseColor,
    textColor: disabledOrLoadingColor || baseColor,
  };
};

const getAlignLabelStyles: GetStylesFunction = (alignLabel: AlignLabelType): JssStyle => {
  const styles: { [key in AlignLabelType]: JssStyle } = {
    left: {
      order: 0,
      paddingLeft: 0,
      paddingRight: spacing[8],
    },
    right: {
      order: 1,
      paddingLeft: spacing[8],
      paddingRight: 0,
    },
  };
  return styles[alignLabel];
};

const getStretchStyles: GetStylesFunction = (stretch: boolean): JssStyle => {
  return stretch
    ? {
        width: '100%',
        justifyContent: 'space-between',
      }
    : {
        width: 'auto',
        justifyContent: 'flex-start',
      };
};

export const getComponentCss = (
  alignLabel: AlignLabel,
  hideLabel: BreakpointCustomizable<boolean>,
  stretch: BreakpointCustomizable<boolean>,
  checked: boolean,
  loading: boolean,
  isDisabledOrLoading: boolean,
  theme: ThemeExtendedElectric
): string => {
  const {
    backgroundColor,
    buttonBorderColor,
    buttonBorderColorHover,
    buttonBackgroundColor,
    buttonBackgroundColorHover,
    toggleBackgroundColor,
    toggleBackgroundColorHover,
    textColor,
  } = getColors(checked, isDisabledOrLoading, theme);

  return getCss({
    ':host': addImportantToEachRule({
      display: 'flex',
      outline: 0,
    }),
    root: {
      display: 'flex',
      minWidth: 0, // prevents flex child to overflow max available parent size
      minHeight: 0, // prevents flex child to overflow max available parent size
      cursor: isDisabledOrLoading ? 'auto' : 'pointer',
      ...buildResponsiveStyles(stretch, getStretchStyles),
    },
    '@global': {
      button: {
        position: 'relative',
        width: pxToRemWithUnit(48),
        height: pxToRemWithUnit(24),
        flexShrink: 0,
        display: 'block',
        margin: 0,
        padding: 0,
        appearance: 'none',
        boxSizing: 'border-box',
        color: buttonBorderColor,
        border: '1px solid currentColor',
        borderRadius: pxToRemWithUnit(12),
        backgroundColor: buttonBackgroundColor,
        outline: 'none',
        cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
        transition: `${getTransition('background-color')},${getTransition('border-color')},${getTransition('color')}`,
        ...(!isDisabledOrLoading && {
          '&:hover': {
            color: buttonBorderColorHover,
            backgroundColor: buttonBackgroundColorHover,
            '& .toggle': {
              backgroundColor: toggleBackgroundColorHover,
            },
          },
        }),
        '&:focus': {
          boxShadow: `0 0 0 2px ${backgroundColor}, 0 0 0 3px currentColor`,
        },
        '&:not(:focus-visible)': {
          boxShadow: 'none',
        },
      },
    },
    text: {
      minWidth: 0, // prevents flex child to overflow max available parent size
      minHeight: 0, // prevents flex child to overflow max available parent size
      color: textColor,
      ...mergeDeep(
        buildResponsiveStyles(alignLabel, getAlignLabelStyles),
        buildResponsiveStyles(hideLabel, getTextHiddenJssStyle)
      ),
    },
    toggle: {
      position: 'absolute',
      top: pxToRemWithUnit(2),
      left: pxToRemWithUnit(2),
      width: pxToRemWithUnit(18),
      height: pxToRemWithUnit(18),
      display: 'block',
      borderRadius: '50%',
      backgroundColor: toggleBackgroundColor,
      transform: `translate3d(${checked ? pxToRemWithUnit(24) : '0'}, 0, 0)`,
      transition: `${getTransition('background-color')},${getTransition('transform')}`,
    },
    ...(loading && {
      spinner: {
        position: 'absolute',
        top: pxToRemWithUnit(-3),
        left: pxToRemWithUnit(-3),
        width: pxToRemWithUnit(24),
        height: pxToRemWithUnit(24),
      },
    }),
  });
};
