import path from 'node:path';
import * as prettier from 'prettier';
import { getStylesheetsSkill } from '../../../../components/projects/stylesheets/skill/skill';
import { getEmotionSkill } from '../../../../styles/projects/emotion/skill/skill';
import { getScssSkill } from '../../../../styles/projects/scss/skill/skill';
import { renderScssFile, scssFileMeta } from '../../../../styles/projects/scss/src/scss';
import { getTailwindcssSkill } from '../../../../styles/projects/tailwindcss/skill/skill';
import { getTailwindcssTheme, tailwindCssMeta } from '../../../../styles/projects/tailwindcss/src/css';
import { getVanillaExtractSkill } from '../../../../styles/projects/vanilla-extract/skill/skill';
import type { SkillTree } from './skillTree';

/**
 * Aggregation glue for the styling-solution and global-stylesheet references. The
 * markdown is the imported `getXxxSkill()` serializers' output written verbatim —
 * those serializers are owned by the styles packages and reused as-is, never
 * reimplemented here. Some solutions also ship generated style assets (Tailwind's
 * `index.css`, SCSS's per-domain partials) so the skill carries exact values
 * offline; those are produced from the same generators the packages' own
 * `build:skill` scripts use (`getTailwindcssTheme` / `renderScssFile`), formatted
 * identically, rather than copied — the packages emit them into a git-ignored
 * `skill/generated` dir that isn't guaranteed to exist at aggregation time.
 *
 * Framework-agnostic: every wrapper documents every styling solution.
 */

/** A generated style asset (filename + formatted content) to ship beside a reference's markdown. */
type StyleAsset = { file: string; content: string };

type StyleReference = {
  /** Imported serializer whose output is written verbatim as the reference markdown. */
  serialize: () => string;
  /** Markdown target, relative to `references/`. Its directory also receives the generated assets. */
  reference: string;
  /** Produce the generated assets to ship beside the markdown (reusing the package generators). */
  assets?: () => Promise<StyleAsset[]>;
};

const format = (source: string, parser: 'css' | 'scss'): Promise<string> => prettier.format(source, { parser });

const STYLE_REFERENCES: StyleReference[] = [
  {
    serialize: getTailwindcssSkill,
    reference: 'styles/tailwindcss.md',
    assets: async () => [{ file: tailwindCssMeta.file, content: await format(getTailwindcssTheme(), 'css') }],
  },
  {
    serialize: getScssSkill,
    reference: 'styles/scss.md',
    assets: () =>
      Promise.all(
        scssFileMeta.map(async (fileMeta) => ({ file: fileMeta.file, content: await format(renderScssFile(fileMeta), 'scss') }))
      ),
  },
  { serialize: getVanillaExtractSkill, reference: 'styles/vanilla-extract.md' },
  { serialize: getEmotionSkill, reference: 'styles/emotion.md' },
  { serialize: getStylesheetsSkill, reference: 'stylesheets.md' },
];

/**
 * Write every styling-solution reference (`references/styles/*.md`) and the global
 * stylesheets reference (`references/stylesheets.md`) into the skill tree, each with
 * its generated style assets shipped in the same directory. Returns the tree-relative
 * paths written, in order.
 */
export const writeStyleReferences = async (tree: SkillTree): Promise<string[]> => {
  const written: string[] = [];

  for (const { serialize, reference, assets } of STYLE_REFERENCES) {
    written.push(tree.writeReference(reference, serialize()));

    const assetDir = path.posix.dirname(reference);
    for (const { file, content } of (await assets?.()) ?? []) {
      written.push(tree.writeReference(path.posix.join(assetDir, file), content));
    }
  }

  return written;
};
