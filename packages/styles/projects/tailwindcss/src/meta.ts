import { blur } from './theme/blur';
import { border } from './theme/border';
import { breakpoint } from './theme/breakpoint';
import { color } from './theme/color';
import { displayUtilities } from './utilities/display';
import { gradientUtilities } from './utilities/gradient';
import { gridUtilities } from './utilities/grid';
import { headingUtilities } from './utilities/heading';
import { motion } from './theme/motion';
import { skeletonUtilities } from './utilities/skeleton';
import { spacing } from './theme/spacing';
import { textUtilities } from './utilities/text';
import { shadow } from './theme/shadow';
import type { TailwindMeta } from './types';
import { typography } from './theme/typography';

/**
 * The documented single source of truth — the surface shared with the storefront docs and LLM
 * context. `theme` is the design-token catalog rendered inside `@theme`; `utilities` is the
 * documented `@utility` blocks. CSS-only plumbing (resets, defaults, layers, keyframes, deprecated
 * aliases) lives in `css/index.ts`, which assembles the stylesheet from these same object
 * references — so docs and generated CSS can never diverge.
 */
export const tailwindMeta = {
  theme: {
    color,
    typography,
    spacing,
    border,
    blur,
    shadow,
    breakpoint,
    motion,
  },
  utilities: {
    typography: {
      heading: headingUtilities,
      text: textUtilities,
      display: displayUtilities,
    },
    gradient: gradientUtilities,
    grid: gridUtilities,
    skeleton: skeletonUtilities,
  },
} satisfies TailwindMeta;
