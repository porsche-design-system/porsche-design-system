import {
  addImportantToEachRule,
  buildResponsiveStyles,
  getCss,
  getTextHiddenJssStyle,
  getThemedColors,
  getThemedColorsDarken,
  getTransition,
  isLightElectric,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../utils';
import type { BreakpointCustomizable, JssStyle, GetStylesFunction } from '../../../utils';
import type { AlignLabel, AlignLabelType, ThemeExtendedElectric } from '../../../types';
import { color, spacing } from '@porsche-design-system/utilities';

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
  const { successColorDarken, hoverColorDarken } = getThemedColorsDarken(theme);

  return {
    backgroundColor,
    buttonBorderColor: isDisabledOrLoading
      ? disabledColor
      : checked && isLightElectric(theme)
      ? brandColor
      : checked
      ? successColor
      : contrastHighColor,
    buttonBorderColorHover:
      checked && isLightElectric(theme) ? hoverColorDarken : checked ? successColorDarken : baseColor,
    buttonBackgroundColor:
      isDisabledOrLoading && checked
        ? disabledColor
        : checked && isLightElectric(theme)
        ? brandColor
        : checked
        ? successColor
        : 'transparent',
    buttonBackgroundColorHover:
      checked && isLightElectric(theme) ? hoverColorDarken : checked ? successColorDarken : 'transparent',
    toggleBackgroundColor:
      isDisabledOrLoading && !checked ? disabledColor : checked ? color.background.default : contrastHighColor,
    toggleBackgroundColorHover: checked ? color.background.default : baseColor,
    textColor: isDisabledOrLoading ? disabledColor : baseColor,
  };
};

const getAlignLabelStyles: GetStylesFunction = (alignLabel: AlignLabelType): JssStyle => {
  const styles: { [key in AlignLabelType]: JssStyle } = {
    left: {
      order: 0,
      paddingLeft: 0,
      paddingRight: spacing['8'],
    },
    right: {
      order: 1,
      paddingLeft: spacing['8'],
      paddingRight: 0,
    },
  };
  return styles[alignLabel];
};

const getHideLabelStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel ? getTextHiddenJssStyle(true) : getTextHiddenJssStyle(false);
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
        buildResponsiveStyles(hideLabel, getHideLabelStyles)
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
