import { describe, expect, it } from 'vitest';
import { examplesSkill, getComponents, getMarkup, getScript } from '../../../skill/skill.ts';

/**
 * The serializer of the knowledge skill: what it keeps of a generated project, and which component references an
 * example links. It reads `dist/`, so the specs reading every page need `scripts/build.ts` to have run – the unit
 * suite runs on a built tree in CI.
 */

describe('getMarkup()', () => {
  const html = [
    '<!doctype html>',
    '<!--',
    '  Example of the Porsche Design System',
    '-->',
    '<html lang="en" class="scheme-light-dark">',
    '  <head>',
    '    <title>Header 1 | Dummy Patterns</title>',
    '  </head>',
    '  <body>',
    '    <p-heading tag="h1">Header</p-heading>',
    '  </body>',
    '</html>',
    '',
  ].join('\n');

  it('should drop the doctype, the note on porting the example and the head, and keep the html element', () => {
    expect(getMarkup(html)).toBe(
      [
        '<html lang="en" class="scheme-light-dark">',
        '  <body>',
        '    <p-heading tag="h1">Header</p-heading>',
        '  </body>',
        '</html>',
      ].join('\n')
    );
  });

  it('should fail for a document without an html element', () => {
    expect(() => getMarkup('<body></body>')).toThrow('<html>');
  });
});

describe('getScript()', () => {
  it('should drop the import of the stylesheet', () => {
    expect(getScript("import './style.css';\n\n// DO NOT USE IN PRODUCTION!\nconsole.warn('x');\n")).toBe(
      "// DO NOT USE IN PRODUCTION!\nconsole.warn('x');"
    );
  });

  it('should be empty for a page without behaviour', () => {
    expect(getScript("import './style.css';\n")).toBe('');
  });
});

describe('getComponents()', () => {
  it('should name every component once, sorted', () => {
    expect(getComponents('<p-text></p-text><p-button></p-button><p-text></p-text>')).toEqual(['p-button', 'p-text']);
  });

  it('should name a sub-component by the component documenting it', () => {
    expect(
      getComponents(
        '<p-drilldown><p-drilldown-item><p-drilldown-link></p-drilldown-link></p-drilldown-item></p-drilldown>'
      )
    ).toEqual(['p-drilldown']);
    expect(getComponents('<p-table><p-table-row><p-table-cell></p-table-cell></p-table-row></p-table>')).toEqual([
      'p-table',
    ]);
  });

  it('should prefer the parent the page renders when a sub-component has several', () => {
    expect(getComponents('<p-multi-select><p-optgroup></p-optgroup></p-multi-select>')).toEqual(['p-multi-select']);
  });

  it('should ignore elements that are not components', () => {
    expect(getComponents('<p-unknown></p-unknown><p></p>')).toEqual([]);
  });
});

describe('examplesSkill', () => {
  const references = examplesSkill.getReferences?.() ?? [];

  it('should provide one reference per page, named by its path', () => {
    expect(references.map(({ name }) => name)).toContain('patterns/header/overlay');
    expect(references.map(({ name }) => name)).toContain('templates/admin-panel');
  });

  it('should link every reference from the index', () => {
    const index = examplesSkill.getContent();

    for (const { name, title } of references) {
      expect(index).toContain(`| ${title} |`);
      expect(index).toContain(`(./examples/${name}.md)`);
    }
  });

  it.each(references.map(({ name, getContent }) => [name, getContent] as const))(
    'should render "%s" with its components linked to their storefront route and its markup',
    (_name, getContent) => {
      const content = getContent();

      expect(content).toMatch(/^# .+\n\n.+\n/);
      expect(content).toMatch(/- \*\*Components:\*\* \[`p-[a-z-]+`\]\(\/components\/[a-z-]+\)/);
      expect(content).toContain('```html\n<html lang="en"');
      expect(content).not.toContain('Example of the Porsche Design System');
    }
  );
});
