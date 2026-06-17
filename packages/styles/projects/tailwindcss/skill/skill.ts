import type { TailwindThemeVariable, TailwindUtility } from '../src';
import { tailwindMeta } from '../src';

/**
 * Markdown serializer for the Tailwind styling solution — the `getLlmContext()`-style
 * companion to {@link getTailwindcssTheme}, both driven by the single source of truth
 * {@link tailwindMeta}. Produces a self-describing overview of the theme (a short intro,
 * a hand-authored "how to use" guide and a grouped reference of every documented theme
 * variable and utility) intended to be shipped next to the generated `index.css` and
 * composed into the Porsche Design System docs skill.
 *
 * Only the documented surface is rendered — the shared design-token catalog and the six
 * documented `@utility` groups, mirroring exactly what the storefront API pages expose.
 * The solution-specific internals (resets, base colors, deprecated aliases, keyframes and
 * the outside-`@theme` layers) are intentionally omitted here; they remain available in
 * `index.css` for exact values. Token values are likewise left to `index.css` — this file
 * is the index, the stylesheet is the detail.
 */

const { theme, utilities } = tailwindMeta;

const code = (value: string): string => `\`${value}\``;

/** Render a variable's generated utility classes as comma-separated inline code (or `–`). */
const renderClasses = (variable: TailwindThemeVariable): string =>
  variable.classes?.length ? variable.classes.map(code).join(', ') : '–';

/** Escape the few markdown-table-breaking characters a description might contain. */
const cell = (text: string): string => text.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');

/** A table of theme variables: property | class(es) | description. */
const variableTable = (variables: TailwindThemeVariable[]): string =>
  [
    '| Theme variable | Tailwind class(es) | Description |',
    '| --- | --- | --- |',
    ...variables.map((v) => `| ${code(v.property)} | ${renderClasses(v)} | ${cell(v.description)} |`),
  ].join('\n');

/** A table of `@utility` classes: class | description. */
const utilityTable = (entries: TailwindUtility[]): string =>
  [
    '| Tailwind `@utility` class | Description |',
    '| --- | --- |',
    ...entries.map((u) => `| ${code(u.class)} | ${cell(u.description)} |`),
  ].join('\n');

/** A `### group` heading followed by its variable table. */
const variableSection = (heading: string, variables: TailwindThemeVariable[]): string =>
  `### ${heading}\n\n${variableTable(variables)}`;

/** A `### group` heading followed by its utility table. */
const utilitySection = (heading: string, entries: TailwindUtility[]): string =>
  `### ${heading}\n\n${utilityTable(entries)}`;

/**
 * An ordered outline: each entry is either a flat group of items (a leaf section) or a
 * record of named sub-groups (rendered as `Parent — Child` sections). Headings are
 * human-curated keys — they cannot be derived from the meta because `tailwindMeta.theme`
 * mixes documented + non-documented entries and the keys don't match the labels.
 */
type Outline<T> = Record<string, T[] | Record<string, T[]>>;

/** Render an outline to markdown sections using the given `### heading + table` renderer. */
const renderOutline = <T>(outline: Outline<T>, section: (heading: string, items: T[]) => string): string =>
  Object.entries(outline)
    .map(([parent, value]) =>
      Array.isArray(value)
        ? section(parent, value)
        : Object.entries(value)
            .map(([child, items]) => section(`${parent} — ${child}`, items))
            .join('\n\n')
    )
    .join('\n\n');

/**
 * Derive a `## Contents` TOC line from an outline. `withChildren` expands nested groups as
 * `Parent (Child / Child)` (utilities); when false only top-level names are listed (theme).
 */
const tocLine = <T>(outline: Outline<T>, withChildren: boolean): string =>
  Object.entries(outline)
    .map(([parent, value]) =>
      withChildren && !Array.isArray(value) ? `${parent} (${Object.keys(value).join(' / ')})` : parent
    )
    .join(', ');

const intro = `# Porsche Design System — Tailwind CSS theme

The Porsche Design System ships a ready-made Tailwind CSS theme: a curated catalog of design
tokens exposed as Tailwind \`@theme\` variables (colors, typography, spacing, border radii,
blur, shadow, motion and breakpoints) plus a set of documented \`@utility\` classes
(gradients, the layout grid, skeletons and typography shorthands). Importing it resets
Tailwind's default namespaces so that **only** Porsche Design System tokens remain, and
generates the matching utility classes (e.g. \`.bg-canvas\`, \`.p-fluid-md\`, \`.rounded-md\`).

> Requires **Tailwind CSS v4 or higher** — the theme is built on the v4 \`@theme\` engine.

This document is an index of the theme. For the exact token values and the complete
generated CSS, read the \`index.css\` file shipped alongside it.`;

const howToUse = `## How to use

### Import

Install Tailwind CSS (see the [official guide](https://tailwindcss.com/docs/installation)),
then add the Porsche Design System theme import to your global CSS **immediately after** the
standard Tailwind import:

\`\`\`css
@import 'tailwindcss';
@import '@porsche-design-system/components-{js|angular|react|vue}/tailwindcss';
\`\`\`

### Color scheme (light / dark)

Colors are driven by the native CSS [\`light-dark()\`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
function via the CSS [\`color-scheme\`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
property — no proprietary switching logic. The Tailwind \`.scheme-*\` utilities are extended
with a polyfill for browsers without \`light-dark()\` support. Apply one of these classes to
the document or any container; the selected context cascades to all child elements:

- \`.scheme-light\` — forces light mode.
- \`.scheme-dark\` — forces dark mode.
- \`.scheme-light-dark\` — dynamically follows the system/OS setting.

\`\`\`html
<html class="scheme-dark">
  <body>
    <!-- rendered in dark mode -->
    <div class="bg-frosted text-primary"></div>
  </body>
</html>
\`\`\``;

/** The documented theme-variable groups in render order, paired with their curated headings. */
const themeOutline: Outline<TailwindThemeVariable> = {
  Color: {
    Background: Object.values(theme.color.background),
    Foreground: Object.values(theme.color.foreground),
    Semantic: Object.values(theme.color.semantic),
    A11y: Object.values(theme.color.a11y),
  },
  Typography: {
    'Font family': Object.values(theme.typography.family),
    'Font weight': Object.values(theme.typography.weight),
    'Line height': Object.values(theme.typography.lineHeight),
    'Text size': Object.values(theme.typography.text),
  },
  Spacing: {
    Fluid: Object.values(theme.spacing.fluid),
    Static: Object.values(theme.spacing.static),
  },
  Border: {
    Radius: Object.values(theme.border.radius),
    Width: theme.border.width,
  },
  Blur: theme.blur,
  Shadow: theme.shadow,
  Breakpoint: theme.breakpoint,
  Motion: {
    Duration: theme.motion.duration,
    Easing: theme.motion.easing,
  },
};

/** The documented `@utility` groups in render order, paired with their curated headings. */
const utilityOutline: Outline<TailwindUtility> = {
  Typography: { Heading: utilities.heading, Text: utilities.text, Display: utilities.display },
  Gradient: utilities.gradient,
  Grid: utilities.grid,
  Skeleton: utilities.skeleton,
};

const contents = `## Contents

- [Theme variables](#theme-variables) — ${tocLine(themeOutline, false)}
- [Utilities](#utilities) — ${tocLine(utilityOutline, true)}`;

const themeVariables = `## Theme variables\n\n${renderOutline(themeOutline, variableSection)}`;

const themeUtilities = `## Utilities\n\n${renderOutline(utilityOutline, utilitySection)}`;

/**
 * Render the full Tailwind theme overview as markdown. Pure function over
 * {@link tailwindMeta}; the build script is responsible for writing it to disk.
 */
export const getTailwindcssSkill = (): string =>
  [intro, howToUse, contents, themeVariables, themeUtilities].join('\n\n') + '\n';
