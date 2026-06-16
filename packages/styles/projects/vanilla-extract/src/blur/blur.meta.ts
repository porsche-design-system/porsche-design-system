import { blurFrosted } from '@porsche-design-system/tokens';
import type { Meta, MetaEntry } from '../meta.types';

export const blurMeta: Meta = {
  blurFrosted: {
    name: 'blurFrosted',
    value: blurFrosted,
    description: 'Holds a blur value for a **frosted** effect when combined with a semi-transparent color.',
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use backdropFilter: blurFrosted instead  */
const deprecatedFrostedGlassStyleMeta: MetaEntry = {
  name: 'frostedGlassStyle',
  value: {
    WebkitBackdropFilter: blurFrosted,
    backdropFilter: blurFrosted,
  } as const,
  description:
    'deprecated since v4.0.0, will be removed with next major release. Use backdropFilter: blurFrosted instead.',
};

export const deprecatedBlurMeta: Meta = {
  frostedGlassStyle: deprecatedFrostedGlassStyleMeta,
} as const;
