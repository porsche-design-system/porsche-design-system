import type { Styles } from '../../utils';
import { getInset, getThemedColors, getThemedFormStateColors, getTransition, pxToRemWithUnit } from '../../utils';
import { color, font } from '@porsche-design-system/utilities';
import { FormState, Theme } from '../../types';

export const isVisibleState = (state: FormState): boolean => state === 'success' || state === 'error';

export const getBaseChildStyles = (child: 'input' | 'textarea', state: FormState): Styles => {
  const theme: Theme = 'light';
  const { baseColor, backgroundColor, contrastMediumColor } = getThemedColors(theme);
  const { stateColor, stateHoverColor } = getThemedFormStateColors(theme, state);
  const hasVisibleState = isVisibleState(state);

  const { disabled } = color.state; // 🤷 no theming here
  const readonly = '#ebebeb'; // 🤷

  return {
    [`::slotted(${child})`]: {
      display: 'block',
      position: 'relative',
      ...getInset(),
      width: '100%',
      ...(child === 'input' && { height: pxToRemWithUnit(48) }),
      margin: 0,
      outline: '1px solid transparent',
      outlineOffset: '2px',
      appearance: 'none',
      boxSizing: 'border-box',
      border: hasVisibleState ? `2px solid ${stateColor}` : `1px solid ${contrastMediumColor}`,
      borderRadius: 0,
      backgroundColor,
      opacity: 1,
      fontFamily: font.family,
      fontWeight: font.weight.regular,
      ...font.size.small,
      textIndent: 0,
      color: baseColor,
      transition: ['color', 'border-color', 'background-color'].map(getTransition).join(','),
    },
    [`::slotted(${child}:hover)`]: {
      borderColor: hasVisibleState ? stateHoverColor : baseColor,
    },
    [`::slotted(${child}:focus)`]: {
      outlineColor: hasVisibleState ? stateColor : contrastMediumColor,
    },
    [`::slotted(${child}[readonly]:focus)`]: {
      outlineColor: 'transparent',
    },
    [`::slotted(${child}:disabled)`]: {
      cursor: 'not-allowed',
      color: disabled, // 🤷
      borderColor: disabled,
      WebkitTextFillColor: disabled, // fix placeholder color bug in Safari
    },
    [`::slotted(${child}[readonly])`]: {
      borderColor: readonly,
      backgroundColor: readonly,
    },
    [`::slotted(${child}[readonly]:not(:disabled))`]: {
      color: contrastMediumColor,
    },
  };
};
