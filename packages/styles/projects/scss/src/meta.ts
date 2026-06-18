import { border } from './theme/border';
import type { ScssMeta } from './types';

/**
 * The documented single source of truth for the scss package, mirroring `tailwindMeta`: a `theme`
 * of variables and `utilities` of mixins. Only `border` is migrated so far — later slices populate
 * the remaining theme groups and the (currently empty) utilities.
 */
export const scssMeta = {
  theme: {
    border,
  },
  utilities: {},
} satisfies ScssMeta;
