import {
  borderWidthThin,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { radiusFull } from '../../styles/css-variables';
import type { AlignLabel, BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss, isDisabledOrLoading, mergeDeep } from '../../utils';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

const cssVarInternalSwitchScaling = '--p-internal-switch-scaling';

const { primaryColor, contrastLowColor, successColor, frostedSoftColor, successFrostedSoftColor, successLowColor } =
  colors;
const getColors = (
  checked: boolean,
  loading: boolean
): {
  buttonBorderColor: string;
  buttonBorderColorHover: string;
  buttonBackgroundColor: string;
  toggleBackgroundColor: string;
  textColor: string;
} => {
  return {
    buttonBorderColor: checked ? successLowColor : contrastLowColor,
    buttonBorderColorHover: checked ? successColor : primaryColor,
    buttonBackgroundColor: checked ? successFrostedSoftColor : frostedSoftColor,
    toggleBackgroundColor: loading ? 'transparent' : checked ? successColor : primaryColor,
    textColor: primaryColor,
  };
};

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  alignLabel: BreakpointCustomizable<AlignLabel>,
  hideLabel: BreakpointCustomizable<boolean>,
  isStretched: BreakpointCustomizable<boolean>,
  isChecked: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  isCompact: boolean
): string => {
  const { buttonBorderColor, buttonBorderColorHover, buttonBackgroundColor, toggleBackgroundColor, textColor } =
    getColors(isChecked, isLoading);

  const gap = `calc(11.2px * (var(${cssVarInternalSwitchScaling}) - 0.64285714) + 4px)`;
  const buttonBorderWidth = borderWidthThin;
  const buttonWidth = `calc(var(${cssVarInternalSwitchScaling}) * 3rem)`;
  const buttonHeight = `calc(var(${cssVarInternalSwitchScaling}) * 1.75rem)`;
  const buttonMarginBlock = `max(0px, calc((${fontLineHeight} - ${buttonHeight}) / 2))`; // Vertically centers the switch label relative to the switch size (depending on which is smaller).
  const buttonTouchInset = `calc(-${buttonBorderWidth} - max(0px, calc(24px - ${buttonHeight}) / 2))`; // Positions the switch ::before pseudo-element with a negative offset to align it with the touch target.
  const labelPaddingTop = `max(0px, calc((${buttonHeight} - ${fontLineHeight}) / 2))`; // Vertically centers the switch label relative to the switch size (depending on which is smaller).
  const toggleDimension = `calc(var(${cssVarInternalSwitchScaling}) * 1.25rem)`;
  const toggleTranslateX = `calc(var(${cssVarInternalSwitchScaling}) * .1875rem)`;
  const spinnerDimension = buttonHeight;

  return getCss({
    '@global': {
      ':host': {
        [`${cssVarInternalSwitchScaling}`]: isCompact ? 0.64285714 : 1,
        ...buildResponsiveStyles(isStretched, (stretchValue: boolean) => ({
          display: stretchValue ? 'flex' : 'inline-flex',
        })),
        ...addImportantToEachRule({
          ...(isDisabled && getDisabledBaseStyles()),
          outline: 0, // custom element is able to delegate the focus
          font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct gap definition based on ex-unit
          gap,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...buildResponsiveStyles(isStretched, (stretchValue: boolean) => ({
            justifyContent: stretchValue ? 'space-between' : 'flex-start',
            width: stretchValue ? '100%' : 'auto', // prevents adjusting its size when used as flex or grid child
            ...(!stretchValue && { verticalAlign: 'top' }),
          })),
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        all: 'unset',
        position: 'relative', // ensures relative positioning for ::before pseudo element
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        boxSizing: 'border-box',
        width: buttonWidth,
        height: buttonHeight,
        marginBlock: buttonMarginBlock,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
        border: `${buttonBorderWidth} solid ${buttonBorderColor}`,
        borderRadius: radiusFull,
        background: buttonBackgroundColor,
        cursor: isDisabledOrLoading(isDisabled, isLoading) ? 'not-allowed' : 'pointer',
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        ...(!isDisabledOrLoading(isDisabled, isLoading) &&
          hoverMediaQuery({
            '&:hover': {
              borderColor: buttonBorderColorHover,
            },
          })),
        '&:focus-visible': getFocusBaseStyles(),
        '&::before': {
          // Ensures the touch target is at least 24px, even if the switch is smaller than the minimum touch target size.
          // This pseudo-element expands the clickable area without affecting the visual size of the switch itself.
          content: '""',
          position: 'absolute',
          inset: buttonTouchInset,
        },
      },
      label: {
        ...textSmallStyle,
        minWidth: 0, // prevents flex child to overflow max available parent size
        minHeight: 0, // prevents flex child to overflow max available parent size
        cursor: isDisabledOrLoading(isDisabled, isLoading) ? 'not-allowed' : 'pointer',
        color: textColor,
        ...mergeDeep(
          buildResponsiveStyles(alignLabel, (alignLabelValue: AlignLabel) => ({
            order: alignLabelValue === 'start' ? -1 : 0,
          })),
          buildResponsiveStyles(hideLabel, (isHidden: boolean) =>
            getHiddenTextJssStyle(isHidden, {
              paddingTop: labelPaddingTop,
            })
          )
        ),
      },
    },
    toggle: {
      display: 'flex',
      placeItems: 'center',
      placeContent: 'center',
      width: toggleDimension,
      height: toggleDimension,
      borderRadius: radiusFull,
      background: toggleBackgroundColor,
      transition: getTransition('transform'),
      transform: `translate3d(${isChecked ? `calc(${buttonWidth} - ${buttonBorderWidth} * 2 - 100% - ${toggleTranslateX})` : toggleTranslateX}, 0, 0)`,
      '&:dir(rtl)': {
        transform: `translate3d(calc(${isChecked ? `calc(${buttonWidth} - ${buttonBorderWidth} * 2 - 100% - ${toggleTranslateX})` : toggleTranslateX} * -1), 0, 0)`,
      },
    },
    ...(isLoading && {
      spinner: {
        width: spinnerDimension,
        height: spinnerDimension,
      },
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
