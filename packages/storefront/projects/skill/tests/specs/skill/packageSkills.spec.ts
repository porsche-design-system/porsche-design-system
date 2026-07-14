import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  getPackageSkillRouteReferences,
  renderStylesheetsSection,
  renderStylingSection,
  renderTokensSection,
  writePackageSkillReferences,
} from '@skill/packageSkills';
import { resolveFrameworkPlaceholder } from '@skill/support/links';
import { SkillTree } from '@skill/support/skillTree';
import { stylesheetsSkill } from '../../../../../../components/projects/stylesheets/skill/skill';
import { emotionSkill } from '../../../../../../styles/projects/emotion/skill/skill';
import { scssSkill } from '../../../../../../styles/projects/scss/skill/skill';
import { tailwindcssSkill } from '../../../../../../styles/projects/tailwindcss/skill/skill';
import { vanillaExtractSkill } from '../../../../../../styles/projects/vanilla-extract/skill/skill';
import { tokensSkill } from '../../../../../../tokens/projects/tokens-meta/skill/skill';

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
    tree = new SkillTree(root, 'js');
    tree.reset();
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  const read = (relativePath: string): string => fs.readFileSync(tree.resolve(relativePath), 'utf-8');

  it('derives mounted routes from the package exports', () => {
    expect(getPackageSkillRouteReferences()).toEqual({
      tailwindcss: 'references/styles/tailwindcss.md',
      scss: 'references/styles/scss.md',
      'vanilla-extract': 'references/styles/vanilla-extract.md',
      emotion: 'references/styles/emotion.md',
      stylesheets: 'references/stylesheets.md',
      tokens: 'references/tokens.md',
    });
  });

  it('renders the Stylesheets section from the fragment intro plus the aggregator-owned theming note', () => {
    const section = renderStylesheetsSection('react');

    expect(section).toContain(stylesheetsSkill.intro ?? stylesheetsSkill.description);
    expect(section).toContain('[stylesheets.md](references/stylesheets.md)');
    expect(section).toContain('There is **no** `theme` prop');
    expect(section).toContain('`PorscheDesignSystemProvider`');
  });

  it('renders the Tokens section from the fragment intro plus the pointer', () => {
    const section = renderTokensSection();

    expect(section).toContain(tokensSkill.intro);
    expect(section).toContain('[tokens.md](references/tokens.md)');
  });

  it('renders one Styling table row per registered styling solution', () => {
    const section = renderStylingSection();

    for (const { title, description, name } of [tailwindcssSkill, scssSkill, vanillaExtractSkill, emotionSkill]) {
      expect(section).toContain(`| ${title} |`);
      expect(section).toContain(description);
      expect(section).toContain(`references/styles/${name}.md`);
    }
    expect(section).toContain('four styling solutions');
  });

  const resolved = (markdown: string): string => resolveFrameworkPlaceholder(markdown, 'js');

  it('writes package files and preserves the hybrid raw stylesheet pointers', () => {
    const written = writePackageSkillReferences(tree, routeReferences);

    expect(written).toEqual([
      'references/styles/tailwindcss.md',
      'references/styles/scss.md',
      'references/styles/vanilla-extract.md',
      'references/styles/emotion.md',
      'references/stylesheets.md',
      'references/tokens.md',
    ]);
    expect(read('references/styles/tailwindcss.md')).toContain(resolved(tailwindcssSkill.getContent()));
    expect(read('references/styles/tailwindcss.md')).toContain('../tailwindcss/index.css');
    expect(read('references/styles/scss.md')).toContain(resolved(scssSkill.getContent()));
    expect(read('references/styles/scss.md')).toContain('../scss');
    expect(read('references/styles/vanilla-extract.md')).toBe(resolved(vanillaExtractSkill.getContent()));
    expect(read('references/styles/emotion.md')).toBe(resolved(emotionSkill.getContent()));
    expect(read('references/stylesheets.md')).toContain('](./styles/scss.md)');
    expect(read('references/stylesheets.md')).not.toContain('](/');
    expect(read('references/tokens.md')).toBe(resolved(tokensSkill.getContent()));
  });
  it('uses the js-peer SCSS pointer for framework wrappers', () => {
    const reactTree = new SkillTree(root, 'react');
    reactTree.reset();
    writePackageSkillReferences(reactTree, routeReferences);

    const readReact = (relativePath: string): string => fs.readFileSync(reactTree.resolve(relativePath), 'utf-8');
    expect(readReact('references/styles/tailwindcss.md')).toContain('../tailwindcss/index.css');
    expect(readReact('references/styles/scss.md')).toContain('@porsche-design-system/components-js/scss');
  });
});
