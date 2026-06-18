import { blur } from './theme/blur';
import { border } from './theme/border';
import { breakpoint } from './theme/breakpoint';
import { color } from './theme/color';
import { gradient } from './theme/gradient';
import { motion } from './theme/motion';
import { shadow } from './theme/shadow';
import { spacing } from './theme/spacing';
import { typography } from './theme/typography';
import type { ScssMeta } from './types';
import { focus } from './utilities/focus';
import { mediaQuery } from './utilities/media-query';
import { skeleton } from './utilities/skeleton';
import { typography as typographyMixins } from './utilities/typography';

/**
 * The documented single source of truth for the scss package, mirroring `tailwindMeta`: a `theme`
 * of variables and `utilities` of mixins. The variable domains are migrated; the mixin rails carry
 * skeleton and focus, with later slices populating the remaining utilities.
 */
export const scssMeta = {
  theme: {
    border,
    blur,
    breakpoint,
    color,
    typography,
    shadow,
    spacing,
    motion,
    gradient,
  },
  utilities: {
    typography: typographyMixins,
    skeleton,
    focus,
    mediaQuery,
  },
} satisfies ScssMeta;
