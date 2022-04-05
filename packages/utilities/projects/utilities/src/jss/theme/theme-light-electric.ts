import type { ColorTheme } from './theme-shared';
import { themeLight } from './theme-light';

export const themeLightElectric: ColorTheme = {
  ...themeLight,
  brand: '#00b0f4',
  state: {
    ...themeLight.state,
    hover: '#00b0f4',
    active: '#00b0f4',
  },
};
