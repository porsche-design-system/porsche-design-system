import fs from 'node:fs';
import path from 'node:path';
import { sentenceCase } from 'change-case';
import type { ScssBranch, ScssMixin, ScssNode, ScssVariable } from '../src';
import { kindOf, type ScssKind, scssMeta } from '../src';

/**
 * Markdown serializer for the scss package, driven by {@link scssMeta}. Renders an intro, a
 * hand-authored "how to use" guide and a grouped reference of every documented variable and mixin.
 * Only the documented surface is rendered; plumbing and exact token values stay in the partials.
 */

const code = (value: string): string => `\`${value}\``;

/** Escape the few markdown-table-breaking characters a description might contain. */
const cell = (text: string): string => text.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');

/** A markdown table from a header row and pre-rendered cell rows. */
const table = (headers: string[], rows: string[][]): string =>
  [headers, headers.map(() => '---'), ...rows].map((r) => `| ${r.join(' | ')} |`).join('\n');

/** One column of a reference table: its header and how to render a cell from an item. */
type Column<T> = { header: string; render: (item: T) => string };

const variableColumns: Column<ScssVariable>[] = [
  { header: 'SCSS variable', render: (v) => code(v.name) },
  { header: 'Description', render: (v) => cell(v.description) },
];

const mixinColumns: Column<ScssMixin>[] = [
  { header: 'SCSS mixin', render: (m) => code(`@include ${m.name}${m.signature ?? ''}`) },
  { header: 'Description', render: (m) => cell(m.description) },
];

/** A `### heading` followed by a reference table built from `columns`. */
const section = <T>(heading: string, items: T[], columns: Column<T>[]): string =>
  `### ${heading}\n\n${table(
    columns.map((c) => c.header),
    items.map((item) => columns.map((c) => c.render(item)))
  )}`;

/** An ordered outline: each entry is a flat group (leaf section) or a record of named sub-groups (`Parent — Child` sections). */
type Outline<T> = Record<string, T[] | Record<string, T[]>>;

/** A documented leaf (variable/mixin) carries a `name`; a group/category is a keyed record or array of leaves. */
const isLeaf = (node: unknown): boolean => typeof node === 'object' && node !== null && 'name' in node;

/** Recursively collect a group's documented leaves into a flat list in source order, flattening nested sub-groups (e.g. grid areas). */
const groupItems = <T>(group: object): T[] =>
  isLeaf(group)
    ? [group as T]
    : (Array.isArray(group) ? group : Object.values(group)).flatMap((child) => groupItems<T>(child as object));

/** A flat group has at least one direct leaf (a leaf array/record, or a mixed group like grid); a category is a record of nested groups. */
const isFlatGroup = (value: object): boolean => Array.isArray(value) || Object.values(value).some(isLeaf);

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

/** Keep only the leaves of a given {@link ScssKind}, pruning emptied groups. Returns `undefined` when nothing remains. */
const pruneByKind = (node: ScssBranch, kind: ScssKind): ScssBranch | undefined => {
  if (isLeaf(node)) {
    return kindOf(node as ScssNode) === kind ? node : undefined;
  }
  const entries = (Array.isArray(node) ? node.map((n, i) => [i, n] as const) : Object.entries(node))
    .map(([key, value]) => [key, pruneByKind(value as ScssBranch, kind)] as const)
    .filter((entry): entry is [string | number, ScssBranch] => entry[1] !== undefined);
  if (entries.length === 0) {
    return undefined;
  }
  return Array.isArray(node) ? entries.map(([, value]) => value) : Object.fromEntries(entries);
};

/** Split the flat `scssMeta` catalog into a single-kind view, dropping domains/groups that end up empty. */
const catalogByKind = (kind: ScssKind): Record<string, ScssBranch> =>
  (pruneByKind(scssMeta as ScssBranch, kind) ?? {}) as Record<string, ScssBranch>;

const themeOutline = deriveOutline<ScssVariable>(catalogByKind('token'));

const utilitiesOutline = deriveOutline<ScssMixin>(catalogByKind('utility'));

const contents = `## Contents

- [Variables](#variables) — ${tocLine(themeOutline, false)}
- [Mixins](#mixins) — ${tocLine(utilitiesOutline, false)}`;

const themeVariables = `## Variables\n\n${renderOutline(themeOutline, variableColumns)}`;

const utilitiesMixins = `## Mixins\n\n${renderOutline(utilitiesOutline, mixinColumns)}`;

/**
 * Render the full scss package overview as markdown. Pure function over {@link scssMeta}; the build
 * script is responsible for writing it to disk.
 */
export const getScssSkill = (): string =>
  `${[intro, howToUse, contents, themeVariables, utilitiesMixins].filter(Boolean).join('\n\n')}\n`;
