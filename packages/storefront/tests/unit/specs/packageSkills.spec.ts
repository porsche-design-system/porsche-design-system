import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { stylesheetsSkill } from '../../../../components/projects/stylesheets/skill/skill';
import { emotionSkill } from '../../../../styles/projects/emotion/skill/skill';
import { scssSkill } from '../../../../styles/projects/scss/skill/skill';
import { tailwindcssSkill } from '../../../../styles/projects/tailwindcss/skill/skill';
import { vanillaExtractSkill } from '../../../../styles/projects/vanilla-extract/skill/skill';
import {
  getPackageSkillRouteReferences,
  getPackageSkillSections,
  writePackageSkillReferences,
} from '@/lib/skill/packageSkills';
import { SkillTree } from '@/lib/skill/skillTree';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const routeReferences = {
  tailwindcss: 'references/styles/tailwindcss.md',
  scss: 'references/styles/scss.md',
  'vanilla-extract': 'references/styles/vanilla-extract.md',
  emotion: 'references/styles/emotion.md',
  stylesheets: 'references/stylesheets.md',
  tokens: 'references/tokens.md',
};

describe('package skill registry', () => {
  let root: string;
  let tree: SkillTree;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'package-skills-'));
    tree = new SkillTree(root);
    tree.reset();
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  const read = (relativePath: string): string => fs.readFileSync(tree.resolve(relativePath), 'utf-8');

  it('derives mounted routes and SKILL.md rows from the package exports', () => {
    expect(getPackageSkillRouteReferences()).toEqual({
      tailwindcss: 'references/styles/tailwindcss.md',
      scss: 'references/styles/scss.md',
      'vanilla-extract': 'references/styles/vanilla-extract.md',
      emotion: 'references/styles/emotion.md',
      stylesheets: 'references/stylesheets.md',
    });
    expect(getPackageSkillSections()).toEqual({
      stylesheets: {
        title: stylesheetsSkill.title,
        description: stylesheetsSkill.description,
        intro: stylesheetsSkill.intro,
        resolvedPath: 'references/stylesheets.md',
      },
      styling: [tailwindcssSkill, scssSkill, vanillaExtractSkill, emotionSkill].map(({ name, title, description }) => ({
        title,
        description,
        resolvedPath: `references/styles/${name}.md`,
      })),
    });
  });

  it('writes package files and preserves the hybrid raw stylesheet pointers', () => {
    const written = writePackageSkillReferences(tree, 'js', routeReferences);

    expect(written).toEqual([
      'references/styles/tailwindcss.md',
      'references/styles/scss.md',
      'references/styles/vanilla-extract.md',
      'references/styles/emotion.md',
      'references/stylesheets.md',
    ]);
    expect(read('references/styles/tailwindcss.md')).toContain(tailwindcssSkill.getContent());
    expect(read('references/styles/tailwindcss.md')).toContain('../tailwindcss/index.css');
    expect(read('references/styles/scss.md')).toContain(scssSkill.getContent());
    expect(read('references/styles/scss.md')).toContain('../scss');
    expect(read('references/styles/vanilla-extract.md')).toBe(vanillaExtractSkill.getContent());
    expect(read('references/styles/emotion.md')).toBe(emotionSkill.getContent());
    expect(read('references/stylesheets.md')).toContain('](./styles/scss.md)');
    expect(read('references/stylesheets.md')).not.toContain('](/');
  });
  it('uses the js-peer SCSS pointer for framework wrappers', () => {
    writePackageSkillReferences(tree, 'react', routeReferences);

    expect(read('references/styles/tailwindcss.md')).toContain('../tailwindcss/index.css');
    expect(read('references/styles/scss.md')).toContain('@porsche-design-system/components-js/scss');
  });
});
