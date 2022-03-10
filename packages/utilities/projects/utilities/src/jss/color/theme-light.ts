import type { ColorTheme } from './shared';

export const themeLight: ColorTheme = {
  brand: '#d5001c',
  base: '#000',
  background: {
    base: '#fff',
    surface: '#f2f2f2',
    shading: 'rgba(14, 20, 24, 0.9)',
  },
  contrast: {
    high: '#323639',
    medium: '#626669',
    low: '#e3e4e5',
  },
  notification: {
    success: '#018a16',
    successSoft: '#e5f3e7',
    warning: '#ff9b00',
    warningSoft: '#fff5e5',
    error: '#e00000',
    errorSoft: '#fae6e6',
    neutral: '#0061bd',
    neutralSoft: '#e5eff8',
  },
  state: {
    hover: '#d5001c',
    active: '#d5001c',
    focus: 'currentColor',
    disabled: '#96989a',
  },
};
