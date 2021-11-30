export type Theme = 'light' | 'dark' | 'light-electric';

type ColorTheme = {
  brand: string;
  default: string;
  background: {
    default: string;
    surface: string;
    shading: string;
  };
  neutralContrast: {
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

type ColorExternal = {
  facebook: string;
  google: string;
  instagram: string;
  kakaotalk: string;
  linkedin: string;
  naver: string;
  pinterest: string;
  reddit: string;
  tiktok: string;
  twitter: string;
  wechat: string;
  whatsapp: string;
  xing: string;
  youtube: string;
};

type Color = ColorTheme & {
  darkTheme: ColorTheme;
  lightElectricTheme: ColorTheme;
  external: ColorExternal;
};

export const color: Color = {
  /**
   * Theme light as default theme
   */
  brand: '#d5001c',
  default: '#000',
  background: {
    default: '#fff',
    surface: '#f2f2f2',
    shading: 'rgba(14, 20, 24, 0.9)',
  },
  neutralContrast: {
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
  /**
   * Theme dark as optional
   */
  darkTheme: {
    brand: '#d5001c',
    default: '#fff',
    background: {
      default: '#0e1418',
      surface: '#262b2e',
      shading: 'rgba(14, 20, 24, 0.9)',
    },
    neutralContrast: {
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
    /**
     * Theme light electric as optional
     */
  },
  lightElectricTheme: {
    brand: '#00b0f4',
    default: '#000',
    background: {
      default: '#fff',
      surface: '#f2f2f2',
      shading: 'rgba(14, 20, 24, 0.9)',
    },
    neutralContrast: {
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
      hover: '#00b0f4',
      active: '#00b0f4',
      focus: 'currentColor',
      disabled: '#96989a',
    },
  },
  /**
   * External brand colors
   */
  external: {
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
  },
};
