import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { ComponentMeta } from '@porsche-design-system/component-meta';
import {
  buildSubComponentMap,
  type ComponentDocsMetaMap,
  renderComponentProse,
  writeComponentReferences,
} from '@/lib/skill/componentsReference';
import { SkillTree } from '@/lib/skill/skillTree';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { compileComponentDocsMeta } from '../data/skill/componentProseFixtures';

describe('component reference generator', () => {
  let metaMap: ComponentDocsMetaMap;

  beforeAll(async () => {
    metaMap = await compileComponentDocsMeta();
  });

  /** The fixture map without `p-degraded`, whose introduction deliberately fails the render. */
  const healthyMetaMap = (): ComponentDocsMetaMap => {
    const { 'p-degraded': _, ...rest } = metaMap;
    return rest;
  };

  describe('renderComponentProse', () => {
    it('emits a single tag H1 followed by the introduction, usage and accessibility sections', () => {
      const { markdown } = renderComponentProse('p-button', metaMap['p-button']);

      expect(markdown.match(/^# /gm)).toHaveLength(1);
      expect(markdown).toMatch(/^# p-button\n/);
      expect(markdown).toContain('The `p-button` component is essential');
      expect(markdown).toContain('## Usage');
      expect(markdown).toContain('## Accessibility support');
      // The redundant `# Button` H1 from the usage/accessibility pages is stripped.
      expect(markdown).not.toContain('# Button');
      expect(markdown).not.toContain('<');
    });

    it('renders the notes section when present', () => {
      const { markdown } = renderComponentProse('p-button', metaMap['p-button']);

      expect(markdown).toContain('## Notes');
      expect(markdown).toContain('### Form attribute');
      expect(markdown).toContain('Use the `form` attribute');
    });

    it('omits the notes section when a component has none', () => {
      const { markdown } = renderComponentProse('p-accordion', metaMap['p-accordion']);

      expect(markdown).not.toContain('## Notes');
    });

    it('throws on degraded prose instead of emitting it, naming the source section', () => {
      expect(() => renderComponentProse('p-degraded', metaMap['p-degraded'])).toThrow(
        /rendered to nothing meaningful for p-degraded › introduction/
      );
    });

    it('snapshots the full prose body for a representative component', () => {
      expect(renderComponentProse('p-button', metaMap['p-button']).markdown).toMatchSnapshot();
    });
  });

  describe('writeComponentReferences', () => {
    let root: string;

    beforeAll(() => {
      root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-components-'));
    });

    afterAll(() => {
      fs.rmSync(root, { recursive: true, force: true });
    });

    it('writes a <tag>/<tag>.md per component and returns a roster', () => {
      const tree = new SkillTree(root);
      tree.reset();

      const report = writeComponentReferences(tree, healthyMetaMap());

      // Every componentMeta tag yields a reference file (sorted, deterministic order).
      expect(report.tags).toEqual(['p-accordion', 'p-button']);
      for (const tag of report.tags) {
        expect(fs.existsSync(tree.resolve(`references/components/${tag}/${tag}.md`)), `${tag}.md`).toBe(true);
      }

      // The roster carries one entry per tag (the harness inlines it into SKILL.md).
      expect(report.roster.map(({ tag }) => tag)).toEqual(report.tags);
      for (const { tag, summary } of report.roster) {
        expect(summary, `${tag} summary`).toBeTruthy();
      }

      // No standalone overview file is written — the roster lives in SKILL.md.
      expect(fs.existsSync(tree.resolve('references/components/overview.md'))).toBe(false);

      // Storefront-absolute prose links are resolved to in-tree references in the written file.
      const buttonMd = fs.readFileSync(tree.resolve('references/components/p-button/p-button.md'), 'utf-8');
      expect(buttonMd).toContain('[Link](../p-link/p-link.md)');
      expect(buttonMd).not.toContain('](/components/');
    });

    it('propagates a degraded-prose failure instead of writing the tree', () => {
      const tree = new SkillTree(root);
      tree.reset();

      expect(() => writeComponentReferences(tree, metaMap)).toThrow(
        /rendered to nothing meaningful for p-degraded › introduction/
      );
    });

    it('snapshots the generated roster', () => {
      const tree = new SkillTree(root);
      tree.reset();

      expect(writeComponentReferences(tree, healthyMetaMap()).roster).toMatchSnapshot();
    });
  });

  describe('buildSubComponentMap', () => {
    // A parent, a direct sub-component, a nested sub-component (parent is itself a sub), and a
    // sub-component shared by two top-level parents.
    const meta = {
      'p-table': { isChunked: true } as unknown as ComponentMeta,
      'p-table-body': { requiredParent: 'p-table' } as unknown as ComponentMeta,
      'p-table-row': { requiredParent: ['p-table-body', 'p-table-head'] } as unknown as ComponentMeta,
      'p-table-head': { requiredParent: 'p-table' } as unknown as ComponentMeta,
      'p-select': { isChunked: true } as unknown as ComponentMeta,
      'p-multi-select': { isChunked: true } as unknown as ComponentMeta,
      'p-optgroup': { requiredParent: ['p-select', 'p-multi-select'] } as unknown as ComponentMeta,
    };

    it('maps each top-level component to its (transitive) sub-components, sorted', () => {
      const map = buildSubComponentMap(meta);
      expect(map['p-table'].map((s) => s.tag)).toEqual(['p-table-body', 'p-table-head', 'p-table-row']);
    });

    it('attaches a shared sub-component to every top-level parent it resolves to', () => {
      const map = buildSubComponentMap(meta);
      expect(map['p-select'].map((s) => s.tag)).toContain('p-optgroup');
      expect(map['p-multi-select'].map((s) => s.tag)).toContain('p-optgroup');
    });

    it('never lists a top-level component as its own sub-component', () => {
      const map = buildSubComponentMap(meta);
      expect(map['p-table']?.map((s) => s.tag)).not.toContain('p-table');
    });
  });
});
