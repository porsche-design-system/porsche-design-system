import type { Theme, ThemeDefault } from '@porsche-design-system/utilities-v2';
import type { FormState } from '../types';
// eslint-disable-next-line no-restricted-imports
import { color } from '@porsche-design-system/utilities-v2';

type ThemedColorsKey =
  | 'baseColor'
  | 'brandColor'
  | 'backgroundColor'
  | 'backgroundSurfaceColor'
  | 'contrastLowColor'
  | 'contrastMediumColor'
  | 'contrastHighColor'
  | 'hoverColor'
  | 'activeColor'
  | 'focusColor'
  | 'disabledColor'
  | 'errorColor'
  | 'errorSoftColor'
  | 'successColor'
  | 'successSoftColor'
  | 'warningColor'
  | 'warningSoftColor'
  | 'neutralColor'
  | 'neutralSoftColor';

type ThemedColors = { [key in ThemedColorsKey]: string };

// TODO: try to abstract from ThemedColors
type ThemedColorsDarken = {
  [K in keyof Pick<
    ThemedColors,
    'baseColor' | 'contrastHighColor' | 'successColor' | 'errorColor' | 'hoverColor'
  > as `${K}Darken`]: string;
};

// TODO: build colors during build step
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

  return {
    baseColor,
    brandColor,
    backgroundColor,
    backgroundSurfaceColor,
    contrastLowColor,
    contrastMediumColor,
    contrastHighColor,
    hoverColor,
    activeColor,
    focusColor,
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

// color map is created once, which boosts performance instead of reinitializing it each time within function call
const themedColorsMap: { [key in Theme]: ThemedColors } = {
  light: getStaticThemedColors('light'),
  dark: getStaticThemedColors('dark'),
  'light-electric': getStaticThemedColors('light-electric'),
  'dark-electric': getStaticThemedColors('dark-electric'),
};

export const getThemedColors = (theme: Theme): ThemedColors => {
  return themedColorsMap[theme];
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

// color map is created once, which boosts performance instead of reinitializing it each time within function call
const themedColorsDarkenMap: { [key in Theme]: ThemedColorsDarken } = {
  light: themeLightDarken,
  dark: themeDarkDarken,
  'light-electric': themeLightElectricDarken,
  'dark-electric': themeDarkElectricDarken,
};

export const getThemedColorsDarken = (theme: Theme): ThemedColorsDarken => {
  return themedColorsDarkenMap[theme];
};

type ThemedFormStateColors = {
  formStateColor: string | undefined; // form state: "none" => undefined
  formStateHoverColor: string | undefined; // form state: "none" => undefined
};

const getStaticThemedFormStateColors = (theme: ThemeDefault, state: FormState): ThemedFormStateColors => {
  return {
    formStateColor: getThemedColors(theme)[`${state}Color`],
    formStateHoverColor: getThemedColorsDarken(theme)[`${state}ColorDarken`],
  };
};

const themeLightFormState: { [key in FormState]: ThemedFormStateColors } = {
  success: getStaticThemedFormStateColors('light', 'success'),
  error: getStaticThemedFormStateColors('light', 'error'),
  none: getStaticThemedFormStateColors('light', 'none'),
};

const themeDarkFormState: { [key in FormState]: ThemedFormStateColors } = {
  success: getStaticThemedFormStateColors('dark', 'success'),
  error: getStaticThemedFormStateColors('dark', 'error'),
  none: getStaticThemedFormStateColors('dark', 'none'),
};

// color map is created once, which boosts performance instead of reinitializing it each time within function call
const themedFormStateColorsMap: {
  [themeDefault in ThemeDefault]: {
    [formState in FormState]: ThemedFormStateColors;
  };
} = {
  light: themeLightFormState,
  dark: themeDarkFormState,
};

// TODO: Could also be part of getThemedColors()?
export const getThemedFormStateColors = (theme: ThemeDefault, state: FormState): ThemedFormStateColors => {
  return themedFormStateColorsMap[theme][state];
};
