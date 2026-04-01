import {
  typescale2Xl,
  typescale2Xs,
  typescale3Xl,
  typescale4Xl,
  typescale5Xl,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '../css-variables';

export const sizeMap = {
  'xx-small': typescale2Xs, // deprecated (alias)
  'x-small': typescaleXs, // deprecated (alias)
  small: typescaleSm, // deprecated (alias)
  medium: typescaleMd, // deprecated (alias)
  large: typescaleLg, // deprecated (alias)
  'x-large': typescaleXl, // deprecated (alias)
  'xx-large': typescale2Xl, // deprecated (alias)
  '2xs': typescale2Xs,
  xs: typescaleXs,
  sm: typescaleSm,
  md: typescaleMd,
  lg: typescaleLg,
  xl: typescaleXl,
  '2xl': typescale2Xl,
  '3xl': typescale3Xl,
  '4xl': typescale4Xl,
  '5xl': typescale5Xl,
  inherit: 'inherit',
} as const;
