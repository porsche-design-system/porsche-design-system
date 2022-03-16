import type { ColorTheme } from './color-shared';

export const themeDark: ColorTheme = {
  brand: '#d5001c',
  base: '#fff',
  background: {
    base: '#0e1418',
    surface: '#262b2e',
    shading: 'rgba(14, 20, 24, 0.9)',
  },
  // TODO: remove neutral?
  contrast: {
    high: '#e3e4e5',
    medium: '#b0b1b2',
    low: '#4a4e51',
  },
  notification: {
    success: '#01ba1d',
    successSoft: '#bfeec6',
    warning: '#ff9b00',
    warningSoft: '#ffe6bf',
    error: '#fc1717',
    errorSoft: '#fec5c5',
    neutral: '#2193ff',
    neutralSoft: '#c7e4ff',
  },
  state: {
    hover: '#ff0223',
    active: '#ff0223',
    focus: 'currentColor',
    disabled: '#7c7f81',
  },
};
