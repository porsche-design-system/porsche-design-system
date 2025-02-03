import {
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  SCALING_BASE_VALUE,
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
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import type { AlignLabel, BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isDisabledOrLoading, isHighContrastMode, mergeDeep } from '../../utils';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

const cssVarInternalSwitchScaling = '--p-internal-switch-scaling';

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
  compact: boolean,
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

  const minimumTouchTargetSize = '24px'; // Minimum touch target size to comply with accessibility guidelines.

  const scalingVar = `var(${cssVarInternalSwitchScaling}, ${compact ? 0.6668 : 1})`;
  // Determines the scaling factor for the switch size. In "compact" mode, it uses 0.6668 to achieve a 20px switch (compact size).
  // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalSwitchScaling`.

  const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${scalingVar} * ${fontLineHeight}))`;
  // Calculates the switch size and ensures a minimum size of 12px (0.75 * SCALING_BASE_VALUE).
  // Scales proportionally with the line height and the scaling factor.

  const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the switch including its borders.
  const touchTargetSizeDiff = `calc(${minimumTouchTargetSize} - ${dimensionFull})`; // Difference between the minimum touch target size and the switch full size.

  const gap = `calc(${spacingStaticSmall} - (max(0px, ${touchTargetSizeDiff})))`;
  // Adjusts padding to maintain consistent spacing when the switch is smaller than the minimum touch target size.
  // Uses asymmetric padding instead of `gap` to ensure there is no non-clickable area between the label and the input.

  const marginTop = `max(0px, calc((${fontLineHeight} - ${dimensionFull}) / 2))`; // Vertically centers the switch label relative to the switch size (depending on which is smaller).
  const paddingTop = `max(0px, calc((${dimensionFull} - ${fontLineHeight}) / 2))`; // Vertically centers the switch label relative to the switch size (depending on which is smaller).
  const inset = `calc(-${borderWidthBase} - max(0px, ${touchTargetSizeDiff} / 2))`; // Positions the switch ::before pseudo-element with a negative offset to align it with the touch target.

  return getCss({
    '@global': {
      ':host': {
        ...buildResponsiveStyles(stretch, (stretchValue: boolean) => ({
          display: stretchValue ? 'flex' : 'inline-flex',
        })),
        ...addImportantToEachRule({
          outline: 0, // custom element is able to delegate the focus
          font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct gap definition based on ex-unit
          gap,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...buildResponsiveStyles(stretch, (stretchValue: boolean) => ({
            justifyContent: stretchValue ? 'space-between' : 'flex-start',
            width: stretchValue ? '100%' : 'auto', // prevents adjusting its size when used as flex or grid child
            ...(!stretchValue && { verticalAlign: 'top' }),
          })),
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        position: 'relative', // ensures relative positioning for ::before pseudo element
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        width: `calc(${dimension} * 2 - ${borderWidthBase} * 2)`,
        height: dimension,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
        boxSizing: 'content-box',
        border: `${borderWidthBase} solid ${buttonBorderColor}`,
        borderRadius: `calc((${fontLineHeight} + ${borderWidthBase}*2) / 2)`,
        backgroundColor: buttonBackgroundColor,
        cursor: isDisabledOrLoading(disabled, loading) ? 'not-allowed' : 'pointer',
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: buttonBorderColorDark,
          backgroundColor: buttonBackgroundColorDark,
        }),
        margin: 0, // Removes default button margin on safari 15
        padding: 0,
        marginTop,
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
        '&::before': {
          // Ensures the touch target is at least 24px, even if the switch is smaller than the minimum touch target size.
          // This pseudo-element expands the clickable area without affecting the visual size of the switch itself.
          content: '""',
          position: 'absolute',
          inset,
        },
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
              paddingTop,
            })
          )
        ),
      },
    },
    toggle: {
      display: 'flex',
      placeItems: 'center',
      placeContent: 'center',
      width: `calc(${dimension} - ${borderWidthBase} * 2)`,
      height: `calc(${dimension} - ${borderWidthBase} * 2)`,
      borderRadius: '50%',
      backgroundColor: toggleBackgroundColor,
      transition: `${getTransition('background-color')}, ${getTransition('transform')}`,
      transform: `translate3d(${checked ? `calc(100% + ${borderWidthBase})` : borderWidthBase}, 0, 0)`,
      '&:dir(rtl)': {
        transform: `translate3d(calc(${checked ? `calc(100% + ${borderWidthBase})` : borderWidthBase} * -1), 0, 0)`,
      },
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: toggleBackgroundColorDark,
      }),
    },
    ...(loading && {
      spinner: {
        width: dimensionFull,
        height: dimensionFull,
      },
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
