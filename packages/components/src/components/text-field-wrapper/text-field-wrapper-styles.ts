import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, Theme } from '../../types';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import type { FormState } from '../../utils/form/form-state';
import { getCss } from '../../utils';
import { isType, showCustomCalendarOrTimeIndicator } from './text-field-wrapper-utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { getBaseChildStyles, getLabelStyles } from '../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import {
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';

export const cssVariableInputPaddingStart = '--p-internal-text-field-input-padding-start';
export const cssVariableInputPaddingEnd = '--p-internal-text-field-input-padding-end';

const buttonOrIconPadding = '4px';
const buttonOrIconSize = `calc(${fontLineHeight} + ${buttonOrIconPadding} * 2)`;
const buttonOrIconOffset = '9px';

const baseButtonOrIconStyles: JssStyle = {
  gridArea: '1 / 4',
  alignSelf: 'flex-end',
  marginBottom: '11px', // TODO: it would be much cleaner with place-self: center instead but this is not possible when dom semantic shall be valid
  padding: buttonOrIconPadding,
  font: `1rem ${fontFamily}`, // needed for correct padding calculation based on ex unit
};

const getInputPaddingHorizontal = (buttonOrIconAmount: number): string => {
  return `calc(${buttonOrIconOffset} * 2 + ${buttonOrIconSize} * ${buttonOrIconAmount})`;
};

const getButtonOrIconOffsetHorizontal = (buttonOrIconAmount: number): string => {
  const multiplier = buttonOrIconAmount > 1 ? ` + ${buttonOrIconSize} * ${buttonOrIconAmount - 1}` : '';
  return `calc(${buttonOrIconOffset} + ${borderWidthBase}${multiplier})`;
};

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasUnitOrVisibleCounter: boolean,
  unitPosition: TextFieldWrapperUnitPosition,
  inputType: string,
  showPasswordToggle: boolean,
  isWithinForm: boolean,
  theme: Theme
): string => {
  const { contrastMediumColor } = getThemedColors(theme);
  const { contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');
  const isSearch = isType(inputType, 'search');
  const isPassword = isType(inputType, 'password');
  const isNumber = isType(inputType, 'number');
  const isCalendar = isType(inputType, 'date') || isType(inputType, 'week') || isType(inputType, 'month');
  const isTime = isType(inputType, 'time');
  const isSearchOrPassword = isSearch || (isPassword && showPasswordToggle);
  const isSearchWithoutForm = isSearch && !isWithinForm;
  const isSearchWithForm = isSearch && isWithinForm;
  const isCalendarOrTimeWithCustomIndicator = showCustomCalendarOrTimeIndicator(isCalendar, isTime);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          [cssVariableInputPaddingStart]: isSearchWithoutForm ? getInputPaddingHorizontal(1) : spacingStaticMedium,
          [cssVariableInputPaddingEnd]:
            isSearchOrPassword || isCalendarOrTimeWithCustomIndicator
              ? getInputPaddingHorizontal(isSearchWithForm ? 2 : 1)
              : spacingStaticMedium,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...addImportantToEachRule({
        ...getBaseChildStyles('input', state, theme, {
          padding: `${spacingStaticSmall} 0`,
          paddingInline: `var(${cssVariableInputPaddingStart}) var(${cssVariableInputPaddingEnd})`,
          ...(isNumber && {
            MozAppearance: 'textfield', // hides up/down spin button for Firefox
          }),
        }),
        '::slotted': {
          '&(input:-internal-autofill-selected),&(input:-internal-autofill-previewed),&(input:-webkit-autofill),&(input:-webkit-autofill:focus)':
            {
              WebkitBackgroundClip: 'padding-box', // reset webkit autofill styles
            },
        },
      }),
    },
    ...((isSearchOrPassword || isCalendarOrTimeWithCustomIndicator) && {
      button: {
        ...baseButtonOrIconStyles,
        marginInlineEnd: getButtonOrIconOffsetHorizontal(1),
        // TODO: maybe we should render hidden button conditionally, needs to be checked if a11y compliant
        '&:not([hidden]) ~ .button': {
          gridArea: '1 / 3',
          marginInlineEnd: 0,
        },
      },
    }),
    ...(isSearchWithoutForm && {
      icon: {
        ...baseButtonOrIconStyles,
        gridArea: '1 / 1',
        marginInlineStart: getButtonOrIconOffsetHorizontal(1),
        pointerEvents: 'none',
      },
    }),
    root: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr) auto auto',
    },
    ...getLabelStyles(
      'input',
      isDisabled,
      hideLabel,
      state,
      theme,
      hasUnitOrVisibleCounter && {
        unit: {
          gridArea: `3 / ${unitPosition === 'suffix' ? 3 : 1}`,
          placeSelf: 'center',
          zIndex: 1,
          paddingInline: unitPosition === 'suffix' ? `10px ${spacingStaticMedium}` : `${spacingStaticMedium} 10px`, // padding needed for proper JS calc
          font: textSmallStyle.font,
          color: contrastMediumColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrastMediumColorDark,
          }),
        },
      },
      {
        gridArea: '1 / 1 / auto / span 4',
      }
    ),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    // TODO: could be made conditional if we had hasUnit
    'sr-only': {
      ...getHiddenTextJssStyle(),
      padding: 0,
    },
  });
};
