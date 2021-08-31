import { color } from '@porsche-design-system/utilities';
import type { FormState, Theme } from '../types';
import { isDark } from './theme';

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const colorDarken: DeepPartial<typeof color> = {
  neutralContrast: {
    high: '#151718',
  },
  notification: {
    success: '#014d0c',
    error: '#a30000',
  },
  state: {
    hover: '#980014',
  },
  darkTheme: {
    default: '#e0e0e0',
    notification: {
      success: '#017d14',
      error: '#d30303',
    },
    state: {
      hover: '#c4001a',
    },
  },
};

export const getThemedColors = (
  theme: Theme
): {
  textColor: string;
  backgroundColor: string;
  contrastMediumColor: string;
  contrastHighColor: string;
  disabledColor: string;
  errorColor: string;
  successColor: string;
} => {
  const isDarkTheme = isDark(theme);
  const {
    default: textColor,
    background: { default: backgroundColor },
    neutralContrast: { medium: contrastMediumColor, high: contrastHighColor },
    state: { disabled: disabledColor },
    notification: { error: errorColor, success: successColor },
  } = isDarkTheme ? color.darkTheme : color;

  return {
    textColor,
    backgroundColor,
    contrastMediumColor,
    contrastHighColor,
    disabledColor,
    errorColor,
    successColor,
  };
};

export const getThemedStateColors = (
  theme: Theme,
  state: FormState
): { stateColor: string; stateHoverColor: string } => {
  const isDarkTheme = isDark(theme);
  const stateColor = (isDarkTheme ? color.darkTheme : color).notification[state];
  const stateHoverColor = (isDarkTheme ? colorDarken.darkTheme : colorDarken).notification[state];

  return { stateColor, stateHoverColor };
};
