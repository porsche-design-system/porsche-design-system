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
import { isVisibleState } from '../../../styles/form-styles';
import type { BreakpointCustomizable, Styles } from '../../../utils';
import type { FormState, Theme } from '../../../types';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';

const theme: Theme = 'light';

const getBackgroundImageStyles = (
  hasVisibleState: boolean,
  innerCircleColor: string,
  outerCircleColor: string
): Styles<'backgroundImage'> => {
  const maskColor = getThemedColors(theme).backgroundColor.replace('#', '%23');

  return {
    backgroundImage: `url(${
      // SVG images act like a mask to smooth the circle radius
      hasVisibleState
        ? `'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><g fill="${maskColor}" fill-rule="nonzero"><path d="M14 26c6.627 0 12-5.373 12-12S20.627 2 14 2 2 7.373 2 14s5.373 12 12 12zm0 2C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14z"/><path d="M14 21.273a7.273 7.273 0 1 0 0-14.546 7.273 7.273 0 0 0 0 14.546zM14 24C8.477 24 4 19.523 4 14S8.477 4 14 4s10 4.477 10 10-4.477 10-10 10z"/></g></svg>'`
        : `'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><g fill="${maskColor}" fill-rule="nonzero"><path d="M14 26c6.627 0 12-5.373 12-12S20.627 2 14 2 2 7.373 2 14s5.373 12 12 12zm0 2C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14z"/><path d="M14 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 3C7.925 25 3 20.075 3 14S7.925 3 14 3s11 4.925 11 11-4.925 11-11 11z"/></g></svg>'`
    }), radial-gradient(circle, ${innerCircleColor} ${pxToRemWithUnit(9)}, ${outerCircleColor} ${pxToRemWithUnit(9)})`,
  };
};

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean
): string => {
  const size = pxToRemWithUnit(28);
  const hasVisibleState = isVisibleState(state);
  const { baseColor, backgroundColor, contrastMediumColor, contrastHighColor, disabledColor } = getThemedColors(theme);
  const { stateColor, stateHoverColor } = getThemedFormStateColors(theme, state);

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
        margin: pxToRemWithUnit(-2),
        padding: 0,
        appearance: 'none',
        boxSizing: 'border-box',
        backgroundSize: size,
        backgroundPosition: 'center',
        backgroundColor: 'transparent',
        transition: getTransition('background-image'),
        opacity: 1,
        border: `2px solid ${backgroundColor}`,
        borderRadius: '50%',
        outline: 'none',
        cursor: 'pointer',
        ...getBackgroundImageStyles(hasVisibleState, backgroundColor, stateColor || contrastMediumColor),
      }),
      '::slotted(input:checked)': addImportantToEachRule(
        getBackgroundImageStyles(hasVisibleState, stateColor || contrastHighColor, stateColor || contrastHighColor)
      ),
      '::slotted(input:not(:disabled):not(:checked):hover), .label:hover ~ ::slotted(input:not(:disabled):not(:checked))':
        addImportantToEachRule(
          getBackgroundImageStyles(hasVisibleState, backgroundColor, stateHoverColor || baseColor)
        ),
      '::slotted(input:not(:disabled):checked:hover), .label:hover ~ ::slotted(input:not(:disabled):checked)':
        addImportantToEachRule(
          getBackgroundImageStyles(hasVisibleState, stateColor || contrastHighColor, stateHoverColor || baseColor)
        ),
      '::slotted(input:disabled)': addImportantToEachRule({
        cursor: 'not-allowed',
        ...getBackgroundImageStyles(hasVisibleState, backgroundColor, disabledColor),
      }),
      '::slotted(input:checked:disabled)': addImportantToEachRule(
        getBackgroundImageStyles(hasVisibleState, disabledColor, disabledColor)
      ),
      '::slotted(input:focus)': addImportantToEachRule({
        boxShadow: `0 0 0 1px ${stateColor || contrastMediumColor}`,
      }),
      '::slotted(input:focus:not(:focus-visible))': addImportantToEachRule({
        boxShadow: 'none',
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
