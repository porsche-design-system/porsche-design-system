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

type ThemedColors = {
  textColor: string;
  brandColor: string;
  backgroundColor: string;
  contrastLowColor: string;
  contrastMediumColor: string;
  contrastHighColor: string;
  hoverColor: string;
  activeColor: string;
  disabledColor: string;
  errorColor: string;
  errorSoftColor: string;
  successColor: string;
  successSoftColor: string;
  warningColor: string;
  warningSoftColor: string;
  neutralColor: string;
  neutralSoftColor: string;
};

const getStaticThemedColors = (theme: Theme): ThemedColors => {
  const {
    default: textColor,
    brand: brandColor,
    background: { default: backgroundColor },
    neutralContrast: { low: contrastLowColor, medium: contrastMediumColor, high: contrastHighColor },
    state: { hover: hoverColor, active: activeColor, disabled: disabledColor },
    notification: {
      error: errorColor,
      errorSoft: errorSoftColor,
      success: successColor,
      successSoft: successSoftColor,
      warning: warningColor,
      warningSoft: warningSoftColor,
      neutral: neutralColor,
      neutralSoft: neutralSoftColor,
    },
  } = isDark(theme) ? color.darkTheme : color;

  return {
    textColor,
    brandColor,
    backgroundColor,
    contrastLowColor,
    contrastMediumColor,
    contrastHighColor,
    hoverColor,
    activeColor,
    disabledColor,
    errorColor,
    errorSoftColor,
    successColor,
    successSoftColor,
    warningColor,
    warningSoftColor,
    neutralColor,
    neutralSoftColor,
  };
};

const themedColorsLight = getStaticThemedColors('light');
const themedColorsDark = getStaticThemedColors('dark');

export const getThemedColors = (theme: Theme): ThemedColors => {
  return isDark(theme) ? themedColorsDark : themedColorsLight;
};

export const getThemedStateColors = (
  theme: Theme,
  state: FormState
): { stateColor: string; stateHoverColor: string } => {
  const isDarkTheme = isDark(theme);

  return {
    stateColor: (isDarkTheme ? color.darkTheme : color).notification[state],
    stateHoverColor: (isDarkTheme ? colorDarken.darkTheme : colorDarken).notification[state],
  };
};
