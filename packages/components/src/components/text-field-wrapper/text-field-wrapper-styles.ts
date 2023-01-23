import type { BreakpointCustomizable, Theme } from '../../types';
import { buildSlottedStyles, getCss, isVisibleFormState } from '../../utils';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import {
  addImportantToEachRule,
  getFocusJssStyle,
  getTransition,
  getThemedColors,
  getScreenReaderOnlyJssStyle,
  pxToRemWithUnit,
} from '../../styles';
import { getBaseChildStyles, getLabelStyles, INPUT_HEIGHT } from '../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import { isType } from './text-field-wrapper-utils';
import type { FormState } from '../../utils/form/form-state';
import type { JssStyle } from 'jss';
import { spacingStaticMedium, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasUnitOrVisibleCounter: boolean,
  unitPosition: TextFieldWrapperUnitPosition,
  inputType: string,
  isWithinForm: boolean,
  hasAction: boolean,
  hasActionLoading: boolean,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor, disabledColor, hoverColor } = getThemedColors(theme);
  const hasVisibleState = isVisibleFormState(state);
  const isSearch = isType(inputType, 'search');
  const isPassword = isType(inputType, 'password');
  const isNumber = isType(inputType, 'number');
  const isSearchOrPassword = isSearch || isPassword;
  const inputHeightRem = pxToRemWithUnit(INPUT_HEIGHT);
  const innerInputHeightRem = pxToRemWithUnit(INPUT_HEIGHT - 4);

  const disabledJssStyle: JssStyle = {
    color: disabledColor,
    cursor: 'not-allowed',
  };

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
      ...addImportantToEachRule({
        ...getBaseChildStyles('input', state, theme, {
          ...(!hasUnitOrVisibleCounter && {
            // padding is set via inline style if unit is present
            padding: `14px ${spacingStaticMedium}`,
          }),
          ...(isNumber
            ? {
                MozAppearance: 'textfield', // hides up/down spin button for Firefox
              }
            : isSearchOrPassword && {
                paddingRight: isSearch && isWithinForm ? pxToRemWithUnit(88) : innerInputHeightRem,
                ...(isSearch && !isWithinForm && { paddingLeft: pxToRemWithUnit(50) }),
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
          width: innerInputHeightRem,
          height: inputHeightRem,
          padding: '15px 13px',
          boxSizing: 'border-box',
          outline: 'transparent none',
          appearance: 'none',
          border: 'none',
          textDecoration: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: primaryColor,
          transition: getTransition('color'),
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
          ...getFocusJssStyle({ offset: hasVisibleState ? -5 : -4 }),
          ...hoverMediaQuery({
            '&:not(:disabled):hover': {
              color: hoverColor,
            },
          }),
          '&:disabled': disabledJssStyle,
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
          height: innerInputHeightRem,
          bottom: '2px',
          [unitPosition === 'suffix' ? 'right' : 'left']: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          padding: unitPosition === 'suffix' ? `0 ${spacingStaticMedium} 0 10px` : `0 10px 0 ${spacingStaticMedium}`,
          font: textSmallStyle.font,
          color: contrastMediumColor,
        },
      }
    ),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    ...(isSearch &&
      (hasAction || !isWithinForm) && {
        icon: {
          // search icon on left side
          position: 'absolute',
          left: '2px',
          bottom: '2px',
          height: innerInputHeightRem,
          width: innerInputHeightRem,
          color: contrastMediumColor,
          boxSizing: 'border-box',
          padding: '13px',
          alignItems: 'center',
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
