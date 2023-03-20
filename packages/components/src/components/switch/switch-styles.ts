import type { AlignLabel, BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isDisabledOrLoading, mergeDeep } from '../../utils';
import {
  addImportantToEachRule,
  getTextHiddenJssStyle,
  getTransition,
  getThemedColors,
  getInsetJssStyle,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
import { borderWidthBase, spacingStaticSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { JssStyle } from 'jss';
import { getForcedColorsMediaQuery } from '../../styles/schemed-high-contrast-media-query';

const getColors = (
  checked: boolean,
  disabled: boolean,
  loading: boolean,
  theme: Theme
): {
  buttonBorderColor: JssStyle;
  buttonBorderColorHover: string;
  buttonBackgroundColor: JssStyle;
  buttonBackgroundColorHover: JssStyle;
  toggleBackgroundColor: JssStyle;
  toggleBackgroundColorHover: JssStyle;
  textColor: string;
} => {
  const { primaryColor, contrastMediumColor, successColor, successColorDarken, disabledColor } = getThemedColors(theme);
  const { backgroundColor: lightThemeBackgroundColor } = getThemedColors('light');
  const checkedColor = successColor;
  const disabledOrLoadingColor = isDisabledOrLoading(disabled, loading) && disabledColor;
  const disabledOrLoadingColorHighContrast = isDisabledOrLoading(disabled, loading) && 'GrayText';

  return {
    buttonBorderColor: {
      borderColor: disabledOrLoadingColor || (checked ? checkedColor : contrastMediumColor),
      [getForcedColorsMediaQuery]: {
        borderColor:
          (checked && disabled && 'GrayText') || disabledOrLoadingColorHighContrast || (checked && 'Highlight'),
      },
    },
    buttonBorderColorHover: checked ? successColorDarken : primaryColor,
    buttonBackgroundColor: checked
      ? {
          backgroundColor: disabledOrLoadingColor || checkedColor,
          [getForcedColorsMediaQuery]: {
            backgroundColor: disabledOrLoadingColorHighContrast || 'Highlight',
          },
        }
      : { backgroundColor: 'transparent' },
    buttonBackgroundColorHover: checked
      ? {
          backgroundColor: successColorDarken,
          [getForcedColorsMediaQuery]: {
            backgroundColor: 'Highlight',
          },
        }
      : { backgroundColor: 'transparent' },
    toggleBackgroundColor:
      (loading && { backgroundColor: 'transparent' }) ||
      (disabled &&
        !checked && {
          backgroundColor: disabledColor,
          [getForcedColorsMediaQuery]: {
            backgroundColor: 'GrayText',
          },
        }) ||
      (checked
        ? {
            backgroundColor: lightThemeBackgroundColor,
          }
        : {
            backgroundColor: primaryColor,
            [getForcedColorsMediaQuery]: {
              backgroundColor: 'ButtonText',
            },
          }),
    toggleBackgroundColorHover: checked
      ? {
          backgroundColor: lightThemeBackgroundColor,
        }
      : {
          backgroundColor: primaryColor,
          [getForcedColorsMediaQuery]: {
            backgroundColor: 'inherit',
          },
        },
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
        outline: 0, // custom element is able to delegate the focus
        ...hostHiddenStyles,
        ...buildResponsiveStyles(stretch, (stretchValue: boolean) => ({
          display: stretchValue ? 'block' : 'inline-block',
          width: stretchValue ? '100%' : 'auto', // prevents adjusting its size when used as flex or grid child
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
            buttonBackgroundColorHover,
            '& .toggle': {
              toggleBackgroundColorHover,
            },
          },
        })),
      '&:focus .switch::before': {
        content: '""',
        position: 'absolute',
        ...getInsetJssStyle(-6),
        border: `${borderWidthBase} solid ${focusColor}`,
        borderRadius: '18px',
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
      border: `${borderWidthBase} solid`,
      borderRadius: '14px',
      ...mergeDeep(buttonBorderColor, buttonBackgroundColor),
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
      ...toggleBackgroundColor,
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
