import { THEMES } from './theme';

export const THEMES_EXTENDED_ELECTRIC = [...THEMES, 'light-electric'] as const;
export type ThemeExtendedElectric = typeof THEMES_EXTENDED_ELECTRIC[number];
