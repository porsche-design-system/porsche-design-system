import type { JssStyle } from 'jss';

export const getSchemedHighContrastMediaQuery = (light: JssStyle, dark: JssStyle): JssStyle => {
  return {
    '@media (forced-colors: active) and (prefers-color-scheme: light)': light,
    '@media (forced-colors: active) and (prefers-color-scheme: dark)': dark,
  };
};
