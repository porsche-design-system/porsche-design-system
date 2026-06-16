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

const contents = `## Contents

- [Theme variables](#theme-variables) — Color, Typography, Spacing, Border, Blur, Shadow, Breakpoint, Motion
- [Utilities](#utilities) — Typography (Heading / Text / Display), Gradient, Grid, Skeleton`;

const themeVariables = `## Theme variables

${variableSection('Color — Background', Object.values(theme.color.background))}

${variableSection('Color — Foreground', Object.values(theme.color.foreground))}

${variableSection('Color — Semantic', Object.values(theme.color.semantic))}

${variableSection('Color — A11y', Object.values(theme.color.a11y))}

${variableSection('Typography — Font family', Object.values(theme.typography.family))}

${variableSection('Typography — Font weight', Object.values(theme.typography.weight))}

${variableSection('Typography — Line height', Object.values(theme.typography.lineHeight))}

${variableSection('Typography — Text size', Object.values(theme.typography.text))}

${variableSection('Spacing — Fluid', Object.values(theme.spacing.fluid))}

${variableSection('Spacing — Static', Object.values(theme.spacing.static))}

${variableSection('Border — Radius', Object.values(theme.border.radius))}

${variableSection('Border — Width', theme.border.width)}

${variableSection('Blur', theme.blur)}

${variableSection('Shadow', theme.shadow)}

${variableSection('Breakpoint', theme.breakpoint)}

${variableSection('Motion — Duration', theme.motion.duration)}

${variableSection('Motion — Easing', theme.motion.easing)}`;

const themeUtilities = `## Utilities

${utilitySection('Typography — Heading', utilities.heading)}

${utilitySection('Typography — Text', utilities.text)}

${utilitySection('Typography — Display', utilities.display)}

${utilitySection('Gradient', utilities.gradient)}

${utilitySection('Grid', utilities.grid)}

${utilitySection('Skeleton', utilities.skeleton)}`;

/**
 * Render the full Tailwind theme overview as markdown. Pure function over
 * {@link tailwindMeta}; the build script is responsible for writing it to disk.
 */
export const getTailwindcssSkill = (): string =>
  [intro, howToUse, contents, themeVariables, themeUtilities].join('\n\n') + '\n';
