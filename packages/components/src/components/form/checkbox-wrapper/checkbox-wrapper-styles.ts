import {
  addImportantToEachRule,
  buildResponsiveStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getFormCheckboxRadioHiddenJssStyle,
  getThemedColors,
  getThemedFormStateColors,
  getTransition,
  pxToRemWithUnit,
} from '../../../utils';
import { isVisibleFormState } from '../../../utils/form-state';
import type { BreakpointCustomizable } from '../../../utils';
import type { FormState, Theme } from '../../../types';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean
): string => {
  const theme: Theme = 'light';
  const size = pxToRemWithUnit(24);
  const hasVisibleState = isVisibleFormState(state);
  const { baseColor, backgroundColor, contrastMediumColor, contrastHighColor, disabledColor } = getThemedColors(theme);
  const { stateColor, stateHoverColor } = getThemedFormStateColors(theme, state);
  const iconColor = backgroundColor.replace('#', '%23');

  return getCss({
    ':host': {
      display: 'block',
    },
    '@global': {
      '::slotted(input)': addImportantToEachRule({
        position: 'static',
        width: size,
        height: size,
        flexShrink: 0,
        display: 'block',
        margin: 0,
        padding: 0,
        appearance: 'none',
        boxSizing: 'border-box',
        backgroundSize: size,
        backgroundPosition: hasVisibleState ? '-2px -2px' : '-1px -1px',
        backgroundColor,
        transition: ['border-color', 'background-color'].map(getTransition).join(','),
        opacity: 1,
        border: hasVisibleState ? `2px solid ${stateColor}` : `1px solid ${contrastMediumColor}`,
        borderRadius: 0,
        outline: '1px solid transparent',
        outlineOffset: 2,
        cursor: 'pointer',
      }),
      '::slotted(input:checked)': addImportantToEachRule({
        backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${iconColor}" d="M9 19l-6-7h1.5l4.49 5.36L19.5 5H21L9 19z"/></svg>')`,
      }),
      '::slotted(input:indeterminate)': addImportantToEachRule({
        backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${iconColor}" d="M3 11h18v1H3z"/></svg>')`,
      }),
      '::slotted(input:checked), ::slotted(input:indeterminate)': addImportantToEachRule({
        borderColor: stateColor || contrastHighColor,
        backgroundColor: stateColor || contrastHighColor,
      }),
      '::slotted(input:not(:disabled):hover), .label:hover ~ ::slotted(input:not(:disabled))': addImportantToEachRule({
        borderColor: stateHoverColor || baseColor,
      }),
      '::slotted(input:indeterminate:disabled), ::slotted(input:checked:disabled)': addImportantToEachRule({
        backgroundColor: disabledColor,
      }),
      '::slotted(input:disabled)': addImportantToEachRule({
        borderColor: disabledColor,
        cursor: 'not-allowed',
      }),
      '::slotted(input:focus)': addImportantToEachRule({
        outlineColor: stateColor || contrastMediumColor,
      }),
      '::slotted(input:focus:not(:focus-visible))': addImportantToEachRule({
        outlineColor: 'transparent',
      }),
      label: {
        position: 'relative',
        display: 'flex',
      },
    },
    label: {
      order: 1,
      display: 'inline-block',
      cursor: isDisabled ? 'default' : 'pointer',
      outline: 'none',
      color: isDisabled ? disabledColor : baseColor,
      transition: getTransition('color'),
      ...buildResponsiveStyles(hideLabel, getFormCheckboxRadioHiddenJssStyle),
    },
    ...getFunctionalComponentRequiredStyles(theme),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
