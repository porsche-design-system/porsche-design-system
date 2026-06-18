import type { ScssRaw } from '../types';

// The deprecated `pds-gradient-to-*` directional mixins wrapping `$gradient-stops-fade-dark`.
// Plumbing: still emitted, but not documented `scssMeta` entries.
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
