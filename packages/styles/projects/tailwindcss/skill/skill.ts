import fs from 'node:fs';
import path from 'node:path';
import { sentenceCase } from 'change-case';
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
 * record of named sub-groups (rendered as `Parent — Child` sections). The theme outline is
 * derived directly from `tailwindMeta.theme` (see `themeOutline`); the utility outline stays
 * hand-curated because its grouping (the `Typography` super-group) is not a 1:1 mirror of the meta.
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

/** Read a hand-authored markdown source shipped alongside this serializer. */
const readMarkdown = (file: string): string => fs.readFileSync(path.join(__dirname, file), 'utf8').trim();

/** The hand-authored theme intro and "how to use" guide, kept as editable markdown next to this file. */
const intro = readMarkdown('intro.md');

const howToUse = readMarkdown('how-to-use.md');

/** Normalize a documented group — a keyed record (e.g. a color/size group) or an array — to a flat list. */
const groupItems = <T>(group: T[] | Record<string, T>): T[] => (Array.isArray(group) ? group : Object.values(group));

/**
 * Derive an {@link Outline} from a documented catalog (`tailwindMeta.theme` / `.utilities`): each
 * top-level group becomes a section (arrays) or a parent with one sub-section per sub-group
 * (records), with headings sentence-cased from the keys (`lineHeight` → `Line height`). Source order
 * is followed verbatim (e.g. colors list `a11y` first), so the catalog's shape *is* the documentation outline.
 */
const deriveOutline = <T>(catalog: object): Outline<T> =>
  Object.fromEntries(
    Object.entries(catalog).map(([key, value]: [string, T[] | Record<string, T[] | Record<string, T>>]) => [
      sentenceCase(key),
      Array.isArray(value)
        ? value
        : Object.fromEntries(
            Object.entries(value).map(([subKey, subValue]) => [sentenceCase(subKey), groupItems(subValue)])
          ),
    ])
  ) as Outline<T>;

const themeOutline = deriveOutline<TailwindThemeVariable>(theme);

const utilityOutline = deriveOutline<TailwindUtility>(utilities);

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
