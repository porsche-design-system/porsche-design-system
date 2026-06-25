import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  type ComponentDocsMetaMap,
  buildComponentsOverview,
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

  describe('buildComponentsOverview', () => {
    it('lists every component with a one-line summary and a reference link', () => {
      const overview = buildComponentsOverview([
        { tag: 'p-button', summary: 'The button component.' },
        { tag: 'p-accordion', summary: 'The accordion component.' },
      ]);

      expect(overview).toContain('| Component | Summary | Reference |');
      expect(overview).toContain('| `p-button` | The button component. | [p-button.md](./p-button.md) |');
      expect(overview).toContain('| `p-accordion` | The accordion component. | [p-accordion.md](./p-accordion.md) |');
      expect(overview).toContain('2 documented components');
    });

    it('escapes pipe characters in summaries', () => {
      const overview = buildComponentsOverview([{ tag: 'p-x', summary: 'a | b' }]);
      expect(overview).toContain('a \\| b');
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

    it('writes a <tag>.md per component plus overview.md, and reports degraded prose', () => {
      const tree = new SkillTree(root);
      tree.reset();

      const report = writeComponentReferences(tree, metaMap);

      // Every componentMeta tag yields a reference file (sorted, deterministic order).
      expect(report.tags).toEqual(['p-accordion', 'p-button', 'p-degraded']);
      for (const tag of report.tags) {
        expect(fs.existsSync(tree.resolve(`references/components/${tag}.md`)), `${tag}.md`).toBe(true);
      }
      expect(fs.existsSync(tree.resolve('references/components/overview.md'))).toBe(true);

      // overview.md lists every component.
      const overview = fs.readFileSync(tree.resolve('references/components/overview.md'), 'utf-8');
      for (const tag of report.tags) {
        expect(overview).toContain(`\`${tag}\``);
      }

      // Degraded prose surfaces for review.
      expect(report.degraded).toEqual([{ tag: 'p-degraded', sections: ['introduction'] }]);
    });

    it('snapshots the generated overview.md', () => {
      const tree = new SkillTree(root);
      tree.reset();
      writeComponentReferences(tree, metaMap);

      expect(fs.readFileSync(tree.resolve('references/components/overview.md'), 'utf-8')).toMatchSnapshot();
    });
  });
});
