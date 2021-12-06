import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  buildGlobalStyles,
  buildHostStyles,
  getCss,
  getInset,
  getTextHiddenJssStyle,
  getThemedColors,
  getThemedFormStateColors,
  getTransition,
  isDark,
  JssStyle,
  mergeDeep,
  pxToRemWithUnit,
  Styles,
} from '../../../../utils';
import type { FormState, Theme } from '../../../../types';
import { color, font } from '@porsche-design-system/utilities';
import { OPTION_HEIGHT, SELECT_HEIGHT } from '../select-wrapper/select-wrapper-styles';

const dropdownPositionVar = '--p-dropdown-position';

const getBoxShadow = (stateColor: string): string => `currentColor 0 0 0 ${stateColor ? 2 : 1}px inset`;

export const getButtonStyles = (isOpen: boolean, state: FormState, theme: Theme): Styles => {
  const { contrastMediumColor, contrastHighColor } = getThemedColors(theme);
  const { stateColor } = getThemedFormStateColors(theme, state);
  const boxShadow = getBoxShadow(stateColor);

  return buildGlobalStyles({
    button: {
      position: 'absolute',
      padding: 0,
      width: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      top: 0,
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
  });
};

export const getFilterStyles = (isOpen: boolean, disabled: boolean, state: FormState, theme: Theme): Styles => {
  const { textColor, backgroundColor, contrastMediumColor, contrastHighColor } = getThemedColors(theme);
  const { stateColor } = getThemedFormStateColors(theme, state);
  const boxShadow = getBoxShadow(stateColor);

  const placeHolderStyles: JssStyle = {
    opacity: 1,
    color: textColor,
  };

  return buildGlobalStyles({
    input: {
      display: 'block',
      position: 'absolute',
      zIndex: 1,
      bottom: pxToRemWithUnit(2),
      left: pxToRemWithUnit(2),
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
        '&+span': {
          cursor: 'not-allowed',
        },
      }),
      '&+span': {
        position: 'absolute',
        ...getInset(),
        outline: '1px solid transparent',
        outlineOffset: 2,
        transition: getTransition('color'),
        pointerEvents: 'all',
        cursor: 'pointer',
        boxShadow,
        ...(isOpen && {
          outlineColor: stateColor || contrastMediumColor,
        }),
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

  const highlightedSelectedColor = isDarkTheme ? color.default : color.background.surface; // TODO: strange that surfaceColor isn't used for dark theme

  const baseDirectionPseudoStyle: JssStyle = {
    content: '""',
    display: 'block',
    position: 'sticky',
    width: '100%',
    height: '1px',
    background: contrastLowColor,
  };

  return {
    ...buildGlobalStyles({
      ul: {
        display: 'block',
        position: `var(${dropdownPositionVar})`, // for vrt tests
        padding: 0,
        margin: 0,
        marginTop: pxToRemWithUnit(-1),
        color: textColor,
        background: backgroundColor,
        fontFamily: font.family,
        ...font.size.small,
        zIndex: 10,
        left: 0,
        right: 0,
        maxHeight: pxToRemWithUnit(308),
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        border: `1px solid ${contrastMediumColor}`,
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
                ...baseDirectionPseudoStyle,
                top: 0,
              },
            }
          : {
              bottom: pxToRemWithUnit(SELECT_HEIGHT - 1),
              borderBottom: 'none',
              boxShadow: '0 -2px 4px 0 rgba(0,0,0,.05), 0 -12px 25px 0 rgba(0,0,0,.075)',
              '&::after': {
                ...baseDirectionPseudoStyle,
                bottom: 0,
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
    'sr-text': {
      display: 'none',
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
  const { stateColor, stateHoverColor } = getThemedFormStateColors(theme, state);

  return getCss({
    ...buildHostStyles({
      [dropdownPositionVar]: 'absolute',
      ...addImportantToEachRule({
        display: 'block',
        position: `var(${dropdownPositionVar})`, // for vrt tests
        marginTop: pxToRemWithUnit(-SELECT_HEIGHT),
        paddingTop: pxToRemWithUnit(SELECT_HEIGHT),
        left: 0,
        right: 0,
        color: stateColor || (disabled ? disabledColor : contrastMediumColor),
      }),
    }),
    ...(!disabled && {
      ':host(:hover)': {
        color: addImportantToRule(stateHoverColor || contrastHighColor),
      },
    }),
    ...mergeDeep(
      filter ? getFilterStyles(isOpen, disabled, state, theme) : getButtonStyles(isOpen, state, theme),
      getListStyles(direction, isOpen, theme)
    ),
  });
};
