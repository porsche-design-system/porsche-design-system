import type { FormState, Theme } from '../../../types';
import type { BreakpointCustomizable } from '../../../utils';
import { buildSlottedStyles, getCss, isVisibleFormState } from '../../../utils';
import type { InputType, TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import {
  addImportantToEachRule,
  getBaseSlottedStyles,
  getFocusJssStyle,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
  getScreenReaderOnlyJssStyle,
} from '../../../styles';
import { getBaseChildStyles, getLabelStyles } from '../../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { hoverMediaQuery } from '../../../styles/hover-media-query';

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasUnitOrVisibleCounter: boolean,
  unitPosition: TextFieldWrapperUnitPosition,
  inputType: InputType
): string => {
  const theme: Theme = 'light';
  const { baseColor, contrastMediumColor, activeColor, disabledColor, hoverColor } = getThemedColors(theme);
  const hasVisibleState = isVisibleFormState(state);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      ...addImportantToEachRule({
        ...getBaseChildStyles('input', state, theme, {
          ...(!hasUnitOrVisibleCounter && {
            // padding is set via inline style if unit is present
            padding: pxToRemWithUnit(hasVisibleState ? 10 : 11),
          }),
          ...(inputType === 'number'
            ? {
                MozAppearance: 'textfield', // hides up/down spin button for Firefox
              }
            : (inputType === 'password' || inputType === 'search') && {
                paddingRight: pxToRemWithUnit(48),
              }),
        }),
        // Reset webkit autofill styles
        '::slotted(input:-internal-autofill-selected),::slotted(input:-internal-autofill-previewed),::slotted(input:-webkit-autofill),::slotted(input:-webkit-autofill:focus)':
          {
            WebkitBackgroundClip: 'padding-box',
          },
      }),
      button: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 0,
        width: pxToRemWithUnit(48),
        height: pxToRemWithUnit(48),
        padding: pxToRemWithUnit(12),
        boxSizing: 'border-box',
        outline: 'transparent none',
        appearance: 'none',
        border: 'none',
        textDecoration: 'none',
        background: 'transparent',
        cursor: 'pointer',
        color: baseColor,
        transition: getTransition('color'),
        ...getFocusJssStyle({ offset: hasVisibleState ? -5 : -4 }),
        ...hoverMediaQuery({
          '&:hover': {
            color: hoverColor,
          },
        }),
        '&:active': {
          color: activeColor,
        },
        '&:disabled': {
          color: disabledColor,
          cursor: 'not-allowed',
        },
        ...(inputType === 'search' && {
          right: pxToRemWithUnit(40),
          '&+ button': {
            right: 0,
          },
        }),
      },
    },
    root: {
      display: 'block',
      position: 'relative',
    },
    ...getLabelStyles(
      'input',
      isDisabled,
      hideLabel,
      state,
      theme,
      hasUnitOrVisibleCounter && {
        unit: {
          position: 'absolute',
          bottom: 0,
          [unitPosition === 'suffix' ? 'right' : 'left']: 0,
          padding: pxToRemWithUnit(12),
          zIndex: 1,
          boxSizing: 'border-box',
          color: contrastMediumColor,
        },
      }
    ),
    ...getFunctionalComponentRequiredStyles(theme),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    'sr-only': {
      ...getScreenReaderOnlyJssStyle(),
      padding: 0,
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      ...getBaseSlottedStyles(),
      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button, & input[type="search"]::-webkit-search-decoration':
        {
          WebkitAppearance: 'none',
          appearance: 'none',
        },
      '& input[type="search"]::-webkit-search-cancel-button': {
        display: 'none',
      },
      '& input[type="text"]': {
        '&::-webkit-contacts-auto-fill-button, &::-webkit-credentials-auto-fill-button': {
          marginRight: '2.4375rem',
        },
      },
    })
  );
};
