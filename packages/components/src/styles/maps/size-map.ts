import {
  ref,
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
} from '@porsche-design-system/stylesheets';

export const sizeMap = {
  'xx-small': ref(typescale2Xs), // deprecated (alias)
  'x-small': ref(typescaleXs), // deprecated (alias)
  small: ref(typescaleSm), // deprecated (alias)
  medium: ref(typescaleMd), // deprecated (alias)
  large: ref(typescaleLg), // deprecated (alias)
  'x-large': ref(typescaleXl), // deprecated (alias)
  'xx-large': ref(typescale2Xl), // deprecated (alias)
  '2xs': ref(typescale2Xs),
  xs: ref(typescaleXs),
  sm: ref(typescaleSm),
  md: ref(typescaleMd),
  lg: ref(typescaleLg),
  xl: ref(typescaleXl),
  '2xl': ref(typescale2Xl),
  '3xl': ref(typescale3Xl),
  '4xl': ref(typescale4Xl),
  '5xl': ref(typescale5Xl),
  inherit: 'inherit',
} as const;
