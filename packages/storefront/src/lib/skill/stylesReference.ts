import { getStylesheetsSkill } from '../../../../components/projects/stylesheets/skill/skill';
import { getEmotionSkill } from '../../../../styles/projects/emotion/skill/skill';
import { getScssSkill } from '../../../../styles/projects/scss/skill/skill';
import { getTailwindcssSkill } from '../../../../styles/projects/tailwindcss/skill/skill';
import { getVanillaExtractSkill } from '../../../../styles/projects/vanilla-extract/skill/skill';
import { rawScssReference, rawTailwindcssReference } from './skillMd';
import type { Framework, SkillTree } from './skillTree';

/**
 * Aggregation glue for the styling-solution and global-stylesheet references. The markdown is the
 * imported `getXxxSkill()` serializers' output written verbatim — those serializers are owned by the
 * styles packages and reused as-is, never reimplemented here.
 *
 * For the solutions whose exact values live in a shipped stylesheet (Tailwind's `index.css`, SCSS's
 * partials), we do not copy the file contents into the tree; instead we append a framework-aware
 * pointer to where it physically lives in the installed package, mirroring how `component-meta` is
 * linked (see {@link rawTailwindcssReference} / {@link rawScssReference}). vanilla-extract and Emotion
 * resolve their values at runtime, so they carry no such pointer.
 *
 * Framework-agnostic otherwise: every wrapper documents every styling solution.
 */

type StyleReference = {
  /** Imported serializer whose output is written verbatim as the reference markdown. */
  serialize: () => string;
  /** Markdown target, relative to `references/`. */
  reference: string;
  /** Raw stylesheet link target appended as an "Exact values" pointer, mirroring the meta pattern. */
  rawReference?: (framework: Framework) => string;
};

const STYLE_REFERENCES: StyleReference[] = [
  { serialize: getTailwindcssSkill, reference: 'styles/tailwindcss.md', rawReference: rawTailwindcssReference },
  { serialize: getScssSkill, reference: 'styles/scss.md', rawReference: rawScssReference },
  { serialize: getVanillaExtractSkill, reference: 'styles/vanilla-extract.md' },
  { serialize: getEmotionSkill, reference: 'styles/emotion.md' },
  { serialize: getStylesheetsSkill, reference: 'stylesheets.md' },
];

/** Pointer to the shipped stylesheet, appended to a reference whose package ships one. */
const fullStylesheetSection = (rawReference: string): string =>
  `## Full stylesheet\n\nThe tables above are the index, with each token's value. For the complete generated stylesheet — resets, deprecated aliases and everything not tabulated here — read \`${rawReference}\` in the installed package.\n`;

/**
 * Write every styling-solution reference (`references/styles/*.md`) and the global stylesheets
 * reference (`references/stylesheets.md`) into the skill tree, appending a framework-aware pointer to
 * the shipped stylesheet for the solutions that have one. Returns the tree-relative paths written.
 */
export const writeStyleReferences = (tree: SkillTree, framework: Framework): string[] =>
  STYLE_REFERENCES.map(({ serialize, reference, rawReference }) => {
    const markdown = rawReference ? `${serialize()}\n${fullStylesheetSection(rawReference(framework))}` : serialize();
    return tree.writeReference(reference, markdown);
  });
