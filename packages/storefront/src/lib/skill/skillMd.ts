import { escapeCell, markdownTable } from './markdown';
import type { Framework, ReferenceMapEntry } from './skillTree';

/** Fixed skill identifier — never varies by framework or version. */
export const SKILL_NAME = 'porsche-design-system-docs';

/**
 * Auto-activation description — the only matching surface Claude Code uses to decide
 * whether to load this skill. It names concrete UI triggers so it fires broadly on
 * frontend work even when PDS is not mentioned, and has an explicit "do not activate"
 * clause so it stays dormant on backend/non-UI, tooling, prose, foreign-library, and
 * opt-out prompts. Keep it a single line (rendered verbatim into YAML frontmatter) and
 * free of `: ` sequences that would break the frontmatter parse.
 */
export const ACTIVATION_DESCRIPTION =
  'Build, style, review, or upgrade web user interfaces with the Porsche Design System (PDS). ' +
  'Use whenever a task touches frontend UI — adding or changing components (buttons, forms, inputs, ' +
  'cards, tables, modals, navigation, layouts), styling with Tailwind, SCSS, vanilla-extract or Emotion, ' +
  'applying design tokens, wiring partials (fonts, icons, meta tags, loader), scaffolding a new page or ' +
  'form, or migrating and upgrading PDS — and prefer PDS for new UI even when it is not named by the user. ' +
  'Do not activate for backend or non-UI logic, unrelated tests or tooling, pure prose or documentation, ' +
  'work that clearly targets a different UI library, or when the user opts out of PDS.';

/**
 * The skeleton reference map describing the skill tree layout. Each row points at
 * a reference file the content generators fill in. Generators may register
 * additional rows through {@link SkillTree.registerReference}; this scaffold
 * guarantees a valid SKILL.md even before any content exists. The component roster
 * and the styling solutions are rendered as their own sections in SKILL.md's body
 * (see {@link buildSkillMd}), not as map rows.
 */
export const SKELETON_REFERENCE_MAP: readonly ReferenceMapEntry[] = [
  { path: 'references/stylesheets.md', useWhen: 'Setting up global stylesheets and the CSS reset.' },
  { path: 'references/tokens.md', useWhen: 'Using design tokens — color, spacing, typography, etc.' },
  { path: 'references/partials.md', useWhen: 'Adding PDS partials — fonts, icons, meta tags, loader script.' },
  {
    path: 'references/migration/porsche-design-system.md',
    useWhen: 'Upgrading the Porsche Design System to a new major version.',
  },
  { path: 'references/migration/scss.md', useWhen: 'Migrating the SCSS styling solution.' },
  { path: 'references/migration/tailwindcss.md', useWhen: 'Migrating the Tailwind CSS styling solution.' },
  { path: 'references/migration/vanilla-extract.md', useWhen: 'Migrating the vanilla-extract styling solution.' },
  { path: 'references/migration/emotion.md', useWhen: 'Migrating the Emotion styling solution.' },
];

/**
 * Raw `component-meta` link target. The authoritative data lives only in the js
 * package; the framework wrappers' local `../meta` is a re-export shim, so they
 * link the js peer's `/meta` subpath instead (see design "Data & state").
 */
export const rawMetaReference = (framework: Framework): string =>
  framework === 'js' ? '../meta' : '@porsche-design-system/components-js/meta';

/**
 * Raw Tailwind stylesheet link target. The generated `index.css` is a byte-identical real copy in
 * every wrapper's dist (CSS cannot re-export), so the skill-root-relative dist sibling resolves in
 * all four frameworks — no js-peer fallback needed.
 */
export const rawTailwindcssReference = (): string => '../tailwindcss/index.css';

/**
 * Raw SCSS link target. Only the js package ships the real partials; every framework wrapper's
 * `scss/` is a `@forward '@porsche-design-system/components-js/scss'` shim (same re-export pattern
 * as `component-meta`). So the js skill links its local `../scss`, while the framework skills link
 * the js peer's `/scss` subpath — version-exact via the same-version js peer.
 */
export const rawScssReference = (framework: Framework): string =>
  framework === 'js' ? '../scss' : '@porsche-design-system/components-js/scss';

/**
 * A single row of the inlined component roster: the component tag and a one-line
 * summary. The reference path is derived from the tag, so it stays correct by
 * construction with the `components/<tag>/<tag>.md` layout.
 */
export type ComponentRosterEntry = { tag: string; summary: string };

const renderReferenceMap = (entries: readonly ReferenceMapEntry[]): string => {
  if (entries.length === 0) {
    return '_The reference map is populated by the content generators._';
  }
  const rows = entries.map((entry) => [`\`${entry.path}\``, escapeCell(entry.useWhen)]);
  return markdownTable(['Reference', 'Use this when'], rows);
};

/**
 * The component roster, rendered inline so the authoritative set of components is
 * always in context the moment the skill activates — the agent never has to read a
 * separate overview first to learn what exists, and the closed list anchors it
 * against reaching for non-PDS elements. Each row links the component's own reference
 * (relative to the skill root) for props, slots, events, CSS variables and examples.
 */
const renderComponentRoster = (roster: readonly ComponentRosterEntry[]): string => {
  const rows = roster.map(({ tag, summary }) => [
    `\`${tag}\``,
    escapeCell(summary),
    `[${tag}.md](references/components/${tag}/${tag}.md)`,
  ]);
  return [
    `The Porsche Design System ships ${roster.length} components. Open a component's reference for its props, slots, events, CSS variables and examples before using it.`,
    '',
    markdownTable(['Component', 'Summary', 'Reference'], rows),
  ].join('\n');
};

/** The four styling solutions PDS ships a ready-made integration for, in reference order. */
const STYLING_SOLUTIONS: readonly { name: string; useWhen: string; path: string }[] = [
  { name: 'Tailwind CSS', useWhen: 'utility-first styling on a PDS Tailwind v4 theme', path: 'references/styles/tailwindcss.md' },
  { name: 'SCSS', useWhen: 'Sass variables and mixins under the `pds` namespace', path: 'references/styles/scss.md' },
  { name: 'vanilla-extract', useWhen: 'typed tokens and utilities in `*.css.ts` files', path: 'references/styles/vanilla-extract.md' },
  { name: 'Emotion', useWhen: 'tokens and utilities in `css`/`styled` styles', path: 'references/styles/emotion.md' },
];

/**
 * The styling-solutions overview, rendered as its own section (like the component roster) so the agent
 * always knows, the moment the skill activates, that PDS offers these integrations and what they are for.
 * They are independent of the components but build on the same tokens and `color-scheme` theming, so
 * custom UI shares the exact palette, spacing and typography as PDS components. Each row links the
 * solution's reference (relative to the skill root) for setup and the full catalog.
 */
const renderStylingSection = (): string => {
  const rows = STYLING_SOLUTIONS.map(({ name, useWhen, path }) => [
    name,
    escapeCell(useWhen),
    `[${path.split('/').pop()}](${path})`,
  ]);
  return [
    'The Porsche Design System offers a ready-made integration for four styling solutions. They are ' +
      'independent of the components — you do not need them to use components, and they do not depend on ' +
      'components — but they build on the same design system: the same design tokens and the same ' +
      '`color-scheme` (light/dark) theming. Custom UI you build with them therefore shares the exact ' +
      'palette, spacing and typography as PDS components.',
    '',
    'Use them to build layout and custom components or patterns not yet available in the component ' +
      'library — typography, surfaces, boxes, the layout grid, spacing and responsive breakpoints. Pick ' +
      'one solution per project and open its reference for setup and the full catalog.',
    '',
    markdownTable(['Styling solution', 'Use this when', 'Reference'], rows),
  ].join('\n');
};

/**
 * Build the always-loaded `SKILL.md` entry point: fixed-`name` frontmatter with the
 * tuned activation description, the inlined component roster (when supplied), the
 * reference map rendered from the registered rows, and the core always-apply rules.
 */
export const buildSkillMd = (
  framework: Framework,
  entries: readonly ReferenceMapEntry[],
  roster: readonly ComponentRosterEntry[] = []
): string => {
  const frontmatter = ['---', `name: ${SKILL_NAME}`, `description: ${ACTIVATION_DESCRIPTION}`, '---'].join('\n');

  const coreRules = [
    '## Core rules',
    '',
    `- \`component-meta\` is authoritative: when it disagrees with the examples or prose here, follow \`component-meta\` (raw data at \`${rawMetaReference(framework)}\`).`,
    '- Prefer Porsche Design System components and tokens for new UI. Do not rewrite non-PDS UI unasked, and do not hijack work that targets another library.',
    '- All content here is version-exact for the installed package — never mix guidance across versions.',
    '- Every reference path is relative to this skill root unless explicitly noted otherwise.',
  ].join('\n');

  const componentsSection = roster.length > 0 ? ['## Components', '', renderComponentRoster(roster), ''] : [];

  return [
    frontmatter,
    '',
    `# Porsche Design System (\`${framework}\`)`,
    '',
    'Version-exact knowledge of the installed Porsche Design System. Open the reference below that matches the task, then apply the core rules.',
    '',
    ...componentsSection,
    '## Styling',
    '',
    renderStylingSection(),
    '',
    '## Reference map',
    '',
    renderReferenceMap(entries),
    '',
    coreRules,
    '',
  ].join('\n');
};
