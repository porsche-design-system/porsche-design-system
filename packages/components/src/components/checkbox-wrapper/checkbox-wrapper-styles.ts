import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import { addImportantToEachRule, getTransition, getThemedColors, getInsetJssStyle } from '../../styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { getCheckboxRadioLabelJssStyle } from '../../styles/checkbox-radio-styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import type { FormState } from '../../utils/form/form-state';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';
import { borderRadiusMedium, borderRadiusSmall, borderWidthBase } from '@porsche-design-system/utilities-v2';

const getInlineSVG = (path: string): string => {
  return `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${path}</svg>')`;
};

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor, contrastHighColor, disabledColor, focusColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);

  const checkedIconColor = getThemedColors(theme === 'light' ? 'dark' : 'light').primaryColor.replace(/#/g, '%23');
  const indeterminateIconColor = primaryColor.replace(/#/g, '%23');
  const uncheckedColor = isDisabled ? disabledColor : formStateColor || contrastMediumColor;
  const uncheckedHoverColor = formStateHoverColor || primaryColor;
  const checkedColor = isDisabled ? disabledColor : formStateColor || primaryColor;
  const checkedHoverColor = formStateHoverColor || contrastHighColor;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
      }),
      ...hostHiddenStyles,
      '::slotted': addImportantToEachRule({
        '&(input)': {
          position: 'relative',
          width: '28px',
          height: '28px',
          flexShrink: 0,
          display: 'block',
          margin: 0,
          padding: 0,
          WebkitAppearance: 'none', // iOS safari
          appearance: 'none',
          boxSizing: 'border-box',
          backgroundSize: '24px',
          backgroundColor: 'transparent',
          transition: ['border-color', 'background-color'].map(getTransition).join(),
          border: `2px solid ${uncheckedColor}`,
          borderRadius: borderRadiusSmall,
          outline: 0,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        },
        '&(input:checked)': {
          borderColor: checkedColor,
          backgroundColor: checkedColor,
          backgroundImage: getInlineSVG(
            `<path fill="${checkedIconColor}" d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`
          ),
        },
        '&(input:indeterminate)': {
          backgroundImage: getInlineSVG(`<path fill="${indeterminateIconColor}" d="m20,11v2H4v-2h16Z"/>`),
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
            ...getInsetJssStyle(-2),
            border: `${borderWidthBase} solid ${focusColor}`,
            borderRadius: borderRadiusSmall,
          },
          '&(input:checked:focus)::before': {
            ...getInsetJssStyle(-6),
            borderRadius: borderRadiusMedium,
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
