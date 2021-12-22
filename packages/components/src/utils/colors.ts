import { color } from '@porsche-design-system/utilities';
import type { FormState, Theme, ThemeExtendedElectric, ThemeExtendedElectricDark } from '../types';
import { isDark, isDarkElectric, isLightElectric } from './theme';

type ColorDarkenTheme = {
  default: string;
  neutralContrast: {
    high: string;
  };
  notification: {
    success: string;
    error: string;
  };
  state: {
    hover: string;
  };
};

const lightThemeDarken: ColorDarkenTheme = {
  default: '#000',
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
};

const darkThemeDarken: ColorDarkenTheme = {
  default: '#e0e0e0',
  neutralContrast: {
    high: '#c3c5c8',
  },
  notification: {
    success: '#017d14',
    error: '#d30303',
  },
  state: {
    hover: '#c4001a',
  },
};

const lightElectricThemeDarken: ColorDarkenTheme = {
  ...lightThemeDarken,
  state: {
    hover: '#0084b7',
  },
};

type ColorDarken = ColorDarkenTheme & {
  darkTheme: ColorDarkenTheme;
  lightElectricTheme: ColorDarkenTheme;
};

export const colorDarken: ColorDarken = {
  ...lightThemeDarken,
  darkTheme: darkThemeDarken,
  lightElectricTheme: lightElectricThemeDarken,
};

type ThemedColorsDarken = {
  baseColorDarken: string;
  contrastHighColorDarken: string;
  successColorDarken: string;
  errorColorDarken: string;
  hoverColorDarken: string;
};

const getStaticThemedColorsDarken = (theme: ThemeExtendedElectric): ThemedColorsDarken => {
  const {
    default: baseColorDarken,
    neutralContrast: { high: contrastHighColorDarken },
    state: { hover: hoverColorDarken },
    notification: { error: errorColorDarken, success: successColorDarken },
  } = isDark(theme) ? colorDarken.darkTheme : isLightElectric(theme) ? colorDarken.lightElectricTheme : colorDarken;

  return {
    baseColorDarken,
    contrastHighColorDarken,
    successColorDarken,
    errorColorDarken,
    hoverColorDarken,
  };
};

const themedColorsDarkenLight = getStaticThemedColorsDarken('light');
const themedColorsDarkenDark = getStaticThemedColorsDarken('dark');
const themedColorsDarkenLightElectric = getStaticThemedColorsDarken('light-electric');

export const getThemedColorsDarken = (theme: ThemeExtendedElectric): ThemedColorsDarken => {
  return isDark(theme)
    ? themedColorsDarkenDark
    : isLightElectric(theme)
    ? themedColorsDarkenLightElectric
    : themedColorsDarkenLight;
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

const getStaticThemedColors = (theme: ThemeExtendedElectricDark): ThemedColors => {
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
  } = isDark(theme)
    ? color.darkTheme
    : isLightElectric(theme)
    ? color.lightElectricTheme
    : isDarkElectric(theme)
    ? color.darkElectricTheme
    : color;

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
const themedColorsDarkElectric = getStaticThemedColors('dark-electric');

export const getThemedColors = (theme: ThemeExtendedElectricDark): ThemedColors => {
  return isDark(theme)
    ? themedColorsDark
    : isLightElectric(theme)
    ? themedColorsLightElectric
    : isDarkElectric(theme)
    ? themedColorsDarkElectric
    : themedColorsLight;
};

export const getThemedFormStateColors = (
  theme: Theme,
  state: FormState
): { stateColor: string; stateHoverColor: string } => {
  const isDarkTheme = isDark(theme);

  return {
    stateColor: (isDarkTheme ? color.darkTheme : color).notification[state],
    stateHoverColor: (isDarkTheme ? colorDarken.darkTheme : colorDarken).notification[state],
  };
};
