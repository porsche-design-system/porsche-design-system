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
    warning: '#ff9b00',
    error: '#e00000',
    neutral: '#0061BD'
  },
  state: {
    hover: '#d5001c',
    active: '#d5001c',
    focus: '#00d5b9',
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
      surface: '#1a2023',
      shading: 'rgba(14, 20, 24, 0.9)'
    },
    neutralContrast: {
      high: '#e3e4e5',
      medium: '#b0b1b2',
      low: '#4a4e51'
    },
    notification: {
      success: '#01ba1d',
      warning: '#ff9b00',
      error: '#fc1717',
      neutral: '#2193FF'
    },
    state: {
      hover: '#d5001c',
      active: '#d5001c',
      focus: '#00d5b9',
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
