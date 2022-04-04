import type { ColorTheme } from './theme-shared';
import { themeDark } from './theme-dark';

export const themeDarkElectric: ColorTheme = {
  ...themeDark,
  brand: '#00b0f4',
  state: {
    ...themeDark.state,
    hover: '#00b0f4',
    active: '#00b0f4',
  },
};
