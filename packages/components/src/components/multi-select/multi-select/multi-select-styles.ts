import type { BreakpointCustomizable, Theme } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '../../../../../utilities/projects/utilities';
import { Styles } from 'jss';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { FormState } from '../../../utils/form/form-state';
import { getLabelStyles, INPUT_HEIGHT } from '../../../styles/form-styles';
import { SelectDropdownDirectionInternal } from '../../../utils/select/select-dropdown';
import { getPlaceholderStyles } from '../../../styles/placeholder';
import { getNoResultsOptionJSSStyles, MULTI_SELECT_OPTION_HEIGHT } from '../../../styles/select/option-styles';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';

const inputYPadding = '13px';
const selectorNativeSelect = '::slotted([slot=select])';

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
  const { primaryColor, contrastMediumColor, contrastHighColor, backgroundColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const isDirectionDown = direction === 'down';

  return getCss({
    '@global': addImportantToEachRule({
      ':host': {
        display: 'block',
        position: 'relative',
        ...hostHiddenStyles,
      },
      ...(isWithinForm && {
        [selectorNativeSelect]: {
          opacity: 0,
          display: 'block',
          height: '0px',
        },
      }),
    }),
    root: {
      position: 'relative',
    },
    ...getListStyles(isOpen, direction, theme),
    'input-container': {
      display: 'flex',
      background: backgroundColor,
      transition: ['color', 'border-color', 'background-color'].map(getTransition).join(), // for smooth transitions between e.g. disabled states
      cursor: isDisabled ? 'not-allowed' : 'text',
      ...hoverMediaQuery({
        '&:hover:not(.disabled)': {
          borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
        },
      }),
      '&:focus-within': {
        borderColor: primaryColor,
      },
      border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`,
      borderRadius: borderRadiusSmall,
      ...(isOpen && {
        [isDirectionDown ? 'paddingBottom' : 'paddingTop']: '1px', // Add padding to keep same height when border changes
        [isDirectionDown ? 'borderBottom' : 'borderTop']: addImportantToRule(`1px solid ${contrastMediumColor}`),
        [isDirectionDown ? 'borderBottomLeftRadius' : 'borderTopLeftRadius']: 0,
        [isDirectionDown ? 'borderBottomRightRadius' : 'borderTopRightRadius']: 0,
      }),
      ...getInputStyles(isDisabled, theme),
    },
    ...buildResponsiveStyles(hideLabel, (isHidden) =>
      isHidden
        ? {
            label: {
              display: 'none',
            },
          }
        : hasLabel &&
          getLabelStyles('select', isDisabled, hideLabel, state, theme, undefined, {
            marginBottom: spacingStaticXSmall,
          })
    ),
    icon: {
      padding: `${inputYPadding} 15px`, // Horizontal padding spacingStaticMedium - 1px for visual balance
      cursor: isDisabled ? 'not-allowed' : 'pointer',
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
      ...(isDisabled && { pointerEvents: 'none' }),
    },
    'no-results': {
      padding: `${spacingStaticSmall} 12px`,
      color: contrastHighColor,
      boxSizing: 'border-box',
      ...getNoResultsOptionJSSStyles(),
    },
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    'sr-text': getHiddenTextJssStyle(),
  });
};

const getInputStyles = (isDisabled: boolean, theme: Theme): Styles => {
  const { primaryColor, disabledColor } = getThemedColors(theme);

  return {
    '@global': {
      input: {
        flex: 1,
        minWidth: 0,
        height: `calc(${fontLineHeight} + 6px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`, // we need 6px additionally so input height becomes 50px
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is alig
        color: primaryColor,
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
        '&:not(:focus)': getPlaceholderStyles({ color: primaryColor }),
        ...(isDisabled && getPlaceholderStyles({ color: disabledColor })),
      },
    },
  };
};

const getListStyles = (isOpen: boolean, direction: SelectDropdownDirectionInternal, theme: Theme): Styles => {
  const isDirectionDown = direction === 'down';
  const { primaryColor, backgroundColor } = getThemedColors(theme);

  return {
    listbox: {
      position: 'absolute',
      margin: '0',
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      gap: spacingStaticSmall,
      padding: '6px',
      background: backgroundColor,
      ...textSmallStyle,
      zIndex: 10,
      left: 0,
      right: 0,
      [isDirectionDown ? 'top' : 'bottom']: isDirectionDown ? '100%' : `${INPUT_HEIGHT}px`,
      boxSizing: 'border-box',
      maxHeight: `${8.5 * (MULTI_SELECT_OPTION_HEIGHT + 8) + 6 + 2}px`, // 8.5 options * option height + 8px gap + additional spacing (6px = padding, 2px = border)
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      border: `2px solid ${primaryColor}`,
      [isDirectionDown ? 'borderTop' : 'borderBottom']: 'none',
      borderRadius: borderRadiusSmall,
      [isDirectionDown ? 'borderTopLeftRadius' : 'borderBottomLeftRadius']: 0,
      [isDirectionDown ? 'borderTopRightRadius' : 'borderBottomRightRadius']: 0,
      scrollbarWidth: 'thin', // firefox
      scrollbarColor: 'auto', // firefox
      transition: getTransition('border-color'),
      transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
    },
  };
};
