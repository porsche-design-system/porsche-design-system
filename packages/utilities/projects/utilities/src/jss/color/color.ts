import { themeLightElectric } from './theme-light-electric';
import { themeLight } from './theme-light';
import { themeDarkElectric } from './theme-dark-electric';
import { themeDark } from './theme-dark';

type ThemeDefault = 'light' | 'dark';
type ThemeElectric = 'light-electric' | 'dark-electric';
type Theme = ThemeDefault | ThemeElectric;

type ColorExternalKey =
  | 'facebook'
  | 'google'
  | 'instagram'
  | 'kakaotalk'
  | 'linkedin'
  | 'naver'
  | 'pinterest'
  | 'reddit'
  | 'tiktok'
  | 'twitter'
  | 'wechat'
  | 'whatsapp'
  | 'xing'
  | 'youtube';

type ColorExternal = { [key in ColorExternalKey]: string };

const colorExternal: ColorExternal = {
  facebook: '#1877f2',
  google: '#4285f4',
  instagram: '#e1306c',
  kakaotalk: '#fae300',
  linkedin: '#0077b5',
  naver: '#03cf5d',
  pinterest: '#e60023',
  reddit: '#ff4500',
  tiktok: '#fe2c55',
  twitter: '#1da1f2',
  wechat: '#1aad19',
  whatsapp: '#25d366',
  xing: '#006567',
  youtube: '#ff0000',
};

const color = {
  light: themeLight,
  dark: themeDark,
  'light-electric': themeLightElectric,
  'dark-electric': themeDarkElectric,
  external: colorExternal,
};

export {
  color,
  colorExternal,
  ThemeDefault,
  ThemeElectric,
  Theme,
  themeLightElectric,
  themeLight,
  themeDarkElectric,
  themeDark,
};
