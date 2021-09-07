import type { DropdownDirection, DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import {
  addImportantToEachRule,
  attachCss,
  buildGlobalStyles,
  buildHostStyles,
  getCss,
  getTextHiddenJssStyle,
  getThemedColors,
  getThemedStateColors,
  getTransition,
  isDark,
  JssStyle,
  Styles,
  pxToRemWithUnit,
  mergeDeep,
} from '../../../../utils';
import type { FormState, Theme } from '../../../../types';
import { color, font } from '@porsche-design-system/utilities';
import { determineDirection } from './select-wrapper-dropdown-utils';
import { SELECT_HEIGHT, OPTION_HEIGHT } from '../select-wrapper/select-wrapper-styles';

const dropdownPositionVar = '--p-dropdown-position';

const getBoxShadow = (colorValue: string): string => `${colorValue} 0 0 0 1px inset`;
const getStateBoxShadow = (colorValue: string): string => `${colorValue} 0 0 0 2px inset`;

export const getButtonStyles = (_disabled: boolean, state: FormState, theme: Theme, isOpen: boolean): Styles => {
  const { contrastMediumColor, contrastHighColor } = getThemedColors(theme);
  const { stateColor } = getThemedStateColors(theme, state);
  const boxShadow = stateColor ? getStateBoxShadow('currentColor') : getBoxShadow('currentColor');

  return buildGlobalStyles({
    button: {
      position: 'absolute',
      padding: '0',
      width: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      top: '0',
      height: SELECT_HEIGHT,
      outline: '1px solid transparent',
      outlineOffset: 2,
      cursor: 'pointer',
      color: 'currentColor',
      transition: getTransition('color'),
      boxShadow,
      '&:focus': {
        outlineColor: stateColor || contrastMediumColor,
      },
      '&:hover:not(:disabled) ~ ul': {
        borderColor: contrastHighColor,
      },
      '&:disabled': {
        cursor: 'not-allowed',
      },
      ...(isOpen && {
        outlineColor: stateColor || contrastMediumColor,
      }),
    },
    span: {
      display: 'none',
    },
  });
};

export const getFilterStyles = (disabled: boolean, state: FormState, theme: Theme): Styles => {
  const { textColor, backgroundColor, contrastMediumColor, contrastHighColor } = getThemedColors(theme);
  const { stateColor } = getThemedStateColors(theme, state);

  const boxShadow = stateColor ? getStateBoxShadow('currentColor') : getBoxShadow('currentColor');

  const placeHolderStyles: JssStyle = {
    opacity: 1,
    color: textColor,
  };

  return buildGlobalStyles({
    input: {
      display: 'block',
      position: 'absolute',
      zIndex: 1,
      bottom: '2px',
      left: '2px',
      width: `calc(100% - ${pxToRemWithUnit(44)})`,
      height: pxToRemWithUnit(44),
      padding: pxToRemWithUnit(10),
      outline: 'none',
      appearance: 'none',
      boxSizing: 'border-box',
      border: 'none',
      opacity: 0,
      fontFamily: font.family,
      ...font.size.small,
      fontWeight: font.weight.regular,
      textIndent: 0,
      cursor: 'text',
      color: textColor,
      background: backgroundColor,
      '&::placeholder': placeHolderStyles,
      '&::-webkit-input-placeholder': placeHolderStyles,
      '&::-moz-placeholder': placeHolderStyles,
      '&:focus': {
        opacity: 1, // to display value while typing
        '&+span': {
          outlineColor: stateColor || contrastMediumColor,
        },
      },
      '&:hover:not(:disabled) ~ ul': {
        borderColor: contrastHighColor,
      },
      ...(disabled && {
        cursor: 'not-allowed',
        '&+$span': {
          cursor: 'not-allowed',
        },
      }),
      '&+span': {
        position: 'absolute',
        inset: 0,
        outline: '1px solid transparent',
        outlineOffset: 2,
        transition: getTransition('color'),
        pointerEvents: 'all',
        cursor: 'pointer',
        boxShadow,
      },
    },
  });
};

export const getListStyles = (direction: DropdownDirectionInternal, isOpen: boolean, theme: Theme): Styles => {
  const isDirectionDown = direction === 'down';
  const isDarkTheme = isDark(theme);
  const {
    textColor,
    backgroundColor,
    contrastHighColor,
    contrastMediumColor,
    contrastLowColor,
    hoverColor,
    activeColor,
    disabledColor,
  } = getThemedColors(theme);

  const highlightedSelectedColor = isDarkTheme ? color.default : color.background.surface; // strange that surfaceColor isn't used for dark theme

  return {
    ...buildGlobalStyles({
      ul: {
        position: `var(${dropdownPositionVar})`, // for vrt tests
        padding: 0,
        margin: 0,
        marginTop: pxToRemWithUnit(-1),
        color: textColor,
        background: backgroundColor,
        fontFamily: font.family,
        ...font.size.small,
        display: 'block',
        zIndex: 10,
        left: 0,
        right: 0,
        maxHeight: pxToRemWithUnit(308),
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        borderWidth: '1px', // separate css property to allow color override via parent
        borderStyle: 'solid', // separate css property to allow color override via parent
        borderColor: contrastMediumColor,
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        transition: getTransition('border-color'),
        transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
        outline: 'none',
        '&:hover': {
          borderColor: contrastHighColor,
        },
        ...(isDirectionDown
          ? {
              top: 'calc(100%-1px)',
              borderTop: 'none',
              boxShadow: '0 2px 4px 0 rgba(0,0,0,.05), 0 12px 25px 0 rgba(0,0,0,.1)',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'sticky',
                top: 0,
                width: '100%',
                height: '1px',
                background: contrastLowColor,
              },
            }
          : {
              bottom: pxToRemWithUnit(47),
              borderBottom: 'none',
              boxShadow: '0 -2px 4px 0 rgba(0,0,0,.05), 0 -12px 25px 0 rgba(0,0,0,.075)',
              '&::after': {
                content: '""',
                display: 'block',
                position: 'sticky',
                bottom: 0,
                width: '100%',
                height: '1px',
                background: contrastLowColor,
              },
            }),
        ...(!isOpen && {
          top: 'calc(100%-3px)',
          opacity: 0,
          overflow: 'hidden',
          height: 1,
          pointerEvents: 'none',
        }),
      },
    }),
    option: {
      display: 'flex',
      padding: `${pxToRemWithUnit(4)} ${pxToRemWithUnit(11)}`,
      minHeight: pxToRemWithUnit(OPTION_HEIGHT),
      cursor: 'pointer',
      textAlign: 'left',
      wordBreak: 'break-word',
      boxSizing: 'border-box',
      transition: getTransition('color') + ',' + getTransition('background-color'),
      '&[role="status"]': {
        cursor: 'not-allowed',
      },
      '&__sr': getTextHiddenJssStyle(true),
      '&:not([aria-disabled]):not([role="status"]):hover': {
        color: hoverColor,
        background: highlightedSelectedColor,
      },
      '&--highlighted, &--selected': {
        color: activeColor,
        background: highlightedSelectedColor,
      },
      '&--selected': {
        cursor: 'default',
        pointerEvents: 'none',
      },
      '&--disabled': {
        cursor: 'not-allowed',
        color: disabledColor,
      },
      '&--hidden': {
        display: 'none',
      },
    },
    icon: {
      marginLeft: pxToRemWithUnit(4),
    },
    optgroup: {
      display: 'block',
      padding: `${pxToRemWithUnit(8)} ${pxToRemWithUnit(12)}`,
      marginTop: pxToRemWithUnit(8),
      fontWeight: font.weight.bold,
      '&~$option': {
        paddingLeft: pxToRemWithUnit(24),
      },
    },
  };
};

export const getComponentCss = (
  direction: DropdownDirectionInternal,
  isOpen: boolean,
  disabled: boolean,
  state: FormState,
  filter: boolean,
  theme: Theme
): string => {
  const { contrastMediumColor, contrastHighColor, disabledColor } = getThemedColors(theme);
  const { stateColor, stateHoverColor } = getThemedStateColors(theme, state);
  return getCss({
    ...(!disabled && {
      ':host(:hover)': addImportantToEachRule({
        color: stateHoverColor || contrastHighColor,
      }),
    }),
    ...buildHostStyles({
      [dropdownPositionVar]: 'absolute',
      ...addImportantToEachRule({
        display: 'block',
        position: `var(${dropdownPositionVar})`, // for vrt tests
        marginTop: '-48px',
        paddingTop: '48px',
        left: 0,
        right: 0,
        color: disabled ? disabledColor : stateColor || contrastMediumColor,
      }),
    }),
    ...mergeDeep(
      filter ? getFilterStyles(disabled, state, theme) : getButtonStyles(disabled, state, theme, isOpen),
      getListStyles(direction, isOpen, theme)
    ),
  });
};

export const addComponentCss = (
  host: HTMLElement,
  direction: DropdownDirection,
  isOpen: boolean,
  disabled: boolean,
  state: FormState,
  filter: boolean,
  theme: Theme
): void => {
  attachCss(
    host,
    getComponentCss(direction === 'auto' ? determineDirection(host) : direction, isOpen, disabled, state, filter, theme)
  );
};
