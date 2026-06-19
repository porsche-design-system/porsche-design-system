import { gradientStopsFadeDark } from '@porsche-design-system/tokens';
import type { ScssRaw, ScssVariable } from '../types';

/**
 * Gradient theme variable — the documented `$gradient-stops-fade-dark` color stops. The deprecated
 * `pds-gradient-to-*` mixins (plumbing) live alongside below.
 */
export const gradient = [
  {
    name: '$gradient-stops-fade-dark',
    value: gradientStopsFadeDark,
    description: 'Holds color stops for a faded gradient, used as `background-image`.',
    group: 'gradient',
  },
] satisfies ScssVariable[];

/**
 * The deprecated `pds-gradient-to-*` directional mixins wrapping `$gradient-stops-fade-dark`.
 * Plumbing: still emitted, but not documented `scssMeta` entries.
 * @deprecated Use the documented `$gradient-stops-fade-dark` variable with `linear-gradient()` instead.
 */
export const gradientDeprecatedMixins: ScssRaw = {
  raw: [
    '/* alias (deprecated) */',
    '@mixin pds-gradient-to-bottom {',
    '  background: linear-gradient(to bottom, $gradient-stops-fade-dark);',
    '}',
    '/* alias (deprecated) */',
    '@mixin pds-gradient-to-left {',
    '  background: linear-gradient(to left, $gradient-stops-fade-dark);',
    '}',
    '/* alias (deprecated) */',
    '@mixin pds-gradient-to-right {',
    '  background: linear-gradient(to right, $gradient-stops-fade-dark);',
    '}',
    '/* alias (deprecated) */',
    '@mixin pds-gradient-to-top {',
    '  background: linear-gradient(to top, $gradient-stops-fade-dark);',
    '}',
  ].join('\n'),
};
