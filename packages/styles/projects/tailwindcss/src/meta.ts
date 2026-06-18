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
 * The documented single source of truth for the Tailwind styling solution — the surface shared
 * with the storefront docs and the LLM context. Split by where it renders:
 *
 * - `theme`: the shared-shape, documented design-token catalog (`color`, `typography`, … — the
 *   common vocabulary, same group taxonomy and size keys as `tokens` / stylesheets'
 *   `cssVariablesMeta`), rendered inside the `@theme` block.
 * - `utilities`: the documented `@utility` blocks.
 *
 * The CSS-only implementation detail (resets, base colors, the focus-outline default, the
 * line-height companions, the transition defaults, deprecated aliases, keyframes and the
 * outside-`@theme` layers) is intentionally **not** here — it lives in `css.ts`, which assembles
 * the stylesheet from this documented model. The catalog groups are the same objects referenced by
 * that assembly, so the docs and the generated CSS can never diverge.
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
