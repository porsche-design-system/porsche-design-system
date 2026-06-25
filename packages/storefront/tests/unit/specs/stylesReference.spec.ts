import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { getStylesheetsSkill } from '../../../../components/projects/stylesheets/skill/skill';
import { getEmotionSkill } from '../../../../styles/projects/emotion/skill/skill';
import { getScssSkill } from '../../../../styles/projects/scss/skill/skill';
import { getTailwindcssSkill } from '../../../../styles/projects/tailwindcss/skill/skill';
import { getVanillaExtractSkill } from '../../../../styles/projects/vanilla-extract/skill/skill';
import { SkillTree } from '@/lib/skill/skillTree';
import { writeStyleReferences } from '@/lib/skill/stylesReference';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('writeStyleReferences', () => {
  let root: string;
  let tree: SkillTree;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'styles-ref-'));
    tree = new SkillTree(root);
    tree.reset();
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  const read = (relativePath: string): string => fs.readFileSync(tree.resolve(relativePath), 'utf-8');

  it('writes the styling-solution and stylesheets references into the tree', async () => {
    const written = await writeStyleReferences(tree);

    expect(written).toContain('references/styles/tailwindcss.md');
    expect(written).toContain('references/styles/scss.md');
    expect(written).toContain('references/styles/vanilla-extract.md');
    expect(written).toContain('references/styles/emotion.md');
    expect(written).toContain('references/stylesheets.md');
    expect(written).toMatchSnapshot();
  });

  // Cross-check: the aggregated markdown is the imported serializers' output verbatim
  // (same seam the styles packages' own skill specs lock).
  it('writes each serializer output verbatim', async () => {
    await writeStyleReferences(tree);

    expect(read('references/styles/tailwindcss.md')).toBe(getTailwindcssSkill());
    expect(read('references/styles/scss.md')).toBe(getScssSkill());
    expect(read('references/styles/vanilla-extract.md')).toBe(getVanillaExtractSkill());
    expect(read('references/styles/emotion.md')).toBe(getEmotionSkill());
    expect(read('references/stylesheets.md')).toBe(getStylesheetsSkill());
  });

  it('ships the generated style assets alongside the markdown', async () => {
    const written = await writeStyleReferences(tree);

    // Tailwind ships its generated theme stylesheet next to tailwindcss.md.
    expect(written).toContain('references/styles/index.css');
    expect(fs.existsSync(tree.resolve('references/styles/index.css'))).toBe(true);
    expect(read('references/styles/index.css')).toContain('@theme');

    // SCSS ships its meta-generated partials, all re-exported from _index.scss.
    expect(written).toContain('references/styles/_index.scss');
    expect(written.some((p) => /^references\/styles\/_color\.scss$/.test(p))).toBe(true);

    // No serializer .md leaks in as an asset — markdown comes from the serializer only.
    expect(written.filter((p) => p.endsWith('.md'))).toEqual([
      'references/styles/tailwindcss.md',
      'references/styles/scss.md',
      'references/styles/vanilla-extract.md',
      'references/styles/emotion.md',
      'references/stylesheets.md',
    ]);
  });
});
