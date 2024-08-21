import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import type { Theme } from '../../../types';
import type { JssStyle, Styles } from 'jss';
import { getCss, isHighContrastMode, mergeDeep } from '../../../utils';
import {
  addImportantToRule,
  getHighContrastColors,
  getThemedColors,
  getTransition,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  fontWeightSemiBold,
  spacingStaticSmall,
  textSmallStyle,
  fontSizeTextXSmall,
} from '@porsche-design-system/styles';

import { getNoResultsOptionJssStyle, OPTION_HEIGHT } from '../../../styles/option-styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { getPopoverResetJssStyle } from '../../../styles/popover-reset-styles';
import type { FormState } from '../../../utils/form/form-state';
import {
  formElementPaddingHorizontal,
  formElementPaddingVertical,
  getCalculatedFormElementPaddingHorizontal,
} from '../../../styles/form-styles';

const dropdownPositionVar = '--p-internal-dropdown-position';

export const getButtonStyles = (
  direction: DropdownDirectionInternal,
  isOpen: boolean,
  state: FormState,
  theme: Theme
): Styles => {
  const { primaryColor, disabledColor, contrastMediumColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    contrastMediumColor: contrastMediumColorDark,
  } = getThemedColors('dark');
  const { formStateHoverColor, formStateColor } = getThemedFormStateColors(theme, state);
  const { formStateHoverColor: formStateHoverColorDark, formStateColor: formStateColorDark } = getThemedFormStateColors(
    'dark',
    state
  );
  const isDirectionDown = direction === 'down';

  return {
    '@global': {
      // TODO: extract generic default button/anchor reset style
      button: {
        position: 'absolute',
        inset: 0,
        width: '100%', // fixes Firefox positioning issue
        height: '100%', // fixes Firefox positioning issue
        margin: 0,
        padding: 0,
        background: 'transparent',
        border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`, // using border of styled select below for label:hover selector
        borderRadius: borderRadiusSmall,
        outline: '0',
        cursor: 'pointer',
        transition: getTransition('border-color'), // background and text color are handled on select
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: isOpen ? primaryColorDark : formStateColorDark || contrastMediumColorDark,
        }),
        // TODO: getFocusJssStyle() can't be re-used because focus style differs for form elements
        '&:focus, &:focus ~ ul': {
          borderColor: primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: primaryColorDark,
          }),
        },
        ...hoverMediaQuery({
          '&:not(:disabled):not(:focus):hover': {
            borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark,
            }),
          },
        }),
        '&:disabled': {
          cursor: 'not-allowed',
          borderColor: disabledColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: disabledColorDark,
          }),
        },
        ...(isOpen && {
          [isDirectionDown ? 'borderBottomLeftRadius' : 'borderTopLeftRadius']: 0,
          [isDirectionDown ? 'borderBottomRightRadius' : 'borderTopRightRadius']: 0,
        }),
      },
    },
  };
};

export const getFilterStyles = (
  direction: DropdownDirectionInternal,
  isOpen: boolean,
  state: FormState,
  disabled: boolean,
  theme: Theme
): Styles<'@global'> => {
  const { primaryColor, backgroundColor, disabledColor, contrastMediumColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    backgroundColor: backgroundColorDark,
    disabledColor: disabledColorDark,
    contrastMediumColor: contrastMediumColorDark,
  } = getThemedColors('dark');
  const { formStateHoverColor, formStateColor } = getThemedFormStateColors(theme, state);
  const { formStateHoverColor: formStateHoverColorDark, formStateColor: formStateColorDark } = getThemedFormStateColors(
    'dark',
    state
  );
  const isDirectionDown = direction === 'down';

  const placeHolderJssStyle: JssStyle = {
    opacity: 1,
    color: disabled ? disabledColor : primaryColor,
  };

  const placeHolderDarkJssStyle: JssStyle = {
    opacity: 1,
    color: disabled ? disabledColorDark : primaryColorDark,
  };

  return {
    '@global': {
      input: {
        display: 'block',
        position: 'absolute',
        inset: borderWidthBase,
        width: 'calc(100% - 4px)', // fixes Firefox positioning issue, 4px = 2 x borderWidthBase
        height: 'calc(100% - 4px)', // fixes Firefox positioning issue, 4px = 2 x borderWidthBase
        zIndex: 1,
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is alig
        margin: 0, // necessary reset for iOS Safari 15 (and maybe other browsers)
        // TODO: could be done with css subgrid much more elegant in the near future
        //  or move input into select-wrapper and handle it the same like multi-select
        padding: `${formElementPaddingVertical} ${formElementPaddingHorizontal}`,
        paddingInlineEnd: getCalculatedFormElementPaddingHorizontal(1),
        outline: '0',
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        boxSizing: 'border-box',
        border: '0', // done via span
        borderRadius: borderRadiusSmall, // for white corners
        opacity: 0, // is used to overlay input on focus
        ...textSmallStyle,
        textIndent: 0,
        cursor: disabled ? 'not-allowed' : 'text',
        color: primaryColor,
        background: backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
          background: backgroundColorDark,
        }),
        '&::placeholder': {
          ...placeHolderJssStyle,
          ...prefersColorSchemeDarkMediaQuery(theme, placeHolderDarkJssStyle),
        },
        '&::-webkit-input-placeholder': {
          ...placeHolderJssStyle,
          ...prefersColorSchemeDarkMediaQuery(theme, placeHolderDarkJssStyle),
        },
        '&::-moz-placeholder': {
          ...placeHolderJssStyle,
          ...prefersColorSchemeDarkMediaQuery(theme, placeHolderDarkJssStyle),
        },
        '&:not(:disabled):focus': {
          opacity: 1, // to display value while typing
          '&+span, &~ ul': {
            borderColor: primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: primaryColorDark,
            }),
          },
        },
        ...hoverMediaQuery({
          '&:not(:disabled)': {
            '&+span:hover': {
              borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                borderColor: isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark,
              }),
            },
            '&:hover': {
              '&+span, &~ul': {
                borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                  borderColor: isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark,
                }),
              },
            },
          },
        }),
        // TODO: we should try to get rid of the span and apply the border-styles on either select or input
        '&+span': {
          // for focus outline and clicking arrow since input ends left of the icon
          position: 'absolute',
          inset: 0,
          transition: getTransition('border-color'),
          pointerEvents: 'all',
          cursor: disabled ? 'not-allowed' : 'pointer',
          border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: isOpen ? primaryColorDark : formStateColorDark || contrastMediumColorDark,
          }),
          borderRadius: borderRadiusSmall,
          ...(isOpen && {
            [isDirectionDown ? 'borderBottomLeftRadius' : 'borderTopLeftRadius']: 0,
            [isDirectionDown ? 'borderBottomRightRadius' : 'borderTopRightRadius']: 0,
          }),
        },
      },
    },
  };
};

export const getListStyles = (direction: DropdownDirectionInternal, theme: Theme): Styles => {
  const isDirectionDown = direction === 'down';
  const {
    primaryColor: primaryColorDark,
    backgroundColor: backgroundColorDark,
    contrastMediumColor: contrastMediumColorDark,
    disabledColor: disabledColorDark,
    contrastHighColor: contrastHighColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    contrastLowColor: contrastLowColorDark,
  } = getThemedColors('dark');
  const {
    primaryColor,
    backgroundColor,
    contrastMediumColor,
    contrastHighColor,
    backgroundSurfaceColor,
    disabledColor,
    contrastLowColor,
  } = getThemedColors(theme);
  const { highlightColor } = getHighContrastColors();

  return {
    '@global': {
      ul: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacingStaticSmall,
        position: `var(${dropdownPositionVar}, absolute)`, // for vrt tests
        padding: '6px',
        margin: 0,
        background: backgroundColor,
        ...textSmallStyle,
        color: contrastHighColor,
        zIndex: 10,
        left: 0,
        right: 0,
        [isDirectionDown ? 'top' : 'bottom']: 'calc(100% - 2px)', // 2px border + 2px safety for rounded corners
        boxSizing: 'border-box',
        maxHeight: `${8.5 * (OPTION_HEIGHT + 8) + 6 + 2}px`, // 8px = gap, 6px = padding, 2px = border
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        border: `2px solid ${primaryColor}`,
        [isDirectionDown ? 'borderTop' : 'borderBottom']: addImportantToRule(`1px solid ${contrastMediumColor}`),
        ...(isDirectionDown
          ? ['borderBottomLeftRadius', 'borderBottomRightRadius']
          : ['borderTopLeftRadius', 'borderTopRightRadius']
        ).reduce((result, curr) => ({ ...result, [curr]: borderRadiusSmall }), {}),
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        transition: getTransition('border-color'),
        transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: contrastHighColorDark,
          background: backgroundColorDark,
          borderColor: primaryColorDark,
          [isDirectionDown ? 'borderTopColor' : 'borderBottomColor']: addImportantToRule(contrastMediumColorDark),
        }),
      },
    },
    option: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
      padding: `${spacingStaticSmall} 12px`,
      flex: `1 0 calc(${fontLineHeight} + ${spacingStaticSmall} * 2)`,
      cursor: 'pointer',
      textAlign: 'start',
      wordBreak: 'break-word',
      boxSizing: 'border-box',
      borderRadius: borderRadiusSmall,
      transition: `${getTransition('background-color')}, ${getTransition('color')}`,
      ...getNoResultsOptionJssStyle(),
      ...hoverMediaQuery({
        '&:not([aria-disabled]):not(.option--disabled):not([role=status]):hover': {
          color: isHighContrastMode ? highlightColor : primaryColor,
          background: contrastLowColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: isHighContrastMode ? highlightColor : primaryColorDark,
            background: contrastLowColorDark,
          }),
        },
      }),
      '&--highlighted': {
        background: contrastLowColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: contrastLowColorDark,
        }),
      },
      '&--selected': {
        cursor: 'default',
        pointerEvents: 'none',
        background: backgroundSurfaceColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundSurfaceColorDark,
        }),
      },
      '&--highlighted, &--selected': {
        color: isHighContrastMode ? highlightColor : primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: isHighContrastMode ? highlightColor : primaryColorDark,
        }),
      },
      '&--disabled': {
        cursor: 'not-allowed',
        color: disabledColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: disabledColorDark,
        }),
      },
      '&--hidden': {
        display: 'none',
      },
      '&--indent': {
        paddingLeft: '28px',
      },
    },
    optgroup: {
      '&--hidden': {
        display: 'none',
      },
      '&--disabled': {
        color: disabledColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: disabledColorDark,
        }),
      },
      color: primaryColor,
      display: 'block',
      padding: `${spacingStaticSmall} 12px`,
      fontSize: fontSizeTextXSmall,
      fontWeight: fontWeightSemiBold,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
      }),
    },
  };
};

export const getComponentCss = (
  direction: DropdownDirectionInternal,
  isOpen: boolean,
  state: FormState,
  disabled: boolean,
  filter: boolean,
  isNativePopoverCase: boolean,
  theme: Theme
): string => {
  return getCss(
    // merge because of global styles
    mergeDeep(
      {
        '@global': {
          ':host': {
            display: 'block',
            position: 'relative',
          },
          ...preventFoucOfNestedElementsStyles,
        },
        'sr-text': {
          display: 'none',
        },
        ...(isNativePopoverCase && {
          popover: {
            ...getPopoverResetJssStyle(),
          },
        }),
      },
      filter
        ? getFilterStyles(direction, isOpen, state, disabled, theme)
        : getButtonStyles(direction, isOpen, state, theme),
      isOpen && getListStyles(direction, theme)
    )
  );
};
