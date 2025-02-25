import tinycolor2 from 'tinycolor2';

export const darkenColor = (color: string) => tinycolor2(color).darken(12).toHexString().toUpperCase();
export const darkenColorSlightly = (color: string) =>
  tinycolor2(color).darken(6).desaturate(37).toHexString().toUpperCase();

export const lightenColor = (color: string) => tinycolor2(color).lighten(12).toHexString().toUpperCase();
export const lightenColorSlightly = (color: string) =>
  tinycolor2(color).lighten(6).desaturate(37).toHexString().toUpperCase();
