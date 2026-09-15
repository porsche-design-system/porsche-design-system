import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  getPackageSkillRouteReferences,
  renderStylesheetsSection,
  renderStylingSection,
  renderTokensSection,
  writePackageSkillReferences,
} from '@skills/knowledge/packageSkills';
import { SkillTree } from '@skills/shared/skillTree';
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
    tree = new SkillTree(root, 'js');
    tree.reset();
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  const read = (relativePath: string): string => fs.readFileSync(tree.resolve(relativePath), 'utf-8');

  it('derives mounted routes from the package exports', () => {
    expect(getPackageSkillRouteReferences()).toEqual(routeReferences);
  });

  it('renders the package sections', () => {
    expect({
      stylesheets: renderStylesheetsSection('react'),
      tokens: renderTokensSection(),
      styling: renderStylingSection(),
    }).toMatchSnapshot();
  });

  it('writes package files with the raw stylesheet pointers', () => {
    expect(writePackageSkillReferences(tree, routeReferences)).toEqual(Object.values(routeReferences));
    expect(read('references/styles/tailwindcss.md')).toContain('../../tailwindcss/index.css');
    expect(read('references/styles/scss.md')).toContain('../../scss');
    expect(read('references/stylesheets.md')).toContain('](./styles/scss.md)');
  });

  it('uses the js-peer SCSS pointer for framework wrappers', () => {
    tree = new SkillTree(root, 'react');
    tree.reset();
    writePackageSkillReferences(tree, routeReferences);

    expect(read('references/styles/tailwindcss.md')).toContain('../../tailwindcss/index.css');
    expect(read('references/styles/scss.md')).toContain('@porsche-design-system/components-js/scss');
  });
});
