import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createSite, type Page } from '@porsche-design-system/docs-components/markdown';
import { renderGettingStartedSection, writePageReferences } from '@skills/knowledge/pages';
import { SkillTree } from '@skills/shared/skillTree';
import { localPorscheDesignSystemVersion } from '@skills/shared/version';
import type { Root } from 'mdast';
import { afterEach, describe, expect, it } from 'vitest';

const linkTree = (url: string): Root => ({
  type: 'root',
  children: [{ type: 'paragraph', children: [{ type: 'link', url, children: [{ type: 'text', value: 'Link' }] }] }],
});

const page = (route: string, framework: Page['frameworks'][number], url: string): Page => ({
  route,
  file: `${route}/page.mdx`,
  metadata: { title: `${route} - Porsche Design System`, description: `About ${route}.` },
  kind: 'specific',
  frameworks: [framework],
  trees: { [framework]: linkTree(url) },
});

const PAGES = [
  page('developing/react/getting-started', 'react', '/developing/next-js/getting-started/'),
  page('developing/next-js/getting-started', 'react', '/developing/vue/getting-started/#setup'),
  page('developing/vue/getting-started', 'vue', '/partials/introduction/'),
];
const SITE = createSite([...PAGES.map(({ route }) => route), 'partials/introduction'], PAGES);

let root: string;
afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

describe('writePageReferences', () => {
  it('writes the pages of the framework at their route, linking within the skill and to the exact version outside', () => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-pages-'));
    const written = writePageReferences(new SkillTree(root, 'react'), PAGES, SITE);
    const read = (route: string) => fs.readFileSync(path.join(root, 'references', `${route}.md`), 'utf-8');

    expect(written.map(({ route }) => route)).toEqual([
      'developing/react/getting-started',
      'developing/next-js/getting-started',
    ]);
    expect(read('developing/react/getting-started')).toBe('[Link](../next-js/getting-started.md)\n');
    expect(read('developing/next-js/getting-started')).toBe(
      `[Link](https://designsystem.porsche.com/v${localPorscheDesignSystemVersion}/developing/vue/getting-started.md#setup)\n`
    );
    expect(fs.existsSync(path.join(root, 'references/developing/vue'))).toBe(false);
  });
});

describe('renderGettingStartedSection', () => {
  it('lists each guide with its summary and reference', () => {
    expect(renderGettingStartedSection(PAGES.slice(0, 1))).toContain(
      '| developing/react/getting-started | About developing/react/getting-started. | [react/getting-started.md](references/developing/react/getting-started.md) |'
    );
  });
});
