import { blur } from './theme/blur';
import { border } from './theme/border';
import { breakpoint } from './theme/breakpoint';
import { color } from './theme/color';
import { motion } from './theme/motion';
import { shadow } from './theme/shadow';
import { spacing } from './theme/spacing';
import type { ScssMeta } from './types';

/**
 * The documented single source of truth for the scss package, mirroring `tailwindMeta`: a `theme`
 * of variables and `utilities` of mixins. The variable-only domains are migrated; later slices
 * populate the remaining theme groups (color, typography) and the (currently empty) utilities.
 */
export const scssMeta = {
  theme: {
    border,
    blur,
    breakpoint,
    color,
    shadow,
    spacing,
    motion,
  },
  utilities: {},
} satisfies ScssMeta;
