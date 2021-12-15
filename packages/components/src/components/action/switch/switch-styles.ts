import {
  addImportantToEachRule,
  buildResponsiveStyles,
  colorDarken,
  getCss,
  GetStylesFunction,
  getTextHiddenJssStyle,
  getThemedColors,
  getTransition,
  isDark,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../utils';
import type { BreakpointCustomizable, JssStyle } from '../../../utils';
import type { Theme } from '../../../types';
import { AlignLabel, AlignLabelType } from '../../../types';
import { color, spacing } from '@porsche-design-system/utilities';

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
  isDisabledOrLoading: boolean,
  theme: Theme
): string => {
  const { baseColor, contrastHighColor, successColor, disabledColor, backgroundColor } = getThemedColors(theme);

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
        color: isDisabledOrLoading ? disabledColor : checked ? successColor : contrastHighColor,
        border: '1px solid currentColor',
        borderRadius: pxToRemWithUnit(12),
        backgroundColor: isDisabledOrLoading && checked ? disabledColor : checked ? successColor : 'transparent',
        outline: 'none',
        cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
        transition: `${getTransition('background-color')},${getTransition('border-color')},${getTransition('color')}`,
        ...(!isDisabledOrLoading && {
          '&:hover': {
            color:
              checked && isDark(theme)
                ? colorDarken.darkTheme.notification.success
                : checked
                ? colorDarken.notification.success
                : baseColor,
            backgroundColor:
              checked && isDark(theme)
                ? colorDarken.darkTheme.notification.success
                : checked
                ? colorDarken.notification.success
                : 'transparent',
            '& > .toggle': {
              backgroundColor: checked ? color.background.default : baseColor,
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
      color: isDisabledOrLoading ? disabledColor : baseColor,
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
      backgroundColor:
        isDisabledOrLoading && !checked ? disabledColor : checked ? color.background.default : contrastHighColor,
      transform: `translate3d(${checked ? pxToRemWithUnit(24) : '0'}, 0, 0)`,
      transition: `${getTransition('background-color')},${getTransition('transform')}`,
    },
    spinner: {
      position: 'absolute',
      top: pxToRemWithUnit(-3),
      left: pxToRemWithUnit(-3),
      width: pxToRemWithUnit(24),
      height: pxToRemWithUnit(24),
    },
  });
};
