import { THEMES_EXTENDED_ELECTRIC } from './theme-extended-electric';

export const THEMES_EXTENDED_ELECTRIC_DARK = [...THEMES_EXTENDED_ELECTRIC, 'dark-electric'] as const;
export type ThemeExtendedElectricDark = typeof THEMES_EXTENDED_ELECTRIC_DARK[number];
