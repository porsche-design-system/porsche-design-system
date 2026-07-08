import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
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
      const { markdown, degradedSections } = renderComponentProse('p-accordion', metaMap['p-accordion']);

      expect(markdown).not.toContain('## Notes');
      expect(degradedSections).toEqual([]);
    });

    it('flags degraded prose instead of emitting it', () => {
      const { markdown, degradedSections, summary } = renderComponentProse('p-degraded', metaMap['p-degraded']);

      expect(degradedSections).toContain('introduction');
      expect(summary).toBe('_No description available._');
      // Usage / accessibility still render, so the file is not empty.
      expect(markdown).toContain('## Usage');
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

    it('writes a <tag>/<tag>.md per component, returns a roster, and reports degraded prose', () => {
      const tree = new SkillTree(root);
      tree.reset();

      const report = writeComponentReferences(tree, metaMap);

      // Every componentMeta tag yields a reference file (sorted, deterministic order).
      expect(report.tags).toEqual(['p-accordion', 'p-button', 'p-degraded']);
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

      // Degraded prose surfaces for review.
      expect(report.degraded).toEqual([{ tag: 'p-degraded', sections: ['introduction'] }]);

      // Storefront-absolute prose links are resolved to in-tree references in the written file.
      const buttonMd = fs.readFileSync(tree.resolve('references/components/p-button/p-button.md'), 'utf-8');
      expect(buttonMd).toContain('[Link](../p-link/p-link.md)');
      expect(buttonMd).not.toContain('](/components/');
    });

    it('snapshots the generated roster', () => {
      const tree = new SkillTree(root);
      tree.reset();

      expect(writeComponentReferences(tree, metaMap).roster).toMatchSnapshot();
    });
  });
});
