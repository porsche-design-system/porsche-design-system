export type Theme = 'light' | 'dark';

export const color = {
  /**
   * Theme light as default theme
   */
  brand: '#d5001c',
  default: '#000',
  background: {
    default: '#fff',
    surface: '#f2f2f2',
    shading: 'rgba(14, 20, 24, 0.9)'
  },
  neutralContrast: {
    high: '#323639',
    medium: '#626669',
    low: '#c9cacb'
  },
  notification: {
    success: '#018a16',
    successSoft: '#e5f3e7',
    warning: '#ff9b00',
    warningSoft: '#fff5e5',
    error: '#e00000',
    errorSoft: '#fae6e6',
    neutral: '#0061bd',
    neutralSoft: '#e5eff8'
  },
  state: {
    hover: '#d5001c',
    active: '#d5001c',
    focus: 'currentColor',
    disabled: '#96989a'
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
      shading: 'rgba(14, 20, 24, 0.9)'
    },
    neutralContrast: {
      high: '#e3e4e5',
      medium: '#b0b1b2',
      low: '#4a4e51'
    },
    notification: {
      success: '#01ba1d',
      successSoft: '#bfeec6',
      warning: '#ff9b00',
      warningSoft: '#ffe6bf',
      error: '#fc1717',
      errorSoft: '#fec5c5',
      neutral: '#2193ff',
      neutralSoft: '#c7e4ff'
    },
    state: {
      hover: '#ff0223',
      active: '#ff0223',
      focus: 'currentColor',
      disabled: '#7c7f81'
    }
  },
  /**
   * External brand colors
   */
  external: {
    facebook: '#1877f2',
    google: '#4285f4',
    instagram: '#e1306c',
    linkedin: '#0077b5',
    pinterest: '#e60023',
    twitter: '#1da1f2',
    wechat: '#1aad19',
    whatsapp: '#25d366',
    xing: '#006567',
    youtube: '#ff0000'
  }
};
