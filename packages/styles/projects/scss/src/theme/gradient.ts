import { gradientStopsFadeDark } from '@porsche-design-system/tokens';
import { scssIdentifier } from '../deprecation';
import type { ScssCatalog } from '../types';

const stopsFadeDark = {
  name: '$gradient-stops-fade-dark',
  value: gradientStopsFadeDark,
  description: 'Holds color stops for a faded gradient, used as `background-image`.',
};

/** Gradient declarations, keyed by variant (e.g. `gradient.stopsFadeDark`). */
export const gradient = {
  stopsFadeDark,
  toBottom: {
    name: 'pds-gradient-to-bottom',
    raw: `  background: linear-gradient(to bottom, ${stopsFadeDark.name});`,
    description: 'Applies a faded gradient **to bottom** as `background`.',
    deprecation: { replacement: scssIdentifier(stopsFadeDark) },
  },
  toLeft: {
    name: 'pds-gradient-to-left',
    raw: `  background: linear-gradient(to left, ${stopsFadeDark.name});`,
    description: 'Applies a faded gradient **to left** as `background`.',
    deprecation: { replacement: scssIdentifier(stopsFadeDark) },
  },
  toRight: {
    name: 'pds-gradient-to-right',
    raw: `  background: linear-gradient(to right, ${stopsFadeDark.name});`,
    description: 'Applies a faded gradient **to right** as `background`.',
    deprecation: { replacement: scssIdentifier(stopsFadeDark) },
  },
  toTop: {
    name: 'pds-gradient-to-top',
    raw: `  background: linear-gradient(to top, ${stopsFadeDark.name});`,
    description: 'Applies a faded gradient **to top** as `background`.',
    deprecation: { replacement: scssIdentifier(stopsFadeDark) },
  },
} satisfies ScssCatalog;
