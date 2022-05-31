import type { Theme } from '@porsche-design-system/utilities-v2';
import { isThemeDark } from '../utils';

type ThemedColor =
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

export type ThemedColors = { [key in ThemedColor]: string };

/* Auto Generated Start */
const themeLight = {
  baseColor: '#000',
  baseColorDarken: '#000000',
  brandColor: '#d5001c',
  backgroundColor: '#fff',
  backgroundSurfaceColor: '#f2f2f2',
  contrastLowColor: '#e3e4e5',
  contrastMediumColor: '#626669',
  contrastHighColor: '#323639',
  contrastHighColorDarken: '#151718',
  hoverColor: '#d5001c',
  hoverColorDarken: '#980014',
  activeColor: '#d5001c',
  focusColor: 'currentColor',
  disabledColor: '#96989a',
  errorColor: '#e00000',
  errorColorDarken: '#a30000',
  errorSoftColor: '#fae6e6',
  successColor: '#018a16',
  successColorDarken: '#014d0c',
  successSoftColor: '#e5f3e7',
  warningColor: '#ff9b00',
  warningSoftColor: '#fff5e5',
  neutralColor: '#0061bd',
  neutralSoftColor: '#e5eff8'
};

const themeDark = {
  baseColor: '#fff',
  baseColorDarken: '#e0e0e0',
  brandColor: '#d5001c',
  backgroundColor: '#0e1418',
  backgroundSurfaceColor: '#262b2e',
  contrastLowColor: '#4a4e51',
  contrastMediumColor: '#b0b1b2',
  contrastHighColor: '#e3e4e5',
  contrastHighColorDarken: '#c3c5c8',
  hoverColor: '#ff0223',
  hoverColorDarken: '#c4001a',
  activeColor: '#ff0223',
  focusColor: 'currentColor',
  disabledColor: '#7c7f81',
  errorColor: '#fc1717',
  errorColorDarken: '#d30303',
  errorSoftColor: '#fec5c5',
  successColor: '#01ba1d',
  successColorDarken: '#017d14',
  successSoftColor: '#bfeec6',
  warningColor: '#ff9b00',
  warningSoftColor: '#ffe6bf',
  neutralColor: '#2193ff',
  neutralSoftColor: '#c7e4ff'
};

const themeLightElectric = {
  ...themeLight,
  brandColor: '#00b0f4',
  hoverColor: '#00b0f4',
  hoverColorDarken: '#0084b7',
  activeColor: '#00b0f4'
};

const themeDarkElectric = {
  ...themeDark,
  brandColor: '#00b0f4',
  hoverColor: '#00b0f4',
  hoverColorDarken: '#0084b7',
  activeColor: '#00b0f4'
};

const themes = {
  'light': themeLight,
  'dark': themeDark,
  'light-electric': themeLightElectric,
  'dark-electric': themeDarkElectric
};
/* Auto Generated End */

export const getThemedColors = (theme: Theme): ThemedColors => {
  return themes[theme];
};

export const getInvertedThemedColors = (theme: Theme): ThemedColors => {
  return getThemedColors(isThemeDark(theme) ? 'light' : 'dark');
};
