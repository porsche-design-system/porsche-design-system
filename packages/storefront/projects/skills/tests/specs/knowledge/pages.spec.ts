import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createSite, type Page } from '@porsche-design-system/docs-components/markdown';
import { renderPageSections, writePageReferences } from '@skills/knowledge/pages';
import { SkillTree } from '@skills/shared/skillTree';
import { localPorscheDesignSystemVersion } from '@skills/shared/version';
import type { Root } from 'mdast';
import { afterEach, describe, expect, it } from 'vitest';

const linkTree = (url: string): Root => ({
  type: 'root',
  children: [{ type: 'paragraph', children: [{ type: 'link', url, children: [{ type: 'text', value: 'Link' }] }] }],
});

const guide = (framework: 'react' | 'vue', page: string, title: string, url: string): Page => ({
  route: `developing/${page}/getting-started`,
  file: `developing/${page}/getting-started/page.mdx`,
  metadata: {},
  kind: 'specific',
  frameworks: [framework],
  trees: { [framework]: linkTree(url) },
  place: {
    category: { route: 'developing', title: 'Developing', description: 'For people.' },
    reference: { route: `developing/${page}`, title },
    tab: 'Getting Started',
  },
});

const PAGES = [
  guide('react', 'react', 'React', '/developing/next-js/getting-started/'),
  guide('react', 'next-js', 'Next.js', '/developing/vue/getting-started/#setup'),
  guide('vue', 'vue', 'Vue', '/partials/introduction/'),
];
const SITE = createSite([...PAGES.map(({ route }) => route), 'partials/introduction'], PAGES);

let root: string;
afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

describe('writePageReferences', () => {
  it('writes one reference per sitemap page of the framework, linking within the skill and to the exact version outside', () => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-pages-'));
    const references = writePageReferences(new SkillTree(root, 'react'), PAGES, SITE);
    const read = (route: string) => fs.readFileSync(path.join(root, 'references', `${route}.md`), 'utf-8');

    expect(references.map(({ file }) => file)).toEqual([
      'references/developing/react.md',
      'references/developing/next-js.md',
    ]);
    expect(read('developing/react')).toBe('# React\n\n## Getting Started\n\n[Link](./next-js.md#getting-started)\n');
    expect(read('developing/next-js')).toBe(
      '# Next.js\n\n## Getting Started\n\n' +
        `[Link](https://designsystem.porsche.com/v${localPorscheDesignSystemVersion}/developing/vue/getting-started.md#setup)\n`
    );
    expect(fs.existsSync(path.join(root, 'references/developing/vue.md'))).toBe(false);
  });
});

describe('renderPageSections', () => {
  it('renders a section per category, worded by the skill map, with a row per reference', () => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-pages-'));
    const references = writePageReferences(new SkillTree(root, 'react'), PAGES, SITE);

    const [heading, , description, ...table] = renderPageSections('react', references).split('\n');

    expect(heading).toBe('## Frameworks');
    expect(description).toMatch(/^Set up the Porsche Design System in a new or existing project/);
    expect(table.join('\n')).toBe(
      [
        '',
        '| Page | Sections | Reference |',
        '| --- | --- | --- |',
        '| React | Getting Started | [react.md](references/developing/react.md) |',
        '| Next.js | Getting Started | [next-js.md](references/developing/next-js.md) |',
      ].join('\n')
    );
  });
});
