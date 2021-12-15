import { color } from '@porsche-design-system/utilities';
import type { Color } from '@porsche-design-system/utilities';
import type { FormState, Theme, ThemeExtendedElectric } from '../types';
import { isDark, isLightElectric } from './theme';

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const colorDarken: DeepPartial<Color> = {
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
  lightElectricTheme: {
    neutralContrast: {
      high: '#151718',
    },
    notification: {
      success: '#014d0c',
      error: '#a30000',
    },
    state: {
      hover: '#0084b7',
    },
  },
};

type ThemedColors = {
  baseColor: string;
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

const getStaticThemedColors = (theme: ThemeExtendedElectric): ThemedColors => {
  const {
    default: baseColor,
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
  } = isDark(theme) ? color.darkTheme : isLightElectric(theme) ? color.lightElectricTheme : color;

  return {
    baseColor,
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
const themedColorsLightElectric = getStaticThemedColors('light-electric');

export const getThemedColors = (theme: ThemeExtendedElectric): ThemedColors => {
  return isDark(theme) ? themedColorsDark : isLightElectric(theme) ? themedColorsLightElectric : themedColorsLight;
};

type ThemedFormStateColors = {
  stateColor: string;
  stateHoverColor: string;
};

export const getStaticThemedFormStateColors = (theme: Theme, state: FormState): ThemedFormStateColors => {
  const isDarkTheme = isDark(theme);

  return {
    stateColor: (isDarkTheme ? color.darkTheme : color).notification[state],
    stateHoverColor: (isDarkTheme ? colorDarken.darkTheme : colorDarken).notification[state],
  };
};

const themedFormStateColorsLight: { [key in FormState]: ThemedFormStateColors } = {
  success: getStaticThemedFormStateColors('light', 'success'),
  error: getStaticThemedFormStateColors('light', 'error'),
  none: getStaticThemedFormStateColors('light', 'none'),
};
const themedFormStateColorsDark: { [key in FormState]: ThemedFormStateColors } = {
  success: getStaticThemedFormStateColors('dark', 'success'),
  error: getStaticThemedFormStateColors('dark', 'error'),
  none: getStaticThemedFormStateColors('dark', 'none'),
};

export const getThemedFormStateColors = (theme: Theme, state: FormState): ThemedFormStateColors => {
  return isDark(theme) ? themedFormStateColorsDark[state] : themedFormStateColorsLight[state];
};
