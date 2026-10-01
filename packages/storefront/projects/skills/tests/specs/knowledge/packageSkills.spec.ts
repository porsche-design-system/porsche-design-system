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
    expect(page).toContain('[examples.md](../../../examples.md#stylesheet)');
    expect(page).toContain('```html\n<html lang="en">');
    expect(page).not.toMatch(/^\s*<head>/m);
    expect(page).not.toContain('Example of the Porsche Design System');
    expect(page).toContain('```js\n// DO NOT USE IN PRODUCTION!');
    expect(page).not.toContain("import './style.css';");
  });

  it('states below the title of every example file that it is vanilla, for js', () => {
    writePackageSkillReferences(tree, routeReferences);

    expect(read('references/examples.md')).toMatch(
      /^# Patterns and templates\n\n> \*\*Vanilla HTML and JavaScript\.\*\*/
    );
    expect(read('references/examples/patterns/footer.md')).toMatch(
      /^# Footer\n\n> \*\*Vanilla HTML and JavaScript\.\*\*/
    );
  });

  it.each(['angular', 'react', 'vue'] as const)(
    'states below the title of every example file that it has to be converted, for %s',
    (framework) => {
      tree = new SkillTree(root, framework);
      tree.reset();
      const pages = writePackageSkillReferences(tree, routeReferences).filter((file) =>
        file.startsWith('references/examples')
      );

      for (const page of pages) {
        expect(read(page)).toMatch(/^# [^\n]+\n\n> \*\*Convert to (Angular|React|Vue) before use\.\*\*/);
        expect(read(page)).toContain(`@porsche-design-system/components-${framework}`);
      }
    }
  );

  it('leaves the other package skills without a note', () => {
    writePackageSkillReferences(tree, routeReferences);

    expect(read('references/tokens.md')).not.toContain('Vanilla HTML and JavaScript');
  });

  it('uses the js-peer SCSS pointer for framework wrappers', () => {
    tree = new SkillTree(root, 'react');
    tree.reset();
    writePackageSkillReferences(tree, routeReferences);

    expect(read('references/styles/tailwindcss.md')).toContain('../../tailwindcss/index.css');
    expect(read('references/styles/scss.md')).toContain('@porsche-design-system/components-js/scss');
  });
});
