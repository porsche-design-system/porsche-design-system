import fs from 'node:fs';
import path from 'node:path';
import { sentenceCase } from 'change-case';
import { globalStylesMeta } from '../src/css';
import { kindOf, type StylesheetKind, stylesheetsMeta } from '../src/meta';
import type { ColorSchemeClassMeta, CssVariableMeta, StylesheetNode } from '../src/types';

/**
 * Markdown serializer for the global styles, driven by {@link stylesheetsMeta} (the documented
 * single source of truth) plus {@link globalStylesMeta} (the per-file overview). Renders an intro, a
 * hand-authored "how to use" guide, a per-stylesheet overview and a grouped reference of every
 * documented CSS variable and color-scheme class. The documented surface is split into a `token`
 * view (the `## CSS variables` section) and a `utility` view (the `## Color-scheme classes` section)
 * by partitioning the flat catalog per leaf via {@link kindOf}.
 */

/** A documented branch of the catalog: a leaf, a keyed record of branches, or an array of branches. */
type StylesheetBranch = StylesheetNode | StylesheetBranch[] | { [key: string]: StylesheetBranch };

const code = (value: string): string => `\`${value}\``;

/** Escape the few markdown-table-breaking characters a description might contain. */
const cell = (text: string): string =>
  text
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\s*\n\s*/g, ' ');

/** A markdown table from a header row and pre-rendered cell rows. */
const table = (headers: string[], rows: string[][]): string =>
  [headers, headers.map(() => '---'), ...rows].map((r) => `| ${r.join(' | ')} |`).join('\n');

/** One column of a reference table: its header and how to render a cell from an item. */
type Column<T> = { header: string; render: (item: T) => string };

const variableColumns: Column<CssVariableMeta>[] = [
  { header: 'CSS variable', render: (v) => code(v.property) },
  { header: 'Value', render: (v) => code(`${v.value}`) },
  { header: 'Description', render: (v) => cell(v.description) },
];

const colorSchemeColumns: Column<ColorSchemeClassMeta>[] = [
  { header: 'Class', render: (c) => code(c.selector) },
  { header: 'Usage', render: (c) => cell(c.usage) },
  { header: 'Description', render: (c) => cell(c.description) },
];

/** A `### heading` followed by a reference table built from `columns`. */
const section = <T>(heading: string, items: T[], columns: Column<T>[]): string =>
  `### ${heading}\n\n${table(
    columns.map((c) => c.header),
    items.map((item) => columns.map((c) => c.render(item)))
  )}`;

/** An ordered outline: each entry is a flat group (leaf section) or a record of named sub-groups (`Parent — Child` sections). */
type Outline<T> = Record<string, T[] | Record<string, T[]>>;

/** Normalize a documented group — a keyed record or an array — to a flat list. */
const groupItems = <T>(group: T[] | Record<string, T>): T[] => (Array.isArray(group) ? group : Object.values(group));

/** A documented leaf carries a `property` (CSS variable token) or a `selector` (color-scheme utility); a group/category is a keyed record or array of leaves. */
const isLeaf = (node: unknown): boolean =>
  typeof node === 'object' && node !== null && ('property' in node || 'selector' in node);

/** A flat group is an array of leaves or a record of leaves; a category is a record of such groups. */
const isFlatGroup = (value: object): boolean => Array.isArray(value) || Object.values(value).every(isLeaf);

/** Render an outline to markdown sections, building each section's table from `columns`. Empty groups are skipped. */
const renderOutline = <T>(outline: Outline<T>, columns: Column<T>[]): string =>
  Object.entries(outline)
    .map(([parent, value]) =>
      Array.isArray(value)
        ? section(parent, value, columns)
        : Object.entries(value)
            .filter(([, items]) => items.length > 0)
            .map(([child, items]) => section(`${parent} — ${child}`, items, columns))
            .join('\n\n')
    )
    .join('\n\n');

/**
 * Derive a `## Contents` TOC line from an outline. `expandSubgroups` lists nested groups as
 * `Parent (Child / Child)`; when false only top-level names are listed.
 */
const tocLine = <T>(outline: Outline<T>, expandSubgroups: boolean): string =>
  Object.entries(outline)
    .map(([parent, value]) =>
      expandSubgroups && !Array.isArray(value)
        ? `${parent} (${Object.entries(value)
            .filter(([, items]) => items.length > 0)
            .map(([child]) => child)
            .join(' / ')})`
        : parent
    )
    .join(', ');

/** Read a hand-authored markdown source shipped alongside this serializer. */
const readMarkdown = (file: string): string => fs.readFileSync(path.join(__dirname, file), 'utf8').trim();

/** The hand-authored intro and "how to use" guide, kept as editable markdown next to this file. */
const intro = readMarkdown('intro.md');

const howToUse = readMarkdown('how-to-use.md');

/** Derive an {@link Outline} from a catalog, sentence-casing keys (`lineHeight` → `Line height`) and following source order. */
const deriveOutline = <T>(catalog: object): Outline<T> =>
  Object.fromEntries(
    Object.entries(catalog).map(
      ([key, value]: [string, T[] | Record<string, T> | Record<string, T[] | Record<string, T>>]) => [
        sentenceCase(key),
        isFlatGroup(value)
          ? groupItems(value as T[] | Record<string, T>)
          : Object.fromEntries(
              Object.entries(value as Record<string, T[] | Record<string, T>>).map(([subKey, subValue]) => [
                sentenceCase(subKey),
                groupItems(subValue),
              ])
            ),
      ]
    )
  ) as Outline<T>;

/** Keep only the leaves of a given {@link StylesheetKind}, pruning emptied groups. Returns `undefined` when nothing remains. */
const pruneByKind = (node: StylesheetBranch, kind: StylesheetKind): StylesheetBranch | undefined => {
  if (isLeaf(node)) {
    return kindOf(node as StylesheetNode) === kind ? node : undefined;
  }
  const entries = (Array.isArray(node) ? node.map((n, i) => [i, n] as const) : Object.entries(node))
    .map(([key, value]) => [key, pruneByKind(value as StylesheetBranch, kind)] as const)
    .filter((entry): entry is [string | number, StylesheetBranch] => entry[1] !== undefined);
  if (entries.length === 0) {
    return undefined;
  }
  return Array.isArray(node) ? entries.map(([, value]) => value) : Object.fromEntries(entries);
};

/** Split the flat `stylesheetsMeta` catalog into a single-kind view, dropping domains/groups that end up empty. */
const catalogByKind = (kind: StylesheetKind): Record<string, StylesheetBranch> =>
  (pruneByKind(stylesheetsMeta as StylesheetBranch, kind) ?? {}) as Record<string, StylesheetBranch>;

const variablesOutline = deriveOutline<CssVariableMeta>(catalogByKind('token'));

const colorSchemeOutline = deriveOutline<ColorSchemeClassMeta>(catalogByKind('utility'));

/** A `## Stylesheets` overview table built from the per-file `globalStylesMeta` descriptions. */
const stylesheets = `## Stylesheets\n\n${table(
  ['Stylesheet', 'Description'],
  Object.values(globalStylesMeta).map(({ file, description }) => [code(file), cell(description)])
)}`;

const contents = `## Contents

- [Stylesheets](#stylesheets) — ${Object.values(globalStylesMeta)
  .map(({ file }) => file)
  .join(', ')}
- [CSS variables](#css-variables) — ${tocLine(variablesOutline, true)}
- [Color-scheme classes](#color-scheme-classes) — ${tocLine(colorSchemeOutline, false)}`;

const cssVariables = `## CSS variables\n\n${renderOutline(variablesOutline, variableColumns)}`;

const colorSchemeClasses = `## Color-scheme classes\n\n${renderOutline(colorSchemeOutline, colorSchemeColumns)}`;

/**
 * Render the full global styles overview as markdown. Pure function over {@link stylesheetsMeta} and
 * {@link globalStylesMeta}; the build script is responsible for writing it to disk.
 */
export const getStylesheetsSkill = (): string =>
  `${[intro, howToUse, contents, stylesheets, cssVariables, colorSchemeClasses].filter(Boolean).join('\n\n')}\n`;
