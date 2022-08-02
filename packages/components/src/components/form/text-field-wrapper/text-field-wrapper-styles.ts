import type { BreakpointCustomizable, Theme } from '../../../types';
import { buildSlottedStyles, getCss, isVisibleFormState } from '../../../utils';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
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
import { isType } from './text-field-wrapper-utils';
import type { FormState } from '../form-state';
import type { JssStyle } from 'jss';

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasUnitOrVisibleCounter: boolean,
  unitPosition: TextFieldWrapperUnitPosition,
  inputType: string,
  isWithinForm: boolean,
  hasAction: boolean,
  hasActionLoading: boolean
): string => {
  const theme: Theme = 'light';
  const { baseColor, contrastMediumColor, activeColor, disabledColor, hoverColor } = getThemedColors(theme);
  const hasVisibleState = isVisibleFormState(state);
  const isSearch = isType(inputType, 'search');
  const isPassword = isType(inputType, 'password');
  const isSearchOrPassword = isSearch || isPassword;

  const disabledJssStyle: JssStyle = {
    color: disabledColor,
    cursor: 'not-allowed',
  };

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
          ...(isType(inputType, 'number')
            ? {
                MozAppearance: 'textfield', // hides up/down spin button for Firefox
              }
            : isSearchOrPassword && {
                paddingRight: pxToRemWithUnit(isSearch && isWithinForm ? 88 : 48),
                ...(isSearch && !isWithinForm && { paddingLeft: pxToRemWithUnit(48) }),
              }),
        }),
        // Reset webkit autofill styles
        '::slotted(input:-internal-autofill-selected),::slotted(input:-internal-autofill-previewed),::slotted(input:-webkit-autofill),::slotted(input:-webkit-autofill:focus)':
          {
            WebkitBackgroundClip: 'padding-box',
          },
      }),
      ...(isSearchOrPassword && {
        button: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: 0,
          width: pxToRemWithUnit(48),
          height: pxToRemWithUnit(48),
          padding: pxToRemWithUnit(12), // affects spinner size
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
          ...(!hasActionLoading && {
            ...hoverMediaQuery({
              '&:hover': {
                color: hoverColor,
              },
            }),
            '&:active': {
              color: activeColor,
            },
          }),
          '&:disabled': disabledJssStyle,
          ...(isSearch &&
            isWithinForm && {
              right: pxToRemWithUnit(40), // clear button
              ...(hasActionLoading && {
                '&+button[type=button]': disabledJssStyle, // action button
              }),
              '&+button[type=submit]': {
                right: 0, // submit button
              },
            }),
        },
      }),
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
    ...(isSearch &&
      (hasAction || !isWithinForm) && {
        icon: {
          // search icon on left side
          position: 'absolute',
          left: 0,
          bottom: 0,
          color: contrastMediumColor,
          padding: pxToRemWithUnit(12),
          pointerEvents: 'none',
        },
      }),
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
      // the following selectors don't work within ::slotted() pseudo selector, therefore we have to apply them via light DOM
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
