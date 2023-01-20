import type { BreakpointCustomizable, Theme } from '../../types';
import { addImportantToEachRule, getInsetJssStyle, getThemedColors, getTransition } from '../../styles';
import { getCheckboxRadioLabelJssStyle } from '../../styles/checkbox-radio-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { getCss } from '../../utils';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import type { FormState } from '../../utils/form/form-state';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';
import { borderWidthBase, fontFamily, fontLineHeight } from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';

/* const getBackgroundImageStyles = (
  hasVisibleState: boolean,
  innerCircleColor: string,
  outerCircleColor: string
): Styles<'backgroundImage'> => {
  const theme: Theme = 'light';
  const maskColor = getThemedColors(theme).backgroundColor.replace(/#/g, '%23');

  return {
    backgroundImage: `url(${
      // SVG images act like a mask to smooth the circle radius
      hasVisibleState
        ? `'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><g fill="${maskColor}" fill-rule="nonzero"><path d="M14 26c6.627 0 12-5.373 12-12S20.627 2 14 2 2 7.373 2 14s5.373 12 12 12zm0 2C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14z"/><path d="M14 21.273a7.273 7.273 0 1 0 0-14.546 7.273 7.273 0 0 0 0 14.546zM14 24C8.477 24 4 19.523 4 14S8.477 4 14 4s10 4.477 10 10-4.477 10-10 10z"/></g></svg>'`
        : `'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><g fill="${maskColor}" fill-rule="nonzero"><path d="M14 26c6.627 0 12-5.373 12-12S20.627 2 14 2 2 7.373 2 14s5.373 12 12 12zm0 2C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14z"/><path d="M14 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 3C7.925 25 3 20.075 3 14S7.925 3 14 3s11 4.925 11 11-4.925 11-11 11z"/></g></svg>'`
    }), radial-gradient(circle, ${innerCircleColor} ${pxToRemWithUnit(9)}, ${outerCircleColor} ${pxToRemWithUnit(9)})`,
  };
};*/

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor, contrastHighColor, disabledColor, focusColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);

  const uncheckedColor = isDisabled ? disabledColor : formStateColor || contrastMediumColor;
  const uncheckedHoverColor = formStateHoverColor || primaryColor;
  const checkedColor = isDisabled ? disabledColor : formStateColor || primaryColor;
  const checkedHoverColor = formStateHoverColor || contrastHighColor;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...hostHiddenStyles,
        display: 'block',
      }),
      '::slotted': addImportantToEachRule({
        '&(input)': {
          position: 'relative',
          width: fontLineHeight,
          height: fontLineHeight,
          fontFamily, // needed for correct width and height definition
          fontSize: '1rem', // needed for correct width and height definition
          flexShrink: 0,
          display: 'block',
          margin: 0,
          padding: 0,
          WebkitAppearance: 'none', // iOS safari
          appearance: 'none',
          boxSizing: 'content-box',
          backgroundSize: fontLineHeight,
          backgroundColor: 'transparent',
          transition: ['border-color', 'background-color'].map(getTransition).join(),
          border: `2px solid ${uncheckedColor}`,
          borderRadius: '50%',
          outline: 0,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        },
        '&(input:checked)': {
          borderColor: checkedColor,
          backgroundColor: checkedColor,
        },
        ...(!isDisabled && {
          ...hoverMediaQuery({
            '&(input:hover), .text:hover ~ &(input)': {
              borderColor: uncheckedHoverColor,
            },
            '&(input:checked:hover), .text:hover ~ &(input:checked)': {
              borderColor: checkedHoverColor,
              backgroundColor: checkedHoverColor,
            },
          }),
          '&(input:focus)::before': {
            content: '""',
            position: 'absolute',
            ...getInsetJssStyle(-6),
            border: `${borderWidthBase} solid ${focusColor}`,
            borderRadius: '50%',
          },
          '&(input:focus:not(:focus-visible))::before': {
            borderColor: 'transparent',
          },
        }),
      }),
      label: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
      },
    },
    text: getCheckboxRadioLabelJssStyle(isDisabled, hideLabel, theme),
    ...getFunctionalComponentRequiredStyles(theme),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
