import { blurFrosted, frostedGlassStyle } from '../src/blur/';
import type { VanillaExtractMeta } from './meta.types';

export const blurMeta: VanillaExtractMeta = {
  blurFrosted: {
    name: 'blurFrosted',
    description: 'Holds a blur value for a **frosted** effect when combined with a semi-transparent color.',
    value: blurFrosted,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use backdropFilter: blurFrosted instead  */
  frostedGlassStyle: {
    name: 'frostedGlassStyle',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use backdropFilter: blurFrosted instead.',
    value: frostedGlassStyle,
    deprecated: true,
  },
} as const;
