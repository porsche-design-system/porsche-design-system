import type { BreakpointCustomizable, Theme } from '../../../types';
import { buildResponsiveStyles, getCss, SelectDropdownDirectionInternal } from '../../../utils';
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
  spacingStaticMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { Styles } from 'jss';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { FormState } from '../../../utils/form/form-state';
import { getLabelStyles } from '../../../styles/form-styles';
import { getPlaceholderJssStyle } from '../../../styles/placeholder';
import { getNoResultsOptionJssStyle, MULTI_SELECT_OPTION_HEIGHT } from '../../../styles/option-styles';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';

const inputYPadding = '13px';
const selectorNativeSelect = '::slotted([slot=select])';

const INPUT_HEIGHT_CALC = `${fontLineHeight} + 6px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2`;

export const getComponentCss = (
  direction: SelectDropdownDirectionInternal,
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isWithinForm: boolean,
  hasLabel: boolean,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor, contrastHighColor, backgroundColor, disabledColor } =
    getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastMediumColor: contrastMediumColorDark,
    contrastHighColor: contrastHighColorDark,
    backgroundColor: backgroundColorDark,
    disabledColor: disabledColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );
  const isDirectionDown = direction === 'down';

  return getCss({
    '@global': {
      ...addImportantToEachRule({
        ':host': {
          display: 'block',
          position: 'relative',
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        },
        ...(isWithinForm && {
          [selectorNativeSelect]: {
            position: 'absolute',
            opacity: 0,
            height: '0px',
          },
        }),
      }),
      ...getInputStyles(isDisabled, theme),
    },
    root: {
      position: 'relative',
    },
    ...getListStyles(isOpen, direction, theme),
    'input-container': {
      display: 'flex',
      transition: ['color', 'border-color', 'background-color'].map(getTransition).join(), // for smooth transitions between e.g. disabled states
      cursor: 'text',
      ...hoverMediaQuery({
        '&:hover:not(.disabled)': {
          borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark,
          }),
        },
      }),
      ...(!isDisabled && {
        '&:focus-within': {
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
        [isDirectionDown ? 'paddingBottom' : 'paddingTop']: '1px', // Add padding to keep same height when border changes
        [isDirectionDown ? 'borderBottom' : 'borderTop']: addImportantToRule(`1px solid ${contrastMediumColor}`),
        [isDirectionDown ? 'borderBottomLeftRadius' : 'borderTopLeftRadius']: 0,
        [isDirectionDown ? 'borderBottomRightRadius' : 'borderTopRightRadius']: 0,
      }),
      ...(isDisabled && {
        cursor: 'not-allowed',
        color: disabledColor,
        borderColor: disabledColor,
        WebkitTextFillColor: disabledColor,
      }),
      ...prefersColorSchemeDarkMediaQuery(theme, {
        background: backgroundColorDark,
        border: `${borderWidthBase} solid ${isOpen ? primaryColorDark : formStateColorDark || contrastMediumColorDark}`,
        ...(isOpen && {
          [isDirectionDown ? 'borderBottom' : 'borderTop']: addImportantToRule(`1px solid ${contrastMediumColorDark}`),
        }),
        ...(isDisabled && {
          color: disabledColorDark,
          borderColor: disabledColorDark,
          WebkitTextFillColor: disabledColorDark,
        }),
      }),
    },
    ...buildResponsiveStyles(hideLabel, (isHidden) =>
      isHidden
        ? {
            label: {
              display: 'none',
            },
          }
        : hasLabel && getLabelStyles('select', isDisabled, hideLabel, state, theme)
    ),
    icon: {
      padding: `${inputYPadding} 15px`, // Horizontal padding spacingStaticMedium - 1px for visual balance
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      ...(isDisabled && { pointerEvents: 'none' }),
    },
    'reset-icon': {
      padding: '4px',
      margin: 'auto',
    },
    'toggle-icon': {
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
      transition: getTransition('transform'),
      '&--open': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },
    'no-results': {
      padding: `${spacingStaticSmall} 12px`,
      color: contrastHighColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrastHighColorDark,
      }),
      boxSizing: 'border-box',
      ...getNoResultsOptionJssStyle(),
    },
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    'sr-text': getHiddenTextJssStyle(),
  });
};

const getInputStyles = (isDisabled: boolean, theme: Theme): Styles => {
  const { primaryColor, disabledColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, disabledColor: disabledColorDark } = getThemedColors('dark');

  return {
    input: {
      flex: 1,
      minWidth: 0,
      height: `calc(${INPUT_HEIGHT_CALC})`, // we need 6px additionally so input height becomes 50px
      font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is alig
      padding: `${inputYPadding} ${spacingStaticMedium}`,
      boxSizing: 'border-box',
      border: 0, // done via container
      outline: 0,
      appearance: 'none',
      background: 'transparent',
      ...textSmallStyle,
      textOverflow: 'ellipsis',
      '&:disabled': {
        cursor: 'not-allowed',
      },
      color: primaryColor,
      ...(isDisabled && getPlaceholderJssStyle({ color: disabledColor })),
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
        ...(isDisabled && getPlaceholderJssStyle({ color: disabledColorDark })),
      }),
      '&:not(:focus)': {
        ...getPlaceholderJssStyle({ color: primaryColor, opacity: 1 }),
        ...prefersColorSchemeDarkMediaQuery(theme, getPlaceholderJssStyle({ color: primaryColorDark, opacity: 1 })),
      }, // Opacity fixes placeholder being shown lighter in firefox
    },
  };
};

const getListStyles = (isOpen: boolean, direction: SelectDropdownDirectionInternal, theme: Theme): Styles => {
  const isDirectionDown = direction === 'down';
  const { primaryColor, backgroundColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark } = getThemedColors('dark');

  return {
    listbox: {
      position: 'absolute',
      margin: '0',
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      gap: spacingStaticSmall,
      padding: '6px',
      ...textSmallStyle,
      zIndex: 10,
      left: 0,
      right: 0,
      [isDirectionDown ? 'top' : 'bottom']: isDirectionDown
        ? '100%'
        : `calc((${INPUT_HEIGHT_CALC}) + 2 * ${borderWidthBase})`, // Input height + border top and bottom
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
    },
  };
};
