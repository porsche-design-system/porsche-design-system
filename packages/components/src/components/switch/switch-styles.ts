import type { AlignLabel, BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isDisabledOrLoading, mergeDeep } from '../../utils';
import {
  addImportantToEachRule,
  getTextHiddenJssStyle,
  getTransition,
  getThemedColors,
  getInsetJssStyle,
} from '../../styles';
import { borderWidthBase, spacingStaticSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

const getColors = (
  checked: boolean,
  disabled: boolean,
  loading: boolean,
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
  const disabledOrLoadingColor = isDisabledOrLoading(disabled, loading) && disabledColor;

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
  } = getColors(checked, disabled, loading, theme);
  const { focusColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...hostHiddenStyles,
        outline: 0, // custom element is able to delegate the focus
        ...buildResponsiveStyles(stretch, (stretchValue: boolean) => ({
          display: stretchValue ? 'block' : 'inline-block',
          ...(!stretchValue && { verticalAlign: 'top' }),
        })),
      }),
    },
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: spacingStaticSmall,
      width: '100%',
      padding: 0,
      outline: 0,
      border: 0,
      textAlign: 'left',
      background: 'transparent',
      appearance: 'none',
      cursor: isDisabledOrLoading(disabled, loading) ? 'auto' : 'pointer',
      ...buildResponsiveStyles(stretch, (stretchValue: boolean) => ({
        justifyContent: stretchValue ? 'space-between' : 'flex-start',
      })),
      ...(!isDisabledOrLoading(disabled, loading) &&
        hoverMediaQuery({
          '&:hover .switch': {
            borderColor: buttonBorderColorHover,
            backgroundColor: buttonBackgroundColorHover,
            '& .toggle': {
              backgroundColor: toggleBackgroundColorHover,
            },
          },
        })),
      '&:focus .switch::before': {
        content: '""',
        position: 'absolute',
        ...getInsetJssStyle(checked ? -6 : -2),
        border: `${borderWidthBase} solid ${focusColor}`,
        borderRadius: checked ? '18px' : '14px',
      },
      '&:not(:focus-visible) .switch::before': {
        borderColor: 'transparent',
      },
    },
    switch: {
      position: 'relative',
      width: '48px',
      height: '28px',
      flexShrink: 0,
      boxSizing: 'border-box',
      border: `${borderWidthBase} solid ${buttonBorderColor}`,
      borderRadius: '14px',
      backgroundColor: buttonBackgroundColor,
      cursor: isDisabledOrLoading(disabled, loading) ? 'not-allowed' : 'pointer',
      transition: `${getTransition('background-color')},${getTransition('border-color')},${getTransition('color')}`,
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
      transform: `translate3d(${checked ? '20px' : '0'}, 0, 0)`,
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
    label: {
      ...textSmallStyle,
      paddingTop: '2px', // currently, line-height of textSmall doesn't match height of switch
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
  });
};
