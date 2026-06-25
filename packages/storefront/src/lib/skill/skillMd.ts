import type { Framework, ReferenceMapEntry } from './skillTree';

/** Fixed skill identifier — never varies by framework or version. */
export const SKILL_NAME = 'porsche-design-system-docs';

/**
 * Placeholder activation description. The production wording is tuned offline
 * against the activation eval set in TASK-18; until then this keeps the SKILL.md
 * frontmatter valid without claiming final wording.
 */
export const PLACEHOLDER_DESCRIPTION =
  'PLACEHOLDER — auto-activation description is tuned offline in a later step (TASK-18).';

/**
 * The skeleton reference map describing the skill tree layout. Each row points at
 * a reference file the content generators fill in. Generators may register
 * additional rows (e.g. per-component) through {@link SkillTree.registerReference};
 * this scaffold guarantees a valid SKILL.md even before any content exists.
 */
export const SKELETON_REFERENCE_MAP: readonly ReferenceMapEntry[] = [
  { path: 'references/components/overview.md', useWhen: 'Choosing or listing the available PDS components.' },
  {
    path: 'references/components/<p-component>.md',
    useWhen: 'Working with a specific component — props, slots, events, CSS variables and examples.',
  },
  { path: 'references/styles/tailwindcss.md', useWhen: 'Styling PDS usage with Tailwind CSS.' },
  { path: 'references/styles/scss.md', useWhen: 'Styling PDS usage with SCSS.' },
  { path: 'references/styles/vanilla-extract.md', useWhen: 'Styling PDS usage with vanilla-extract.' },
  { path: 'references/styles/emotion.md', useWhen: 'Styling PDS usage with Emotion.' },
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

const escapeCell = (text: string): string => text.replace(/\|/g, '\\|');

const renderReferenceMap = (entries: readonly ReferenceMapEntry[]): string => {
  if (entries.length === 0) {
    return '_The reference map is populated by the content generators._';
  }
  const rows = entries.map((entry) => `| \`${entry.path}\` | ${escapeCell(entry.useWhen)} |`);
  return ['| Reference | Use this when |', '| --- | --- |', ...rows].join('\n');
};

/**
 * Build the always-loaded `SKILL.md` entry point: fixed-`name` frontmatter with a
 * placeholder activation description, the reference map rendered from the
 * registered rows, and the core always-apply rules.
 */
export const buildSkillMd = (framework: Framework, entries: readonly ReferenceMapEntry[]): string => {
  const frontmatter = ['---', `name: ${SKILL_NAME}`, `description: ${PLACEHOLDER_DESCRIPTION}`, '---'].join('\n');

  const coreRules = [
    '## Core rules',
    '',
    `- \`component-meta\` is authoritative: when it disagrees with the examples or prose here, follow \`component-meta\` (raw data at \`${rawMetaReference(framework)}\`).`,
    '- Prefer Porsche Design System components and tokens for new UI. Do not rewrite non-PDS UI unasked, and do not hijack work that targets another library.',
    '- All content here is version-exact for the installed package — never mix guidance across versions.',
    '- Every reference path is relative to this skill root unless explicitly noted otherwise.',
  ].join('\n');

  return [
    frontmatter,
    '',
    `# Porsche Design System (\`${framework}\`)`,
    '',
    'Version-exact knowledge of the installed Porsche Design System. Open the reference below that matches the task, then apply the core rules.',
    '',
    '## Reference map',
    '',
    renderReferenceMap(entries),
    '',
    coreRules,
    '',
  ].join('\n');
};
