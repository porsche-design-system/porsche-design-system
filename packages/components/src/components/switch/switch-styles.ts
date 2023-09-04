import type { AlignLabel, BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isHighContrastMode, isDisabledOrLoading, mergeDeep } from '../../utils';
import {
  addImportantToEachRule,
  getTransition,
  getThemedColors,
  getInsetJssStyle,
  hostHiddenStyles,
  hoverMediaQuery,
  getHighContrastColors,
  getHiddenTextJssStyle,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { borderWidthBase, spacingStaticSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';

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
  const { canvasColor, canvasTextColor } = getHighContrastColors();
  const checkedColor = isHighContrastMode ? canvasTextColor : successColor;
  const disabledOrLoadingColor = isDisabledOrLoading(disabled, loading) && disabledColor;

  return {
    buttonBorderColor: disabledOrLoadingColor || (checked ? checkedColor : contrastMediumColor),
    buttonBorderColorHover: checked ? (isHighContrastMode ? primaryColor : successColorDarken) : primaryColor,
    buttonBackgroundColor: checked ? disabledOrLoadingColor || checkedColor : 'transparent',
    buttonBackgroundColorHover: checked ? (isHighContrastMode ? checkedColor : successColorDarken) : 'transparent',
    toggleBackgroundColor:
      (loading && 'transparent') ||
      (disabled && !checked && disabledColor) ||
      (checked
        ? isHighContrastMode
          ? canvasColor
          : lightThemeBackgroundColor
        : isHighContrastMode
        ? canvasTextColor
        : primaryColor),
    toggleBackgroundColorHover: checked
      ? lightThemeBackgroundColor
      : isHighContrastMode
      ? canvasTextColor
      : primaryColor,
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
  const {
    buttonBorderColor: buttonBorderColorDark,
    buttonBorderColorHover: buttonBorderColorHoverDark,
    buttonBackgroundColor: buttonBackgroundColorDark,
    buttonBackgroundColorHover: buttonBackgroundColorHoverDark,
    toggleBackgroundColor: toggleBackgroundColorDark,
    toggleBackgroundColorHover: toggleBackgroundColorHoverDark,
    textColor: textColorDark,
  } = getColors(checked, disabled, loading, 'dark');
  const { focusColor } = getThemedColors(theme);
  const { focusColor: focusColorDark } = getThemedColors('dark');

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
            backgroundColor: buttonBackgroundColorHover,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: buttonBorderColorHoverDark,
              backgroundColor: buttonBackgroundColorHoverDark,
            }),
            '& .toggle': {
              backgroundColor: toggleBackgroundColorHover,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                backgroundColor: toggleBackgroundColorHoverDark,
              }),
            },
          },
        })),
      '&:focus .switch::before': {
        content: '""',
        position: 'absolute',
        ...getInsetJssStyle(-6),
        border: `${borderWidthBase} solid ${focusColor}`,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: focusColorDark,
        }),
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
      border: `${borderWidthBase} solid ${buttonBorderColor}`,
      borderRadius: '14px',
      backgroundColor: buttonBackgroundColor,
      cursor: isDisabledOrLoading(disabled, loading) ? 'not-allowed' : 'pointer',
      transition: `${getTransition('background-color')},${getTransition('border-color')},${getTransition('color')}`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: buttonBorderColorDark,
        backgroundColor: buttonBackgroundColorDark,
      }),
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
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: toggleBackgroundColorDark,
      }),
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
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: textColorDark,
      }),
      ...mergeDeep(
        buildResponsiveStyles(alignLabel, (alignLabelValue: AlignLabel) => ({
          order: alignLabelValue === 'left' ? -1 : 0,
        })),
        buildResponsiveStyles(hideLabel, getHiddenTextJssStyle)
      ),
    },
  });
};
