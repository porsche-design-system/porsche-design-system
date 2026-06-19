import { gradientStopsFadeDark } from '@porsche-design-system/tokens';
import type { ScssMeta, ScssRaw } from '../types';

/** Gradient theme variable, keyed by variant (e.g. `gradient.stopsFadeDark`). */
export const gradient = {
  stopsFadeDark: {
    name: '$gradient-stops-fade-dark',
    value: gradientStopsFadeDark,
    description: 'Holds color stops for a faded gradient, used as `background-image`.',
    group: 'gradient',
  },
} satisfies ScssMeta['gradient'];

/**
 * Deprecated `pds-gradient-to-*` directional mixins (plumbing).
 * @deprecated Use `$gradient-stops-fade-dark` with `linear-gradient()`.
 */
export const gradientDeprecatedMixins: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-gradient-to-bottom {
  background: linear-gradient(to bottom, $gradient-stops-fade-dark);
}
/* alias (deprecated) */
@mixin pds-gradient-to-left {
  background: linear-gradient(to left, $gradient-stops-fade-dark);
}
/* alias (deprecated) */
@mixin pds-gradient-to-right {
  background: linear-gradient(to right, $gradient-stops-fade-dark);
}
/* alias (deprecated) */
@mixin pds-gradient-to-top {
  background: linear-gradient(to top, $gradient-stops-fade-dark);
}`,
};
