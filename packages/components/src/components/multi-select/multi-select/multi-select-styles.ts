import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss, SelectDropdownDirectionInternal } from '../../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { JssStyle } from 'jss';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { FormState } from '../../../utils/form/form-state';
import { getPlaceholderJssStyle } from '../../../styles/placeholder';
import { getNoResultsOptionJssStyle, MULTI_SELECT_OPTION_HEIGHT } from '../../../styles/option-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import {
  formButtonOrIconPadding,
  formElementLayeredSafeZone,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
  getCalculatedFormElementPaddingHorizontal,
} from '../../../styles/form-styles';

export const getComponentCss = (
  direction: SelectDropdownDirectionInternal,
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isWithinForm: boolean,
  theme: Theme
): string => {
  const { contrastHighColor } = getThemedColors(theme);
  const { contrastHighColor: contrastHighColorDark } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...(isWithinForm &&
        addImportantToEachRule({
          '::slotted([slot=internal-select])': {
            position: 'absolute',
            opacity: 0,
            height: '0px',
          },
        })),
      // TODO: re-use select-wrapper-style
      input: getInputStyles(isDisabled, direction, isOpen, state, theme),
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: `minmax(0, 1fr) auto auto ${formElementLayeredSafeZone}`,
    },
    // TODO: extract for multi-select, select-wrapper and text-field (not gridArea and placeSelf)
    icon: {
      gridArea: '1/3',
      placeSelf: 'center',
      padding: formButtonOrIconPadding,
      pointerEvents: 'none',
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
      transition: getTransition('transform'),
      '&--rotate': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },
    // TODO: extract for multi-select, select-wrapper and text-field (not gridArea and placeSelf)
    button: {
      gridArea: '1/2',
      placeSelf: 'center',
      padding: formButtonOrIconPadding,
    },
    listbox: getListStyles(isOpen, direction, theme),
    // TODO: extract (maybe even as functional component) and re-use in multi-select and select-wrapper
    'no-results': {
      padding: `${spacingStaticSmall} 12px`,
      boxSizing: 'border-box',
      color: contrastHighColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrastHighColorDark,
      }),
      ...getNoResultsOptionJssStyle(),
    },
    // TODO: maybe we should extract it as functional component too
    'sr-only': getHiddenTextJssStyle(),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};

// TODO: use getSlottedTextFieldTextareaSelectStyles() instead an manipulate selectors like done with PIN Code or even better make it configurable as parameter
const getInputStyles = (
  isDisabled: boolean,
  direction: SelectDropdownDirectionInternal,
  isOpen: boolean,
  state: FormState,
  theme: Theme
): JssStyle => {
  const isDirectionDown = direction === 'down';
  const { primaryColor, disabledColor, backgroundColor, contrastMediumColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    backgroundColor: backgroundColorDark,
    contrastMediumColor: contrastMediumColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );

  return {
    gridArea: '1/1/1/-1',
    flex: 1,
    minWidth: 0,
    // TODO: abstract and re-use for multi-select, select-wrapper and text-field-wrapper
    height: `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`, // we need 10px additionally so input height becomes 54px, // we need 6px additionally so input height becomes 50px
    font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is alig
    margin: 0, // necessary reset for iOS Safari 15 (and maybe other browsers)
    padding: `${formElementPaddingVertical} ${formElementPaddingHorizontal}`,
    paddingInlineEnd: getCalculatedFormElementPaddingHorizontal(2),
    boxSizing: 'border-box',
    outline: 0,
    appearance: 'none',
    ...textSmallStyle,
    textOverflow: 'ellipsis',
    '&:disabled': {
      cursor: 'not-allowed',
    },
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
    color: primaryColor,
    '&:not(:focus)': {
      ...getPlaceholderJssStyle({ color: primaryColor, opacity: 1 }),
      ...prefersColorSchemeDarkMediaQuery(theme, getPlaceholderJssStyle({ color: primaryColorDark, opacity: 1 })),
    }, // Opacity fixes placeholder being shown lighter in firefox

    ...hoverMediaQuery({
      '&:hover:not(:disabled):not(:focus),label:hover~.wrapper &:not(:disabled):not(:focus)': {
        borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark,
        }),
      },
    }),
    ...(!isDisabled && {
      '&:focus': {
        borderColor: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: primaryColorDark,
        }),
      },
    }),
    background: backgroundColor,
    border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`,
    borderRadius: borderRadiusSmall,
    ...(isOpen && {
      [isDirectionDown ? 'paddingBottom' : 'paddingTop']: `calc(${formElementPaddingVertical} + 1px)`, // Add padding to keep same height when border changes
      [isDirectionDown ? 'borderBottom' : 'borderTop']: addImportantToRule(`1px solid ${contrastMediumColor}`),
      [isDirectionDown ? 'borderBottomLeftRadius' : 'borderTopLeftRadius']: 0,
      [isDirectionDown ? 'borderBottomRightRadius' : 'borderTopRightRadius']: 0,
    }),
    ...(isDisabled && {
      ...getPlaceholderJssStyle({ color: disabledColor }),
      cursor: 'not-allowed',
      color: disabledColor,
      borderColor: disabledColor,
      WebkitTextFillColor: disabledColor,
    }),
    ...prefersColorSchemeDarkMediaQuery(theme, {
      color: primaryColorDark,
      background: backgroundColorDark,
      border: `${borderWidthBase} solid ${isOpen ? primaryColorDark : formStateColorDark || contrastMediumColorDark}`,
      ...(isOpen && {
        [isDirectionDown ? 'borderBottom' : 'borderTop']: addImportantToRule(`1px solid ${contrastMediumColorDark}`),
      }),
      ...(isDisabled && {
        ...getPlaceholderJssStyle({ color: disabledColorDark }),
        color: disabledColorDark,
        borderColor: disabledColorDark,
        WebkitTextFillColor: disabledColorDark,
      }),
    }),
  };
};

const getListStyles = (isOpen: boolean, direction: SelectDropdownDirectionInternal, theme: Theme): JssStyle => {
  const isDirectionDown = direction === 'down';
  const { primaryColor, backgroundColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark } = getThemedColors('dark');

  return {
    position: 'absolute',
    margin: 0,
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap: spacingStaticSmall,
    padding: '6px',
    ...textSmallStyle,
    zIndex: 10,
    left: 0,
    right: 0,
    [isDirectionDown ? 'top' : 'bottom']: '100%',
    boxSizing: 'border-box',
    maxHeight: `${8.5 * (MULTI_SELECT_OPTION_HEIGHT + 8) + 6 + 2}px`, // 8.5 options * option height + 8px gap + additional spacing (6px = padding, 2px = border)
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    background: backgroundColor,
    border: `2px solid ${primaryColor}`,
    [isDirectionDown ? 'borderTop' : 'borderBottom']: 'none',
    borderRadius: borderRadiusSmall,
    [isDirectionDown ? 'borderTopLeftRadius' : 'borderBottomLeftRadius']: 0,
    [isDirectionDown ? 'borderTopRightRadius' : 'borderBottomRightRadius']: 0,
    scrollbarWidth: 'thin', // firefox
    scrollbarColor: 'auto', // firefox
    transition: getTransition('border-color'),
    transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: backgroundColorDark,
      borderColor: primaryColorDark,
    }),
  };
};
