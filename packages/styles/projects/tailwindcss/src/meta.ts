import { blur } from './blur';
import { border } from './border';
import { breakpoint } from './breakpoint';
import { color } from './color';
import { displayUtilities } from './display';
import { gradientUtilities } from './gradient';
import { gridUtilities } from './grid';
import { headingUtilities } from './heading';
import { motion } from './motion';
import { skeletonUtilities } from './skeleton';
import { spacing } from './spacing';
import { textUtilities } from './text';
import { shadow } from './shadow';
import type { TailwindMeta } from './types';
import { typography } from './typography';

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
    gradient: gradientUtilities,
    grid: gridUtilities,
    skeleton: skeletonUtilities,
    text: textUtilities,
    heading: headingUtilities,
    display: displayUtilities,
  },
} satisfies TailwindMeta;
