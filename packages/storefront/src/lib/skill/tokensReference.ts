import { sentenceCase } from 'change-case';
// Deep source imports (not the `tokens-meta` package entry): `tokensMeta` is a build-time source module
// that the package's published entry (built dist) does not re-export, and this generator runs under `tsx`
// against source before the sibling packages are built — the same rationale as `generateComponentMeta`'s
// relative-path imports. `packageSkills.ts` reaches into the styles/stylesheets sources for the same reason.
import { type TokensMetaTree, tokensMeta } from '../../../../tokens/projects/tokens-meta/src/lib/tokensMeta';
import type { TokenMeta } from '../../../../tokens/projects/tokens-meta/src/types/token-meta';
import { escapeCell, headingSlug, markdownTable } from './support/markdown';
import type { SkillTree } from './support/skillTree';

/**
 * Programmatic serializer for the design tokens, driven by {@link tokensMeta} (a nested tree of
 * `{ name, value, description }` leaves). Renders one section per top-level category with a
 * name/value/description reference table, mirroring the styles serializers. No MDX involved — the
 * resolved values are importable from the package's `tokens` subpath (JS constants); the equivalent
 * CSS custom properties live in `variables.css`, documented in `stylesheets.md`.
 */

const code = (value: string | number): string => `\`${value}\``;

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

const intro = `# Design tokens

The Porsche Design System design tokens — the source values for breakpoints, color, spacing,
typography, motion and more. Each table lists the token \`name\`, its \`value\` and a description.

Import the resolved values from the package's \`tokens\` subpath, e.g.:

\`\`\`ts
import { spacingStaticMd } from '@porsche-design-system/components-{js|angular|react|vue}/tokens';
\`\`\`

For the same values as ready-to-use CSS custom properties, see \`stylesheets.md\` (\`variables.css\`).`;

const contents = `## Contents

${Object.keys(tokensMeta)
  .map((key) => `- [${sentenceCase(key)}](#${headingSlug(sentenceCase(key))})`)
  .join('\n')}`;

const categories = Object.entries(tokensMeta as TokensMetaTree)
  .map(([key, group]) => renderGroup(key, group as TokensMetaTree, 2))
  .join('\n\n');

/** Render the full design-tokens reference as markdown. Pure function over {@link tokensMeta}. */
export const getTokensSkill = (): string => `${[intro, contents, categories].join('\n\n')}\n`;

export const TOKENS_REFERENCE = 'tokens.md';

/** Write the design-tokens reference (`references/tokens.md`) into the skill tree. Returns the path written. */
export const writeTokensReference = (tree: SkillTree): string =>
  tree.writeReference(TOKENS_REFERENCE, getTokensSkill());

/** The `## Tokens` SKILL.md section body: a one-paragraph "use when" pointing at the tokens reference. */
export const renderTokensSection = (): string =>
  'Design tokens — the source values for color, spacing, typography, motion, breakpoints and more, ' +
  'available as JS constants and as CSS custom properties. Open [tokens.md](references/tokens.md) when ' +
  'using tokens directly in custom UI.';
