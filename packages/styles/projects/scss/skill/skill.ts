import fs from 'node:fs';
import path from 'node:path';
import { sentenceCase } from 'change-case';
import type { ScssMixin, ScssVariable } from '../src';
import { scssMeta } from '../src';

/**
 * Markdown serializer for the scss styling solution — the companion to the generated partials,
 * both driven by the single source of truth {@link scssMeta}. Produces a self-describing overview
 * of the package (a short intro, a hand-authored "how to use" guide and a grouped reference of
 * every documented variable and mixin) intended to be shipped next to the regenerated partials and
 * composed into the Porsche Design System docs skill.
 *
 * Only the documented surface is rendered — exactly what the storefront API pages expose. The
 * SCSS-only plumbing (deprecated `$pds-*` aliases, private helpers, the theming mixin, the
 * `@forward` index) is intentionally omitted here; it remains in the partials for exact values.
 * Token values are likewise left to the partials — this file is the index, the partials are the detail.
 */

const { theme, utilities } = scssMeta;

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

/**
 * An ordered outline: each entry is either a flat group of items (a leaf section) or a record of
 * named sub-groups (rendered as `Parent — Child` sections). Derived directly from the documented
 * catalog, so the catalog's shape *is* the documentation outline.
 */
type Outline<T> = Record<string, T[] | Record<string, T[]>>;

/** Normalize a documented group — a keyed record or an array — to a flat list. */
const groupItems = <T>(group: T[] | Record<string, T>): T[] => (Array.isArray(group) ? group : Object.values(group));

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

/**
 * Derive an {@link Outline} from a documented catalog (`scssMeta.theme` / `.utilities`): each
 * top-level group becomes a section (arrays) or a parent with one sub-section per sub-group
 * (records), with headings sentence-cased from the keys (`lineHeight` → `Line height`). Source
 * order is followed verbatim, so the catalog's shape *is* the documentation outline.
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

const themeOutline = deriveOutline<ScssVariable>(theme);

const utilitiesOutline = deriveOutline<ScssMixin>(utilities);

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
