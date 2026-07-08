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

  it('writes exactly the styling-solution and stylesheets references into the tree', () => {
    const written = writeStyleReferences(tree, 'js');

    expect(written).toEqual([
      'references/styles/tailwindcss.md',
      'references/styles/scss.md',
      'references/styles/vanilla-extract.md',
      'references/styles/emotion.md',
      'references/stylesheets.md',
    ]);

    // Only the five markdown references — the shipped stylesheets are linked in place, never copied in.
    const filesInStyles = fs.readdirSync(tree.resolve('references/styles'));
    expect(filesInStyles.every((f) => f.endsWith('.md'))).toBe(true);
  });

  // Cross-check: the aggregated markdown is the imported serializers' output verbatim (same seam the
  // styles packages' own skill specs lock). Tailwind and SCSS additionally get a shipped-stylesheet
  // pointer appended, so their output starts with — rather than equals — the serializer output.
  it('writes each serializer output verbatim, appending a pointer for the solutions that ship a stylesheet', () => {
    writeStyleReferences(tree, 'js');

    expect(read('references/styles/tailwindcss.md')).toContain(getTailwindcssSkill());
    expect(read('references/styles/tailwindcss.md')).toContain('## Full stylesheet');
    expect(read('references/styles/scss.md')).toContain(getScssSkill());
    expect(read('references/styles/scss.md')).toContain('## Full stylesheet');

    // vanilla-extract and Emotion resolve their values at runtime, so they carry no pointer.
    expect(read('references/styles/vanilla-extract.md')).toBe(getVanillaExtractSkill());
    expect(read('references/styles/emotion.md')).toBe(getEmotionSkill());
    expect(read('references/stylesheets.md')).toBe(getStylesheetsSkill());
  });

  it('links shipped stylesheets where they physically live per framework', () => {
    writeStyleReferences(tree, 'js');
    // js ships the real Tailwind copy and the real SCSS partials as dist siblings of the skill root.
    expect(read('references/styles/tailwindcss.md')).toContain('../tailwindcss/index.css');
    expect(read('references/styles/scss.md')).toContain('../scss');

    tree.reset();
    writeStyleReferences(tree, 'react');
    // Framework wrappers ship a real Tailwind copy but only a re-export shim for SCSS, so their SCSS
    // pointer targets the js peer's subpath instead of the local `../scss` shim.
    expect(read('references/styles/tailwindcss.md')).toContain('../tailwindcss/index.css');
    expect(read('references/styles/scss.md')).toContain('@porsche-design-system/components-js/scss');
  });
});
