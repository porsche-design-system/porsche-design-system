import type { AlignLabel, BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isDisabledOrLoading, isHighContrastMode, mergeDeep } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getHiddenTextJssStyle,
  getHighContrastColors,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { borderWidthBase, spacingStaticSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

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

  return getCss({
    '@global': {
      ':host': {
        ...buildResponsiveStyles(stretch, (stretchValue: boolean) => ({
          display: stretchValue ? 'flex' : 'inline-flex',
        })),
        ...addImportantToEachRule({
          outline: 0, // custom element is able to delegate the focus
          gap: spacingStaticSmall,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...buildResponsiveStyles(stretch, (stretchValue: boolean) => ({
            justifyContent: stretchValue ? 'space-between' : 'flex-start',
            width: stretchValue ? '100%' : 'auto', // prevents adjusting its size when used as flex or grid child
            ...(!stretchValue && { verticalAlign: 'top' }),
          })),
        }),
      },
      button: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        width: '48px',
        height: '28px',
        boxSizing: 'border-box',
        border: `${borderWidthBase} solid ${buttonBorderColor}`,
        borderRadius: '14px',
        backgroundColor: buttonBackgroundColor,
        cursor: isDisabledOrLoading(disabled, loading) ? 'not-allowed' : 'pointer',
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: buttonBorderColorDark,
          backgroundColor: buttonBackgroundColorDark,
        }),
        margin: 0, // Removes default button margin on safari 15
        padding: 0,
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        ...(!isDisabledOrLoading(disabled, loading) &&
          hoverMediaQuery({
            '&:hover': {
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
        ...getFocusJssStyle(theme),
      },
      label: {
        ...textSmallStyle,
        minWidth: 0, // prevents flex child to overflow max available parent size
        minHeight: 0, // prevents flex child to overflow max available parent size
        cursor: isDisabledOrLoading(disabled, loading) ? 'not-allowed' : 'pointer',
        color: textColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: textColorDark,
        }),
        ...mergeDeep(
          buildResponsiveStyles(alignLabel, (alignLabelValue: AlignLabel) => ({
            // TODO: we should remove 'left' here and map the value in the component class already to 'start' but might be difficult due to breakpoint customizable prop value
            order: alignLabelValue === 'left' || alignLabelValue === 'start' ? -1 : 0,
          })),
          buildResponsiveStyles(hideLabel, (isHidden: boolean) =>
            getHiddenTextJssStyle(isHidden, {
              paddingTop: '2px', // currently, line-height of textSmall doesn't match height of switch
            })
          )
        ),
      },
    },
    toggle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: toggleBackgroundColor,
      transition: `${getTransition('background-color')}, ${getTransition('transform')}`,
      transform: `translate3d(${checked ? '22px' : '2px'}, 0, 0)`,
      '&:dir(rtl)': {
        transform: `translate3d(${checked ? '-22px' : '-2px'}, 0, 0)`,
      },
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: toggleBackgroundColorDark,
      }),
    },
    ...(loading && {
      spinner: {
        width: '28px',
        height: '28px',
      },
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
