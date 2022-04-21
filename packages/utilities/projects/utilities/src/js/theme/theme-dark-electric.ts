import type { ThemeColorSet } from './theme-shared';
import { themeDark } from './theme-dark';

export const themeDarkElectric: ThemeColorSet = {
  ...themeDark,
  brand: '#00b0f4',
  state: {
    ...themeDark.state,
    hover: '#00b0f4',
    active: '#00b0f4',
  },
};
