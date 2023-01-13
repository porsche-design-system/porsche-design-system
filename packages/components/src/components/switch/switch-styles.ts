import type { AlignLabel, BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
import {
  addImportantToEachRule,
  getTextHiddenJssStyle,
  getTransition,
  getThemedColors,
  getInsetJssStyle,
  addImportantToRule,
} from '../../styles';
import { borderWidthBase, textSmallStyle, borderRadiusLarge } from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';

const getColors = (
  checked: boolean,
  disabled: boolean,
  loading: boolean,
  isDisabledOrLoading: boolean,
  theme: Theme
): {
  buttonBorderColor: string;
  buttonBorderColorHover: string;
  buttonBackgroundColor: string;
  buttonBackgroundColorHover: string;
  toggleBackgroundColor: string;
  toggleBackgroundColorHover: string;
  textColor: string;
} => {
  const { primaryColor, contrastMediumColor, successColor, successColorDarken, disabledColor } = getThemedColors(theme);
  const { backgroundColor: lightThemeBackgroundColor } = getThemedColors('light');
  const checkedColor = successColor;
  const disabledOrLoadingColor = isDisabledOrLoading && disabledColor;

  return {
    buttonBorderColor: disabledOrLoadingColor || (checked ? checkedColor : contrastMediumColor),
    buttonBorderColorHover: checked ? successColorDarken : primaryColor,
    buttonBackgroundColor: checked ? disabledOrLoadingColor || checkedColor : 'transparent',
    buttonBackgroundColorHover: checked ? successColorDarken : 'transparent',
    toggleBackgroundColor:
      (loading && 'transparent') ||
      (disabled && !checked && disabledColor) ||
      (checked ? lightThemeBackgroundColor : primaryColor),
    toggleBackgroundColorHover: checked ? lightThemeBackgroundColor : primaryColor,
    textColor: disabledOrLoadingColor || primaryColor,
  };
};

export const getComponentCss = (
  alignLabel: BreakpointCustomizable<AlignLabel>,
  hideLabel: BreakpointCustomizable<boolean>,
  stretch: BreakpointCustomizable<boolean>,
  checked: boolean,
  disabled: boolean,
  loading: boolean,
  isDisabledOrLoading: boolean,
  theme: Theme
): string => {
  const {
    buttonBorderColor,
    buttonBorderColorHover,
    buttonBackgroundColor,
    buttonBackgroundColorHover,
    toggleBackgroundColor,
    toggleBackgroundColorHover,
    textColor,
  } = getColors(checked, disabled, loading, isDisabledOrLoading, theme);
  const { focusColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          outline: 0, // custom element is able to delegate the focus
        }),
        ...buildResponsiveStyles(stretch, (stretchValue: boolean) => ({
          display: stretchValue ? 'block' : 'inline-block',
          ...(!stretchValue && { verticalAlign: 'top' }),
        })),
      },
      ':host([hidden])': {
        display: addImportantToRule('none'),
      },
      button: {
        position: 'relative',
        width: '56px',
        height: '28px',
        flexShrink: 0,
        display: 'block',
        margin: 0,
        padding: 0,
        appearance: 'none',
        boxSizing: 'border-box',
        border: `${borderWidthBase} solid ${buttonBorderColor}`,
        borderRadius: borderRadiusLarge,
        backgroundColor: buttonBackgroundColor,
        outline: 0,
        cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
        transition: `${getTransition('background-color')},${getTransition('border-color')},${getTransition('color')}`,
        ...(!isDisabledOrLoading &&
          hoverMediaQuery({
            '&:hover': {
              borderColor: buttonBorderColorHover,
              backgroundColor: buttonBackgroundColorHover,
              '& .toggle': {
                backgroundColor: toggleBackgroundColorHover,
              },
            },
          })),
        '&:focus::before': {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(checked ? -6 : -2),
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: `calc(${borderRadiusLarge} + ${checked ? '4px' : '0px'})`,
        },
        '&:not(:focus-visible)::before': {
          borderColor: 'transparent',
        },
      },
    },
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      width: '100%',
      minWidth: 0, // prevents flex child to overflow max available parent size
      minHeight: 0, // prevents flex child to overflow max available parent size
      cursor: isDisabledOrLoading ? 'auto' : 'pointer',
      ...buildResponsiveStyles(stretch, (stretchValue: boolean) => ({
        justifyContent: stretchValue ? 'space-between' : 'flex-start',
      })),
    },
    text: {
      ...textSmallStyle,
      paddingTop: '2px',
      minWidth: 0, // prevents flex child to overflow max available parent size
      minHeight: 0, // prevents flex child to overflow max available parent size
      color: textColor,
      ...mergeDeep(
        buildResponsiveStyles(alignLabel, (alignLabelValue: AlignLabel) => ({
          order: alignLabelValue === 'left' ? -1 : 0,
        })),
        buildResponsiveStyles(hideLabel, getTextHiddenJssStyle)
      ),
    },
    toggle: {
      position: 'absolute',
      top: '2px',
      left: '2px',
      width: '20px',
      height: '20px',
      display: 'block',
      borderRadius: '50%',
      backgroundColor: toggleBackgroundColor,
      transform: `translate3d(${checked ? '28px' : '0'}, 0, 0)`,
      transition: `${getTransition('background-color')},${getTransition('transform')}`,
    },
    ...(loading && {
      spinner: {
        position: 'absolute',
        top: '-4px',
        left: '-4px',
        width: '28px',
        height: '28px',
      },
    }),
  });
};
