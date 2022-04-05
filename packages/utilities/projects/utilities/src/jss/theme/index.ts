import { themeLightElectric } from './theme-light-electric';
import { themeLight } from './theme-light';
import { themeDarkElectric } from './theme-dark-electric';
import { themeDark } from './theme-dark';

type ThemeDefault = 'light' | 'dark';
type ThemeElectric = 'light-electric' | 'dark-electric';
type Theme = ThemeDefault | ThemeElectric;

export { ThemeDefault, ThemeElectric, Theme, themeLightElectric, themeLight, themeDarkElectric, themeDark };
