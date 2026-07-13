import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ComponentExamplesSource } from '@/lib/skill/components/examples';
import type { ComponentProseSource } from '@/lib/skill/components/prose';
import { type ComponentDocsMetaMap, writeComponentReferences } from '@/lib/skill/components/reference';
import { SkillTree } from '@/lib/skill/support/skillTree';
import { compileComponentExamplesMeta } from '../../../data/skill/componentExamplesFixtures';
import { compileComponentDocsMeta } from '../../../data/skill/componentProseFixtures';

describe('writeComponentReferences', () => {
  let proseMap: Record<string, ComponentProseSource>;
  let examplesMap: Record<string, ComponentExamplesSource>;
  let root: string;

  beforeAll(async () => {
    proseMap = await compileComponentDocsMeta();
    examplesMap = await compileComponentExamplesMeta();
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-components-'));
  });

  afterAll(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  /** Full docs sources (prose + examples) for the healthy fixture tags — both are real PDS tags,
   * so the authoritative `componentMeta` covers them. */
  const docsMeta = (...tags: string[]): ComponentDocsMetaMap =>
    Object.fromEntries(tags.map((tag) => [tag, { ...proseMap[tag], ...examplesMap[tag] }]));

  it('writes a <tag>/<tag>.md per component and returns a roster', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();

    const report = writeComponentReferences(tree, {
      docsMeta: docsMeta('p-button', 'p-accordion'),
      componentMeta,
      routeReferences: {},
    });

    // Every docsMeta tag yields a reference file (sorted, deterministic order).
    expect(report.tags).toEqual(['p-accordion', 'p-button']);
    for (const tag of report.tags) {
      expect(fs.existsSync(tree.resolve(`references/components/${tag}/${tag}.md`)), `${tag}.md`).toBe(true);
    }

    // The roster carries one entry per tag (the harness inlines it into SKILL.md).
    expect(report.roster.map(({ tag }) => tag)).toEqual(report.tags);
    for (const { tag, summary } of report.roster) {
      expect(summary, `${tag} summary`).toBeTruthy();
    }

    // The shared icon-name reference is emitted once per tree.
    expect(fs.existsSync(tree.resolve('references/icons.md'))).toBe(true);

    // No standalone overview file is written — the roster lives in SKILL.md.
    expect(fs.existsSync(tree.resolve('references/components/overview.md'))).toBe(false);

    // The authoritative API tables are appended after the prose.
    const buttonMd = fs.readFileSync(tree.resolve('references/components/p-button/p-button.md'), 'utf-8');
    expect(buttonMd).toContain('## API');

    // Storefront-absolute prose links are resolved to in-tree references in the written file.
    expect(buttonMd).toContain('[Link](../p-link/p-link.md)');
    expect(buttonMd).not.toContain('](/components/');
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

  it('snapshots the generated roster', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();

    const report = writeComponentReferences(tree, {
      docsMeta: docsMeta('p-button', 'p-accordion'),
      componentMeta,
      routeReferences: {},
    });
    expect(report.roster).toMatchSnapshot();
  });
});
