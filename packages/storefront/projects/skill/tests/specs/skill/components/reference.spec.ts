import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { type ComponentDocsMetaMap, writeComponentReferences } from '@skill/components/reference';
import { SkillTree } from '@skill/support/skillTree';
import { componentExamplesMeta as examplesMap } from '../../../data/skill/componentExamplesFixtures';
import { componentDocsMeta as proseMap } from '../../../data/skill/componentProseFixtures';

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
