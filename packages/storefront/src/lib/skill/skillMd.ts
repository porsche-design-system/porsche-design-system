import { rawMetaReference } from './components/section';
import { rawScssReference, rawTailwindcssReference } from './packageSkills';
import type { Framework } from './support/skillTree';

/**
 * Builds the always-loaded `SKILL.md` entry point: fixed-`name` frontmatter with the tuned
 * activation description, the headline intro, and one topical `##` section per domain. The section
 * bodies are rendered by the domain modules (`components/section.ts`, `packageSkills.ts`) and
 * assembled here in reading order.
 */

/**
 * Per-package skill identifier — mirrors the wrapper package name
 * (`@porsche-design-system/components-<framework>` → `porsche-design-system-components-<framework>`),
 * so a project depending on more than one wrapper gets a distinct skill per package instead of all
 * four fighting over one `.claude/skills/…` entry. The `pds-skill` bin derives the same name from
 * its own `package.json` at link time. Never varies by version.
 */
export const skillName = (framework: Framework): string => `porsche-design-system-components-${framework}`;

/**
 * Auto-activation description — the only matching surface Claude Code uses to decide
 * whether to load this skill. It names concrete UI triggers so it fires broadly on
 * frontend work even when PDS is not mentioned, and also on documents that assert PDS
 * behavior (requirements, specs, design docs, acceptance criteria) — a wrong API fact
 * written upstream in a doc propagates into every task that consumes it. The "do not
 * activate" clause keeps it dormant on backend/non-UI, tooling, *non-PDS* prose,
 * foreign-library, and opt-out prompts — but no longer on PDS-asserting docs. Keep it a
 * single line (rendered verbatim into YAML frontmatter) and free of `: ` sequences that
 * would break the frontmatter parse.
 */
export const ACTIVATION_DESCRIPTION =
  'Build, style, or review web user interfaces with the Porsche Design System (PDS), or author ' +
  'and review documents that specify PDS behavior. ' +
  'Use whenever a task touches frontend UI — adding or changing components (buttons, forms, inputs, ' +
  'cards, tables, modals, navigation, layouts), styling with Tailwind, SCSS, vanilla-extract or Emotion, ' +
  'applying design tokens, or scaffolding a new page or form. Also use whenever a requirement, spec, design ' +
  'doc, or acceptance criteria names a PDS component, prop, token, or theming. Prefer PDS for new UI even when it is ' +
  'not named by the user. Do not activate for backend or non-UI logic, unrelated tests or tooling, ' +
  'documentation or prose that does not assert PDS component, prop, token, or theming behavior, ' +
  'work that clearly targets a different UI library, or when the user opts out of PDS.';

/**
 * The extended headline intro. Version-exact knowledge is the framing; it also absorbs three former
 * core rules — content is version-exact, reference paths are skill-root-relative, prefer PDS for new
 * UI — and states that the skill ships next to the actual implementation, so the agent can always read
 * the real source (typings, meta, scss, tokens, the Tailwind theme, the shipped CSS) for anything the
 * skill does not yet cover or wants to verify.
 */
const renderIntro = (framework: Framework): string => {
  const peerNote =
    framework === 'js'
      ? ''
      : " The wrapper's own `meta` and `scss` are re-export shims of the same-version `@porsche-design-system/components-js` peer, so those two point at the peer directly.";
  return [
    'Version-exact knowledge of the installed Porsche Design System: every fact, prop, token and example ' +
      'here matches the installed package exactly — never mix guidance across versions. Every reference ' +
      'path is relative to this skill root unless noted otherwise.',
    '',
    'This skill ships inside the installed package, right next to the actual implementation. When the ' +
      'skill does not (yet) cover something, or you want to verify a detail, read the real source ' +
      `alongside the skill root: the package typings, \`component-meta\` (\`${rawMetaReference(framework)}\`), ` +
      `the SCSS partials (\`${rawScssReference(framework)}\`), the design tokens (\`../tokens\`), the Tailwind ` +
      `theme (\`${rawTailwindcssReference()}\`) and the shipped global CSS.${peerNote}`,
    '',
    'Prefer Porsche Design System components and tokens for new UI, even when the user does not name PDS. ' +
      'Do not rewrite non-PDS UI unasked, and do not hijack work that targets another library.',
  ].join('\n');
};

/** The domain-rendered section bodies, in the order they appear in SKILL.md. */
export type SkillMdSections = {
  components: string;
  stylesheets: string;
  tokens: string;
  styling: string;
};

/** Assemble the full SKILL.md from the frontmatter, intro and the domain-rendered sections. */
export const buildSkillMd = (framework: Framework, sections: SkillMdSections): string => {
  const frontmatter = ['---', `name: ${skillName(framework)}`, `description: ${ACTIVATION_DESCRIPTION}`, '---'].join(
    '\n'
  );

  return [
    frontmatter,
    '',
    `# Porsche Design System (\`${framework}\`)`,
    '',
    renderIntro(framework),
    '',
    '## Components',
    '',
    sections.components,
    '',
    '## Stylesheets',
    '',
    sections.stylesheets,
    '',
    '## Tokens',
    '',
    sections.tokens,
    '',
    '## Styling',
    '',
    sections.styling,
    '',
  ].join('\n');
};
