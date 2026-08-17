import { gradientStopsFadeDark } from '@porsche-design-system/tokens';
import { scssIdentifier } from '../deprecation';
import type { DeprecatedScssMixin, ScssMeta } from '../types';

/** Gradient theme variable, keyed by variant (e.g. `gradient.stopsFadeDark`). */
export const gradient = {
  stopsFadeDark: {
    name: '$gradient-stops-fade-dark',
    value: gradientStopsFadeDark,
    description: 'Holds color stops for a faded gradient, used as `background-image`.',
  },
} satisfies ScssMeta['gradient'];

/** The deprecated `pds-gradient-to-*` mixins, replaced by `linear-gradient()` with the documented color stops. */
export const gradientDeprecations = {
  toBottom: {
    name: 'pds-gradient-to-bottom',
    raw: `  background: linear-gradient(to bottom, ${gradient.stopsFadeDark.name});`,
    deprecation: { replacement: scssIdentifier(gradient.stopsFadeDark) },
  },
  toLeft: {
    name: 'pds-gradient-to-left',
    raw: `  background: linear-gradient(to left, ${gradient.stopsFadeDark.name});`,
    deprecation: { replacement: scssIdentifier(gradient.stopsFadeDark) },
  },
  toRight: {
    name: 'pds-gradient-to-right',
    raw: `  background: linear-gradient(to right, ${gradient.stopsFadeDark.name});`,
    deprecation: { replacement: scssIdentifier(gradient.stopsFadeDark) },
  },
  toTop: {
    name: 'pds-gradient-to-top',
    raw: `  background: linear-gradient(to top, ${gradient.stopsFadeDark.name});`,
    deprecation: { replacement: scssIdentifier(gradient.stopsFadeDark) },
  },
} satisfies Record<string, DeprecatedScssMixin>;
