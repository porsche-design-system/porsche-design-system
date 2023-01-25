import type { Theme } from '../types';

type ThemedIconFilter = 'info' | 'success' | 'warning' | 'error' | 'neutral'; //state neutral as default state is deprecated in v3 (newstate:'info')

export type ThemedIconFilters = { [key in ThemedIconFilter]: string };

const themeLight: ThemedIconFilters = {
  neutral: 'invert(31%) sepia(32%) saturate(5493%) hue-rotate(216deg) brightness(90%) contrast(107%)',
  info: 'invert(31%) sepia(32%) saturate(5493%) hue-rotate(216deg) brightness(90%) contrast(107%)',
  success: 'invert(62%) sepia(61%) saturate(551%) hue-rotate(86deg) brightness(86%) contrast(80%)',
  warning: 'invert(74%) sepia(91%) saturate(343%) hue-rotate(348deg) brightness(92%) contrast(86%)',
  error: 'invert(25%) sepia(62%) saturate(2003%) hue-rotate(335deg) brightness(100%) contrast(97%)',
};

const themeDark: ThemedIconFilters = {
  neutral: 'invert(31%) sepia(32%) saturate(5493%) hue-rotate(216deg) brightness(90%) contrast(107%)',
  info: 'invert(31%) sepia(32%) saturate(5493%) hue-rotate(216deg) brightness(90%) contrast(107%)',
  success: 'invert(59%) sepia(22%) saturate(1342%) hue-rotate(86deg) brightness(96%) contrast(88%)',
  warning: 'invert(72%) sepia(94%) saturate(303%) hue-rotate(354deg) brightness(89%) contrast(94%)',
  error: 'invert(28%) sepia(34%) saturate(3133%) hue-rotate(333deg) brightness(95%) contrast(100%)',
};

const themes = {
  light: themeLight,
  dark: themeDark,
};

export const getThemedIconFilters = (theme: Theme): ThemedIconFilters => {
  return themes[theme];
};
