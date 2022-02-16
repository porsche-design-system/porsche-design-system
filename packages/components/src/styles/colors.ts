import type { Theme } from '@porsche-design-system/utilities-v2';
// eslint-disable-next-line no-restricted-imports
import { color } from '@porsche-design-system/utilities-v2';

type ThemedColorsKey =
  | 'baseColor'
  | 'baseColorDarken'
  | 'brandColor'
  | 'backgroundColor'
  | 'backgroundSurfaceColor'
  | 'contrastLowColor'
  | 'contrastMediumColor'
  | 'contrastHighColor'
  | 'contrastHighColorDarken'
  | 'hoverColor'
  | 'hoverColorDarken'
  | 'activeColor'
  | 'focusColor'
  | 'disabledColor'
  | 'errorColor'
  | 'errorColorDarken'
  | 'errorSoftColor'
  | 'successColor'
  | 'successColorDarken'
  | 'successSoftColor'
  | 'warningColor'
  | 'warningSoftColor'
  | 'neutralColor'
  | 'neutralSoftColor';

type ThemedColors = { [key in ThemedColorsKey]: string };

type ThemedColorsDarken = {
  [K in keyof Pick<
    ThemedColors,
    'baseColor' | 'contrastHighColor' | 'successColor' | 'errorColor' | 'hoverColor'
  > as `${K}Darken`]: string;
};

const themeLightDarken: ThemedColorsDarken = {
  baseColorDarken: '#000',
  contrastHighColorDarken: '#151718',
  successColorDarken: '#014d0c',
  errorColorDarken: '#a30000',
  hoverColorDarken: '#980014',
};

const themeDarkDarken: ThemedColorsDarken = {
  baseColorDarken: '#e0e0e0',
  contrastHighColorDarken: '#c3c5c8',
  successColorDarken: '#017d14',
  errorColorDarken: '#d30303',
  hoverColorDarken: '#c4001a',
};

const themeLightElectricDarken: ThemedColorsDarken = {
  ...themeLightDarken,
  hoverColorDarken: '#0084b7',
};

const themeDarkElectricDarken: ThemedColorsDarken = {
  ...themeDarkDarken,
  hoverColorDarken: '#0084b7',
};

const themedColorsDarkenMap: { [key in Theme]: ThemedColorsDarken } = {
  light: themeLightDarken,
  dark: themeDarkDarken,
  'light-electric': themeLightElectricDarken,
  'dark-electric': themeDarkElectricDarken,
};

const getStaticThemedColors = (theme: Theme): ThemedColors => {
  const {
    base: baseColor,
    brand: brandColor,
    background: { base: backgroundColor, surface: backgroundSurfaceColor },
    contrast: { low: contrastLowColor, medium: contrastMediumColor, high: contrastHighColor },
    state: { hover: hoverColor, active: activeColor, focus: focusColor, disabled: disabledColor },
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
  } = color[theme];

  const { baseColorDarken, contrastHighColorDarken, successColorDarken, errorColorDarken, hoverColorDarken } =
    themedColorsDarkenMap[theme];

  return {
    baseColor,
    baseColorDarken,
    brandColor,
    backgroundColor,
    backgroundSurfaceColor,
    contrastLowColor,
    contrastMediumColor,
    contrastHighColor,
    contrastHighColorDarken,
    hoverColor,
    hoverColorDarken,
    activeColor,
    focusColor,
    disabledColor,
    errorColor,
    errorColorDarken,
    errorSoftColor,
    successColor,
    successColorDarken,
    successSoftColor,
    warningColor,
    warningSoftColor,
    neutralColor,
    neutralSoftColor,
  };
};

const themedColorsMap: { [key in Theme]: ThemedColors } = {
  light: getStaticThemedColors('light'),
  dark: getStaticThemedColors('dark'),
  'light-electric': getStaticThemedColors('light-electric'),
  'dark-electric': getStaticThemedColors('dark-electric'),
};

export const getThemedColors = (theme: Theme): ThemedColors => {
  return themedColorsMap[theme];
};
