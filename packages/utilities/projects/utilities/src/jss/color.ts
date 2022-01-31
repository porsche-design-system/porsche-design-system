export type ThemeDefault = 'light' | 'dark';
export type ThemeElectric = 'light-electric' | 'dark-electric';
export type Theme = ThemeDefault | ThemeElectric;

type ColorTheme = {
  brand: string;
  base: string;
  background: {
    base: string;
    surface: string;
    shading: string;
  };
  contrast: {
    high: string;
    medium: string;
    low: string;
  };
  notification: {
    success: string;
    successSoft: string;
    warning: string;
    warningSoft: string;
    error: string;
    errorSoft: string;
    neutral: string;
    neutralSoft: string;
  };
  state: {
    hover: string;
    active: string;
    focus: string;
    disabled: string;
  };
};

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

export const themeLightElectric: ColorTheme = {
  ...themeLight,
  brand: '#00b0f4',
  state: {
    ...themeLight.state,
    hover: '#00b0f4',
    active: '#00b0f4',
  },
};

export const themeDarkElectric: ColorTheme = {
  ...themeDark,
  brand: '#00b0f4',
  state: {
    ...themeDark.state,
    hover: '#00b0f4',
    active: '#00b0f4',
  },
};

export const colorExternal: ColorExternal = {
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

export const color = {
  light: themeLight,
  dark: themeDark,
  'light-electric': themeLightElectric,
  'dark-electric': themeDarkElectric,
  external: colorExternal,
};
