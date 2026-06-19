import { blur } from './theme/blur';
import { border } from './theme/border';
import { breakpoint } from './theme/breakpoint';
import { color } from './theme/color';
import { gradient } from './theme/gradient';
import { grid } from './theme/grid';
import { motion } from './theme/motion';
import { shadow } from './theme/shadow';
import { spacing } from './theme/spacing';
import { typography } from './theme/typography';
import type { ScssMeta } from './types';
import { focus } from './utilities/focus';
import { grid as gridMixins } from './utilities/grid';
import { mediaQuery } from './utilities/media-query';
import { skeleton } from './utilities/skeleton';
import { typography as typographyMixins } from './utilities/typography';

/**
 * The documented single source of truth for the scss package, mirroring `tailwindMeta`: a `theme`
 * of variables and `utilities` of mixins. Every documented domain lives here. The SCSS-only plumbing
 * (deprecated aliases, private helpers, the theming mixin) is colocated as separate named exports in
 * the same `theme/` + `utilities/` modules, never folded into `scssMeta`; the composition layer
 * (`scss/index.ts`) imports it and interleaves it with these entries (plus the `@forward` index).
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
    grid,
  },
  utilities: {
    typography: typographyMixins,
    skeleton,
    focus,
    mediaQuery,
    grid: gridMixins,
  },
} satisfies ScssMeta;
