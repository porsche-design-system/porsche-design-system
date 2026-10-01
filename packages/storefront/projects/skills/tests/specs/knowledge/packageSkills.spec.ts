import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { examplesSkill } from '@porsche-design-system/examples/skill';
import {
  getPackageSkillRouteReferences,
  renderExamplesNote,
  renderExamplesSection,
  renderStylesheetsSection,
  renderStylingSection,
  renderTokensSection,
  writePackageSkillReferences,
} from '@skills/knowledge/packageSkills';
import { FRAMEWORKS, SkillTree } from '@skills/shared/skillTree';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const routeReferences = {
  tailwindcss: 'references/styles/tailwindcss.md',
  scss: 'references/styles/scss.md',
  'vanilla-extract': 'references/styles/vanilla-extract.md',
  emotion: 'references/styles/emotion.md',
  stylesheets: 'references/stylesheets.md',
  tokens: 'references/tokens.md',
  examples: 'references/examples.md',
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
    const written = writePackageSkillReferences(tree, routeReferences);

    expect(written.filter((file) => !file.startsWith('references/examples/'))).toEqual(Object.values(routeReferences));
    expect(read('references/styles/tailwindcss.md')).toContain('../../tailwindcss/index.css');
    expect(read('references/styles/scss.md')).toContain('../../scss');
    expect(read('references/stylesheets.md')).toContain('](./styles/scss.md)');
  });

  it('writes one reference per pattern and template next to the examples index', () => {
    const pages = writePackageSkillReferences(tree, routeReferences).filter((file) =>
      file.startsWith('references/examples/')
    );
    const index = read('references/examples.md');

    expect(pages).toContain('references/examples/patterns/header/overlay.md');
    expect(pages).toContain('references/examples/templates/landing-page.md');
    for (const page of pages) {
      expect(index).toContain(`](./${page.replace('references/', '')})`);
    }
    expect(index).toContain('## Stylesheet');
    expect(index).toContain('```css');
  });

  it('renders the title, description, components, markup and script of an example', () => {
    writePackageSkillReferences(tree, routeReferences);
    const page = read('references/examples/patterns/header/overlay.md');

    expect(page).toMatch(/^# Header: Overlay\n/);
    expect(page).toContain('The header lies on top of the content');
    // Sub-components link to the component documenting them, resolved to the local component reference.
    expect(page).toContain('[`p-drilldown`](../../../components/p-drilldown/p-drilldown.md)');
    expect(page).not.toContain('p-drilldown-link`](');
    expect(page).toContain('[examples.md](../../../examples.md)');
    expect(page).toContain('```html\n<html lang="en">');
    expect(page).not.toMatch(/^\s*<head>/m);
    expect(page).not.toContain('Example of the Porsche Design System');
    expect(page).toContain('```js\n// DO NOT USE IN PRODUCTION!');
    expect(page).not.toContain("import './style.css';");
  });

  // SKILL.md is in context whenever these files are read: whatever it says, they must not say again.
  it.each(FRAMEWORKS)(
    'repeats neither the intro nor the framework note of SKILL.md in the %s example files',
    (framework) => {
      tree = new SkillTree(root, framework);
      tree.reset();
      const files = writePackageSkillReferences(tree, routeReferences).filter((file) =>
        file.startsWith('references/examples')
      );
      const section = renderExamplesSection(framework);
      const note = renderExamplesNote(framework);

      expect(section).toContain(note);
      expect(section).toContain(examplesSkill.intro);
      for (const file of files) {
        expect(read(file), file).not.toContain(note);
        expect(read(file), file).not.toContain(examplesSkill.intro);
      }
    }
  );

  it('states the conventions all examples share once, in the index', () => {
    const files = writePackageSkillReferences(tree, routeReferences).filter((file) =>
      file.startsWith('references/examples/')
    );

    expect(read('references/examples.md')).toContain('## Conventions');
    for (const file of files) {
      expect(read(file), file).not.toContain('Links point to `#`');
    }
  });

  it('uses the js-peer SCSS pointer for framework wrappers', () => {
    tree = new SkillTree(root, 'react');
    tree.reset();
    writePackageSkillReferences(tree, routeReferences);

    expect(read('references/styles/tailwindcss.md')).toContain('../../tailwindcss/index.css');
    expect(read('references/styles/scss.md')).toContain('@porsche-design-system/components-js/scss');
  });
});
