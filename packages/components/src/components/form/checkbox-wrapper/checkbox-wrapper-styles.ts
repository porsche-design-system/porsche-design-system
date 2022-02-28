import type { BreakpointCustomizable } from '../../../utils';
import type { FormState, Theme } from '../../../types';
import { buildSlottedStyles, getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getBaseSlottedStyles,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
} from '../../../styles';
import { isVisibleFormState } from '../../../utils/form-state';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { getCheckboxRadioLabelJssStyle } from '../../../styles/checkbox-radio-styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean
): string => {
  const theme: Theme = 'light';
  const size = pxToRemWithUnit(24);
  const hasVisibleState = isVisibleFormState(state);
  const { baseColor, backgroundColor, contrastMediumColor, contrastHighColor, disabledColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const iconColor = backgroundColor.replace('#', '%23');

  return getCss({
    ':host': {
      display: 'block',
    },
    '@global': {
      '::slotted': addImportantToEachRule({
        '&(input)': {
          position: 'static',
          width: size,
          height: size,
          flexShrink: 0,
          display: 'block',
          margin: 0,
          padding: 0,
          WebkitAppearance: 'none', // iOS safari
          appearance: 'none',
          boxSizing: 'border-box',
          backgroundSize: size,
          backgroundPosition: hasVisibleState ? '-2px -2px' : '-1px -1px',
          backgroundColor,
          transition: ['border-color', 'background-color'].map(getTransition).join(','),
          opacity: 1,
          border: hasVisibleState ? `2px solid ${formStateColor}` : `1px solid ${contrastMediumColor}`,
          borderRadius: 0,
          outline: '1px solid transparent',
          outlineOffset: '2px',
          cursor: 'pointer',
        },
        '&(input:checked)': {
          backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${iconColor}" d="M9 19l-6-7h1.5l4.49 5.36L19.5 5H21L9 19z"/></svg>')`,
        },
        '&(input:indeterminate)': {
          backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${iconColor}" d="M3 11h18v1H3z"/></svg>')`,
        },
        '&(input:checked), &(input:indeterminate)': {
          borderColor: formStateColor || contrastHighColor,
          backgroundColor: formStateColor || contrastHighColor,
        },
        '&(input:not(:disabled):hover), .label:hover ~ &(input:not(:disabled))': {
          borderColor: formStateHoverColor || baseColor,
        },
        '&(input:indeterminate:disabled), &(input:checked:disabled)': {
          backgroundColor: disabledColor,
        },
        '&(input:disabled)': {
          borderColor: disabledColor,
          cursor: 'not-allowed',
        },
        '&(input:focus)': {
          outlineColor: formStateColor || contrastMediumColor,
        },
        '&(input:focus:not(:focus-visible))': {
          outlineColor: 'transparent',
        },
      }),
      label: {
        position: 'relative',
        display: 'flex',
      },
    },
    label: getCheckboxRadioLabelJssStyle(isDisabled, hideLabel, theme),
    ...getFunctionalComponentRequiredStyles(theme),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
