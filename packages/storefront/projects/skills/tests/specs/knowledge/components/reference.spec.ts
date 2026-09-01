import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import { type ComponentDocsMetaMap, writeComponentReferences } from '@skills/knowledge/components/reference';
import { SkillTree } from '@skills/shared/skillTree';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { componentExamplesMeta as examplesMap } from '../../../data/knowledge/componentExamplesFixtures';
import { componentDocsMeta as proseMap } from '../../../data/knowledge/componentProseFixtures';

describe('writeComponentReferences', () => {
  let root: string;

  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-components-'));
  });

  afterAll(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  /** Full docs sources (prose + examples) for the healthy fixture tags — both are real PDS tags,
   * so the authoritative `componentMeta` covers them. */
  const docsMeta = (...tags: string[]): ComponentDocsMetaMap =>
    Object.fromEntries(tags.map((tag) => [tag, { ...proseMap[tag], ...examplesMap[tag] }]));

  it('writes component references and returns a roster', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();

    const report = writeComponentReferences(tree, {
      docsMeta: docsMeta('p-button', 'p-accordion'),
      componentMeta,
      routeReferences: {},
    });

    expect(report).toMatchSnapshot();
    const buttonMd = fs.readFileSync(tree.resolve('references/components/p-button/p-button.md'), 'utf-8');
    expect(buttonMd).toContain('## API');
    expect(buttonMd).toContain('[Link](../p-link/p-link.md)');
    const accordionMd = fs.readFileSync(tree.resolve('references/components/p-accordion/p-accordion.md'), 'utf-8');
    expect(accordionMd).toContain('[accessibility integration examples](./accessibility.md)');
    const accessibilityMd = fs.readFileSync(
      tree.resolve('references/components/p-accordion/accessibility.md'),
      'utf-8'
    );
    expect(accessibilityMd).toContain('# p-accordion accessibility integration examples');
    expect(accessibilityMd).toContain('#### ❌ Anti-pattern');
    expect(accessibilityMd).toContain('#### ✅ Recommended');
  });

  it('propagates a degraded-prose failure instead of writing the tree', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();

    expect(() =>
      writeComponentReferences(tree, {
        docsMeta: { 'p-degraded': { ...proseMap['p-degraded'], ...examplesMap['p-accordion'] } },
        componentMeta: { ...componentMeta, 'p-degraded': componentMeta['p-accordion'] },
        routeReferences: {},
      })
    ).toThrow(/rendered to nothing meaningful for p-degraded › introduction/);
  });

  it('rejects a documented tag that component-meta does not know', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();

    expect(() =>
      writeComponentReferences(tree, {
        docsMeta: { 'p-unknown': { ...proseMap['p-accordion'], ...examplesMap['p-accordion'] } },
        componentMeta,
        routeReferences: {},
      })
    ).toThrow(/No component-meta for documented tag p-unknown/);
  });
});
