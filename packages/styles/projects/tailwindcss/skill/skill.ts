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

/** Escape the few markdown-table-breaking characters a description might contain. */
const cell = (text: string): string => text.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');

/** A markdown table from a header row and pre-rendered cell rows. */
const table = (headers: string[], rows: string[][]): string =>
  [headers, headers.map(() => '---'), ...rows].map((r) => `| ${r.join(' | ')} |`).join('\n');

/** One column of a reference table: its header and how to render a cell from an item. */
type Column<T> = { header: string; render: (item: T) => string };

const variableColumns: Column<TailwindThemeVariable>[] = [
  { header: 'Theme variable', render: (v) => code(v.property) },
  { header: 'Tailwind class(es)', render: (v) => (v.classes?.length ? v.classes.map(code).join(', ') : '–') },
  { header: 'Description', render: (v) => cell(v.description) },
];

const utilityColumns: Column<TailwindUtility>[] = [
  { header: 'Tailwind `@utility` class', render: (u) => code(u.class) },
  { header: 'Description', render: (u) => cell(u.description) },
];

/** A `### heading` followed by a reference table built from `columns`. */
const section = <T>(heading: string, items: T[], columns: Column<T>[]): string =>
  `### ${heading}\n\n${table(
    columns.map((c) => c.header),
    items.map((item) => columns.map((c) => c.render(item)))
  )}`;

/**
 * An ordered outline: each entry is either a flat group of items (a leaf section) or a
 * record of named sub-groups (rendered as `Parent — Child` sections). The theme outline is
 * derived directly from `tailwindMeta.theme` (see `themeOutline`); the utility outline stays
 * hand-curated because its grouping (the `Typography` super-group) is not a 1:1 mirror of the meta.
 */
type Outline<T> = Record<string, T[] | Record<string, T[]>>;

/** Render an outline to markdown sections, building each section's table from `columns`. */
const renderOutline = <T>(outline: Outline<T>, columns: Column<T>[]): string =>
  Object.entries(outline)
    .map(([parent, value]) =>
      Array.isArray(value)
        ? section(parent, value, columns)
        : Object.entries(value)
            .map(([child, items]) => section(`${parent} — ${child}`, items, columns))
            .join('\n\n')
    )
    .join('\n\n');

/**
 * Derive a `## Contents` TOC line from an outline. `expandSubgroups` lists nested groups as
 * `Parent (Child / Child)` (utilities); when false only top-level names are listed (theme).
 */
const tocLine = <T>(outline: Outline<T>, expandSubgroups: boolean): string =>
  Object.entries(outline)
    .map(([parent, value]) =>
      expandSubgroups && !Array.isArray(value) ? `${parent} (${Object.keys(value).join(' / ')})` : parent
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

const themeVariables = `## Theme variables\n\n${renderOutline(themeOutline, variableColumns)}`;

const themeUtilities = `## Utilities\n\n${renderOutline(utilityOutline, utilityColumns)}`;

/**
 * Render the full Tailwind theme overview as markdown. Pure function over
 * {@link tailwindMeta}; the build script is responsible for writing it to disk.
 */
export const getTailwindcssSkill = (): string =>
  [intro, howToUse, contents, themeVariables, themeUtilities].join('\n\n') + '\n';
