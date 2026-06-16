import { blurThemeVariables } from './blur';
import { border } from './border';
import { breakpointThemeVariables } from './breakpoint';
import { color } from './color';
import { displayUtilities } from './display';
import { gradientUtilities } from './gradient';
import { gridUtilities } from './grid';
import { headingUtilities } from './heading';
import { motion } from './motion';
import { shadowThemeVariables } from './shadow';
import { skeletonUtilities } from './skeleton';
import { spacing } from './spacing';
import { textUtilities } from './text';
import type { TailwindMeta } from './types';
import { typography } from './typography';

/**
 * The docs-oriented Tailwind meta — a single global object whose parts map 1:1 to
 * the storefront Tailwind API pages (and the LLM context). It is derived from the
 * same single sources of truth that feed the rendering meta `tailwindCssMeta`, but
 * exposes the documented theme variables and utilities **already grouped** the way
 * the docs consume them, so a part can be used directly (e.g.
 * `tailwindMeta.color.background`, `tailwindMeta.utilities.grid`) without querying
 * or transforming the flat `CssNode` tree.
 *
 * Deliberately surfaces the documented set only — the `--text-*--line-height`
 * companions, the motion infrastructure defaults and every `(deprecated)` alias
 * are intentionally omitted, matching the dedicated `*ThemeVariables` exports.
 */
export const tailwindMeta = {
  color,
  typography,
  spacing,
  border,
  blur: blurThemeVariables,
  shadow: shadowThemeVariables,
  breakpoint: breakpointThemeVariables,
  motion,
  utilities: {
    heading: headingUtilities,
    text: textUtilities,
    display: displayUtilities,
    gradient: gradientUtilities,
    grid: gridUtilities,
    skeleton: skeletonUtilities,
  },
} satisfies TailwindMeta;
