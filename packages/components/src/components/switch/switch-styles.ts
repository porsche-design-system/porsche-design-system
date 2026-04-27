import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  colorContrastLow,
  colorFrostedSoft,
  colorPrimary,
  colorSuccess,
  colorSuccessFrostedSoft,
  colorSuccessLow,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  typescaleSm,
} from '../../styles/css-variables';
import type { AlignLabel, BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss, isDisabledOrLoading, mergeDeep } from '../../utils';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

const cssVarInternalSwitchScaling = '--_p-switch-a';

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
    buttonBorderColor: checked ? colorSuccessLow : colorContrastLow,
    buttonBorderColorHover: checked ? colorSuccess : colorPrimary,
    buttonBackgroundColor: checked ? colorSuccessFrostedSoft : colorFrostedSoft,
    toggleBackgroundColor: loading ? 'transparent' : checked ? colorSuccess : colorPrimary,
    textColor: colorPrimary,
  };
};

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
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);
  const gap = `calc(11.2px * (var(${cssVarInternalSwitchScaling}) - 0.64285714) + 4px)`;
  const buttonBorderWidth = '1px';
  const buttonWidth = `calc(var(${cssVarInternalSwitchScaling}) * 3rem)`;
  const buttonHeight = `calc(var(${cssVarInternalSwitchScaling}) * 1.75rem)`;
  const buttonMarginBlock = `max(0px, calc((${leadingNormal} - ${buttonHeight}) / 2))`; // Vertically centers the switch label relative to the switch size (depending on which is smaller).
  const buttonTouchInset = `calc(-${buttonBorderWidth} - max(0px, calc(24px - ${buttonHeight}) / 2))`; // Positions the switch ::before pseudo-element with a negative offset to align it with the touch target.
  const labelPaddingTop = `max(0px, calc((${buttonHeight} - ${leadingNormal}) / 2))`; // Vertically centers the switch label relative to the switch size (depending on which is smaller).
  const toggleDimension = `calc(var(${cssVarInternalSwitchScaling}) * 1.25rem)`;
  const toggleTranslateX = `calc(var(${cssVarInternalSwitchScaling}) * .1875rem)`;

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
          font: `${typescaleSm} ${fontPorscheNext}`, // needed for correct gap definition based on ex-unit
          gap,
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
        font: `${typescaleSm} ${fontPorscheNext}`, // needed for correct width and height definition based on ex-unit
        border: `${buttonBorderWidth} solid ${buttonBorderColor}`,
        borderRadius: radiusFull,
        background: buttonBackgroundColor,
        cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        ...(disabledOrLoading &&
          forcedColorsMediaQuery({
            borderColor: 'GrayText',
          })),
        ...(!disabledOrLoading &&
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
        font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        minWidth: 0, // prevents flex child to overflow max available parent size
        minHeight: 0, // prevents flex child to overflow max available parent size
        cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
        color: textColor,
        ...(disabledOrLoading &&
          forcedColorsMediaQuery({
            color: 'GrayText',
          })),
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
      ...forcedColorsMediaQuery({
        background: 'CanvasText',
      }),
      '&:dir(rtl)': {
        transform: `translate3d(calc(${isChecked ? `calc(${buttonWidth} - ${buttonBorderWidth} * 2 - 100% - ${toggleTranslateX})` : toggleTranslateX} * -1), 0, 0)`,
      },
    },
    ...(isLoading && {
      spinner: {
        '--p-spinner-size': buttonHeight,
      },
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
