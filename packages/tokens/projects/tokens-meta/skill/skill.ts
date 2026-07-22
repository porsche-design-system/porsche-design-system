import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PackageSkill } from '@porsche-design-system/shared';
import { sentenceCase } from 'change-case';
import type { TokenMeta, TokensMetaTree } from '../src';
import { tokensMeta } from '../src';

/**
 * Markdown serializer for the design tokens, driven by {@link tokensMeta} (a nested tree of
 * `{ name, value, description }` leaves). Renders a hand-authored intro and "how to use" guide,
 * then one section per top-level category with a name/value/description reference table. The
 * resolved values are importable from the wrapper package's `tokens` subpath (JS constants); the
 * equivalent CSS custom properties live in `variables.css`, documented in `stylesheets.md`.
 */

const code = (value: string | number): string => `\`${value}\``;

/** Collapse whitespace and escape table-breaking characters for a single markdown cell. Backslashes are
 * escaped before pipes so an escaped pipe already in the text (`\|`) is not misread as a live delimiter. */
const escapeCell = (text: string): string =>
  text.replace(/\s+/g, ' ').trim().replace(/\\/g, '\\\\').replace(/\|/g, '\\|');

/** A markdown table from a header row and pre-rendered cell rows (no heading). */
const markdownTable = (headers: string[], rows: string[][]): string =>
  [headers, headers.map(() => '---'), ...rows].map((row) => `| ${row.join(' | ')} |`).join('\n');

/** GitHub-compatible heading anchor slug, keeping the Contents links in step with the headings. */
const headingSlug = (heading: string): string =>
  heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

// `import.meta.url` (not `__dirname`): this package is `"type": "module"`, so the file runs with
// ESM semantics under the storefront's tsx runtime and under vitest alike.
const readMarkdown = (file: string): string =>
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), file), 'utf8').trim();

/** The hand-authored intro and "how to use" guide, kept as editable markdown next to this file. */
const intro = readMarkdown('intro.md');

const howToUse = readMarkdown('how-to-use.md');

const tokenTable = (tokens: TokenMeta[]): string =>
  markdownTable(
    ['Token', 'Value', 'Description'],
    tokens.map((token) => [code(token.name), code(token.value), escapeCell(token.description)])
  );

/** A documented leaf carries a `name`; a group is a keyed record of leaves and/or nested groups. */
const isLeaf = (node: TokensMetaTree | TokenMeta): node is TokenMeta =>
  typeof node === 'object' && node !== null && 'name' in node;

/**
 * Render a group node to markdown: a `heading` for the group, a table of its direct leaf tokens (if
 * any), then each nested sub-group recursively at the next heading level. Source order is preserved.
 */
const renderGroup = (key: string, group: TokensMetaTree, depth: number): string => {
  const entries = Object.entries(group);
  const leaves = entries.filter(([, node]) => isLeaf(node)).map(([, node]) => node as TokenMeta);
  const subGroups = entries.filter(([, node]) => !isLeaf(node)) as [string, TokensMetaTree][];

  return [
    `${'#'.repeat(depth)} ${sentenceCase(key)}`,
    ...(leaves.length > 0 ? [tokenTable(leaves)] : []),
    ...subGroups.map(([subKey, subGroup]) => renderGroup(subKey, subGroup, depth + 1)),
  ].join('\n\n');
};

const contents = `## Contents

${Object.keys(tokensMeta)
  .map((key) => `- [${sentenceCase(key)}](#${headingSlug(sentenceCase(key))})`)
  .join('\n')}`;

const categories = Object.entries(tokensMeta as TokensMetaTree)
  .map(([key, group]) => renderGroup(key, group as TokensMetaTree, 2))
  .join('\n\n');

/** Render the full design-tokens reference as markdown. Pure function over {@link tokensMeta}. */
export const getTokensSkill = (): string => `${[intro, howToUse, contents, categories].join('\n\n')}\n`;

export const tokensSkill: PackageSkill = {
  name: 'tokens',
  title: 'Design tokens',
  description: 'the design-token source values (color, spacing, typography, motion, breakpoints) for custom UI',
  intro:
    'Design tokens — the source values for color, spacing, typography, motion, breakpoints and more, ' +
    'provided as JS constants. The entire system is built on these tokens: the global stylesheets, the ' +
    'components and the custom styling themes all depend on them. They can also be used standalone to ' +
    'support other styling solutions or to build custom UI directly.',
  getContent: getTokensSkill,
};
